import { GoogleAdsEvent, GoogleAdsEvents } from '../types';

declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config',
      action: string,
      params: any
    ) => void;
    dataLayer: any[];
    pageLoadTime: number;
    performance: {
      mark(name: string): void;
      measure(name: string, startMark: string, endMark?: string): void;
      getEntriesByName(name: string): PerformanceEntry[];
    };
  }
}

// These events track the funnel leading up to checkout with correct conversion IDs
const events: GoogleAdsEvents = {
  start_quiz: {
    send_to: 'AW-16829245039/egI8CJnEyp4aEO_M59g-',
    user_timing_category: 'Quiz Start'
  },
  complete_quiz: {
    send_to: 'AW-16829245039/eNtACKLEyp4aEO_M59g-',
    user_timing_category: 'Quiz Complete'
  },
  view_results: {
    send_to: 'AW-16829245039/7-QnCKXEyp4aEO_M59g-',
    user_timing_category: 'Results View'
  },
  begin_checkout: {
    send_to: 'AW-16829245039/v9QUCL-20p4aEO_M59g-',
    user_timing_category: 'Add to Cart'
  },
  quiz_progress: {
    send_to: 'AW-16829245039/Zx3zCJzEyp4aEO_M59g-',
    user_timing_category: 'Quiz Progress'
  },
  quiz_answer: {
    send_to: 'AW-16829245039/LjWrCJ_Eyp4aEO_M59g-',
    user_timing_category: 'Quiz Interaction'
  }
};

// Define quiz milestones for progress tracking
const QUIZ_MILESTONES = {
  QUARTER: 25,
  HALF: 50,
  THREE_QUARTERS: 75,
  COMPLETE: 100
};

// Cross-domain configuration
const DOMAINS = [
  'thesoulmatequiz.com',
  'checkout.thesoulmatequiz.com'
];

// Track user behavior patterns
let lastInteractionTime = Date.now();
let interactionCount = 0;
let hesitationPoints: number[] = [];

export const trackEvent = (eventName: keyof GoogleAdsEvents, additionalParams: any = {}) => {
  if (window.gtag) {
    const timestamp = new Date().toISOString();
    const currentTime = Date.now();
    const timeOnPage = Math.floor((currentTime - window.pageLoadTime) / 1000);
    
    // Track user interaction patterns
    const timeSinceLastInteraction = currentTime - lastInteractionTime;
    if (timeSinceLastInteraction > 3000) { // 3 seconds threshold for hesitation
      hesitationPoints.push(timeOnPage);
    }
    lastInteractionTime = currentTime;
    interactionCount++;

    // Calculate user engagement score
    const engagementScore = calculateEngagementScore({
      timeOnPage,
      interactionCount,
      hesitationPoints,
      scrollDepth: getScrollDepth(),
      completionRate: additionalParams.completion_rate || 0
    });

    const eventData = {
      ...events[eventName],
      ...additionalParams,
      send_page_view: false,
      engagement_time_msec: currentTime - window.pageLoadTime,
      user_timing_category: events[eventName].user_timing_category,
      session_id: localStorage.getItem('_ga'),
      page_location: window.location.href,
      page_title: document.title,
      screen_resolution: `${window.screen.width}x${window.screen.height}`,
      viewport_size: `${window.innerWidth}x${window.innerHeight}`,
      user_agent: navigator.userAgent,
      language: navigator.language,
      timestamp: timestamp,
      traffic_type: additionalParams.gclid ? 'Paid' : 'Organic',
      engagement_score: engagementScore,
      interaction_count: interactionCount,
      hesitation_points: hesitationPoints.length,
      average_hesitation_time: calculateAverageHesitation(hesitationPoints, timeOnPage),
      linker: {
        domains: DOMAINS,
        accept_incoming: true,
        decorate_forms: true,
        url_position: 'query'
      }
    };

    // Enhanced progress tracking for quiz_progress events
    if (eventName === 'quiz_progress') {
      const progress = additionalParams.progress || 0;
      const milestone = getProgressMilestone(progress);
      
      eventData.milestone = milestone;
      eventData.milestone_value = getMilestoneValue(milestone);
      eventData.questions_completed = additionalParams.questions_completed;
      eventData.total_questions = additionalParams.total_questions;
      eventData.average_time_per_question = getAverageTimePerQuestion(
        additionalParams.questions_completed,
        eventData.engagement_time_msec
      );
      eventData.completion_rate = getCompletionRate(
        additionalParams.questions_completed,
        additionalParams.total_questions
      );

      // Track performance metrics
      window.performance.mark('quizProgress');
      window.performance.measure('quizProgressTiming', 'pageStart', 'quizProgress');
      const performanceMetrics = window.performance.getEntriesByName('quizProgressTiming');
      if (performanceMetrics.length > 0) {
        eventData.performance_timing = performanceMetrics[0].duration;
      }
    }

    // Add enhanced conversion data if user data is present
    if (additionalParams.user_data) {
      eventData.enhanced_conversions = {
        sha256_email_address: additionalParams.user_data.email_address ? 
          sha256(additionalParams.user_data.email_address.trim().toLowerCase()) : undefined,
        first_name: additionalParams.user_data.first_name,
        address: {
          ...additionalParams.user_data.address,
          country: additionalParams.user_data.address?.country || undefined
        }
      };
    }

    // Track conversion with milestone data for quiz progress
    window.gtag('event', 'conversion', {
      ...eventData,
      value: additionalParams.value,
      currency: additionalParams.currency
    });

    // Track standard event for remarketing with enhanced data
    window.gtag('event', eventName, {
      ...eventData,
      event_category: 'Quiz',
      event_label: getMilestoneLabel(eventData.milestone) || additionalParams.event_label || eventName,
      non_interaction: additionalParams.non_interaction || false
    });

    // Push rich data to dataLayer for custom audience creation
    window.dataLayer.push({
      event: eventName,
      ...eventData,
      quiz_funnel_stage: getFunnelStage(eventName),
      user_segment: additionalParams.user_segment || {},
      session_engagement: true,
      is_returning_visitor: !!localStorage.getItem('_ga'),
      time_on_page: timeOnPage,
      page_referrer: document.referrer,
      outbound_click: additionalParams.outbound_click || false,
      scroll_depth: getScrollDepth(),
      milestone_reached: eventData.milestone,
      milestone_timing: eventData.engagement_time_msec,
      bounce_exit_indicators: {
        scroll_up_count: getScrollUpCount(),
        rapid_scrolling: hasRapidScrolling(),
        mouse_leave_count: getMouseLeaveCount()
      }
    });

    // Store milestone data for cross-session analysis
    if (eventName === 'quiz_progress' && eventData.milestone) {
      const milestoneData = {
        milestone: eventData.milestone,
        timestamp: timestamp,
        time_taken: eventData.engagement_time_msec,
        questions_completed: eventData.questions_completed,
        engagement_score: eventData.engagement_score
      };
      storeMilestoneData(milestoneData);
    }

    // Track potential drop-off points
    if (shouldTrackDropOff(eventData)) {
      trackDropOffPoint(eventData);
    }
  }
};

// Initialize Google Ads with enhanced cross-domain tracking
export const initializeGoogleAds = (gclid: string) => {
  if (window.gtag) {
    window.gtag('config', 'AW-16829245039', {
      gclid_params: {
        gclid: gclid,
        gclsrc: 'aw.ds'
      },
      allow_enhanced_conversions: true,
      send_page_view: true,
      linker: {
        domains: DOMAINS,
        accept_incoming: true,
        decorate_forms: true,
        url_position: 'query'
      },
      cross_domain_auto_link: true
    });

    // Store GCLID in localStorage for cross-domain persistence
    if (gclid) {
      localStorage.setItem('gclid', gclid);
      
      // Also store in cookie for cross-domain availability
      document.cookie = `gclid=${gclid}; domain=.thesoulmatequiz.com; path=/; max-age=2592000`; // 30 days
    }
  }
};

// Calculate user engagement score (0-100)
function calculateEngagementScore(metrics: {
  timeOnPage: number,
  interactionCount: number,
  hesitationPoints: number[],
  scrollDepth: number,
  completionRate: number
}): number {
  const timeWeight = 0.2;
  const interactionWeight = 0.2;
  const hesitationWeight = 0.2;
  const scrollWeight = 0.2;
  const completionWeight = 0.2;

  const timeScore = Math.min(metrics.timeOnPage / 300, 1) * 100; // Cap at 5 minutes
  const interactionScore = Math.min(metrics.interactionCount / 50, 1) * 100;
  const hesitationScore = (1 - Math.min(metrics.hesitationPoints.length / 10, 1)) * 100;
  const scrollScore = metrics.scrollDepth;
  const completionScore = metrics.completionRate;

  return Math.round(
    timeScore * timeWeight +
    interactionScore * interactionWeight +
    hesitationScore * hesitationWeight +
    scrollScore * scrollWeight +
    completionScore * completionWeight
  );
}

// Calculate average hesitation time
function calculateAverageHesitation(hesitationPoints: number[], totalTime: number): number {
  if (hesitationPoints.length === 0) return 0;
  const totalHesitation = hesitationPoints.reduce((sum, point) => sum + point, 0);
  return Math.round(totalHesitation / hesitationPoints.length);
}

// Track potential drop-off points
function shouldTrackDropOff(eventData: any): boolean {
  return (
    eventData.engagement_score < 30 ||
    eventData.hesitation_points > 5 ||
    eventData.average_hesitation_time > 10000
  );
}

function trackDropOffPoint(eventData: any) {
  window.dataLayer.push({
    event: 'potential_drop_off',
    timestamp: new Date().toISOString(),
    drop_off_indicators: {
      low_engagement: eventData.engagement_score < 30,
      high_hesitation: eventData.hesitation_points > 5,
      long_hesitation_time: eventData.average_hesitation_time > 10000
    },
    current_stage: eventData.quiz_funnel_stage,
    user_segment: eventData.user_segment
  });
}

// Helper function to get the current milestone based on progress
function getProgressMilestone(progress: number): string {
  if (progress >= QUIZ_MILESTONES.COMPLETE) return 'complete';
  if (progress >= QUIZ_MILESTONES.THREE_QUARTERS) return 'three_quarters';
  if (progress >= QUIZ_MILESTONES.HALF) return 'half';
  if (progress >= QUIZ_MILESTONES.QUARTER) return 'quarter';
  return 'started';
}

// Helper function to get milestone-specific value
function getMilestoneValue(milestone: string): number {
  const values = {
    quarter: 0.5,
    half: 1,
    three_quarters: 1.5,
    complete: 2
  };
  return values[milestone as keyof typeof values] || 0;
}

// Helper function to get milestone label for event tracking
function getMilestoneLabel(milestone: string): string {
  const labels = {
    quarter: '25% Complete',
    half: '50% Complete',
    three_quarters: '75% Complete',
    complete: '100% Complete'
  };
  return labels[milestone as keyof typeof labels] || '';
}

// Helper function to calculate average time per question
function getAverageTimePerQuestion(questionsCompleted: number, totalTime: number): number {
  if (!questionsCompleted || !totalTime) return 0;
  return Math.round(totalTime / questionsCompleted);
}

// Helper function to calculate completion rate
function getCompletionRate(questionsCompleted: number, totalQuestions: number): number {
  if (!totalQuestions) return 0;
  return Number(((questionsCompleted / totalQuestions) * 100).toFixed(2));
}

// Helper function to store milestone data
function storeMilestoneData(data: any) {
  const milestones = JSON.parse(localStorage.getItem('quiz_milestones') || '[]');
  milestones.push(data);
  localStorage.setItem('quiz_milestones', JSON.stringify(milestones));
}

// Helper function to hash email for enhanced conversions
function sha256(str: string): string {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  return crypto.subtle.digest('SHA-256', data)
    .then(buffer => {
      const hashArray = Array.from(new Uint8Array(buffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    });
}

// Helper function to get funnel stage for segmentation
function getFunnelStage(eventName: keyof GoogleAdsEvents): string {
  const stages = {
    start_quiz: 'awareness',
    quiz_progress: 'consideration',
    quiz_answer: 'consideration',
    complete_quiz: 'interest',
    view_results: 'intent',
    begin_checkout: 'decision'
  };
  return stages[eventName] || 'unknown';
}

// Helper function to calculate scroll depth
function getScrollDepth(): number {
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  return Math.round((scrollTop + windowHeight) / documentHeight * 100);
}

// Track scroll up count (potential exit intent)
let scrollUpCount = 0;
window.addEventListener('scroll', () => {
  if (window.pageYOffset < lastScrollPosition) {
    scrollUpCount++;
  }
  lastScrollPosition = window.pageYOffset;
});

function getScrollUpCount(): number {
  return scrollUpCount;
}

// Track rapid scrolling
let lastScrollPosition = 0;
let lastScrollTime = Date.now();
let rapidScrollCount = 0;

window.addEventListener('scroll', () => {
  const currentTime = Date.now();
  const timeDiff = currentTime - lastScrollTime;
  if (timeDiff < 100) { // Less than 100ms between scrolls
    rapidScrollCount++;
  }
  lastScrollTime = currentTime;
});

function hasRapidScrolling(): boolean {
  return rapidScrollCount > 5; // More than 5 rapid scrolls
}

// Track mouse leave (potential exit intent)
let mouseLeaveCount = 0;
document.addEventListener('mouseleave', () => {
  mouseLeaveCount++;
});

function getMouseLeaveCount(): number {
  return mouseLeaveCount;
}
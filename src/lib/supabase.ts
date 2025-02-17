import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const INITIALS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const ZODIAC_SIGNS = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

const PERSONALITY_PROFILES = [
  {
    title: 'The Adventurous Free Spirit',
    description: 'Loves traveling, exploring new cultures, and spontaneous road trips. Always seeking the next thrill, from skydiving to hiking remote trails. Open-minded, passionate, and never afraid to try something new. Prefers deep, philosophical conversations over small talk.'
  },
  {
    title: 'The Intellectual Deep Thinker',
    description: 'Avid reader, loves discussing big ideas and theoretical concepts. Passionate about science, philosophy, or history. Prefers quiet, meaningful one-on-one time over big social gatherings. Finds intelligence and curiosity extremely attractive.'
  },
  {
    title: 'The Nurturing Caregiver',
    description: 'A natural empath who always puts others first. Enjoys cozy nights in, cooking for loved ones, and heartfelt conversations. Has a warm, calming presence that makes you feel at home. Deeply values emotional connection and mutual support.'
  },
  {
    title: 'The Creative Dreamer',
    description: 'Passionate about art, music, writing, or some form of self-expression. Thinks outside the box and thrives in imaginative spaces. Often lost in thought, dreaming about the future or new projects. Deeply romantic and believes in soul-deep connections.'
  },
  {
    title: 'The Loyal Protector',
    description: 'Fiercely protective of loved ones and always has your back. Strong moral compass, values honesty and loyalty above all else. Prefers actions over words and shows love through commitment and stability. Loves deep bonds and lifelong partnerships.'
  },
  {
    title: 'The Charismatic Social Butterfly',
    description: 'Lights up any room they walk into, full of charm and wit. Loves hosting gatherings and thrives in social settings. Makes you laugh constantly and always knows how to lift your spirits. Flirtatious, confident, and incredibly engaging.'
  },
  {
    title: 'The Ambitious Go-Getter',
    description: 'Always striving for personal and professional growth. Extremely goal-oriented and passionate about their career or purpose. Prefers a partner who shares their drive and encourages their ambitions. Believes in hard work, discipline, and creating a meaningful legacy.'
  },
  {
    title: 'The Calm and Grounded One',
    description: 'Has a peaceful energy that makes you feel safe and secure. Prefers a simple, balanced lifestyle with meaningful relationships. Not easily shaken by drama or stress, always bringing stability. Believes in steady love, consistency, and growing together over time.'
  },
  {
    title: 'The Playful Jokester',
    description: 'Sees life as an adventure filled with humor and fun. Always making witty remarks, playful banter, and lighthearted moments. Finds joy in the little things and helps you see the brighter side of life. Never takes themselves too seriously and loves a good prank.'
  },
  {
    title: 'The Romantic Idealist',
    description: 'Believes in love stories, destiny, and deep soul connections. Loves grand romantic gestures and heartfelt moments. Passionate about creating a relationship that feels like a fairytale. Deeply emotional and seeks a partner who is just as devoted.'
  }
];

const MEN_IMAGES = Array.from({ length: 40 }, (_, i) => 
  `https://certificates.iqcheck.co/men/M-${i + 1}.webp`
);

const WOMEN_IMAGES = Array.from({ length: 40 }, (_, i) => 
  `https://certificates.iqcheck.co/women/W-${i + 1}.avif`
);

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomImageUrl(interestedIn: string): string {
  if (interestedIn === 'Men') {
    return getRandomElement(MEN_IMAGES);
  } else if (interestedIn === 'Women') {
    return getRandomElement(WOMEN_IMAGES);
  } else {
    // For 'Both', randomly choose between men and women images
    return Math.random() < 0.5 
      ? getRandomElement(MEN_IMAGES)
      : getRandomElement(WOMEN_IMAGES);
  }
}

function getRandomPersonalityProfile() {
  return getRandomElement(PERSONALITY_PROFILES);
}

export async function submitQuizResults(userDetails: {
  firstName: string;
  birthYear: string;
  zodiacSign: string;
  interestedIn: string;
  email: string;
}) {
  try {
    // First, check if email already exists
    const { data: existingUsers, error: checkError } = await supabase
      .from('quiz_results')
      .select('id')
      .eq('email', userDetails.email);

    if (checkError) {
      console.error('Error checking for existing email:', checkError);
      return { success: false, error: checkError };
    }

    if (existingUsers && existingUsers.length > 0) {
      return { success: false, error: 'Email already exists' };
    }

    // Get random personality profile
    const personalityProfile = getRandomPersonalityProfile();

    // Insert quiz results with generated soulmate data
    const { data: result, error: insertError } = await supabase
      .from('quiz_results')
      .insert({
        first_name: userDetails.firstName,
        birth_year: parseInt(userDetails.birthYear),
        star_sign: userDetails.zodiacSign,
        interested_in: userDetails.interestedIn,
        email: userDetails.email,
        soulmate_initial: getRandomElement(INITIALS),
        soulmate_star_sign: getRandomElement(ZODIAC_SIGNS),
        soulmate_image_url: getRandomImageUrl(userDetails.interestedIn),
        personality_profile: personalityProfile.title,
        personality_description: personalityProfile.description
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error inserting quiz results:', insertError);
      return { success: false, error: insertError };
    }

    return { success: true, quizId: result.id };
  } catch (error) {
    console.error('Error submitting quiz results:', error);
    return { success: false, error };
  }
}
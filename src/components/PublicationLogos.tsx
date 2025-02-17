import React from 'react';

export const PublicationLogos: React.FC = () => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 py-6 px-8">
      <div className="max-w-xl mx-auto">
        <p className="text-white/80 text-sm text-center mb-4">As Featured In</p>
        <div className="grid grid-cols-3 items-center gap-8">
          <div className="flex justify-end">
            <img 
              src="https://assets.zyrosite.com/mnlqVelL4btke54l/daco_483872-d957wvoglXu2Wl7J.png" 
              alt="Featured Publication 1"
              className="h-5 md:h-6 object-contain"
            />
          </div>
          <div className="flex justify-center">
            <img 
              src="https://assets.zyrosite.com/mnlqVelL4btke54l/pngwing.com-YbNqp5XZ3KsgNoaB.png" 
              alt="Featured Publication 2"
              className="h-7 md:h-8 object-contain"
            />
          </div>
          <div className="flex justify-start">
            <img 
              src="https://assets.zyrosite.com/mnlqVelL4btke54l/pngfind.com-vegvisir-png-4049615-AR0Mvq4bQxc38MB7.png" 
              alt="Featured Publication 3"
              className="h-5 md:h-6 object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
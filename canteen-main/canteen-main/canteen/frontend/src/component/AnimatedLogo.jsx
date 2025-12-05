// import React, { useState, useEffect } from 'react';
// import './AnimatedLogo.css';

// const AnimatedLogo = () => {
//   const [showTitle, setShowTitle] = useState(false);
//   const [showSubtitle, setShowSubtitle] = useState(false);

//   useEffect(() => {
//     setTimeout(() => setShowTitle(true), 500);
//     setTimeout(() => setShowSubtitle(true), 1000);
//   }, []);

//   return (
//     <div className="animated-logo-container">
//       <div className="logo-content">
//         {/* Round Video Container */}
//         <div className="video-container">
//           <video 
//             autoPlay 
//             muted 
//             loop 
//             playsInline
//             className="round-video"
//           >
//             <source src="/video.mp4" type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//         </div>
        
//         <h1 className={`logo-title ${showTitle ? 'animate-slide-up' : ''}`}>
//           Campus<span className="logo-highlight">Bites</span>
//         </h1>
        
//         <p className={`logo-subtitle ${showSubtitle ? 'animate-fade-in' : ''}`}>
//           Smart Canteen Management System
//         </p>
        
//         <div className="loading-bar">
//           <div className="loading-progress"></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AnimatedLogo;

import React, { useState, useEffect, useRef } from 'react';
import './AnimatedLogo.css';

const AnimatedLogo = ({ onAnimationComplete, theme = 'teal-purple' }) => {
  const [showTitle, setShowTitle] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Start animations after video loads or after timeout
    const timer = setTimeout(() => {
      setShowTitle(true);
      setTimeout(() => setShowSubtitle(true), 500);
    }, isVideoLoaded ? 300 : 1000);

    // Auto-hide after 4 seconds
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      if (onAnimationComplete) {
        onAnimationComplete();
      }
    }, 4000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, [isVideoLoaded, onAnimationComplete]);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  const handleVideoError = () => {
    console.warn('Video failed to load, using fallback');
    setIsVideoLoaded(true);
  };

  if (!isVisible) return null;

  return (
    <div 
      ref={containerRef}
      className={`animated-logo-container ${!isVisible ? 'hidden' : ''}`}
      data-theme={theme}
    >
      <div className="logo-content">
        <div className="video-container">
          <video 
            ref={videoRef}
            autoPlay 
            muted 
            loop 
            playsInline
            className="round-video"
            onLoadedData={handleVideoLoad}
            onError={handleVideoError}
            preload="auto"
          >
            <source src="/video.mp4" type="video/mp4" />
            <source src="/video.webm" type="video/webm" />
            <img 
              src="https://ai-images.s3.eu-central-1.wasabisys.com/29707693/1013247/e4b06c54-a275-495c-9bbb-df8b0158b-03.png" 
              alt="CampusBites Logo"
              onLoad={handleVideoLoad}
            />
          </video>
        </div>
        
        <h1 className={`logo-title ${showTitle ? 'animate-slide-up' : ''}`}>
          Campus<span className="logo-highlight">Bites</span>
        </h1>
        
        <p className={`logo-subtitle ${showSubtitle ? 'animate-fade-in' : ''}`}>
          Smart Canteen Management System
        </p>
        
        <div className="loading-bar">
          <div className="loading-progress"></div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedLogo;
import React, { useEffect } from 'react';

// AdBanner Component
const AdBanner = () => {
  useEffect(() => {
    // Push the ad request to the adsbygoogle object
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <div className="ad-banner">
      {/* Replace with your own ad client and slot ID */}
      <ins className="adsbygoogle"
           style={{ display: 'block' }}
           data-ad-client="ca-pub-9535210677457335"  // Replace with your AdSense client ID
           data-ad-slot="XXXXXXX"                    // Replace with your ad slot ID
           data-ad-format="auto"></ins>
    </div>
  );
};

export default AdBanner;

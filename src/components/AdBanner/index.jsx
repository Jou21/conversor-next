import React, { useEffect } from "react";

const AdBanner = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{
        display: "inline-block",
        width: "728px",
        height: "90px",
      }}
      data-ad-client="ca-pub-5863357144334897"
      data-ad-slot="6089043547"
    />
  );
};

export default AdBanner;

import React from "react";

interface ProviderLogoProps {
  movieId: number;
  mediaType: "movie" | "tv";
  logos: string[];
}

const ProviderLogo: React.FC<ProviderLogoProps> = ({ logos = [] }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "5px",
        right: "5px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {logos &&
        logos.map((logo, index) => (
          <img
            key={index}
            src={logo}
            alt="provider logo"
            style={{
              width: "50px",
              height: "50px",
              margin: "5px",
              borderRadius: "8px",
            }}
          />
        ))}
    </div>
  );
};

export default ProviderLogo;

// FIXA SÅ LOGON ÄR OLIKA STYLES BEROENDE PÅ CAROUSEL/INFOMODAL

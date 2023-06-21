import React from "react";

interface ProviderLogoProps {
  movieId: number;
  mediaType: "movie" | "tv";
  logos: string[];
  isModal?: boolean;
}

const ProviderLogo: React.FC<ProviderLogoProps> = ({
  logos = [],
  isModal = false,
}) => {
  const logoStyle = isModal
    ? {
        width: "60px",
        height: "60px",
        margin: "10px",
        borderRadius: "16px",
        border: "2px solid #e1cc92",
      }
    : {
        width: "40px",
        height: "40px",
        margin: "5px",
        borderRadius: "8px",
      };

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
          <img key={index} src={logo} alt="provider logo" style={logoStyle} />
        ))}
    </div>
  );
};

export default ProviderLogo;

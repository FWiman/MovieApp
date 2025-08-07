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
        width: "auto",
        height: "auto",
        margin: "10px",
        borderRadius: "16px",
        border: "2px solid rgb(137, 0, 0)",
      }
    : {
        width: "auto",
        height: "auto",
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

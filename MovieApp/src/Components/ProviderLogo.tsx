import React from "react";

interface ProviderLogoProps {
  movieId: number;
  mediaType: "movie" | "tv";
  logos: string[];
}

const ProviderLogo: React.FC<ProviderLogoProps> = ({
  movieId,
  mediaType,
  logos = [],
}) => {
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
              width: "40px",
              height: "40px",
              margin: "5px",
              borderRadius: "8px",
            }}
          />
        ))}
    </div>
  );
};

export default ProviderLogo;

// const [providerLogos, setProviderLogos] = useState<any[]>([]);

// useEffect(() => {
//   const fetchProviderLogos = async () => {
//     const logos = await getProviderLogoURLs(movieId, mediaType);
//     setProviderLogos(logos);
//   };

//   fetchProviderLogos();
// }, [movieId, mediaType]);

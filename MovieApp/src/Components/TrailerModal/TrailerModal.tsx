import React, { useState, useEffect } from "react";
import styles from "./TrailerModal.module.css";
import { getTrailer } from "../../Server/api";

interface TrailerModalProps {
  movieId: number;
  contentType: "movie" | "tv";
  onClose: () => void;
}

const TrailerModal: React.FC<TrailerModalProps> = ({
  movieId,
  contentType,
  onClose,
}) => {
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrailer = async () => {
      const trailerURL = await getTrailer(movieId, contentType);
      setTrailerUrl(trailerURL);
    };

    fetchTrailer();
  }, [movieId, contentType]);

  if (!trailerUrl) {
    return null; // Or some loading spinner
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <div className={styles.videoWrapper}>
          <iframe
            src={trailerUrl}
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="Trailer"
            className={styles.trailerVideo}
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default TrailerModal;

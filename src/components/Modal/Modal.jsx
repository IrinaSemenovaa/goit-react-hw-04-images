/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { LoaderImg } from 'components/Loader/Loader';
import {
  ModalBackdropStyles,
  ModalContentStyles,
  ModalImageStyles,
} from './ModalStyles';

export default function Modal({ onClose, largeImageURL, imageRef }) {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [useLoader, setUseLoader] = useState(true);

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const handleImageError = () => {
    setUseLoader(false);
  };

  useEffect(() => {
    const loadImage = () => {
      const image = new Image();
      image.onload = handleImageLoad;
      image.onerror = handleImageError;
      image.src = largeImageURL;
    };

    loadImage();
  }, [largeImageURL]);

  return ReactDOM.createPortal(
    <div className={ModalBackdropStyles} onClick={handleBackdropClick}>
      <div className={ModalContentStyles}>
        {useLoader && isImageLoading && <LoaderImg />}
        {!isImageLoading && (
          <img
            ref={imageRef}
            src={largeImageURL}
            alt="img"
            className={ModalImageStyles}
          />
        )}
      </div>
    </div>,
    document.getElementById('root')
  );
}

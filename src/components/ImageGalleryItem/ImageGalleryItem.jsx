import { useState } from 'react';
import Modal from 'components/Modal/Modal';
import { itemStyles, imageStyles } from './ImageGalleryItemStyles';

export default function ImageGalleryItem({
  largeImageURL,
  webformatURL,
  tags,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = e => {
    e.preventDefault();
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <li className={itemStyles}>
      <a href={largeImageURL} onClick={openModal}>
        <img className={imageStyles} src={webformatURL} alt={tags} />
      </a>
      {isOpen && (
        <Modal largeImageURL={largeImageURL} tags={tags} onClose={closeModal} />
      )}
    </li>
  );
}

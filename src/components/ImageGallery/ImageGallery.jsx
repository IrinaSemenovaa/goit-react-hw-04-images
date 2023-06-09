import React from 'react';
import NotFoundMessage from './NotFoundMessage';
import LoadMoreBtn from 'components/Button/Button';
import { GeneralLoader } from 'components/Loader/Loader';
import { containerStyles, galleryStyles } from './ImageGalleryStyles';

export default function ImageGallery({
  hits,
  error,
  status,
  totalHits,
  perPage,
  handleLoadMore,
  searchQuery,
  page
}) {
   
  return (
    <div className={containerStyles}>
      <ul className={galleryStyles}>{hits}</ul>
      {status === 'pending' && <GeneralLoader />}
      {status === 'rejected' && <NotFoundMessage message={error} />}
      {status === 'resolved' && hits.length < totalHits && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
    </div>
  );
}

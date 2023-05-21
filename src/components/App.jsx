import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';

export default function App() {
  const [hits, setHits] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);
  const [perPage] = useState(12);
  const [totalHits, setTotalHits] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchImages = useCallback(() => {
    setStatus('pending');
    setError(null);

    axios
      .get(
        `https://pixabay.com/api/?key=34888722-f58ec8283d88d561d63a22054&q=${searchQuery}&page=${page}&per_page=${perPage}`
      )
      .then(response => {
        if (response.data.hits.length > 0) {
          setHits(prevHits => [...prevHits, ...response.data.hits]);
          setStatus('resolved');
          setError(null);
          setTotalHits(response.data.totalHits);
        } else {
          setStatus('rejected');
          setError('No results found. Try again');
        }
      })
      .catch(error => {
        console.log(error);
        if (error.response && error.response.status === 404) {
          setStatus('rejected');
          setError('No results found. Try again');
        } else {
          setStatus('rejected');
          setError('Error loading images');
        }
      });
  }, [searchQuery, page, perPage]);

  useEffect(() => {
    if (searchQuery && page === 1) {
      setStatus('idle');
      setHits([]);
      setTotalHits(0);
      fetchImages();
    }
  }, [fetchImages, page, searchQuery]);

  useEffect(() => {
    if (searchQuery) {
      clearGallery();
      setTotalHits(0);
      setStatus('idle');
    }
  }, [searchQuery]);

  useEffect(() => {
    if (page > 1) {
      fetchImages();
    }
  }, [fetchImages, page]);

  const handleFormSubmit = searchQuery => {
    setPage(1);
    setSearchQuery(searchQuery);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const clearGallery = () => {
    setHits([]);
  };

  return (
    <div>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery
        hits={hits.map(hit => (
          <ImageGalleryItem
            key={hit.id}
            webformatURL={hit.webformatURL}
            largeImageURL={hit.largeImageURL}
            tags={hit.tags}
          />
        ))}
        error={error}
        status={status}
        totalHits={totalHits}
        perPage={perPage}
        handleLoadMore={handleLoadMore}
        searchQuery={searchQuery}
      />
      <ToastContainer />
    </div>
  );
}

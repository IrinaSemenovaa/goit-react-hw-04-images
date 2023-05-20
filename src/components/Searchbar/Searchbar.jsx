import { useState} from 'react';
import { RiSearchLine } from 'react-icons/ri';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  headerStyles,
  combinedViewStyles,
  buttonStyles,
  inputStyles,
  iconStyles,
  focusedIconStyles,
} from './SearchbarStyles';

export default function Searchbar({ onSubmit = () => {} }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      return toast.info('Please enter a search query', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        hideProgressBar: true,
      });
    }

    onSubmit(searchQuery);
  };

  const handleHitsChange = e => {
    setSearchQuery(e.currentTarget.value.toLowerCase());
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };

  return (
    <header className={headerStyles}>
      <form onSubmit={handleSubmit} className="form">
        <div className={combinedViewStyles}>
          <button type="submit" className={buttonStyles}>
            <RiSearchLine
              className={`${iconStyles} ${isFocused ? focusedIconStyles : ''}`}
              width="2em"
            />
          </button>
          <input
            className={inputStyles}
            type="text"
            autoComplete="off"
            placeholder="Search images and photos"
            onChange={handleHitsChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            value={searchQuery}
          />
        </div>
      </form>
    </header>
  );
}

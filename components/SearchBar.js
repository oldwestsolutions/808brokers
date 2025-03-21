import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import debounce from 'lodash/debounce';
import { TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const debouncedSearch = useCallback(
    debounce((query) => {
      if (query.trim()) {
        router.push(`/search?q=${encodeURIComponent(query)}`);
      }
    }, 500),
    []
  );

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  return (
    <div className="search-container">
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search for beats, producers, or artists..."
        value={searchQuery}
        onChange={handleSearch}
        InputProps={{
          endAdornment: (
            <IconButton>
              <SearchIcon />
            </IconButton>
          ),
        }}
      />
    </div>
  );
};

export default SearchBar; 
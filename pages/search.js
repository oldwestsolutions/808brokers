import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Grid, Typography, CircularProgress } from '@mui/material';
import SearchBar from '../components/SearchBar';

export default function SearchResults() {
  const router = useRouter();
  const { q } = router.query;
  const [results, setResults] = useState({
    beats: [],
    producers: [],
    artists: [],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchSearchResults() {
      if (!q) return;
      
      setLoading(true);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchSearchResults();
  }, [q]);

  return (
    <Container maxWidth="lg">
      <SearchBar />
      
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4">
              Search Results for "{q}"
            </Typography>
          </Grid>
          
          {/* Beats Results */}
          <Grid item xs={12}>
            <Typography variant="h5">Beats</Typography>
            {results.beats.map((beat) => (
              <div key={beat.id}>
                {/* Beat card component here */}
              </div>
            ))}
          </Grid>

          {/* Producers Results */}
          <Grid item xs={12}>
            <Typography variant="h5">Producers</Typography>
            {results.producers.map((producer) => (
              <div key={producer.id}>
                {/* Producer card component here */}
              </div>
            ))}
          </Grid>

          {/* Artists Results */}
          <Grid item xs={12}>
            <Typography variant="h5">Artists</Typography>
            {results.artists.map((artist) => (
              <div key={artist.id}>
                {/* Artist card component here */}
              </div>
            ))}
          </Grid>
        </Grid>
      )}
    </Container>
  );
} 
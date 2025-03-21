-- Create indices for full-text search
CREATE INDEX beats_search_idx ON beats USING gin(to_tsvector('english', title || ' ' || description));
CREATE INDEX producers_search_idx ON producers USING gin(to_tsvector('english', name || ' ' || bio));
CREATE INDEX artists_search_idx ON artists USING gin(to_tsvector('english', name || ' ' || bio)); 
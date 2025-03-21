import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ message: 'Search query is required' });
  }

  try {
    // Using PostgreSQL full-text search
    const searchQuery = `
      WITH search_results AS (
        (SELECT 'beat' as type, id, title as name, description
         FROM beats
         WHERE to_tsvector('english', title || ' ' || description) @@ plainto_tsquery('english', $1)
         LIMIT 10)
        UNION ALL
        (SELECT 'producer' as type, id, name, bio as description
         FROM producers
         WHERE to_tsvector('english', name || ' ' || bio) @@ plainto_tsquery('english', $1)
         LIMIT 10)
        UNION ALL
        (SELECT 'artist' as type, id, name, bio as description
         FROM artists
         WHERE to_tsvector('english', name || ' ' || bio) @@ plainto_tsquery('english', $1)
         LIMIT 10)
      )
      SELECT * FROM search_results;
    `;

    const { rows } = await pool.query(searchQuery, [q]);

    // Group results by type
    const results = {
      beats: rows.filter(row => row.type === 'beat'),
      producers: rows.filter(row => row.type === 'producer'),
      artists: rows.filter(row => row.type === 'artist')
    };

    res.status(200).json(results);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
} 
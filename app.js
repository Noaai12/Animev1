const express = require('express');
const app = express();
const port = 3000;

// Middleware untuk parsing request body
app.use(express.json());

// Route untuk halaman utama
app.get('/', (req, res) => {
  res.send('Selamat datang di AnimeKei!');
});

// Route untuk mengambil daftar anime
app.get('/api/anime', (req, res) => {
  // Kode untuk mengambil daftar anime dari database
  const animeList = [
    { id: 1, title: 'Naruto', genre: 'Action, Adventure' },
    { id: 2, title: 'One Piece', genre: 'Action, Adventure' },
    { id: 3, title: 'Attack on Titan', genre: 'Action, Horror' },
  ];
  res.json(animeList);
});

// Route untuk mengambil detail anime
app.get('/api/anime/:id', (req, res) => {
  // Kode untuk mengambil detail anime dari database
  const id = req.params.id;
  const anime = { id: 1, title: 'Naruto', genre: 'Action, Adventure' };
  res.json(anime);
});

// Server listen pada port 3000
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

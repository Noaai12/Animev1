const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Koneksi ke database MongoDB
mongoose.connect('mongodb://localhost/animev1', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware untuk parsing request body
app.use(express.json());

// Definisi model anime
const Anime = mongoose.model('Anime', {
  title: String,
  genre: String,
  synopsis: String,
  video_url: String
});

// Route untuk mengambil daftar anime
app.get('/api/anime', async (req, res) => {
  try {
    const anime = await Anime.find();
    res.json(anime);
  } catch (err) {
    res.status(500).json({ message: 'Error mengambil daftar anime' });
  }
});

// Route untuk mengambil detail anime
app.get('/api/anime/:id', async (req, res) => {
  try {
    const anime = await Anime.findById(req.params.id);
    if (!anime) {
      res.status(404).json({ message: 'Anime tidak ditemukan' });
    } else {
      res.json(anime);
    }
  } catch (err) {
    res.status(500).json({ message: 'Error mengambil detail anime' });
  }
});

// Route untuk menambahkan anime baru
app.post('/api/anime', async (req, res) => {
  try {
    const anime = new Anime(req.body);
    await anime.save();
    res.json(anime);
  } catch (err) {
    res.status(500).json({ message: 'Error menambahkan anime baru' });
  }
});

// Route untuk mengupdate anime
app.put('/api/anime/:id', async (req, res) => {
  try {
    const anime = await Anime.findById(req.params.id);
    if (!anime) {
      res.status(404).json({ message: 'Anime tidak ditemukan' });
    } else {
      anime.title = req.body.title;
      anime.genre = req.body.genre;
      anime.synopsis = req.body.synopsis;
      anime.video_url = req.body.video_url;
      await anime.save();
      res.json(anime);
    }
  } catch (err) {
    res.status(500).json({ message: 'Error mengupdate anime' });
  }
});

// Route untuk menghapus anime
app.delete('/api/anime/:id', async (req, res) => {
  try {
    const anime = await Anime.findByIdAndRemove(req.params.id);
    if (!anime) {
      res.status(404).json({ message: 'Anime tidak ditemukan' });
    } else {
      res.json({ message: 'Anime berhasil dihapus' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error menghapus anime' });
  }
});

// Server listen pada port 3000
app.listen(3000, () => {
  console.log('Server running on port 3000');
});

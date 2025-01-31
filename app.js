const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Masukkan ID anime yang Anda inginkan');
});

app.post('/anime', (req, res) => {
  const idAnime = req.body.idAnime;
  const urlApi = `https://api.jikan.moe/v3/anime/${idAnime}`;

  axios.get(urlApi)
    .then(response => {
      const dataAnime = response.data;
      res.json(dataAnime);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: 'Error mengambil data anime' });
    });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

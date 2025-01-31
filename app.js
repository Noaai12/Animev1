const axios = require('axios');

const urlApi = 'https://api.jikan.moe/v3/anime/';

const getAnime = async (idAnime) => {
  try {
    const response = await axios.get(`${urlApi}${idAnime}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default async function handler(req, res) {
  const idAnime = req.query.idAnime;
  const dataAnime = await getAnime(idAnime);
  if (dataAnime) {
    res.json(dataAnime);
  } else {
    res.status(404).json({ message: 'Anime tidak ditemukan' });
  }
}

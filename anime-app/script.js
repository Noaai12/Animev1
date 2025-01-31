const animeContainer = document.getElementById('anime-container');
const videoPlayer = document.getElementById('video-player');
const videoSource = document.getElementById('video-source');

// Fungsi untuk menampilkan video anime
function playAnime(anime) {
  const videoUrl = anime.video_url;
  videoSource.src = videoUrl;
  videoPlayer.style.display = 'block';
}

// Fungsi untuk mengambil data anime
function fetchAnime() {
  fetch('/api/anime')
    .then(response => response.json())
    .then(data => {
      const animeList = data;
      renderAnimeList(animeList);
    });
}

// Fungsi untuk menampilkan daftar anime
function renderAnimeList(animeList) {
  animeContainer.innerHTML = '';
  animeList.forEach(anime => {
    const animeHTML = `
      <div class="anime-card">
        <img src="${anime.image_url}" alt="${anime.title}">
        <h2>${anime.title}</h2>
        <p>Genre: ${anime.genre}</p>
        <p>Synopsis: ${anime.synopsis}</p>
        <button onclick="playAnime(${JSON.stringify(anime)})">Play</button>
      </div>
    `;
    animeContainer.innerHTML += animeHTML;
  });
}

// Panggilan awal untuk mengambil data anime
fetchAnime();

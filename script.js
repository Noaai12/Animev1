const animeContainer = document.getElementById('anime-container');
const paginationContainer = document.getElementById('pagination-container');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const currentPage = document.getElementById('current-page');

let currentPageNumber = 1;
let totalPages = 1;
let animeList = [];

const apiEndpoint = 'https://api.jikan.moe/v3/anime';
const limit = 5;

function fetchAnime(page) {
  fetch(`${apiEndpoint}?page=${page}&limit=${limit}`)
    .then(response => response.json())
    .then(data => {
      animeList = data.anime;
      totalPages = data.total_pages;
      renderAnimeList();
      renderPagination();
    });
}

function renderAnimeList() {
  animeContainer.innerHTML = '';
  animeList.forEach(anime => {
    const animeHTML = `
      <div class="anime-card">
        <img src="${anime.image_url}" alt="${anime.title}">
        <h2>${anime.title}</h2>
        <p>Genre: ${anime.genres.map(genre => genre.name).join(', ')}</p>
        <p>Rating: ${anime.rating}</p>
      </div>
    `;
    animeContainer.innerHTML += animeHTML;
  });
}

function renderPagination() {
  paginationContainer.innerHTML = '';
  if (currentPageNumber > 1) {
    prevButton.disabled = false;
  } else {
    prevButton.disabled = true;
  }
  if (currentPageNumber < totalPages) {
    nextButton.disabled = false;
  } else {
    nextButton.disabled = true;
  }
  currentPage.textContent = `Halaman ${currentPageNumber} dari ${totalPages}`;
}

prevButton.addEventListener('click', () => {
  currentPageNumber--;
  fetchAnime(currentPageNumber);
});

nextButton.addEventListener('click', () => {
  currentPageNumber++;
  fetchAnime(currentPageNumb er);
});

fetchAnime(currentPageNumber);

const api_key = '153fa04080ac4d0368433c6c938c01fd';
const popupSection = document.querySelector('.popup-section');
const popupSectionContainer = document.querySelector('.popup-section-container');
const popupContentContainer = document.querySelector('.popup-content-container');
const popupTrailer = document.querySelector('.popup-trailer');
import { closeModal } from './modal';
import { openModal } from './modal';

function modal() {
  let isModalOpen = false;
  if (isModalOpen && !popupSection.contains(e.target)) {
    closeModal();
  }
  if (isModalOpen) {
    closeModal();
  }
  if (isModalOpen && e.key === 'Escape') {
    closeModal();
  }
  if (!popupSectionContainer.classList.contains('hidden')) {
    openModal();
  }
}
export function moreDetails(popupId) {
  const filmPoster = document.querySelector('.afis-img');
  const filmTitle = document.querySelector('.film-title');
  const averageRating = document.querySelector('.average-rating');
  const voteCount = document.querySelector('.vote-count');
  const genre = document.querySelector('.genre');
  const popularity = document.querySelector('.popularity');
  const overview = document.querySelector('.film-about-desc');
  const findMovie = async () => {
    try {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${popupId}?api_key=${api_key}&language=en-US`);
      const data = await res.json();
      details(data);
    } catch (error) {
      console.error('Error fetching details:', error);
    }
  };
  findMovie();

  function details(data) {
    popupTrailer.style.display = 'none';
    popupContentContainer.style.display = 'flex';
    filmPoster.src = `https://image.tmdb.org/t/p/original/${data.poster_path}`;
    filmPoster.alt = data.title
    filmTitle.textContent = data.title;
    averageRating.textContent = data.vote_average.toFixed(1);
    voteCount.textContent = data.vote_count;
    popularity.textContent = data.popularity.toFixed(1);
    genre.textContent = data.genres.map(genre => genre.name).join(',');
    overview.textContent = data.overview;
    modal();
  }
}

export async function watchTrailers(popupId) {
popupContentContainer.style.display = 'none';
    popupTrailer.style.display = 'flex';
  
  try {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${popupId}/videos?api_key=${api_key}&language=en-US`);
    const data = await res.json();
    popupTrailer.innerHTML += `<iframe id="trailer-iframe" src="https://www.youtube.com/embed/${data.results.key}" allowfullscreen></iframe>`;
    modal();
  } catch (error) {
    console.error(error);
  }
}

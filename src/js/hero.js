import { moreDetails, watchTrailers } from './mydetailsfunction.js';
import { calcVote } from './calcVote.js';
export function hero() {
  const api_key = '153fa04080ac4d0368433c6c938c01fd';
  const popupTrailer = document.querySelector('.popup-trailer');
  const imageContainer = document.getElementById('movies-image-container');
  const descriptionContainer = document.getElementById('movies-description-container');
  const popupContainer = document.querySelector('.popup-section-container');
  const body = document.querySelector('body');
  const listHerow = document.querySelector('.catalog-library-css');
   let genreMap = {};
   async function getGenres() {
    const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=en-US`;

    try {
      const response = await fetch(genreUrl);
      const data = await response.json();
      genreMap = data.genres.reduce((map, genre) => {
        map[genre.id] = genre.name;
        return map;
      });
    } catch (error) {
      console.error(error);
    }
  }
  const getMovie = async () => {
    try {
      const res = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${api_key}&language=en-US` );
      const data = await res.json();
      const movies = data.results;
      const random =movies[Math.floor(Math.random() * movies.length)];
      setMovie(random);
    } catch (error) {
      console.error(error);
    }
  };
  const setMovie = async movie => {
    try {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/images?&api_key=${api_key}&language=en&language=null`);
      const imageData = await res.json();
      const movieImage = imageData.backdrops[Math.floor(Math.random() * imageData.backdrops.length)];
      const imagePath = movieImage.file_path;
      let imageUrl = `https://image.tmdb.org/t/p/original${imagePath}`;
      imageContainer.innerHTML = `<img class="image" src="${imageUrl}" alt="${movie.title}" /> <div class="gradient"></div>`;
      descriptionContainer.innerHTML = `
        <h1 class="hero-movie-title">${movie.title}</h1>
        <div class="stars-container" id="starsContainer"></div>
        <div class="desc-button-container">
          <p class="hero-movie-desc">${movie.overview.split(' ').slice(0, 40).join(' ')}...</p>
          <div class="hero-movie-buttons">
            <button id="trailer" class="orange-button btn-hero trailer">Watch trailer</button>
            <button id="details" class="white-button btn-hero details">More details</button>
          </div>
        </div>
      `;
     const like = document.getElementById('starsContainer');
      like.innerHTML = calcVote(movie.vote_average);
      const trailerButton = document.getElementById('trailer');
      const detailsButton = document.getElementById('details');
      detailsButton.addEventListener('click', () => {
        popupContainer.classList.remove('hidden');
        body.style.overflow = 'hidden';
        const movieID = movie.id;
        moreDetails(movieID);
      });

        trailerButton.addEventListener('click', async () => {
        popupContainer.classList.remove('hidden');
        body.style.overflow = 'hidden';
        popupTrailer.innerHTML = '';
        watchTrailers(movie.id);
      });
    } catch (error) {
      console.error( error);
    }
  };
  
  const getMovies = async () => {
      const res = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${api_key}&language=en-US`);
        const data = await res.json();
        const movies = data.results;
     let count = 1;
    let movieHtml = "";
  
    movies.forEach(async movie => {
      if (count <= 3) {
            const genreNames = movie.genre_ids
        .map(id => genreMap[id])
        .filter(Boolean);
        count++;
        movieHtml += `
            <div class="catalog-movie-card" data-movie-id="1035048"><img
                src="https://image.tmdb.org/t/p/w1280/${movie.poster_path}" alt="${movie.title}"
                class="catalog-movie-poster">
            <div class="catalog-movie-info">
                <h2 class="catalog-movie-title">${movie.title}</h2>
                <div class="catalog-movie-details-rating">
                    <p class="catalog-movie-details">"${genreNames} | ${movie.release_date.slice(0, 4)}</p>                   
                </div>
            </div>
        </div>
      `;
       
      }

    });
    if (window.location.pathname.includes('index.html'||"/")) {
      listHerow.innerHTML = movieHtml;
    }
}
  getMovie();
  getMovies();
  getGenres();
}

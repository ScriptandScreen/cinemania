export function upcoming() {
  const apiKey = '153fa04080ac4d0368433c6c938c01fd'; 
  const upcomingURL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US`;
  const genreURL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;
  const moviePoster = document.getElementById('movie-poster');
  const movieTitle = document.getElementById('movie-title');
  const releaseDate = document.getElementById('release-date');
  const movieVote = document.getElementById('vote-average');
  const voteCount = document.getElementById('vote-count');
  const popularity = document.getElementById('popularity');
  const genres = document.getElementById('genres');
  const overview = document.getElementById('overview');
  let genreMap = {}; 
  fetch(genreURL)
    .then(response => response.json())
    .then(data => {
      data.genres.forEach(genre => {
        genreMap[genre.id] = genre.name; 
      });
      fetch(upcomingURL)
        .then(response => response.json())
        .then(data => {
          const films = data.results;
          if (films.length > 0) {
            const randomFilm = films[Math.floor(Math.random() * films.length)];
            showUpcoming(randomFilm);
          } 
        });
    });

  function showUpcoming(film) {
    moviePoster.src = `https://image.tmdb.org/t/p/original/${film.backdrop_path}`;
    moviePoster.alt = film.title;
    movieTitle.textContent = film.title.toUpperCase();
    releaseDate.textContent = film.release_date;
    movieVote.textContent = film.vote_average;
    voteCount.textContent = film.vote_count;
    popularity.textContent = film.popularity.toFixed(1);
    genres.textContent = film.genre_ids.map(id => genreMap[id]).join(', ');
    overview.textContent = film.overview;
 
  }
}

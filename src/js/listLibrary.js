const api_key = '153fa04080ac4d0368433c6c938c01fd';
const libraryClass = document.getElementById('catalog-movie-gallery');
const detailsButton = document.querySelector('.catalog-movie-gallery');
let htmlLibrary = "";
  const getLibrary = async movie => {
      try {
          if (movie!=="123") {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${movie}?api_key=${api_key}&language=en-US`);
    const data = await res.json();
              htmlLibrary+=`
       <div class="catalog-movie-card" data-movie-id="845781" id="libraryCard"><img src="https://image.tmdb.org/t/p/w1280//${data.backdrop_path}" alt="Red One" class="catalog-movie-poster">
            <div class="catalog-movie-info">
                <h2 class="catalog-movie-title">${data.title}</h2>
                <div class="catalog-movie-details-rating">
                    <p class="catalog-movie-details"></p>                   
                </div>
            </div>
        </div>
      `;
             
          }
          if (htmlLibrary !== "") {
              libraryClass.innerHTML = htmlLibrary;
            libraryClass.classList.add('catalog-library-css');

          }
          else {
              
              libraryClass.innerHTML = `
            <button class="load-more-button orange-button">Load More</button>
        <div class="empty-library-container">
          <p class="empty-library-title">HOOOOOOOOOOPS..</p>
          <p class="empty-library-title">film yok</p>
          <p class="empty-library-title">Aşağıdaki butona tıkla oradan ekle</p>
        </div>
        <a href="category.html"
          ><button
            href="category.html"
            class="search-movie-button orange-button"
          >
            Search Movie
          </button></a>
      `;
              libraryClass.classList.remove('catalog-library-css');
        }
      
  
      
    } catch (error) {
     // console.error( error);
    }
};
  
let libraryStorage = JSON.parse(localStorage.getItem('libraryStorage')) || [];
let i = 0;
libraryStorage.forEach(async element => {
    getLibrary(element);
});
 
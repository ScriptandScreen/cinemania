const myToken =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3M2Q4NjAyNTBjNGE2YjI2ZTE2YTJlMDJhYjI4NzA0MiIsIm5iZiI6MTczMzMzNjAzMS45MTY5OTk4LCJzdWIiOiI2NzUwOWJkZjgwMTJmOTNkYmM2OWE5YzMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.AUwwkVDX2oTZvu3Ncc_mBYkXU3pUtDDwEGLsOk3zYy4";

const BASE_URL = "https://api.themoviedb.org/3/trending/all/day";
const GENRES_URL = "https://api.themoviedb.org/3/genre/movie/list";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${myToken}`,
  },
};

let genreMap = [];
let allResults = [];
let filteredMovies = [];
let isSearchMode = false;
let currentPage = 1;
let totalPages = 0;

const searchForm = document.querySelector(".search-form");
const searchInput = document.getElementById("search-input");
const clearBtn = document.getElementById("clear-btn");
const searchBtn = document.getElementById("search-btn");

// Year dropdown
const yearSelect = document.createElement("select");
yearSelect.id = "year-select";

const allOption = document.createElement("option");
allOption.value = "All";
allOption.textContent = "Year";
yearSelect.appendChild(allOption);

const currentYear = new Date().getFullYear();
for (let y = currentYear; y >= currentYear - 20; y--) {
  const opt = document.createElement("option");
  opt.value = y;
  opt.textContent = y;
  yearSelect.appendChild(opt);
}

// yearSelect'i searchBtn'in önüne ekle (input ile buton arasında olsun isteniyordu)
searchForm.insertBefore(yearSelect, searchBtn);

const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const movieContainer = document.querySelector(".movie-list");
const paginationContainer = document.querySelector(".pagination");

function getGenres(genreIds) {
  if (!genreMap || genreMap.length === 0) return "Unknown";
  return genreIds
    .map((id) => {
      const g = genreMap.find((x) => x.id === id);
      return g ? g.name : null;
    })
    .filter((g) => g)
    .slice(0, 2)
    .join(", ");
}

function renderMovies(movieList) {
  movieContainer.innerHTML = "";
  if (movieList.length === 0) {
    nonMatchedMovie();
    return;
  }
  movieList.forEach((movie) => {
    const genres = getGenres(movie.genre_ids || []);
    const dateStr = movie.release_date || movie.first_air_date;
    const year = dateStr ? new Date(dateStr).getFullYear() : "Unknown";

    const li = document.createElement("li");
    li.classList.add("movie-list-item");
    li.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w1280${movie.poster_path}" alt="${
      movie.title || movie.name
    }" class="movie-img">
      <div class="movie-text-content">
          <h3 class="movie-title">${movie.title || movie.name}</h3>
          <div class="movie-inf-content">
            <div class="movie-genre-content">
                <p class="movie-genre">${genres || "Unknown"}</p>
                <p class="movie-date">| ${year}</p>
            </div>
            <div class="stars-container"></div> 
          </div>
      </div>
    `;
    movieContainer.appendChild(li);
    const starsContainer = li.querySelector(".stars-container");
    renderStars(starsContainer, movie.vote_average || 0);
  });
}

// Yıldızlar için oluşturacak fonksiyon 

function renderStars(starsContainer, rating) {
  const maxStars = 5; // Maksimum yıldız sayısı
  const scaledRating = (rating / 10) * maxStars; // 10 üzerinden gelen rating'i 5 üzerinden ölçekle
  const filledStars = Math.floor(scaledRating); // Tam dolu yıldız sayısı
  const halfStar = scaledRating % 1 >= 0.5; // Yarım yıldız olup olmadığını kontrol et

  starsContainer.innerHTML = ""; // Mevcut yıldızları temizle

  for (let i = 0; i < maxStars; i++) {
    // SVG elementini oluştur
    const star = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    star.setAttribute("viewBox", "0 0 24 24");
    star.setAttribute("width", "18");
    star.setAttribute("height", "16");
    star.classList.add("star");

    // Gradient tanımları
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    const gradient = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "linearGradient"
    );
    gradient.setAttribute("id", `gradient-${i}`);
    gradient.setAttribute("x1", "0");
    gradient.setAttribute("x2", "1");
    gradient.setAttribute("y1", "0");
    gradient.setAttribute("y2", "0");

    const stop1 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "stop"
    );
    stop1.setAttribute(
      "offset",
      i < filledStars || (i === filledStars && halfStar) ? "50%" : "0%"
    );
    stop1.setAttribute("stop-color", "#f84119");

    const stop2 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "stop"
    );
    stop2.setAttribute("offset", "100%");
    stop2.setAttribute(
      "stop-color",
      i <= filledStars ? "rgba(248, 159, 25, 0.68)" : "none"
    );

    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    defs.appendChild(gradient);
    star.appendChild(defs);

    // Yıldız şekli (Path)
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
      "d",
      "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
    );

    if (i < filledStars || (i === filledStars && halfStar)) {
      // Tam veya yarım dolu yıldız
      path.setAttribute("fill", `url(#gradient-${i})`);
    } else {
      // Boş yıldız
      path.setAttribute("fill", "none");
      path.setAttribute("stroke", "rgba(248, 159, 25, 0.68)");
      path.setAttribute("stroke-width", "1.5");
    }

    star.appendChild(path);
    starsContainer.appendChild(star);
  }
}






// Search yapıldığında Movie Bulunmazsa Çalışacak JS
function nonMatchedMovie() {
  movieContainer.innerHTML = `
    <div class="empty-el">
      <div class="empty-el-content">
        <p class="ops-element">OOPS...</p>
        <p class="empty-el-text">We are very sorry!</p>
        <p class="empty-el-text">We don’t have any results matching your search.</p>
        <button class="empty-btn"><a href="./public/category.html">Search movie</a></button>
      </div>
    </div>`;
  // Pagination butonlarını gizle
  paginationContainer.style.display = "none";
}

function getCurrentDataset() {
  return isSearchMode ? filteredMovies : allResults;
}

function getTotalPages() {
  const dataset = getCurrentDataset();
  return Math.ceil(dataset.length / 20);
}

function renderPage(page) {
  const total = getTotalPages();
  if (total === 0) {
    renderMovies([]);
    renderPagination(page);
    return;
  }
  if (page < 1) page = 1;
  if (page > total) page = total;

  currentPage = page;
  const dataset = getCurrentDataset();
  const start = (currentPage - 1) * 20;
  const end = start + 20;
  const pageMovies = dataset.slice(start, end);
  renderMovies(pageMovies);
  renderPagination(currentPage);
}

function renderPagination(currentPage) {
  const total = getTotalPages();

  if (total === 0) {
    // Film yoksa pagination'ı gizle
    paginationContainer.style.display = "none";
    return;
  } else {
    paginationContainer.style.display = "flex";
  }

  prevBtn.disabled = currentPage <= 1;
  nextBtn.disabled = currentPage >= total;

  prevBtn.onclick = () => {
    if (currentPage > 1) renderPage(currentPage - 1);
  };
  nextBtn.onclick = () => {
    if (currentPage < total) renderPage(currentPage + 1);
  };

  const oldButtons = paginationContainer.querySelectorAll(".page-btn, .dots");
  oldButtons.forEach((btn) => btn.remove());

  const createPageButton = (p) => {
    const btn = document.createElement("button");
    btn.textContent = p;
    btn.classList.add("page-btn");
    if (p === currentPage) {
      btn.classList.add("active");
    }
    btn.onclick = () => renderPage(p);
    return btn;
  };

  const createDots = () => {
    const span = document.createElement("span");
    span.textContent = "...";
    span.classList.add("dots");
    return span;
  };

  const nextButton = paginationContainer.querySelector("#next-btn");

  paginationContainer.insertBefore(createPageButton(1), nextButton);

  if (currentPage > 4) {
    paginationContainer.insertBefore(createDots(), nextButton);
  }

  for (
    let p = Math.max(2, currentPage - 2);
    p <= Math.min(total - 1, currentPage + 2);
    p++
  ) {
    paginationContainer.insertBefore(createPageButton(p), nextButton);
  }

  if (currentPage < total - 3) {
    paginationContainer.insertBefore(createDots(), nextButton);
  }

  if (total > 1) {
    paginationContainer.insertBefore(createPageButton(total), nextButton);
  }
}

function applyFilters() {
  const query = searchInput.value.trim().toLowerCase();
  const selectedYear = yearSelect.value;

  let showClear = false;
  if (query.length > 0 || selectedYear !== "All") {
    showClear = true;
  }

  if (!showClear) {
    clearBtn.style.display = "none";
    isSearchMode = false;
    renderPage(1);
    return;
  } else {
    clearBtn.style.display = "block";
    isSearchMode = true;
    filteredMovies = allResults.filter((movie) => {
      const title = (movie.name || movie.title || "").toLowerCase();
      let matchesQuery = true;
      if (query.length > 0) {
        matchesQuery = title.includes(query);
      }

      let matchesYear = true;
      if (selectedYear !== "All") {
        const dateStr = movie.release_date || movie.first_air_date;
        const year = dateStr ? new Date(dateStr).getFullYear() : null;
        matchesYear = year == selectedYear;
      }

      return matchesQuery && matchesYear;
    });
    renderPage(1);
  }
}

searchInput.addEventListener("input", applyFilters);
yearSelect.addEventListener("change", applyFilters);

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  applyFilters();
});

clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  yearSelect.value = "All";
  clearBtn.style.display = "none";
  isSearchMode = false;
  renderPage(1);
});

async function fetchAllPagesAtOnce() {
  if (totalPages <= 1) return;
  const requests = [];
  for (let p = 2; p <= totalPages; p++) {
    requests.push(fetch(`${BASE_URL}?page=${p}`, options));
  }
  const responses = await Promise.all(requests);
  const dataArr = await Promise.all(responses.map((r) => r.json()));
  dataArr.forEach((d) => {
    allResults = [...allResults, ...d.results];
  });
}

function showLoading(isLoading) {
  if (isLoading) {
    movieContainer.innerHTML = `<div class="loading-content is-active">
  <div class="loader">
    <div class="spinner inner__one"></div>
    <div class="spinner inner__two"></div>
    <div class="spinner inner__three"></div>
  </div>
</div>`;
  } else {
    const loadingMsg = movieContainer.querySelector("li");
    if (loadingMsg) loadingMsg.remove();
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    showLoading(true);
    const genreRes = await fetch(GENRES_URL, options);
    const genreData = await genreRes.json();
    genreMap = genreData.genres || [];
 
    const firstRes = await fetch(`${BASE_URL}?page=1`, options);
    if (!firstRes.ok) throw new Error("1. sayfa alınamadı");
    const firstData = await firstRes.json();
    totalPages = firstData.total_pages;
    allResults = [...firstData.results];

    if (totalPages > 1) {
      await fetchAllPagesAtOnce();
    }

    showLoading(false);
    isSearchMode = false;
    renderPage(1);
  } catch (error) {
    console.error("Hata:", error);
    movieContainer.innerHTML = `
    <div class=""empty-el>
      <div class="empty-el-content">
        <p class="empty-el-text">Veriler alınırken hata oluştu.</p>
      </div>
    </div>
    `;
  }
});

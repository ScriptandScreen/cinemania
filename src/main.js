// Pagination render
function renderPagination(currentPage) {
  const paginationContainer = document.querySelector(".pagination");
  paginationContainer.innerHTML = "";

  const createButton = (text, page) => {
    const button = document.createElement("button");
    button.textContent = text;
    button.className = page === currentPage ? "active" : "";
    button.addEventListener("click", () => fetchMovies(page));
    return button;
  };

  if (currentPage > 1) {
    paginationContainer.appendChild(createButton("<", currentPage - 1));
  }

  paginationContainer.appendChild(createButton("1", 1));
  if (currentPage > 4) {
    const dots = document.createElement("span");
    dots.textContent = "...";
    paginationContainer.appendChild(dots);
  }

  for (
    let page = Math.max(2, currentPage - 1);
    page <= Math.min(totalPages - 1, currentPage + 2);
    page++
  ) {
    paginationContainer.appendChild(createButton(page, page));
  }

  if (currentPage < totalPages - 3) {
    const dots = document.createElement("span");
    dots.textContent = "...";
    paginationContainer.appendChild(dots);
  }

  paginationContainer.appendChild(createButton(totalPages, totalPages));

  if (currentPage < totalPages) {
    paginationContainer.appendChild(createButton(">", currentPage + 1));
  }
}

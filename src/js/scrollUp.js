document.addEventListener('DOMContentLoaded', () => {
  const backToTopButton = document.querySelector('#back-to-top');

  if (backToTopButton) {
    window.addEventListener('scroll', () => {
      // Scroll 10 pikselin üzerine çıktığında buton görünür
      if (window.pageYOffset > 10) {
        backToTopButton.classList.add('show');
      } else {
        backToTopButton.classList.remove('show');
      }
    });

    backToTopButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  } else {
    console.error('#back-to-top element not found');
  }
});

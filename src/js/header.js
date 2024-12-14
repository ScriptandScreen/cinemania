export function header() {
  const menuButton = document.querySelector(".menu-button");
  const overlay = document.querySelector('.responsive-overlay');
  const responsiveMenu = document.querySelector('.responsive-menu');
  const body = document.querySelector('body');
  
  let isMenuOpen = false;

  menuButton.addEventListener('click', () => {
    responsiveMenu.classList.add('active-responsive-menu');
    overlay.classList.add('active-overlay');
    body.style.overflow = 'hidden';
    isMenuOpen = true;
  });

  document.addEventListener('click', (event) => {
    if (
      isMenuOpen &&
      !responsiveMenu.contains(event.target) &&
      !menuButton.contains(event.target)
    ) {
      responsiveMenu.classList.remove('active-responsive-menu');
      overlay.classList.remove('active-overlay');
      body.style.overflow = 'auto';
      isMenuOpen = false;
    }
  });
}
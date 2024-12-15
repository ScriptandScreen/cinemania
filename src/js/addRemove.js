
let libraryStorage = JSON.parse(localStorage.getItem('libraryStorage')) || [];
const addbtnListener = document.getElementById('popup-add-btn');
const removebtnListener = document.getElementById('popup-remove-btn');

if (!libraryStorage.includes("123")) {
  libraryStorage.push("123");
  localStorage.setItem('libraryStorage', JSON.stringify(libraryStorage));
}

addbtnListener.addEventListener('click', e => {
  const filmId = e.currentTarget.id;
  removebtnListener.classList.remove('hidden')
  addbtnListener.classList.add('hidden');
  let tt = JSON.parse(localStorage.getItem('libraryStorage')) || [];
  tt.push(filmId);
  localStorage.setItem('libraryStorage', JSON.stringify(tt));
  
});

removebtnListener.addEventListener('click', e => {
  const filmId = e.currentTarget.id;
  addbtnListener.classList.remove('hidden');
  removebtnListener.classList.add('hidden');
   let tt = JSON.parse(localStorage.getItem('libraryStorage')) || [];
  tt=tt.filter(id => id !== filmId);
  localStorage.setItem('libraryStorage', JSON.stringify(tt));
  
});


const moviesContainer = document.getElementById('moviesContainer');
const searchInput = document.getElementById('searchInput');
const genreFilter = document.getElementById('genreFilter');
const genreLinks = document.querySelectorAll('.genre-list a');

function displayMovies(filteredMovies) {
  moviesContainer.innerHTML = '';
  filteredMovies.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('film-card');
    movieCard.innerHTML = `
      <img class="poster" src="${movie.poster}" alt="${movie.title}">
      <div class="film-info">
        <h2>${movie.title}</h2>
        <div class="genre">${movie.genre.charAt(0).toUpperCase() + movie.genre.slice(1)}</div>
        <p>${movie.description}</p>
        <div class="details">
          Режиссер: ${movie.director}<br>
          Актеры: ${movie.actors.map(actor => actor.name).join(', ')}<br>
          Год: ${movie.year}
        </div>
        <div class="director">
          <img src="${movie.directorPhoto}" alt="${movie.director}">
          <span>${movie.director}</span>
        </div>
        ${movie.actors.map(actor => `
          <div class="actor">
            <img src="${actor.photo}" alt="${actor.name}">
            <span>${actor.name}</span>
          </div>
        `).join('')}
      </div>
    `;
    movieCard.addEventListener('click', () => {
      window.location.href = `./film.html?id=${movie.id}`;
    });
    moviesContainer.appendChild(movieCard);
  });
}

function filterMovies() {
  const searchText = searchInput.value.toLowerCase();
  const selectedGenre = genreFilter.value;

  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchText);
    const matchesGenre = selectedGenre === 'all' || movie.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  displayMovies(filteredMovies);
}

searchInput.addEventListener('input', filterMovies);
genreFilter.addEventListener('change', filterMovies);

genreLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const genre = link.getAttribute('data-genre');
    genreFilter.value = genre;
    filterMovies();
  });
});

// Initial display
displayMovies(movies);
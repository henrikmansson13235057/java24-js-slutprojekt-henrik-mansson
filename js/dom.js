export function renderMovies(movies) {
    const content = document.getElementById('content');
    content.innerHTML = '';
    movies.forEach(movie => {
      const div = document.createElement('div');
      div.classList.add('movie-card');
      div.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}">
        <h3>${movie.title}</h3>
        <p>Releasedatum: ${movie.release_date}</p>
        <p>Snittbetyg: ${movie.vote_average}</p>
      `;
      content.appendChild(div);
    });
  }
  
  export function renderSearchResults(results) {
    const content = document.getElementById('content');
    content.innerHTML = '';
    if (results.length === 0) {
      content.innerHTML = '<p>Inga resultat hittades.</p>';
      return;
    }
  
    results.forEach(item => {
      const div = document.createElement('div');
      if (item.media_type === 'movie') {
        div.innerHTML = `
          <h3>🎬 ${item.title}</h3>
          <p>${item.release_date}</p>
          <p>${item.overview}</p>
        `;
      } else if (item.media_type === 'person') {
        div.innerHTML = `
          <h3>👤 ${item.name}</h3>
          <p>Känd för: ${item.known_for_department}</p>
        `;
      }
      content.appendChild(div);
    });
  }
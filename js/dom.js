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

      div.addEventListener("click", () => {
      showMovieDetails(movie.id);
      });
      
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
      div.classList.add('movie-card');
  
      if (item.media_type === 'movie') {
        div.innerHTML = `
          <img src="https://image.tmdb.org/t/p/w200${item.poster_path}" alt="${item.title}">
          <h3>🎬 ${item.title}</h3>
          <p>Releasedatum: ${item.release_date}</p>
          <p>${item.overview}</p>
          <p>Snittbetyg: ${item.vote_average}</p>
        `;
      } else if (item.media_type === 'person') {
        const knownFor = item.known_for
          ?.map(entry => {
            const type = entry.media_type === 'tv' ? 'TV' : 'Movie';
            return `${type}: ${entry.title || entry.name}`;
          })
          .join('<br>');
  
        div.innerHTML = `
          <img src="https://image.tmdb.org/t/p/w200${item.profile_path}" alt="${item.name}">
          <h3>👤 ${item.name}</h3>
          <p>Känd för: ${item.known_for_department}</p>
          <p>Popularitet: ${item.popularity}</p>
          <p><strong>Mest känd för:</strong><br>${knownFor}</p>
        `;
      }
  
      content.appendChild(div);
    });
  }
  
import { fetchPopularMovies, fetchTopRatedMovies, search } from "./api.js";
import { renderMovies, renderSearchResults } from "./dom.js";
import {
  sortByNameAsc,
  sortByNameDesc,
  sortByPopularityAsc,
  sortByPopularityDesc
} from "./utils.js";

// Mest populära
document.getElementById("popularBtn").addEventListener("click", async () => {
  const movies = await fetchPopularMovies();
  renderMovies(movies);
});

// Högst rankade
document.getElementById("topRatedBtn").addEventListener("click", async () => {
  const movies = await fetchTopRatedMovies();
  renderMovies(movies);
});

// Sök
document.getElementById("searchBtn").addEventListener("click", async () => {
  const query = document.getElementById("searchInput").value.trim(); // FIX: value istället för ariaValueMax
  if (!query) return;

  const results = await search(query);
  renderSearchResults(results);
});

// Enter-tangent som alternativ till sök-knappen
document.getElementById("searchInput").addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
      const query = event.target.value.trim();
      if (!query) return;
  
      const results = await search(query);
      renderSearchResults(results);
    }
  });
  
  async function showMovieDetails(movieId) {
    try {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=38cbc5326792ca217998e7dce3e4ad4a&language=sv-SE`);
      const movie = await res.json();
  
      const content = document.getElementById('content');
      content.innerHTML = `
        <div class="movie-details">
          <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" alt="${movie.title}">
          <h2>${movie.title}</h2>
          <p><strong>Releasedatum:</strong> ${movie.release_date}</p>
          <p><strong>Snittbetyg:</strong> ${movie.vote_average}</p>
          <p><strong>Beskrivning:</strong> ${movie.overview}</p>
          <button id="backBtn">⬅️ Tillbaka</button>
        </div>
      `;
  
      // Tillbaka-knapp
      document.getElementById("backBtn").addEventListener("click", async () => {
        const movies = await fetchPopularMovies(); // eller TopRated beroende på var man kom ifrån
        renderMovies(movies);
      });
  
    } catch (error) {
      content.innerHTML = `<p>Något gick fel vid hämtning av filmen...</p>`;
    }
  }
  

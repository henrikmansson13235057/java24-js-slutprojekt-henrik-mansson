import { fetchPopularMovies, fetchTopRatedMovies, search } from "./api.js";
import { renderMovies, renderSearchResults } from "./dom.js";
import {
  sortByNameAsc,
  sortByNameDesc,
  sortByPopularityAsc,
  sortByPopularityDesc
} from "./utils.js";

let currentItems = [];



document.getElementById("popularBtn").addEventListener("click", async () => {
  currentItems = await fetchPopularMovies();
  applySortAndRender();
});

document.getElementById("topRatedBtn").addEventListener("click", async () => {
  currentItems = await fetchTopRatedMovies();
  applySortAndRender();
});

document.getElementById("searchBtn").addEventListener("click", handleSearch);
document.getElementById("searchInput").addEventListener("keydown", (event) => {
  if (event.key === "Enter") handleSearch();
});

document.getElementById("sortSelect").addEventListener("change", applySortAndRender);


async function handleSearch() {
    const query = document.getElementById("searchInput").value.trim();
    const content = document.getElementById("content");
  
    if (!query) return;
  
    currentItems = await search(query);
  
    if (currentItems.length === 0) {
      content.innerHTML = `
        <div class="error-message">
          <p>❌ Inga resultat hittades för "<strong>${query}</strong>". Försök med något annat.</p>
        </div>
      `;
      return;
    }
  
    applySortAndRender();
  }
  

function applySortAndRender() {
  const sortOption = document.getElementById("sortSelect").value;
  let sorted = [...currentItems];

  switch (sortOption) {
    case "nameAsc":
      sorted = sortByNameAsc(sorted);
      break;
    case "nameDesc":
      sorted = sortByNameDesc(sorted);
      break;
    case "popularityAsc":
      sorted = sortByPopularityAsc(sorted);
      break;
    case "popularityDesc":
      sorted = sortByPopularityDesc(sorted);
      break;
  }

  if (isPersonList(sorted)) {
    renderSearchResults(sorted);
  } else {
    renderMovies(sorted);
  }
}

function isPersonList(list) {
  return list.length > 0 && !!list[0].known_for;
}

// ==========================
// Film-detaljer
// ==========================

export async function showMovieDetails(movieId) {
  const content = document.getElementById('content');
  try {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=38cbc5326792ca217998e7dce3e4ad4a&language=sv-SE`);
    const movie = await res.json();

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

    document.getElementById("backBtn").addEventListener("click", async () => {
      currentItems = await fetchPopularMovies();
      applySortAndRender();
    });

  } catch (error) {
    content.innerHTML = `<p>Något gick fel vid hämtning av filmen...</p>`;
  }
}

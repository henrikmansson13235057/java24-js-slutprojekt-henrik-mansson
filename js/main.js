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

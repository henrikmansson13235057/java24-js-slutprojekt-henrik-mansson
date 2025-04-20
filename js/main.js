import { fetchPopularMovies, fetchTopRatedMovies, search } from "./api.js";
import {renderMovies, renderSearchResults } from ".dom.js";

document.getElementById("popularBtn").addEventListener("click", async () => {
    const movies = await fetchPopularMovies();
    renderMovies(movies);

});

document.getElementById("topRatedBtn").addEventListener("click", async() => {
   const movies = await fetchTopRatedMovies();
   renderMovies(movies);

});

document.getElementById("searchBtn").addEventListener("click", async () =>{
    const query = document.getElementById("searchInput").ariaValueMax.trim();
    if (!query) return;
    const results = await search(query);
    renderSearchResults(results);
});
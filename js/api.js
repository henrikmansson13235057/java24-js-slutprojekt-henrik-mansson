const API_KEY ="38cbc5326792ca217998e7dce3e4ad4a";
const BASE_URL = 'https://api.themoviedb.org/3';

export async function fetchPopularMovies() {
    try {
      const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=sv-SE`);
      if (!res.ok) throw new Error("Nätverksfel");
      const data = await res.json();
      return data.results.slice(0, 10);
    } catch (err) {
      document.getElementById("content").innerHTML = "<p>Något gick fel. Försök igen senare.</p>";
      return [];
    }
  }
  

export async function fetchTopRatedMovies(){
    const res = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=sv-SE`);
    const data = await res.json();
    return data.results.slice(0, 10);

}

export async function search(query){
    const res = await fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&language=sv-SE&query=${query}`);
    const data = await res.json();
    return data.results;
}
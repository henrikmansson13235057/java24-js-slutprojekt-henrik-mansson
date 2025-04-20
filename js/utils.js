// Sortera A–Ö (stigande)
export function sortByNameAsc(list) {
    return [...list].sort((a, b) => (a.name || a.title).localeCompare(b.name || b.title));
  }
  
  // Sortera Ö–A (fallande)
  export function sortByNameDesc(list) {
    return [...list].sort((a, b) => (b.name || b.title).localeCompare(a.name || a.title));
  }
  
  // Sortera efter popularitet stigande
  export function sortByPopularityAsc(list) {
    return [...list].sort((a, b) => a.popularity - b.popularity);
  }
  
  // Sortera efter popularitet fallande
  export function sortByPopularityDesc(list) {
    return [...list].sort((a, b) => b.popularity - a.popularity);
  }
  
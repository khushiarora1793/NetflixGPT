export const formGPTQuery = (searchText) =>
  "Act as a movie recommendation system. Return 5 movie suggestions for the query: " +
  searchText +
  ". The answer should be in the form of comma separated values like the example result given ahead. Example Result: " +
  "Gadar,Sholay, Don,Golmaal,Koi Mil Gaya" +
  ". Output nothing else other than the movie names.";


let movies = {
  apikey: "api_key=1ab366b33601fc1beed053c85de39de9",
  baseURL: 'https://api.themoviedb.org/3',

  async setBanner() {
    const url = `${this.baseURL}/discover/movie?sort_by=popularity.desc&${this.apikey}`;
    const response = await fetch(url); //make request.
    const data = await response.json(); //get the data from request

    // !fetch end
    const mostPopularMovie = data.results[0];
    const headBanner = document.querySelector('.banner');
    headBanner.src = `https://image.tmdb.org/t/p/original${mostPopularMovie.backdrop_path}`;
    const bannerInfo = document.querySelector(".bannerInfo");
    const bannerTitle = document.createElement('a');
    bannerTitle.href = `/MoviePage/moviePageIndex.html?movie=${mostPopularMovie.id}`
    bannerTitle.classList.add("bannerTitle");
    bannerTitle.textContent = mostPopularMovie.original_title;

    const bannerDesc = document.createElement("p");
    bannerDesc.classList.add("bannerDesc");
    bannerDesc.textContent = mostPopularMovie.overview;

    bannerInfo.appendChild(bannerTitle);
    bannerInfo.appendChild(bannerDesc);

  },
}

function init() {

  mainContainer=document.querySelector('.mainContainer');

  const header = document.createElement('div');
  header.className = 'header';

  const bannerImg = document.createElement('img');
  bannerImg.src = '';
  bannerImg.alt = '';
  bannerImg.className = 'banner';

  const resultContainer = document.createElement('div');
  resultContainer.className = 'resultContainer';

  const bannerInfo = document.createElement('div');
  bannerInfo.className = 'bannerInfo';

  header.appendChild(bannerImg);
  header.appendChild(resultContainer);
  header.appendChild(bannerInfo);

  const mainContent = document.createElement('div');
  mainContent.className = 'main_Content';

  mainContainer.appendChild(header);
  mainContainer.appendChild(mainContent);

  document.body.appendChild(mainContainer);
}


function callFunctions() {
  init();
  movies.setBanner();
  handleMovieCardInteraction('.main_Content');
  createMovieList("main_Content", "Top Rated", "topRatedMovieList");
  createMovieList("main_Content", "Action", "actionMovieList");
  createMovieList("main_Content", "Thriller", "thrillerMovieList");
  createMovieList("main_Content", "Comedy", "comedyMovieList");
  loadData("topRatedMovieList", "/discover/movie?sort_by=popularity.desc");
  loadData("actionMovieList", "/discover/movie?with_genres=28"); //*Action movies
  loadData("thrillerMovieList", "/discover/movie?with_genres=53&sort_by=vote_average.desc"); //*Thriller movies
  loadData("comedyMovieList", "/discover/movie?with_genres=35&sort_by=vote_average.desc"); //*Comedy movies
}

callFunctions();



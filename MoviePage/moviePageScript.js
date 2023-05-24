function getParameters() {
  const currentUrl = window.location.href;

  var parsedUrl = new URL(currentUrl);

  var movieId = parsedUrl.searchParams.get('movie');

  return movieId;
}



async function movieDataLoad(parentContainer) {

  const movieId = getParameters();

  // ! fetch data:
  const url = `${baseURL}/movie/${movieId}?${apikey}`;
  const response = await fetch(url);
  const data = await response.json();

  //! create Content
  const moviePoster = document.createElement('div');
  moviePoster.classList.add('moviePoster');

  const posterImg = document.createElement('img');
  if (data.poster_path) {
    posterImg.src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
  } else {
    // Use a default image URL or local path
    posterImg.src = "../images/imageNotFound2.png";
  }
  moviePoster.append(posterImg);

  const movieInfo = document.createElement('div');
  movieInfo.classList.add('movieInfo');

  const movieTitle = document.createElement('h3');
  movieTitle.classList.add('currentMovieTitle');
  movieTitle.textContent = data.original_title;

  const movieDescription = document.createElement('p');
  movieDescription.classList.add('currentMovieDescription');
  movieDescription.textContent = data.overview;

  const rate = document.createElement('h3');
  rate.classList.add("rate", "currentMovieRate");
  rate.textContent = `Rate: ${data.vote_average}`;

  movieInfo.append(movieTitle);
  movieInfo.append(rate);
  movieInfo.append(movieDescription);

  const moviePageContent = document.querySelector(`.${parentContainer}`);
  moviePageContent.append(moviePoster);
  moviePageContent.append(movieInfo);

  const categoryId = data.genres[0].id;
  const categoryName = data.genres[0].name;
  console.log("catID:", categoryId);
  createMovieList("moviePageContent", categoryName, "topRatedMovieList");
  loadData("topRatedMovieList", `/discover/movie?&with_genres=${categoryId}`);
}



function callFunctions() {

  movieDataLoad("moviePageContent");
  handleMovieCardInteraction('.moviePageContent');
}

callFunctions();
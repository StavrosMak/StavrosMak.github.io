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

  const movieInfoHeader = document.createElement('p');
  movieInfoHeader.classList.add('currentMovieInfoHeader');
  movieInfoHeader.textContent = `More about this movie:`;

  // Create the element for movie duration
  const movieDuration = document.createElement('p');
  movieDuration.classList.add('currentMovieDuration');
  movieDuration.innerHTML = `Duration: <span class="infoData">${data.runtime} minutes</span> `;

  // Create the element for movie genres
  const movieGenre = document.createElement('p');
  movieGenre.classList.add('currentMovieGenre');
  let genresString = `Genres: <span class="infoData">`;
  data.genres.forEach((genre, index) => {
    genresString += genre.name + (index !== data.genres.length - 1 ? ", " : "</span>");
  });
  movieGenre.innerHTML = genresString;

  // Create the element for movie language
  const movieLanguage = document.createElement('p');
  movieLanguage.classList.add('currentMovieLanguage');
  let languagesString = `Language: <span class="infoData">`;
  data.spoken_languages.forEach((language, index) => {
    languagesString += language.english_name + (index !== data.spoken_languages.length - 1 ? ", " : "</span>");
  });
  movieLanguage.innerHTML = languagesString;

  // Create the element for movie release date
  const movieReleaseDate = document.createElement('p');
  movieReleaseDate.classList.add('currentMovieReleaseDate');
  movieReleaseDate.innerHTML = `Released Date: <span class="infoData">${data.release_date}</span>`;

  const rate = document.createElement('h3');
  rate.classList.add("rate", "currentMovieRate");
  rate.textContent = `Rate: ${data.vote_average}`;

  movieInfo.append(movieTitle);
  movieInfo.append(rate);
  movieInfo.append(movieDescription);
  movieInfo.append(movieInfoHeader);
  movieInfo.append(movieReleaseDate);
  movieInfo.append(movieDuration);
  movieInfo.append(movieGenre);
  movieInfo.append(movieLanguage);

  const moviePageContent = document.querySelector(`.${parentContainer}`);
  moviePageContent.append(moviePoster);
  moviePageContent.append(movieInfo);

  const categoryId = data.genres[0].id;
  const categoryName = data.genres[0].name;
  createMovieList("moviePageContent", categoryName, "topRatedMovieList");
  loadData("topRatedMovieList", `/discover/movie?&with_genres=${categoryId}`);
}



function callFunctions() {

  movieDataLoad("moviePageContent");
  handleMovieCardInteraction('.moviePageContent');
}

callFunctions();

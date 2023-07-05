const apikey = "api_key=1ab366b33601fc1beed053c85de39de9";
const baseURL = 'https://api.themoviedb.org/3';




function createMovieList(parentContainer, title, movieListClass) {

  const movieContainer = document.createElement('div');
  movieContainer.classList.add('moviesContainer');

  const movieList = document.createElement('div');
  movieList.classList.add(`movieList`);
  movieList.classList.add(`${movieListClass}`);

  const buttonsContainer = document.createElement('div');
  buttonsContainer.classList.add('buttons');

  const categoryHeaderContainer = document.createElement('div');
  categoryHeaderContainer.classList.add('categoryHeader');
  const categoryHeader = document.createElement('h3');
  categoryHeader.textContent = `${title}`;

  const prvBtn = document.createElement('button');
  prvBtn.classList.add('prvBtn');
  const prvBtnImg = document.createElement('img');
  prvBtnImg.src = "../images/back-light-svgrepo-com.svg";
  prvBtnImg.loading='lazy';

  const nxtBtnImg = document.createElement('img');
  const nxtBtn = document.createElement('button');
  nxtBtn.classList.add('nxtBtn');
  nxtBtnImg.src = "../images/back-light-svgrepo-com.svg";
  nxtBtnImg.loading='lazy';

  const mainContent = document.querySelector(`.${parentContainer}`);

  buttonsContainer.append(prvBtn);
  prvBtn.append(prvBtnImg);
  buttonsContainer.append(nxtBtn);
  nxtBtn.append(nxtBtnImg);

  categoryHeaderContainer.append(categoryHeader);

  movieContainer.append(buttonsContainer);
  movieContainer.append(categoryHeaderContainer);
  movieContainer.append(movieList);

  mainContent.append(movieContainer);

  // !event listeners
  let containerWidth = movieList.getBoundingClientRect().width;
  nxtBtn.addEventListener('click', () => {
    handleNextButtonClick(movieList, containerWidth);
  });
  prvBtn.addEventListener('click', () => {
    handlePrevButtonClick(movieList, containerWidth);
  });



}

// Event listener for next button
function handleNextButtonClick(movieList, containerWidth) {
  movieList.scrollLeft += containerWidth;
}

// Event listener for previous button
function handlePrevButtonClick(movieList, containerWidth) {
  movieList.scrollLeft -= containerWidth;
}

async function loadData(parentContainer, discoverURL) {
  // !fetch start
  const url = `${baseURL}${discoverURL}&${apikey}`;
  const response = await fetch(url);
  const data = await response.json();
  // !fetch end

  const movieList = document.querySelector(`.${parentContainer}`); //!parent
  if (data.results.length > 0) {
    for (const movie in data.results) {

      const movieCard = document.createElement('div');
      movieCard.classList.add("movieCard");

      const img = document.createElement('img');
      //img.loading = "lazy"; // Set the loading attribute to "lazy" for lazy loading
      img.src = "../images/placeholder.png"; // Placeholder image source

      if (data.results[movie].poster_path) {
        img.dataset.src = `https://image.tmdb.org/t/p/w500${data.results[movie].poster_path}`;
      } else {
        // Use a default image URL or local path
        img.dataset.src = "../images/imageNotFound.png";
      }

      const movieTitle = document.createElement('a');
      movieTitle.href = `/MoviePage/moviePageIndex.html?movie=${data.results[movie].id}`;
      movieTitle.classList.add("movieTitle");
      movieTitle.textContent = data.results[movie].original_title;

      const p = document.createElement('p');
      p.classList.add("movieDesc");
      p.textContent = data.results[movie].overview;

      movieCard.appendChild(img);

      const cardTextContent = document.createElement('div');
      cardTextContent.classList.add("card-textContent");

      const rate = document.createElement('h3');
      rate.classList.add("rate");
      rate.textContent = `Rate: ${data.results[movie].vote_average}`;

      cardTextContent.appendChild(movieTitle);
      cardTextContent.append(rate);
      cardTextContent.appendChild(p);
      movieCard.appendChild(cardTextContent)
      movieList.appendChild(movieCard);
    }
  }

  // Intersection Observer to load actual images when they come into view
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target.querySelector('img');
        img.src = img.dataset.src;
        observer.unobserve(entry.target);
      }
    });
  });

  const movieCards = document.querySelectorAll('.movieCard');
  movieCards.forEach((movieCard) => {
    observer.observe(movieCard);
  });
}

function handleMovieCardInteraction(parentContainer) {
  const movieCardParent2 = document.querySelectorAll(parentContainer);
  const isTouchDevice = (window.matchMedia('(max-width: 768px)').matches);
//  const isTouchDevice = 'ontouchstart' in window || (window.matchMedia('(max-width: 768px)').matches);

  movieCardParent2.forEach(movieCardParent => {
    let isMovieCardOpen = false;
    if (isTouchDevice) {
      movieCardParent.addEventListener('touchstart', handleInteraction);
    }
    else {
      movieCardParent.addEventListener('mouseover', handleInteraction);
      movieCardParent.addEventListener('mouseout', handleInteraction);
    }

    function handleInteraction(event) {
      const movieCard = event.target.closest('.movieCard');
      const movieDesc = event.target.closest('.movieDesc');
      if (movieCard) {
        const cardTextContent = movieCard.querySelector('.card-textContent');
        if (cardTextContent) {
          if (event.type === 'mouseover' || !isMovieCardOpen) {
            cardTextContent.style.bottom = '0';
            cardTextContent.style.transition = '1s';
            isMovieCardOpen = true;
          } else if (event.type === 'mouseout' || isMovieCardOpen && !movieDesc) {
            cardTextContent.style.bottom = '';
            isMovieCardOpen = false;
          }
        }
      }
    }

  });
}



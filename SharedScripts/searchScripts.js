let search = {
  apikey: "api_key=1ab366b33601fc1beed053c85de39de9",
  baseURL: 'https://api.themoviedb.org/3',

  async searchMovie(movie) {
    const urlQuery = `${this.baseURL}/search/movie?${this.apikey}&query=${movie}`;

    const response = await fetch(urlQuery);
    const data = await response.json();

    console.log("data: ", data);

    // Clear previous search results
    const resultContainer = document.querySelector(".resultContainer");
    resultContainer.innerHTML = "";

    if (data.results.length === 0) {
      const resultItem = document.createElement("div");
      const resultMessage = document.createElement("h4");
      resultMessage.textContent = "No movies found with this name.";
      resultItem.appendChild(resultMessage);
      resultContainer.appendChild(resultItem);
    } else {
      data.results.forEach((result) => {
        console.log("found!");

        // create divs
        const resultItem = document.createElement("div");
        const resultImg = document.createElement("div");
        const resultTitle = document.createElement("div");

        // create other elements
        const img = document.createElement('img');
        const h1ResultTitle = document.createElement("h2");
        const movieTitle = document.createElement("a");

        // add classes
        resultItem.classList.add("resultItem");
        resultImg.classList.add("resultImg");
        resultTitle.classList.add("resultTitle");

        // add content
        img.src = `https://image.tmdb.org/t/p/w500${result.poster_path}`;
        h1ResultTitle.textContent = result.original_title;
        movieTitle.href = `/MoviePage/moviePageIndex.html?movie=${result.id}`;

        // append
        const resultContainer = document.querySelector(".resultContainer");
        resultImg.appendChild(img);
        resultItem.appendChild(resultImg);
        resultTitle.appendChild(h1ResultTitle);
        resultItem.appendChild(resultTitle);
        resultItem.appendChild(movieTitle);
        resultContainer.appendChild(resultItem);

        // Add click event listener 
        resultItem.addEventListener("click", () => {
          window.location.href = movieTitle.href;
        });
      });
    }
  },
};



function CreateSearchSection() {
  // Create search section elements
  const searchContainer = document.createElement("div");
  searchContainer.classList.add("search");

  const searchField = document.createElement("input");
  searchField.type = "search";
  searchField.classList.add("searchField");
  searchField.placeholder = "Search....";

  const searchBtn = document.createElement("img");
  searchBtn.classList.add("searchBtn");
  searchBtn.src = "../images/search2.svg";
  searchBtn.alt = "";

  // Append search section elements to the header
  const header = document.querySelector(".header");
  header.appendChild(searchContainer);
  searchContainer.appendChild(searchField);
  searchContainer.appendChild(searchBtn);
}

CreateSearchSection();

// !SearchBar - results
const searchMovieField = document.querySelector(".searchField");
const resultContainer = document.querySelector(".resultContainer");
const searchIcon = document.querySelector(".searchBtn");



// !Debounce
function debounce(func, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}

// !Apply debounce.
const debouncedSearch = debounce((movie) => {
  search.searchMovie(movie);
}, 500);

searchMovieField.addEventListener("keypress", (e) => {
  resultContainer.innerHTML = "";
  if (e.key === "Enter") {
    const movie = document.querySelector(".searchField").value;
    debouncedSearch(movie); // Use debounce Function
    resultContainer.style.height = "auto";
  }
});

searchIcon.addEventListener("click", () => {
  resultContainer.innerHTML = "";

  const movie = document.querySelector(".searchField").value;
  debouncedSearch(movie);
  resultContainer.style.height = "auto";
});


document.addEventListener("keydown", function (event) {
  if (event.key === 'Escape') {
    resultContainer.style.height = 0;
    resultContainer.innerHTML = "";
    searchMovieField.value = "";
  }
});





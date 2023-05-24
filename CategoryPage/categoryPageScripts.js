let currentPage = 1;

function createHeader() {
    const header = document.createElement('div');
    header.className = 'header';

    const resultContainer = document.createElement('div');
    resultContainer.className = 'resultContainer';

    header.appendChild(resultContainer);

    return header;
}


function createMainContent() {
    const mainContent = document.createElement('div');
    mainContent.className = 'mainContent';

    const categoryHeader = document.createElement('div');
    categoryHeader.className = 'categoryHeader';

    const categoryTitle = document.createElement('h2');
    categoryTitle.className = 'categoryTitle';
    categoryTitle.textContent = 'Category X:';

    categoryHeader.appendChild(categoryTitle);

    const movieList = document.createElement('div');
    movieList.className = 'movieList';

    mainContent.appendChild(categoryHeader);
    mainContent.appendChild(movieList);

    return mainContent;
}



function createPageContainer() {
    const pageContainer = document.createElement('div');
    pageContainer.className = 'pageContainer';

    const pages = document.createElement('div');
    pages.className = 'pages';

    const prvPageBtn = document.createElement('a');
    prvPageBtn.href = '#';
    prvPageBtn.className = 'prvPageBtn';
    prvPageBtn.textContent = 'Previous page';

    const currentPage = document.createElement('h5');
    currentPage.id = 'currentPage';
    currentPage.textContent = 'Page: 1';

    const nxtPageBtn = document.createElement('a');
    nxtPageBtn.href = '#';
    nxtPageBtn.className = 'nxtPageBtn';
    nxtPageBtn.textContent = 'Next Page';

    pages.appendChild(prvPageBtn);
    pages.appendChild(currentPage);
    pages.appendChild(nxtPageBtn);

    pageContainer.appendChild(pages);

    return pageContainer;
}

function init() {
 
    const mainContainer = document.querySelector('.mainContainer');

    // Create elements
    const header = createHeader();
    const mainContent = createMainContent();
    const PageContainer = createPageContainer();

    // append elements
    mainContainer.appendChild(header);
    mainContainer.appendChild(mainContent);
    document.body.appendChild(PageContainer);

  

}

async function setHeader(categoryId) {
    try {
        const url = `https://api.themoviedb.org/3/genre/movie/list?${apikey}`;
        const response = await fetch(url);
        const data = await response.json();
        const genres = data.genres;
        genres.forEach(genre => {
            if (genre.id == categoryId) {
                document.querySelector(".categoryTitle").textContent = `Category: ${genre.name}`;
            }

        });
    } catch (error) {
        console.error(error);
    }
};


// !get url parameters
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const categoryId = urlParams.get('genderID');

// !calls 
init();
loadData("movieList", `/discover/movie?with_genres=${categoryId}&page=1`);
setHeader(categoryId);
handleMovieCardInteraction('.movieList');  


// !pagination
const movieList = document.querySelector(`.movieList`); //!parent
const page = document.getElementById("currentPage");
// *previous page
const prvPageBtn = document.querySelector(".prvPageBtn");
prvPageBtn.addEventListener("click", () => {
    if (currentPage != 1) {
        currentPage--;
        movieList.innerHTML = "";
        loadData("movieList", `/discover/movie?with_genres=${categoryId}&page=${currentPage}`);
        page.textContent = `Page: ${currentPage}`;
    }
});
// *next page
const nxtPageBtn = document.querySelector(".nxtPageBtn");
nxtPageBtn.addEventListener("click", () => {
    currentPage++;
    movieList.innerHTML = "";
    loadData("movieList", `/discover/movie?with_genres=${categoryId}&page=${currentPage}`);
    page.textContent = `Page: ${currentPage}`;
});



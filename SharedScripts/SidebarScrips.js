var isSidebarMinimized = true;
var isDropdownHidden = true;


function createSidebar() {
    const sidebar = document.createElement('div');
    sidebar.classList.add('sidebar');

    const sidebarContent = document.createElement('div');
    sidebarContent.classList.add('sidebarContent');

    const homeItem = document.createElement('div');
    homeItem.classList.add('sidebarItem');

    const homeLink = document.createElement('a');
    homeLink.classList.add('sidebarIcon');
    const homeIcon = document.createElement('img');
    homeIcon.classList.add('svgIcon');
    homeIcon.src = '../images/icons8-home.svg';
    homeLink.appendChild(homeIcon);
    homeItem.appendChild(homeLink);

    const homeText = document.createElement('a');
    homeText.href = '../IndexPage/index.html';

    homeText.classList.add('textOfIcon');
    const homeTitle = document.createElement('h2');
    homeTitle.textContent = 'Home';
    homeText.appendChild(homeTitle);
    homeItem.appendChild(homeText);

    const menuItem = document.createElement('div');
    menuItem.classList.add('sidebarItem');

    const menuLink = document.createElement('a');
    menuLink.classList.add('sidebarIcon');

    const menuIcon = document.createElement('img');
    menuIcon.src = '../images/icons8-menu.svg'
    menuIcon.classList.add('svgIcon');

    menuLink.appendChild(menuIcon);
    menuItem.appendChild(menuLink);

    const dropdown = document.createElement('div');
    dropdown.classList.add('dropdown');
    dropdown.classList.add('textOfIcon');

    const dropdownTitle = document.createElement('h2');
    dropdownTitle.classList.add('categories');
    dropdownTitle.textContent = 'Categories';

    const dropdownSvg = document.createElement('img');
    dropdownSvg.classList.add=('dropdownIcon');
    dropdownSvg.src='../images/expandDown.svg';

    dropdownTitle.appendChild(dropdownSvg);
    dropdown.appendChild(dropdownTitle);

    const dropdownLinks = document.createElement('div');
    dropdownLinks.classList.add('dropdown-links');

    const categoryList = document.createElement('ul');
    categoryList.id = 'categoryList';

    dropdownLinks.appendChild(categoryList);
    dropdown.appendChild(dropdownLinks);

    menuItem.appendChild(dropdown);
    sidebarContent.appendChild(homeItem);
    sidebarContent.appendChild(menuItem);
    sidebar.appendChild(sidebarContent);

    document.body.appendChild(sidebar);
}
createSidebar();


const sidebar = document.querySelector('.sidebar');
const dropdown = document.querySelector(".dropdown");
const categoryList = document.getElementById("categoryList");
const dropdownLinks = document.querySelector(".dropdown-links");


function init() {
    sidebar.style.width='2.5em'; //always closes
    dropdownLinks.style.right = "-1000%"; //always closed.
    isDropdownHidden = true;
    isSidebarMinimized = true;
}

// Check if touch is enabled or in mobile view
const isTouchDevice = 'ontouchstart' in window || (window.matchMedia('(max-width: 768px)').matches);

// Add appropriate events based on touch support or mobile view
if (isTouchDevice) {
    sidebar.addEventListener('click', toggleSidebar);
    dropdown.addEventListener('click', toggleCategoriesDropdown);
} else {
    sidebar.addEventListener('mouseover', toggleSidebar);
    dropdown.addEventListener('mouseover', toggleCategoriesDropdown);
    sidebar.addEventListener('mouseout', toggleSidebar);
    dropdown.addEventListener('mouseout', toggleCategoriesDropdown);
}



// !toggle sidebar
function toggleSidebar() {
    if (isSidebarMinimized) {
        document.querySelector(".sidebar").style.width = "15em";
        isSidebarMinimized = false;
    } else {
        document.querySelector(".sidebar").style.width = "2.5em";
        isSidebarMinimized = true;
    }
}

// !function to display categories on dropdown menu
function toggleCategoriesDropdown(event) { //drop down menu
    isTouchDevice ? event.stopPropagation() : null;
    dropdownLinks.style.right = isDropdownHidden ? "0" : "-1000%";
    isDropdownHidden = !isDropdownHidden;
};



async function displayCategories() { //Display on sidebar

    const apikey = "api_key=1ab366b33601fc1beed053c85de39de9";
    const baseURL = 'https://api.themoviedb.org/3';
    const urlGenders = `${baseURL}/genre/movie/list?${apikey}`;
    const response = await fetch(urlGenders); 
    const data = await response.json(); 
    const categoryList = document.getElementById("categoryList");
    const genres = data.genres;
    genres.forEach(genre => {

        // get the data
        const name = genre.name;
        const id = genre.id;

        // create elements:
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = `../CategoryPage/categoryIndex.html?genderID=${id}`;
        a.textContent = name;
        li.appendChild(a);
        categoryList.appendChild(li);
    });
};


init();
displayCategories();

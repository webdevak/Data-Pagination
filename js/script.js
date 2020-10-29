/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

// When I search, the number of buttons does not update. The page buttons should represent how many results are present after the search.
// When there are 0 results, there should be a message saying that no results were found.

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/
// Global Variables 
const header = document.querySelector('.header');
const ul = document.querySelector('.student-list');
const linkList = document.querySelector('.link-list');


/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, page ) {
   let startIndex = (page * 9 ) - 9;
   let endIndex = page * 9;
   ul.innerHTML = '';

   for (let i = 0; i < list.length; i++) {  //Will loop through the array to display the nine students

   if ( i >= startIndex && i < endIndex) {  // If condition is true will create the dom elements for each card
    ul.insertAdjacentHTML("beforeend",  `
      <li class="student-item cf">
      <div class="student-details">
      <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
      <h3> ${list[i].name.first} ${list[i].name.last} </h3>
      <span class="email"> ${list[i].email}</span>
      </div>
      <div class="joined-details">
      <span class="date">${list[i].registered.date}</span>
      </div>
   </li> `)
      }
 }
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list) {
   const numOfPages = Math.ceil(list.length / 9);
   linkList.innerHTML = '';

   for (let i = 1; i <= numOfPages; i++) { //Will loop through the number of pages and create dom element buttons accordingly
      let button = `<li>
      <button type="button">${i}</button>
    </li>`;

    linkList.insertAdjacentHTML("beforeend", button);
    document.querySelector('button').className = 'active';
   }

}

// Call functions
showPage(data, 1);
addPagination(data);


// AddEventListener
linkList.addEventListener('click', (e) => {
   if (e.target.tagName === 'BUTTON') {
      document.querySelector('.active').className = "";
      e.target.className = 'active';
      const list = data;
    showPage(list, e.target.textContent);
     
   }
});


const p = document.createElement('p');
p.textContent = 'No results were found'
linkList.appendChild(p);
p.style.display = 'none'


// Creates the searh bar input DOM element to filter through students
let headerHtml= `<label for="search" class="student-search">
<input id="search" placeholder="Search by name...">
<button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
</label>`;

header.insertAdjacentHTML("beforeend",headerHtml)

const searchBar = document.getElementById("search");

searchBar.addEventListener('keyup', (e) => {
   const inputName = e.target.value.toLowerCase();
   const cards = document.querySelectorAll('.student-item');

      Array.from(cards).forEach(function(cards){
      const name = cards.textContent;
       if (name.toLowerCase().indexOf(inputName) !== -1) {
          cards.style.display = 'flex';
            p.style.display = 'none';
       }  else if (name.toLowerCase().indexOf(inputName) == -1) {
         cards.style.display = 'none';
         p.style.display = 'flex';
       } 
   })
   
});


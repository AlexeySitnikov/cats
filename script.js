const getAllCatsURL =  "http://sb-cats.herokuapp.com/api/2/alexeysitnikov/show";

const $buttonGetAllCats = document.querySelector('[data-getAllCats]');
const $divContainer = document.querySelector('[data-container]');

const getAllCats = ()=>{
  fetch(getAllCatsURL)
  .then((response)=>response.json())
  .then((json)=>{console.log(json)});
}


$buttonGetAllCats.addEventListener("click", getAllCats);




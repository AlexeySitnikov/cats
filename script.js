const getAllCatsURL =  "http://sb-cats.herokuapp.com/api/2/alexeysitnikov/show";

const $buttonGetAllCats = document.querySelector('[data-getAllCats]');
const $divContainer = document.querySelector('[data-container]');


const getAllCats = ()=>{
  fetch(getAllCatsURL)
  .then((response)=>response.json())
  .then((json)=>{
    const h1 = json.data.map((el)=>(`<p>${el.name}</p>`)).join("");
    $divContainer.insertAdjacentHTML('beforeend',h1);
  });
}


$buttonGetAllCats.addEventListener("click", getAllCats);




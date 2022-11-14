const getAllCatsURL =  "http://sb-cats.herokuapp.com/api/2/alexeysitnikov/show";

const $buttonGetAllCats = document.querySelector('[data-getAllCats]');
const $divContainer = document.querySelector('[data-container]');


const cardsHTML = (card)=>{
  return `<div class="card mx-6" style="width: 18rem;">
  <img src="${card.img_link}" class="card-img-top" alt="${card.name}">
  <div class="card-body">
    <h5 class="card-title">${card.name}</h5>
    <p class="card-text">${card.description}</p>
  </div>
  <button data-action="show" type="button" class="btn btn-primary">Primary</button>
  <button data-action="delete" type="button" class="btn btn-danger">Danger</button>
</div>`;  
}

const getAllCats = ()=>{
  fetch(getAllCatsURL)
  .then((response)=>response.json())
  .then((json)=>{
    const cardCat = json.data.map((el)=>(cardsHTML(el))).join("");
    $divContainer.insertAdjacentHTML('beforeend', cardCat);
  });
}


$buttonGetAllCats.addEventListener("click", getAllCats);

$divContainer.addEventListener("click",(e)=>{
  //if (e.target.action === "show")
  console.log( e.target.closest("[data-action]"));
})


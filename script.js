const getAllCatsURL =  "http://sb-cats.herokuapp.com/api/2/alexeysitnikov/show";
const deleteCardById = " http://sb-cats.herokuapp.com/api/2/alexeysitnikov/delete/";
const addCatURL = "http://sb-cats.herokuapp.com/api/2/alexeysitnikov/add"

const $buttonGetAllCats = document.querySelector('[data-getAllCats]');
const $divContainer = document.querySelector('[data-container]');
const $buttonAddCat = document.querySelector(`[data-open_modal]`);
const $modalWindow = document.querySelector(`[data-modal_window]`);


const cardsHTML = (card)=>{
  return `<div data-card_id=${card.id} class="card my-60" style="width: 18rem;">
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
    json.data.forEach((el) => $divContainer.insertAdjacentHTML('beforeend',cardsHTML(el)));
  });
}

async function deleteCard(id){
  const response = await fetch(`${deleteCardById}${id}`,{
    method: `DELETE`,
  });
  if (response.status != 200){throw new Error("errors")}

}

async function addCat(data){
  const response = await fetch(`${addCatURL}`,{
    method: `POST`,
    headers: {
      'Content-type': `application/json`,
    },
    body: JSON.stringify(data),
  })
}

$buttonGetAllCats.addEventListener("click", getAllCats);

$divContainer.addEventListener("click",(e)=>{
  if (e.target.dataset.action === "show"){}
  else if (e.target.dataset.action === "delete"){
    deleteCard(e.target.closest(`[data-card_id]`).dataset.card_id);
    e.target.closest(`[data-card_id]`).remove();
    // console.log(e.target.closest(`[data-card_id]`).dataset.card_id);
  }
});

document.forms.add_cat.addEventListener('submit',(e)=>{
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());
  data.id = Number(data.id);
  data.rate = Number(data.rate);
  data.favourite = data.favourite === 'on';
  addCat(data);
  $divContainer.insertAdjacentHTML('beforeend',cardsHTML(data));
  $modalWindow.classList.add('hidden');
  e.target.reset();
})

$buttonAddCat.addEventListener('click',(e)=>{
  $modalWindow.classList.remove(`hidden`);
})
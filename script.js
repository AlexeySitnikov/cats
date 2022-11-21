const getAllCatsURL =  "http://sb-cats.herokuapp.com/api/2/alexeysitnikov/show";
const deleteCardById = " http://sb-cats.herokuapp.com/api/2/alexeysitnikov/delete/";
const addCatURL = "http://sb-cats.herokuapp.com/api/2/alexeysitnikov/add";
const getOneCat = "http://sb-cats.herokuapp.com/api/2/alexeysitnikov/show/";
const changeCatURL = "http://sb-cats.herokuapp.com/api/2/alexeysitnikov/update/";

// const $buttonGetAllCats = document.querySelector('[data-getAllCats]');
const $divContainer = document.querySelector('[data-container]');
const $buttonAddCat = document.querySelector(`[data-open_modal]`);
const $modalWindow = document.querySelector(`[data-modal_window]`);


const cardsHTML = (card)=>{
  return `<div data-card_id=${card.id} class="card my-3 mx-5 px-2 py-2" style="width: 18rem;">
    <img src="${card.img_link}" class="card-img-top align-self-center" style="width: 200px" alt="${card.name}">
    <div class="card-body">
      <div class="d-flex justify-content-center">
        <h5 class="card-title">${card.name}</h5>
      </div>
      <p class="card-text" style="text-justify:inter-word;">${card.description}</p>
    </div>
    <div class="d-flex justify-content-around">
      <button data-action="show" type="button" class="btn btn-primary">Show</button>
      <button data-action="delete" type="button" class="btn btn-danger">Delete</button>
    </div>
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

async function changeCat(data){
  const response = await fetch(`${changeCatURL}${data.id}`,{
    method: `PUT`,
    headers: {
      'Content-type': `application/json`,
    },
    body: JSON.stringify(data),
  });
  console.log(data.id);
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

async function showCatCard(id){
  fetch(`${getOneCat}${id}`)
  .then((response)=>response.json())
  .then((json)=>{
    document.forms.add_cat.id.value = json.data.id;
    document.forms.add_cat.age.value = json.data.age ?? 0;
    document.forms.add_cat.name.value = json.data.name;
    document.forms.add_cat.rate.value = json.data.rate ?? 0;
    document.forms.add_cat.description.value = json.data.description;
    document.forms.add_cat.favourite.value = json.data.favourite;
    document.forms.add_cat.img_link.value = json.data.img_link;
    $modalWindow.querySelector('img').src = json.data.img_link;
  });
  $modalWindow.classList.remove('hidden');
}

$divContainer.addEventListener("click",(e)=>{
  if (e.target.dataset.action === "show"){
    showCatCard(e.target.closest(`[data-card_id]`).dataset.card_id);
    $modalWindow.querySelector(`[data-action="change"]`).classList.remove('hidden-button-change');
    $modalWindow.querySelector(`[data-action="delete"]`).classList.remove('hidden-button-delete');
    document.forms.add_cat.id.readOnly = true;
    document.forms.add_cat.name.readOnly = true;
  }
  else if (e.target.dataset.action === "delete"){
    deleteCard(e.target.closest(`[data-card_id]`).dataset.card_id);
    e.target.closest(`[data-card_id]`).remove();
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
  document.forms.add_cat.reset();
  $modalWindow.querySelector('img').src = "";
});

document.forms.add_cat.addEventListener('input', (e)=>{
  // console.log({e});
  // localStorage.setItem();
});

$buttonAddCat.addEventListener('click',(e)=>{
  $modalWindow.classList.remove(`hidden`);
  $modalWindow.querySelector(`[data-action="submit"]`).classList.remove('hidden-button-submit');
  document.forms.add_cat.id.readOnly = false;
  document.forms.add_cat.name.readOnly = false;
  // localStorage.getItem();
});

document.addEventListener('keydown',(e)=>{  
  if (e.key === `Escape`){    
    $modalWindow.classList.add(`hidden`);
    $modalWindow.querySelector(`[data-action="submit"]`).classList.add('hidden-button-submit');
    $modalWindow.querySelector(`[data-action="change"]`).classList.add('hidden-button-change');
    $modalWindow.querySelector(`[data-action="delete"]`).classList.add('hidden-button-delete');
    document.forms.add_cat.reset();
    $modalWindow.querySelector('img').src = "";
  }
});

$modalWindow.addEventListener("click",(e)=>{  
  if (e.target.dataset.action === "change"){
    const data = Object.fromEntries(new FormData(document.forms.add_cat).entries());
    data.id = Number(data.id);
    data.rate = Number(data.rate);
    data.favourite = data.favourite === 'on';
    changeCat(data);
    $modalWindow.classList.add(`hidden`);
    // console.log(document.forms.add_cat);
    // window.location.reload();
  }
  else if (e.target.dataset.action === "delete"){
    $modalWindow.classList.add(`hidden`);
    deleteCard(document.forms.add_cat.id.value);
    $divContainer.querySelector(`[data-card_id="${document.forms.add_cat.id.value}"]`).remove();
  }
});

getAllCats();

$modalWindow.querySelector(`[data-img_link]`).addEventListener('input', (e)=>{
  $modalWindow.querySelector('img').src = e.target.value;
});
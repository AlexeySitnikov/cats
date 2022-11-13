const url1 =  "http://sb-cats.herokuapp.com/api/2/alexeysitnikov/show";
// fetch(url1)
// .then((response)=>response.json())
// .then((json)=>{console.log(json)});


let response = await fetch(url1);

if (response.ok) { // если HTTP-статус в диапазоне 200-299
  // получаем тело ответа (см. про этот метод ниже)
  let json = await response.json();
} else {
  alert("Ошибка HTTP: " + response.status);
}
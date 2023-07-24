'use strict';

const htmlList = document.querySelector('.js_items');

let itemsList = [];

const funcArrow = async () => {};

async function loadData() {
  const response = await fetch('/api/items');
  const data = await response.json();
  console.log(data);
  itemsList = data;
  renderAllItems();
}

loadData();


function renderAllItems() {
  let html = '';
  for( const eachItem of itemsList ) {
    html += renderOneItem( eachItem );
  }
  htmlList.innerHTML = html;
}

function renderOneItem( itemObj ) {
  const {name, description} = itemObj;

  return `
    <li class="card">
      <h2 class="card__title">${name}</h2>
      <p class="card__description">${description || 'Sin descripción'}</p>
    </li>
  `;
}

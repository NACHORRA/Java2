//uso las func de selectors para agarrar las cosas con esas id. ahora digamos las modifico con el java. Con body hago lo mismo pero conn document
let cart=[];
const body = document.body
const _items = select('#_items')
const _toggle = select('#_toggle')


//activo, desactivo menu
import carta from './data.js'
const toggleMenu= () =>{
    _items.classList.toggle("open")
    _toggle.classList.toggle("close")
}

_toggle.addEventListener('click', toggleMenu)

const content = document.getElementById("list");
const salames = document.getElementById("salames")
const jamones = document.getElementById("jamones")
const quesos = document.getElementById("quesos")



const products =(filteredproducts) =>{
    content.innerHTML=""
    filteredproducts.forEach((producto)=>{
        const productcard=document.createElement ("div");
        productcard.className = "card-products";
        productcard.dataset.id = producto.id;
        productcard.innerHTML= `
        <img src="${producto.cardimg}" alt="${producto.name}">
        <h3>${producto.name}</h3>
        <p>Precio: $${producto.precio}</p>
        <button class="addCart">Añadir al carrito</button>
      `;
        content.append(productcard) ;
        ;
      });
};

products(carta)

const filtro = (category) => {
  const filteredproducts = carta.filter(product =>product.category ===category)
  products(filteredproducts)

};

let lastCategory = null;

const setupFilter = (button, category) => {
  button.addEventListener('click', () => {
    if (lastCategory === category) {
      products(carta);
      lastCategory = null; 
    } 
    else {
      filtro(category);
      lastCategory = category;
    }
  });
}

setupFilter(quesos, 'quesos');
setupFilter(salames, 'salames');
setupFilter(jamones, 'jamones');

const btnCart = select('#btn-cart')
const closeBtn = select('.close')
let listProduct = select('.listProduct');

const open =  () => {
  body.classList.toggle('showCart');
}
const closeCart =() => {
  body.classList.toggle('showCart');
}

btnCart.addEventListener('click', open)
closeBtn.addEventListener('click', closeCart)

content.addEventListener('click', (event) => {
  let positionClick = event.target;
  if(positionClick.classList.contains('addCart')){
      let id_product = positionClick.parentElement.dataset.id;
      console.log('Producto añadido con ID:', id_product);
      addToCart(id_product);
  }
});

const addToCart = (product_id) => {
  let position = cart.findIndex((value) => value.product_id == product_id);
  if(cart.length <= 0){
      cart = [{
          product_id: product_id,
          quantity: 1
      }];
  }else if(position < 0){
      cart.push({
          product_id: product_id,
          quantity: 1
      });
  }else{
      cart[position].quantity = cart[position].quantity + 1;
  }
  addCartToHTML();
  addCartToMemory();
}

const addCartToHTML = () => {
  listProduct.innerHTML = '';
  let totalQuantity = 0;

  if (cart.length > 0) {
    cart.forEach(item => {
      totalQuantity += item.quantity;
      let newItem = document.createElement('div');
      newItem.classList.add('card'); // Clase añadida para aplicar estilos
      newItem.dataset.id = item.product_id;
      let positionProduct = carta.findIndex(value => value.id == item.product_id);
      let info = carta[positionProduct];

      if (info) {
        newItem.innerHTML = `
          <img src="${info.cardimg}" alt="${info.name}">
          <div class="details">
            <h3>${info.name}</h3>
            <p>Precio: $${info.precio}</p>
            <button class="addCart">Añadir más</button>
          </div>
        `;
        listProduct.appendChild(newItem);
      }
    });
  }

  iconCartSpan.innerText = totalQuantity;
}
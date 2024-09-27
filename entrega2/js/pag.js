//uso las func de selectors para agarrar las cosas con esas id. ahora digamos las modifico con el java. Con body hago lo mismo pero conn document
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

const btnCart = select('#btn-cart')
const closeBtn = select('.close')

const open =  () => {
  body.classList.toggle('showCart');
}
const closeCart =() => {
  body.classList.toggle('showCart');
}


btnCart.addEventListener('click', open)
closeBtn.addEventListener('click', closeCart)




const content = document.getElementById("list");
const salames = document.getElementById("salames")
const jamones = document.getElementById("jamones")
const quesos = document.getElementById("quesos")



const products =(filteredproducts) =>{
    content.innerHTML=""
    filteredproducts.forEach((producto)=>{
        const productcard=document.createElement ("div");
        productcard.className = "card-products";
        productcard.innerHTML= `
        <img src="${producto.cardimg}" alt="${producto.name}">
        <h3>${producto.name}</h3>
        <p>Precio: $${producto.precio}</p>
        <button>Agregar al carrito</button>
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


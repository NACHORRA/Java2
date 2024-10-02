
let cart=[];
const body = document.body
const _items = select('#_items')
const _toggle = select('#_toggle')


// menu
import carta from './data.js'
const toggleMenu= () =>{
    _items.classList.toggle("open")
    _toggle.classList.toggle("close")
}

window.addEventListener('scroll', () => {
  if (_items.classList.contains('open')) {
      toggleMenu();
  }
});

_toggle.addEventListener('click', toggleMenu)

const content = document.getElementById("list");
const salames = document.getElementById("salames")
const jamones = document.getElementById("jamones")
const quesos = document.getElementById("quesos")

// productos y filtro

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
        <button class="addCart"><p>Añadir al carrito</p></button>
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

// toggle cart
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

// cart

content.addEventListener('click', (event) => {
  let positionClick = event.target;
  if(positionClick.classList.contains('addCart')){
      let id_product = positionClick.parentElement.dataset.id;
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

const addCartToMemory = () => {
  localStorage.setItem('cart', JSON.stringify(cart));
}

const loadCartFromMemory = () => {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    addCartToHTML();
  }
}

document.addEventListener('DOMContentLoaded', loadCartFromMemory);

const addCartToHTML = () => {
  listProduct.innerHTML = '';
  let totalQuantity = 0;
  let totalPrice = 0;
  if (cart.length > 0) {
    cart.forEach(item => {
      totalQuantity += item.quantity;
      let newItem = document.createElement('div');
      newItem.classList.add('card');
      newItem.dataset.id = item.product_id;
      let positionProduct = carta.findIndex(value => value.id == item.product_id);
      let info = carta[positionProduct];

      if (info) {
        totalPrice += info.precio * item.quantity;
        newItem.innerHTML = `
          <img src="${info.cardimg}" alt="${info.name}">
          <div class="details">
            <h3>${info.name}</h3>
            <p>Precio: $${info.precio * item.quantity}</p>
            <div class="quantity">
              <span class="minus"><</span>
              <span>${item.quantity}</span>
              <span class="plus">></span>
            </div>
          </div>
        `;
        listProduct.appendChild(newItem);
      }
    });
    let total = document.createElement('div');
    total.classList.add('total-price');
    total.innerHTML = `<p>Total: $${totalPrice}</p>`;
    listProduct.appendChild(total);


    document.querySelectorAll('.plus').forEach(button => {
      button.addEventListener('click', (event) => {
        let product_id = event.target.parentElement.parentElement.parentElement.dataset.id;
        changeQuantityCart(product_id, 'plus');
      });
    });

    document.querySelectorAll('.minus').forEach(button => {
      button.addEventListener('click', (event) => {
        let product_id = event.target.parentElement.parentElement.parentElement.dataset.id;
        changeQuantityCart(product_id, 'minus');
      });
    });
  }
  addCartToMemory();
}

const changeQuantityCart = (product_id, type) => {
  let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
  if (positionItemInCart >= 0) {
    let info = cart[positionItemInCart];
    switch (type) {
      case 'plus':
        cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
        break;
      case 'minus':
        let changeQuantity = cart[positionItemInCart].quantity - 1;
        if (changeQuantity > 0) {
          cart[positionItemInCart].quantity = changeQuantity;
        } else {
          cart.splice(positionItemInCart, 1); 
        }
        break;
    }
  }
  addCartToHTML(); 
  addCartToMemory(); 
}


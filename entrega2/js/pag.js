//uso las func de selectors para agarrar las cosas con esas id. ahora digamos las modifico con el java. Con body hago lo mismo pero conn document
const body = document.body
const btnCart = select('#btn-cart')
const cartElement = select("#cart")
const _items = select('#_items')
const _toggle = select('#_toggle')


//activo, desactivo menu

_toggle.onclick = () =>{
    _items.classList.toggle("open")
    _toggle.classList.toggle("close")
}




// ------------------------- SELECCIÓN DE PRODUCTOS

// Acceso a los elementos del DOM

const listadoProductos = document.getElementById("seccion-inicio-uno");
const listadoProductosDos = document.getElementById("seccion-inicio-dos");
let btnComprar = document.getElementsByClassName("btn-comprar");

// Función para mostrar en pantalla los productos disponibles
// Info de los productos en archivo productos-disponibles.js

const mostrarProductos = (numeroInicio, numeroLimite,listado) => {

    for (let i = numeroInicio; i < numeroLimite && i < productosDisponibles.length; i++) {

        const producto = productosDisponibles[i];        
        const div = document.createElement("div");
        div.classList.add("productos");
        div.innerHTML = `
        <div class="boton-lo-quiero">
        <img src="${producto.imagen}" alt="${producto.producto}">
            <button>¡Lo quiero!</button>
        </div>
        <h4>${producto.producto}</h4>
        <h5>$ ${producto.precio}</h5>
        <button class="btn-comprar boton" id="${producto.id}">Comprar</button> `;

        listado.append(div);
    }

}

mostrarProductos(0, 3, listadoProductos);
mostrarProductos(3, 6, listadoProductosDos);

//Función para cargar los productos a la bolsa de compras por medio de localStorage

let bolsaDeCompras;
let bolsaDeComprasLS = localStorage.getItem("productos-agregados-a-bolsa");

if (bolsaDeComprasLS){
    bolsaDeCompras = JSON.parse(bolsaDeComprasLS);
} else{ 
    bolsaDeCompras = [];
}

for (let i = 0; i < btnComprar.length; i++) {
    btnComprar[i].addEventListener("click", agregarABolsa);
}

function agregarABolsa(e) {
    const idProductoBoton = e.currentTarget.id;
    const productoAgregado = productosDisponibles.find(producto => producto.id === idProductoBoton);

    if (bolsaDeCompras.some(producto => producto.id === idProductoBoton)) {
        const i = bolsaDeCompras.findIndex(producto => producto.id === idProductoBoton);
        bolsaDeCompras[i].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        bolsaDeCompras.push(productoAgregado);
    }

    localStorage.setItem("productos-agregados-a-bolsa", JSON.stringify(bolsaDeCompras));

    Toastify({
        text: "El producto fue agregado a la bolsa de compras.",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", 
        position: "right", 
        stopOnFocus: true,
        style: {
            background: "#910000e6"
        },
        onClick: function () { }
    }).showToast();

}
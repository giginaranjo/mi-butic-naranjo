// ------------------------- BOLSA DE COMPRAS

// Datos recuperados del localStorage

let bolsaDeCompras = localStorage.getItem("productos-agregados-a-bolsa");
bolsaDeCompras = JSON.parse(bolsaDeCompras);

// Acceso a los elementos del DOM

const bolsaVacia = document.getElementById("vacio");
const bolsaProductos = document.getElementById("bolsa");
const bolsaAcciones = document.getElementById("acciones");
const bolsaComprada = document.getElementById("comprada");
let btnEliminarProducto = document.getElementsByClassName("btn-eliminar-producto");
const total = document.getElementById("total");
const botonVaciar = document.getElementById("vaciar");
const botonComprar = document.getElementById("comprar");

// Función para mostrar en pantalla los productos seleccionados para comprar

const mostrarProductosEnBolsa = () => {

    if (bolsaDeCompras && bolsaDeCompras.length > 0) {
        bolsaVacia.classList.add("deshabilitado");
        bolsaProductos.classList.remove("deshabilitado");
        bolsaAcciones.classList.remove("deshabilitado");
        bolsaComprada.classList.add("deshabilitado");

        bolsaProductos.innerHTML = "";

        bolsaDeCompras.forEach(producto => {

            const div = document.createElement("div");
            div.classList.add("productos-agregados");
            div.innerHTML = `
        <div class="detalle-producto">
            <img src="${producto.imagen}" alt="${producto.id}">
            <div class="titulo-producto">
                <small>Producto</small>
                <h4>${producto.producto}</h4>
            </div>
        </div>
        <div class="precio-producto">
            <div class="titulo-precio-producto">
                <small>Precio</small>
                <h4>$${producto.precio}</h4>
            </div>
        </div>
        <div class="cantidad-producto">
            <div class="titulo-cantidad-producto">
                <small>Cantidad</small>
                <h4>${producto.cantidad}</h4>
            </div>
        </div>
        <div class="subtotal-producto">
            <div class="titulo-subtotal-producto">
                <small>Subtotal</small>
                <h4>$ ${producto.precio * producto.cantidad}</h4>
            </div>
        </div>
        <div class="eliminar-producto">
            <button id="${producto.id}" class="btn-eliminar-producto boton"><i class="fa-solid fa-xmark"></i></button>
        </div>
        `;

            bolsaProductos.append(div);

        });

    } else {
        bolsaVacia.classList.remove("deshabilitado");
        bolsaProductos.classList.add("deshabilitado");
        bolsaAcciones.classList.add("deshabilitado");
        bolsaComprada.classList.add("deshabilitado");
    }

    recargarBtn();
    montoTotal();
}

mostrarProductosEnBolsa();

// Función para eliminar de la bolsa productos seleccionados (individual)

function recargarBtn() {
    for (let i = 0; i < btnEliminarProducto.length; i++) {
        btnEliminarProducto[i].addEventListener("click", eliminarProducto);
    }
}

function eliminarProducto(e) {

    const idEliminarProducto = e.currentTarget.id;
    const index = bolsaDeCompras.findIndex(producto => producto.id === idEliminarProducto)
    bolsaDeCompras.splice(index, 1);

    mostrarProductosEnBolsa();

    localStorage.setItem("productos-agregados-a-bolsa", JSON.stringify(bolsaDeCompras));
}

// Función para mostrar el monto total de la compra

function montoTotal() {
    const totalidad = bolsaDeCompras.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0)
    total.innerText = `$ ${totalidad}`

}

// Función para eliminar de la bolsa productos seleccionados (elimina todos los productos)

botonVaciar.addEventListener("click", vaciarBolsa)

function vaciarBolsa() {
    bolsaDeCompras.length = 0;
    localStorage.setItem("productos-agregados-a-bolsa", JSON.stringify(bolsaDeCompras));
    mostrarProductosEnBolsa();
}

// Función para finalizar compra (Muestra mensaje de despedida)

botonComprar.addEventListener("click", comprarProductos)

function comprarProductos() {
    bolsaDeCompras.length = 0;
    localStorage.setItem("productos-agregados-a-bolsa", JSON.stringify(bolsaDeCompras));

    bolsaVacia.classList.add("deshabilitado");
    bolsaProductos.classList.add("deshabilitado");
    bolsaAcciones.classList.add("deshabilitado");
    bolsaComprada.classList.remove("deshabilitado");
}
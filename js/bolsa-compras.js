// ------------------------- BOLSA DE COMPRAS

// Datos recuperados del localStorage

let bolsaDeCompras = localStorage.getItem("productos-agregados-a-bolsa");
bolsaDeCompras = JSON.parse(bolsaDeCompras);

// Acceso a los elementos del DOM

const bolsaVacia = document.getElementById("bolsa-vacia");
const bolsaProductos = document.getElementById("bolsa-productos");
const bolsaComprar = document.getElementById("bolsa-comprar")
const total = document.getElementById("total");

let btnEliminarProducto = document.getElementsByClassName("btn-eliminar-producto");
const botonComprar = document.getElementById("comprar");


// Función para mostrar en pantalla los productos seleccionados para comprar

const mostrarProductosEnBolsa = () => {

    bolsaProductos.innerHTML = "";

    bolsaDeCompras.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("productos-agregados");
        div.innerHTML = `
        <div class="detalle-producto">
            <img src="${producto.imagen}" alt="${producto.id}">
            <div>
                <h4>${producto.producto}</h4>
            </div>
        </div>
        <div class="precio-producto">
            <div>
                <h4>$${producto.precio}</h4>
            </div>
        </div>
        <div class="cantidad-producto">
            <div>
                <h4>${producto.cantidad}</h4>
            </div>
        </div>
        <div class="subtotal-producto">
            <div>
                <h4>$ ${producto.precio * producto.cantidad}</h4>
            </div>
        </div>
        <div class="eliminar-producto">
            <button id="${producto.id}" class="btn-eliminar-producto boton"><i class="fa-solid fa-xmark"></i></button>
        </div>
        `;

        bolsaProductos.append(div);

    });


    recargarBtn();
    montoTotal();
}

// Determinación de qué se mostrará en pantalla

if (bolsaDeCompras && bolsaDeCompras.length > 0) {
    bolsaVacia.classList.add("deshabilitado")
    bolsaProductos.classList.remove("deshabilitado")
    mostrarProductosEnBolsa();
} else {
    bolsaVacia.classList.remove("deshabilitado")
    bolsaProductos.classList.add("deshabilitado")
}


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


// Función para finalizar compra (Muestra mensaje de despedida)

botonComprar.addEventListener("click", comprarProductos)

function comprarProductos() {

    if (bolsaDeCompras && bolsaDeCompras.length > 0) {
        bolsaDeCompras.length = 0;
        localStorage.setItem("productos-agregados-a-bolsa", JSON.stringify(bolsaDeCompras));

        Swal.fire({
            title: "Tu compra ha sido efectuada con éxito.",
            text: "Recibirás en tu correo electrónico el detalle de la compra. Te contactaremos para coordinar la entrega de los productos. \n Gracias por elegirnos :).",
            imageUrl: "../multimedia/imagenes/icono-carrito-de-compras.png",
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: "compra-finalizada"
        });

        bolsaVacia.classList.remove("deshabilitado")
        bolsaProductos.classList.add("deshabilitado")
        total.innerText = "$ 0"
        
    } else {
        Swal.fire({
            title: "Oops... Tu bolsa se encuentra vacía.",
            text: "Te invitamos a revisar nuestro listado de productos :)",
            imageUrl: "../multimedia/imagenes/bolsa-de-la-compra-vacia.png",
            imageWidth: 100,
            imageHeight: 100,
            imageAlt: "bolsa-vacia",
            footer: '<a href="../paginas/productos.html">Productos</a>'
        });
    }

}
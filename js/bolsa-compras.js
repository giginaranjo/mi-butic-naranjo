// ------------------------- BOLSA DE COMPRAS

// Datos recuperados del localStorage

let bolsaDeCompras = localStorage.getItem("productos-agregados-a-bolsa");
bolsaDeCompras = JSON.parse(bolsaDeCompras);

// Acceso a los elementos del DOM

const bolsaVacia = document.getElementById("bolsa-vacia");
const bolsaProductos = document.getElementById("bolsa-productos");
const bolsaComprar = document.getElementById("bolsa-comprar")

const total = document.getElementById("total");
const subtotal = document.getElementById("subtotal-compra");
const envio = document.getElementById("envio");

const formPago = document.getElementById("form-pago");
const metodos = document.getElementById("metodo");
const eleccion = document.getElementById("eleccion");
const formCompra = document.getElementById("form-compra");
const adicional = document.getElementById("adicional");

let btnEliminarProducto = document.getElementsByClassName("btn-eliminar-producto");
const btnContinuar = document.getElementById("continuar");



// Función para mostrar en pantalla los productos seleccionados para comprar

const mostrarProductosEnBolsa = () => {
    if (bolsaDeCompras && bolsaDeCompras.length > 0) {

        bolsaVacia.classList.add("deshabilitado");
        bolsaProductos.classList.remove("deshabilitado");


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

    } else {
        bolsaVacia.classList.remove("deshabilitado");
        bolsaProductos.classList.add("deshabilitado");
        reseteo()
    }
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
    const index = bolsaDeCompras.findIndex(producto => producto.id === idEliminarProducto);
    bolsaDeCompras.splice(index, 1);

    mostrarProductosEnBolsa();

    localStorage.setItem("productos-agregados-a-bolsa", JSON.stringify(bolsaDeCompras));
}


// Variables para almacenar localStorage

let datosCompra; // ------ Datos a mostrar en el historial

if (localStorage.getItem("datos-comprador")) {
    datosCompra = JSON.parse(localStorage.getItem("datos-comprador"));
} else {
    datosCompra = [];
}

let productosComprados; // ------ Productos comprados

if (localStorage.getItem("productos-comprados")) {
    productosComprados = JSON.parse(localStorage.getItem("productos-comprados"));
} else {
    productosComprados = [];
}


// Función para mostrar el monto total de la compra 

function montoTotal() {

    const totalidad = bolsaDeCompras.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    subtotal.innerText = `$ ${totalidad}`;

    envio.innerText = `$ 500`;

    const totalCompra = totalidad + 500;
    total.innerText = `$ ${totalCompra}`;

}


// Función para generar un número de orden para cada pedido
function numeroOrden(length) {
    let orden = "";
    let numAbc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (let i = 0; i < length; i++) {
        orden += numAbc[Math.floor(Math.random() * numAbc.length)];
    }
    return orden;
}


// Solicitar y guardar los datos de la compra
class Comprador {
    constructor(nombre, apellido, correo, celular, metodo, cantidad, monto, fecha, orden, direccion, detalleCompra) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
        this.celular = celular;
        this.metodo = metodo;
        this.cantidad = cantidad;
        this.monto = monto;
        this.fecha = fecha;
        this.orden = orden;
        this.direccion = direccion;
        this.detalleCompra = detalleCompra;
    }
}

function guardarDatos(nombre, apellido, correo, celular, metodo, cantidad, monto, fecha, orden, direccion, detalleCompra) {
    let datosComprador = new Comprador(nombre, apellido, correo, celular, metodo, cantidad, monto, fecha, orden, direccion, detalleCompra);
    datosCompra.push(datosComprador);
}

btnContinuar.addEventListener("click", pedirDatos);

function pedirDatos() {

    /* selección de método de pago */
    formPago.addEventListener("submit", (e) => {
        e.preventDefault();

        if (bolsaDeCompras && bolsaDeCompras.length > 0) {

            let metodoPago = document.getElementById("metodo").value;

            function pago() {
                if (metodoPago == "1") {
                    return "Tarjeta de débito";

                } else if (metodoPago == "2") {
                    return "Tarjeta de crédito";
                } else {
                    return "Transferencia";
                }
            }

            let metodo = pago();

            adicional.classList.replace("deshabilitado", "adicional");
            btnContinuar.classList.add("deshabilitado");
            metodos.classList.add("deshabilitado");

            eleccion.innerText = metodo;


            /* form de datos comprador */
            formCompra.addEventListener("submit", (e) => {
                e.preventDefault();

                if (bolsaDeCompras && bolsaDeCompras.length > 0) {

                    let nombre = document.getElementById("nombre").value.trim().toUpperCase();
                    let apellido = document.getElementById("apellido").value.trim().toUpperCase();
                    let correo = document.getElementById("correo").value.trim().toUpperCase();
                    let celular = document.getElementById("celular").value.trim();
                    let direccion = document.getElementById("direccion").value.trim().toUpperCase();

                    /* valores a guardar */
                    const cantidad = bolsaDeCompras.reduce((acc, producto) => acc + (producto.cantidad), 0);

                    const montoCompra = bolsaDeCompras.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
                    const monto = montoCompra + 500;

                    const pedido = Date.now();
                    const fecha = new Date(pedido).toLocaleString();

                    const orden = numeroOrden(6);

                    const detalleCompra = bolsaDeCompras;
                    productosComprados.push(detalleCompra)

                    /* guardado de información en el localStorage */

                    guardarDatos(nombre, apellido, correo, celular, metodo, cantidad, monto, fecha, orden, direccion, detalleCompra);

                    localStorage.setItem("datos-comprador", JSON.stringify(datosCompra)); // ------- Almacenamiento para historial
                    localStorage.setItem("productos-comprados", JSON.stringify(productosComprados)); // ----- Almacenamiento de productos comprados

                    formCompra.classList.replace("form-compra", "deshabilitado");

                    const p = document.createElement("p");
                    p.classList.add("guardado");
                    p.innerText = "La información ha sido guardada.";
                    adicional.append(p);

                    formCompra.reset();

                    comprarProductos(); // ------ Finaliza la compra -------

                } else {
                    reseteo()
                    avisoBolsaVacia();
                }

            });

        } else {
            avisoBolsaVacia();
        }

    });

}


// Función para realizar la compra.

function comprarProductos() {
    bolsaDeCompras.length = 0;
    localStorage.setItem("productos-agregados-a-bolsa", JSON.stringify(bolsaDeCompras));

    Swal.fire({
        title: "Gracias por tu compra :)",
        text: "Te contactaremos para coordinar la entrega de los productos.",
        imageUrl: "../multimedia/imagenes/icono-carrito-de-compras.png",
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: "compra-finalizada"
    });

    bolsaVacia.classList.remove("deshabilitado");
    bolsaProductos.classList.add("deshabilitado");
    reseteo();
}

// Función que avisa que la bolsa de compras está vacía.

function avisoBolsaVacia() {
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


// Función de reseteo al vaciar la bolsa de compras.

function reseteo() {
    subtotal.innerText = `$ 0`;
    envio.innerText = `$ 0`;
    total.innerText = `$ 0`;
    eleccion.innerText = "";
    metodos.classList.remove("deshabilitado");

    formCompra.classList.replace("form-compra", "deshabilitado");
    adicional.classList.replace("adicional", "deshabilitado");
    btnContinuar.classList.remove("deshabilitado");
}
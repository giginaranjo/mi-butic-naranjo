// ------------------------- HISTORIAL DE COMPRAS

// Datos recuperados del localStorage

let datosCompra = localStorage.getItem("datos-comprador");
datosCompra = JSON.parse(datosCompra);


// Acceso a los elementos del DOM

const listadoPedidos = document.getElementById("listado-pedidos");

const formFiltro = document.getElementById("search");
const btnCancelar = document.getElementById("cancel-filter");
const inputfiltro = document.getElementById("busqueda");


// Función para mostrar en pantalla los pedidos realizados en pantalla

const mostrarHistorial = (elemento = []) => {

    listadoPedidos.innerHTML = "";

    elemento.forEach(data => {

        const div = document.createElement("div");
        div.classList.add("tarjeta-pedido");
        div.innerHTML = `
        <div id="info-compra" class="info-compra">
            <div class="pares">
                <h3>N° de órden </h3>
                <h4 id="orden">${data.orden}</h4>
            </div>
            <div class="pares">
                <h3>Fecha</h3>
                <h4 id="fecha">${data.fecha}</h4>
            </div>
        </div>

        <div id="datos-del-pedido" class="datos-del-pedido">

            <div id="datos-comprador" class="datos-comprador">
                <h3>Datos del comprador</h3>
                <div class="data">
                    <div class="pares">
                        <small>Nombre</small>
                        <h4 id="nombre-comprador">${data.nombre}</h4>
                    </div>
                    <div class="pares">
                        <small>Apellido</small>
                        <h4 id="apellido-comprador">${data.apellido}</h4>
                    </div>
                    <div class="pares">
                        <small>Correo electrónico</small>
                        <h4 id="correo-comprador">${data.correo}</h4>
                    </div>
                    <div class="pares">
                        <small>Celular</small>
                        <h4 id="celular-comprador">${data.celular}</h4>
                    </div>
                </div>
            </div>

            <div id="datos-compra" class="datos-compra">
                <h3>Datos de la compra</h3>
                <div class="data">
                    <div class="pares">
                        <small>Método de pago</small>
                        <h4 id="metodo-compra">${data.metodo}</h4>
                    </div>
                    <div class="pares">
                        <small>Cantidad de productos</small>
                        <h4 id="cantidad-compra">${data.cantidad}</h4>
                    </div>
                    <div class="pares">
                        <small>Monto total</small>
                        <h4 id="monto-compra">${data.monto}</h4>
                    </div>
                </div>
            </div>

            
        </div> `;

        listadoPedidos.append(div);
        
    });
}

mostrarHistorial(datosCompra);


/* Filtrado de pedidos por nombre, apellido u orden */

function filtrado(palabraClave = "", busqueda = []){
    return busqueda.filter((pedido) => {
        return (pedido.nombre.toUpperCase().includes(palabraClave.toUpperCase()) || pedido.apellido.toUpperCase().includes(palabraClave.toUpperCase()) || pedido.orden.toUpperCase().includes(palabraClave.toUpperCase()));
    });
}

formFiltro.addEventListener("submit", (e) => {
    e.preventDefault()
    const palabraClave = inputfiltro.value;
    const resultado = filtrado(palabraClave, datosCompra) 
    mostrarHistorial(resultado)
});

btnCancelar.addEventListener("click", (e) => {
    e.preventDefault();
    mostrarHistorial(datosCompra);
    formFiltro.reset();
});

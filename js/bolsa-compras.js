let agregarProducto = "";
let cantidadProducto = 0;
let subtotal = 0;
let contador = 0;

//Declaración de funciones --------------------------------------

const listadoProductos = (productos) => {
    let listado = "\n";
    for (let i = 0; i < productosDisponibles.length; i++) {
        listado += productos[i].id + ". " + productos[i].producto + " $" + productos[i].precio + "\n";
    } return listado;
}

const validacion = (valor) => {
    return valor !== null && valor !== "" && valor != "COMPRAR" && !isNaN(valor) && Number(valor) >= 1 && Number(valor) <= 15;
}
const detalleCompra = () => {
    return  "\nProducto: "+ productosDisponibles[agregarProducto - 1].producto + "\nCantidad: " + cantidadProducto;
}

// Listado de artículos en venta --------------------------------

agregarProducto = parseInt(prompt("Bienvenido a MIBÜTIC <3" + "¿Qué producto desea comprar?"
    + "\n(Ingrese solo el número que corresponde a la opción deseada)."
    + "\nIngrese (COMPRAR) para finalizar la compra."
    + "\n\n Listado de productos disponibles"
    + "\n" + listadoProductos(productosDisponibles)));

if (validacion(agregarProducto)) {
    cantidadProducto = parseInt(prompt("¿Qué cantidad?"));
}

// Agregado de productos a la bolsa de compras ------------------

while (validacion(agregarProducto)) {
    subtotal += productosDisponibles[agregarProducto - 1].precio * cantidadProducto;
    contador++
    console.log(subtotal);
    console.log("Se ha agregado a la bolsa de compras: " + detalleCompra())
    alert("Has agregado a la bolsa de compras: " + detalleCompra())

    agregarProducto = parseInt(prompt("¿Desea agregar otro producto?"
        + "\n(Ingrese solo el número que corresponde a la opción deseada)."
        + "\nIngrese (COMPRAR) para finalizar la compra."
        + "\n\n Listado de productos disponibles"
        + "\n" + listadoProductos(productosDisponibles)));

    if (validacion(agregarProducto)) {
        cantidadProducto = parseInt(prompt("¿Qué cantidad?"));
    }
}

// Cálculo final con el total de la compra -----------------------

if (subtotal <= 0 || isNaN(subtotal)) {
    alert("No se pudo realizar la compra. Te invitamos a intentar nuevamente.")
} else {
    alert("El subtotal de la compra es: $" + subtotal);
    const IVA = 0.19 // IVA 19% en chile
    let ivaSubtotal = subtotal * IVA;
    let total = subtotal + ivaSubtotal;

    console.log("Total a pagar por el consumidor: " + "\nSubtotal: $" + subtotal + "\nIVA: $" + ivaSubtotal + "\nTotal: $" + total);
    alert("Subtotal: $" + subtotal + "\nIVA: $" + ivaSubtotal + "\nTotal: $" + total);

    console.log("La compra ha sido registrada en el sistema.")
    alert("Tu compra ha sido efectuada con éxito. Recibirás en tu correo electrónico el detalle de la compra. \nTe contactaremos para coordinar la entrega de los productos. \nGracias por elegirnos <3 ")
}
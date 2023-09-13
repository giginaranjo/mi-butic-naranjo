// Agregar productos al carrito

// Precio de productos
const SWEATER_AZUL = 1000;
const SWEATER_VERDE = 2000;
const SWEATER_CORAZONES = 3000;
const SWEATER_CUELLO_TORTUGA = 4000;
const CONJUNTO_NEGRO = 5000;
const PACK_SWEATERS = 6000;
const TOP_CUERO = 7000;
const PANTALON_PLATEADO = 8000;
const BLAZERS = 9000;
const TACONES_ALDO = 10000;
const BOLSO_BEIGE = 11000;
const BOLSO_VERDE = 12000;
const CONJUNTO_BEIGE = 13000;
const TACONES_ZARA = 14000;
const TOP_FLORAL = 15000;

let agregarProducto = "";
let cantidadProducto = 0;
let subtotal = 0;
let contador = 0;

// Listado de artículos en venta
function listadoProductos() {
    return  "\n(Ingrese solo el número que corresponde a la opción deseada)."
        + "\nIngrese (COMPRAR) para finalizar la compra." 
        + "\n\n Listado de productos disponibles"
        + "\n 1. Sweater azul = $" + SWEATER_AZUL
        + "\n 2. Sweater verde = $" + SWEATER_VERDE
        + "\n 3. Sweater corazones = $" + SWEATER_CORAZONES
        + "\n 4. Sweater cuello tortuga = $" + SWEATER_CUELLO_TORTUGA
        + "\n 5. Conjunto negro = $" + CONJUNTO_NEGRO
        + "\n 6. Pack de sweaters = $" + PACK_SWEATERS
        + "\n 7. Top de cuero = $" + TOP_CUERO
        + "\n 8. Pantalón plateado = $" + PANTALON_PLATEADO
        + "\n 9. Blazers = $" + BLAZERS
        + "\n 10. Tacones Aldo = $" + TACONES_ALDO
        + "\n 11. Bolso beige = $" + BOLSO_BEIGE
        + "\n 12. Bolso verde = $" + BOLSO_VERDE
        + "\n 13. Conjunto beige = $" + CONJUNTO_BEIGE
        + "\n 14. Tacones Zara = $" + TACONES_ZARA
        + "\n 15. Top floral = $" + TOP_FLORAL;
}

// Conversión de opción (número) ingresada por el usuario a precio
function seleccionProductos(producto) {
    switch (producto) {
        case "1":
            return SWEATER_AZUL;

        case "2":
            return SWEATER_VERDE;

        case "3":
            return SWEATER_CORAZONES;

        case "4":
            return SWEATER_CUELLO_TORTUGA;

        case "5":
            return CONJUNTO_NEGRO;

        case "6":
            return PACK_SWEATERS;

        case "7":
            return TOP_CUERO;

        case "8":
            return PANTALON_PLATEADO;

        case "9":
            return BLAZERS;

        case "10":
            return TACONES_ALDO;

        case "11":
            return BOLSO_BEIGE;

        case "12":
            return BOLSO_VERDE;

        case "13":
            return CONJUNTO_BEIGE;

        case "14":
            return TACONES_ZARA;

        case "15":
            return TOP_FLORAL;

        default:
            alert("La opción seleccionada es inválida.")
            break;
    }
}

// Formula para el cálculo del costo 
function calcularProducto(producto, cantidad) {
    return seleccionProductos(producto) * cantidad;
}

// Datos para detalle de la compra
function detalleCompra() {
    return cantidadProducto + " artículos del producto N° " + agregarProducto + " de la lista. \n Subtotal: " + subtotal
}

// Validación de datos ingresados por el usuario
function validacion(valor) {
    return valor !== null && valor.trim() !== "" && valor.trim().toUpperCase() != "COMPRAR" && !isNaN(valor.trim()) && Number(valor.trim()) >= 1 && Number(valor.trim()) <= 15;
}

// Preguntas al usuario mostrando los productos disponibles
agregarProducto = prompt("¿Qué producto desea comprar?" + listadoProductos());

if (validacion(agregarProducto)) {
    cantidadProducto = parseInt(prompt("¿Qué cantidad?"));
}



// Cálculo del costo más agregado a la bolsa de compras
while (validacion(agregarProducto)) {
    
    subtotal += calcularProducto(agregarProducto, cantidadProducto);
    contador++
    console.log("Se ha agregado una cantidad de " + detalleCompra())
    alert("Has agregado " + detalleCompra())


    agregarProducto = prompt("¿Desea agregar otro producto?" + listadoProductos());

    if (validacion(agregarProducto)) {
        cantidadProducto = parseInt(prompt("¿Qué cantidad?"));
    }
    
}

// Cálculo final con el total de la compra
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

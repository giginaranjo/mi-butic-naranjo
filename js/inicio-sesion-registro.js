/* // Inicio sesión o registro para realizar la compra

let correo = "";
let nombreUsuario = "";
let clave = "";
let opcionCuenta = "";

// Recuperar info BD ---------------------------------------------------
let users = usuariosRegistados.map((user) => {
    return new Usuario(
        user.correo,
        user.nombreUsuario,
        user.clave,
    );
});

// Validar existencia de usuario ----------------------------------------
const validarInicioSesion = (correo, clave) => {
    const usuarioBuscado = users.find((usuario) => {
        return usuario.correo === correo && usuario.clave === clave;
    })
    if (!usuarioBuscado) {
        alert("No se ha podido encontrar tu cuenta. Verifica tus datos e inténtalo nuevamente.")
    } else {
        alert("Has ingresado con éxito a tu cuenta.")
    }
}
// Opción inicio de sesión o registro -----------------------------------

opcionCuenta = prompt("Para continuar con la compra, elige una opción: (Ingrese solo el número que corresponde a la opción deseada). \n 1. Iniciar Sesión \n 2. Crear una cuenta");

// Iniciar sesión -------------------------------------------------------
if (opcionCuenta == "1") {
    correo = prompt("Ingrese su nombre de usuario o correo electrónico.");
    while (correo == "") {
        correo = prompt("Introduzca una dirección de correo electrónico válida")
    }
    clave = prompt("Ingresa tu contraseña.");
    while (clave == "" || clave.length < 6 || clave.length > 16) {
        clave = prompt('Contraseña incorrecta. Vuelve a intentarlo o selecciona "¿Has olvidado tu contraseña?" para cambiarla.')
    }
    validarInicioSesion(correo, clave)
// Crear cuenta --------------------------------------------------------
} else if (opcionCuenta == "2") {
    correo = prompt("Ingrese su correo electrónico.");
    while (correo == "") {
        correo = prompt("El correo electrónico no es válido, intenta nuevamente.")
    }
    nombreUsuario = prompt("Crea un nombre de usuario.");
    while (nombreUsuario == "") {
        nombreUsuario = prompt("El nombre de usuario no es válido, intenta nuevamente.")
    }
    clave = prompt("Crea una nueva contraseña (entre 6 y 16 caracteres).")
    while (clave == "" || clave.length < 6 || clave.length > 16) {
        clave = prompt("Tu nueva contraseña no es válida, intenta nuevamente (debe tener entre 6 y 16 caracteres).")
    }
    let usuario = new Usuario(correo, nombreUsuario, clave);
    users.push(usuario);
    console.table(users);
    console.log("Ingreso de datos del nuevo usuario: \n Correo electrónico: " + usuario.correo + "\n Nombre de usuario: " + usuario.nombreUsuario + "\n Contraseña: " + usuario.clave + ".");
    alert("Has completado con éxito el registro. Te damos la bienvenida, " + usuario.nombreUsuario + ".")

} else {
    alert("La opción seleccionada es inválida.")

} */
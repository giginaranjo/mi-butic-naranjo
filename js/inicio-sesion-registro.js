// Inicio sesión o registro para realizar la compra

let opcionCuenta = (prompt("Para continuar con la compra, elige una opción: (Ingrese solo el número que corresponde a la opción deseada). \n 1. Iniciar Sesión \n 2. Crear una cuenta"));
let nombreUsuario = "";
let clave = "";
switch (opcionCuenta.trim()) {
    case "1":
        let nombreUsuario = prompt("Ingrese su nombre de usuario o correo electrónico.");
        while (nombreUsuario == "") {
            nombreUsuario = prompt("Verifique su nombre de usuario o correo electrónico e intente nuevamente.")
        }
        let clave = prompt("Ingresa tu contraseña.");
        while (clave == "" || clave.length < 6 || clave.length > 16) {
            clave = prompt("Verifique su contraseña e intente nuevamente.")
        }
        console.log("Los datos ingresados: \n Nombre de usuario: " + nombreUsuario + "\n Contraseña: " + clave + "\nSon válidos. Permitir el acceso a la cuenta.");
        alert("Has ingresado con éxito a tu cuenta.")
        break;
    case "2":
        let correo = prompt("Ingrese su correo electrónico.");
        while (correo == "") {
            correo = prompt("El correo electrónico no es válido, intenta nuevamente.")
        }
        let nuevoNombreUsuario = prompt("Crea un nombre de usuario.");
        while (nuevoNombreUsuario == "") {
            nuevoNombreUsuario = prompt("El nombre de usuario no es válido, intenta nuevamente.")
        }
        let nuevaClave = prompt("Crea una nueva contraseña (entre 6 y 16 caracteres).")
        while (nuevaClave == "" || nuevaClave.length < 6 || nuevaClave.length > 16) {
            nuevaClave = prompt("Tu nueva contraseña no es válida, intenta nuevamente (debe tener entre 6 y 16 caracteres).")
        }
        console.log("Ingreso de datos del nuevo usuario: \n Correo electrónico: " + correo + "\n Nombre de usuario: " + nuevoNombreUsuario + "\n Contraseña: " + nuevaClave + ".");
        alert("Has completado con éxito el registro. Te damos la bienvenida, " + nuevoNombreUsuario + ".")
        break;
    default:
        alert("La opción seleccionada es inválida.")
        break;
}
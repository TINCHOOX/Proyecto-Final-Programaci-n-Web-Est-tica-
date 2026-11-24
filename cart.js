
// cart.js — Carrito de compras compartido entre todas las páginas

/**  Este archivo se incluye en cada página del sitio para que el
     carrito funcione en todas partes y no se pierda al navegar.

     El carrito se guarda como texto en formato JSON, por ejemplo:
    '[{"nombre":"Teclado G PRO","precio":195,"cantidad":1}]'

*/


// FUNCIÓN 1: Leer el carrito guardado

/**  localStorage solo guarda texto, así que usamos JSON.parse()
     para convertir ese texto de vuelta a un array de objetos.
     Si nunca se guardó nada, devuelve un array vacío [].
*/
function obtenerCarrito() {
    const textoGuardado = localStorage.getItem('carrito_compucore')
    

    // Si no hay nada guardado, getItem devuelve null
    // En ese caso se utiliza '[]' (texto de array vacío) como valor por defecto
    if (textoGuardado === null) {
        return []
    }

    // JSON.parse convierte el texto en un array real de JavaScript
    return JSON.parse(textoGuardado)
}



// FUNCIÓN 2: Guardar el carrito

// localStorage solo acepta texto, así que se utiliza JSON.stringify()
// para convertir el array en texto antes de guardarlo.
function guardarCarrito(carrito) {
    const textoParaGuardar = JSON.stringify(carrito)
    localStorage.setItem('carrito_compucore', textoParaGuardar)
}



// FUNCIÓN 3: Agregar un producto al carrito

/**  Recibe el nombre y precio del producto.
 Si ya existe en el carrito, suma 1 a la cantidad.
 Si no existe, lo agrega como un objeto nuevo.
*/
function agregarAlCarrito(nombre, precio) {
    // Paso 1: Se obtiene el carrito actual
    let carrito = obtenerCarrito()

    // find() recorre el array y devuelve el primer elemento que cumple la condición
    // Si no encuentra nada, devuelve undefined
    const productoExistente = carrito.find(function(producto) {
        return producto.nombre === nombre
    })

    if (productoExistente) {
        // El producto ya estaba → solo se suma 1 a la cantidad
        productoExistente.cantidad = productoExistente.cantidad + 1
    } else {
        // El producto es nuevo → se agrega como objeto al array
        const nuevoProducto = {
            nombre: nombre,
            precio: precio,
            cantidad: 1
        }
        carrito.push(nuevoProducto)
    }

    // Paso 3: Se guarda el carrito actualizado
    guardarCarrito(carrito)

    // Paso 4: Se actualiza lo que se ve en pantalla
    renderizarCarrito()
}



// FUNCIÓN 4: Eliminar un producto del carrito

/**  filter() crea un nuevo array con solo los elementos que
cumplen la condición. Acá devuelve todos MENOS el que
tiene ese nombre, que es lo que queremos eliminar.
*/
function eliminarDelCarrito(nombre) {
    const carrito = obtenerCarrito()

    // Nos quedamos con todos los productos EXCEPTO el que queremos borrar
    const carritoSinElProducto = carrito.filter(function(producto) {
        return producto.nombre !== nombre
    })

    guardarCarrito(carritoSinElProducto)
    renderizarCarrito()
}



// FUNCIÓN 5: Actualizar el número que aparece en el ícono

// Suma las cantidades de todos los productos y lo muestra
// en el círculo rojo del ícono del carrito.
function actualizarContador() {
    const contadorSpan = document.getElementById('contador-productos')

    // Si la página no tiene ese elemento, no pasa nada
    if (contadorSpan === null) {
        return
    }

    const carrito = obtenerCarrito()

/**Se suman las cantidades de todos los productos
   reduce() recorre el array acumulando un valor
   total empieza en 0 y le vamos sumando cada cantidad
*/
    const totalProductos = carrito.reduce(function(total, producto) {
        return total + producto.cantidad
    }, 0)

    contadorSpan.textContent = totalProductos
}



// FUNCIÓN 6: Mostrar el contenido del carrito en el panel

/**  Esta es la función más larga porque se encarga de:
  1. Actualizar el contador del ícono
  2. Calcular el total en pesos
  3. Dibujar la lista de productos en el panel desplegable
*/
function renderizarCarrito() {
    // Siempre se actualiza el contador, esté donde esté
    actualizarContador()

    // Se buscan los elementos del panel desplegable
    const totalSpan = document.querySelector('.monto_total')
    const listaProductos = document.querySelector('.lista_items_carrito')

    // Si esta página no tiene panel de carrito (ej: Inicio, FAQ),
    // terminamos acá sin hacer nada más
    if (totalSpan === null || listaProductos === null) {
        return
    }

    const carrito = obtenerCarrito()

    // --- Calcular el total ---
    let total = 0
    for (let i = 0; i < carrito.length; i++) {
        total = total + (carrito[i].precio * carrito[i].cantidad)
    }
    totalSpan.textContent = '$' + total

    // --- Dibujar los productos ---
    // se vacia el panel antes de volver a llenarlo
    listaProductos.innerHTML = ''

    if (carrito.length === 0) {
        listaProductos.innerHTML = '<p class="carrito_sin_items">El carrito está vacío</p>'
        return
    }

    // Por cada producto, se crea un div con su info y un botón de eliminar
    for (let i = 0; i < carrito.length; i++) {
        const producto = carrito[i]

        // Se crea un div vacío y le damos la clase de estilo
        const div = document.createElement('div')
        div.classList.add('fila_producto')

        // Calculamos el subtotal de este producto
        const subtotal = producto.precio * producto.cantidad

        // Se rellena el HTML del div con la info del producto
        // NOTA: el onclick llama a eliminarDelCarrito con el nombre del producto
        div.innerHTML =
            '<span class="nombre_producto">' + producto.nombre + '</span>' +
            '<span class="cantidad_producto">x' + producto.cantidad + '</span>' +
            '<span class="precio_producto">$' + subtotal + '</span>' +
            '<button class="btn_quitar" onclick="eliminarDelCarrito(\'' + producto.nombre + '\')">X</button>'

        listaProductos.appendChild(div)
    }
}


// INICIO: Esto se ejecuta cuando la página termina de cargar

/**  DOMContentLoaded se "lanza" cuando el HTML ya está listo->Basicamente el navegador termino de cargar el html
     asi que js puede acceder a los elementos sin problemas
     pero antes de que carguen las imágenes.
*/
document.addEventListener('DOMContentLoaded', function() {

    // Se actualiza el contador con lo que haya guardado
    actualizarContador()

    // Buscamos los elementos del carrito desplegable
    const iconCarrito = document.querySelector('.icono_carrito')
    const iconCerrar = document.querySelector('.icono_cerrar')
    const panelCarrito = document.querySelector('.panel_carrito')

    /**Solo si la página tiene el panel desplegable (Tienda, Catálogo, Ofertas),
       configuramos abrir/cerrar. Si no tiene el panel (Inicio, FAQ, Contacto),
       el ícono del carrito ya tiene un onclick directo en el HTML que lleva a index.html.
    */
    if (iconCarrito !== null && panelCarrito !== null) {

        // Al hacer clic en el ícono → mostrar u ocultar el panel
        iconCarrito.addEventListener('click', function(evento) {
            // stopPropagation evita que el clic "se cuele" hacia elementos de abajo
            evento.stopPropagation()

            // toggle agrega la clase si no está, la saca si ya está
            panelCarrito.classList.toggle('panel_carrito--cerrado')

            // Se actualiza el contenido cada vez que se abre
            renderizarCarrito()
        })
    }

    // Al hacer clic en la X → cerrar el panel
    if (iconCerrar !== null && panelCarrito !== null) {
        iconCerrar.addEventListener('click', function() {
            panelCarrito.classList.add('panel_carrito--cerrado')
        })
    }
})

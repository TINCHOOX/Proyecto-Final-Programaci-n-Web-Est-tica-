
// index.js — Lógica de la Tienda (index.html)

/** 
 Este archivo maneja dos cosas:
1. Los botones de filtro (Todos / Teclados / Mouses / Auriculares)
2. Los botones "Añadir al carrito" de cada producto

Depende de cart.js, que debe cargarse ANTES en el HTML.
*/


// Se seleccionan los elementos que vamos a usar


// querySelectorAll devuelve una lista de TODOS los elementos que
// coinciden con el selector, no solo el primero
const botonesFiltro = document.querySelectorAll('.btn_filtro')
const todosLosItems = document.querySelectorAll('.item')
const botonesAgregar = document.querySelectorAll('.item button')


// PARTE 1: Filtros por categoría

/**  Cuando el usuario hace clic en un filtro:
 - Se le coloca la clase "btn_filtro--activo" a ese botón (para que se vea seleccionado)
 - Ocultamos los productos que no son de esa categoría
*/
// forEach recorre la lista y ejecuta una función por cada elemento
botonesFiltro.forEach(function(boton) {

    boton.addEventListener('click', function() {

        // Paso 1: Se quita "btn_filtro--activo" de TODOS los botones de filtro
        botonesFiltro.forEach(function(b) {
            b.classList.remove('btn_filtro--activo')
        })

        // Paso 2: Se añade "btn_filtro--activo" solo al que se clickeó
        boton.classList.add('btn_filtro--activo')

        // Paso 3: Se lee qué categoría tiene este botón en su data-filtro
        // Por ejemplo: <button data-filtro="teclado"> → filtro = "teclado"
        const filtroElegido = boton.dataset.filtro

        // Paso 4: Se muestra u oculta cada producto según la categoría
        todosLosItems.forEach(function(item) {
            const categoriaDelItem = item.dataset.categoria

            // Si el filtro es "todos" mostramos todo
            // Si no, comparamos la categoría del producto con el filtro
            const debeVerse = filtroElegido === 'todos' || categoriaDelItem === filtroElegido

            // classList.toggle(clase, condicion):
            // si condicion es true → agrega la clase
            // si condicion es false → quita la clase
            // 'oculto' es una clase CSS que hace display:none
            item.classList.toggle('oculto', !debeVerse)
        })
    })
})

// PARTE 2: Botones "Añadir al carrito"

// Cada botón está dentro de un .item que tiene el nombre y precio
// del producto. Los leemos del HTML y los mandamos al carrito.

botonesAgregar.forEach(function(boton) {

    boton.addEventListener('click', function() {

        // closest() sube por el árbol HTML buscando el elemento
        // más cercano que coincida con el selector dado.
        // El botón está dentro de .datos_producto que está dentro de .item
        const itemContenedor = boton.closest('.item')

        // Leemos el nombre del producto (está en el h2 dentro del item)
        const nombre = itemContenedor.querySelector('h2').textContent

        // Leemos el precio del atributo data-precio (el texto "$195" no sirve,
        // necesitamos el número 195 → por eso usamos el atributo)
        // Number() convierte el texto "195" al número 195
        const precio = Number(itemContenedor.querySelector('.precio').dataset.precio)

        // Llamamos a la función de cart.js para agregarlo
        agregarAlCarrito(nombre, precio)
    })
})



// Al cargar la página: mostramos los productos ya guardados

// Por si el usuario ya tenía cosas en el carrito de otra página
renderizarCarrito()

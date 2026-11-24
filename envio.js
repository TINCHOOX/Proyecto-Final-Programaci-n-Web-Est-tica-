
// envio.js — Calculadora de costo de envío estimado

/**  El usuario elige zona, cantidad de productos y tipo de envío.
     Al hacer clic en "Calcular", mostramos el costo estimado
     y los días de entrega.
*/




// DATOS: zonas de envío con sus costos y tiempos base

// Se utiliza un objeto donde cada clave es el valor del <select> del HTML.
// Cada zona tiene: costo base, días mínimos y días máximos.
let ZONAS = {
    neuquen:   { nombre: 'Neuquén capital',                   base: 1200, diasMin: 1, diasMax: 2 },
    patagonia: { nombre: 'Patagonia (Río Negro, Chubut y alrededores)', base: 3200, diasMin: 3, diasMax: 4 },
    amba:      { nombre: 'Buenos Aires y AMBA',               base: 4000, diasMin: 4, diasMax: 6 },
    resto:     { nombre: 'Resto del país',                    base: 4800, diasMin: 5, diasMax: 8 }
}

// Costo adicional por cada producto extra (el primero está incluido en el base)
let COSTO_POR_PRODUCTO_EXTRA = 350

// El envío express tiene un recargo del 60% (multiplicamos por 1.6)
let RECARGO_EXPRESS = 1.6



// Seleccionamos los elementos del HTML

let botonCalcular  = document.getElementById('btnCalcularEnvio')
let contenedorResultado = document.getElementById('envioResultado')



// FUNCIÓN: Calcular y mostrar el resultado

function calcularEnvio() {

    // --- Leer los valores del formulario ---
    let zonaElegida    = document.getElementById('envioZona').value
    let cantidadTexto  = document.getElementById('envioCantidad').value
    let tipoEnvio      = document.getElementById('envioTipo').value

    // Buscamos los datos de la zona en nuestro objeto ZONAS
    let zona = ZONAS[zonaElegida]

    // Convertimos la cantidad a número y la limitamos entre 1 y 20 (Se puede limitar a mas items pero como
    //demostracion se eligieron desde 1 a 20 productos)
    // Number() convierte texto a número; Math.max y Math.min ponen límites
    let cantidad = Number(cantidadTexto)
    if (cantidad < 1)  { cantidad = 1  }
    if (cantidad > 20) { cantidad = 20 }

    // --- Calcular el costo ---
    // El primer producto está incluido en el precio base.
    // Por cada producto adicional (cantidad - 1) sumamos el extra.
    let costo = zona.base + (cantidad - 1) * COSTO_POR_PRODUCTO_EXTRA

    // --- Calcular los días de entrega ---
    let diasMin = zona.diasMin
    let diasMax = zona.diasMax

    // Si eligió express: más caro, pero más rápido
    if (tipoEnvio === 'express') {
        costo   = Math.round(costo * RECARGO_EXPRESS)  // +60%
        diasMin = Math.max(1, diasMin - 1)              // al menos 1 día
        diasMax = Math.max(diasMin, diasMax - 2)        // al menos igual que diasMin
    }

    // --- Textos para mostrar ---
    // Si hay más de un producto, usamos el plural "productos"
    let pluralProducto = cantidad > 1 ? 'productos' : 'producto'
    let modalidad = tipoEnvio === 'express' ? 'express' : 'estándar'

    // --- Mostrar el resultado en el HTML ---
    contenedorResultado.innerHTML =
        '<div class="fila_resultado">' +
            '<span>Costo estimado</span>' +
            '<strong>$' + costo + '</strong>' +
        '</div>' +
        '<div class="fila_resultado">' +
            '<span>Llega en</span>' +
            '<strong>' + diasMin + '–' + diasMax + ' días hábiles</strong>' +
        '</div>' +
        '<p class="nota_resultado">' +
            'Envío a ' + zona.nombre + ', ' +
            cantidad + ' ' + pluralProducto + ', ' +
            'modalidad ' + modalidad + '. ' +
            'El costo final se confirma al cerrar la compra.' +
        '</p>'
}



// Asignamos el evento al botón y calculamos al cargar

// Verificamos que el botón exista antes de agregarle el evento
// (este script solo se usa en formulario.html, pero por las dudas)
if (botonCalcular !== null) {
    botonCalcular.addEventListener('click', calcularEnvio)

    // Mostramos un resultado inicial con los valores por defecto del form
    calcularEnvio()
}

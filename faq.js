
// faq.js — Sistema de preguntas frecuentes


//Logica de esta pagina:

/**  1. Los botones de categoría (Compras, Envíos, etc.)
   - Al hacer clic, muestra las preguntas de esa categoría
     La idea principal era utilizar estas categorias a estilo de filtro
*/

/**  2. El acordeón de preguntas
    - Al hacer clic en una pregunta, se expande su respuesta
    - Solo puede haber una respuesta abierta a la vez

     se va a usar un objeto donde cada clave es una categoría,
     y su valor es un array de objetos con pregunta (q) y respuesta (a)
*/
const faqs = {
    compras: [
        {
            q: '¿Cómo realizo una compra?',
            a: 'Agregá los productos que querés al carrito haciendo clic en "Añadir al carrito". Cuando estés listo, hacé clic en el ícono del carrito y seguí los pasos para finalizar tu compra.'
        },
        {
            q: '¿Puedo modificar o cancelar mi pedido?',
            a: 'Podés modificar o cancelar tu pedido dentro de las 2 horas posteriores a la compra. Pasado ese tiempo, el pedido ya puede estar en proceso de preparación. Contactanos lo antes posible por el formulario.'
        },
        {
            q: '¿Los precios incluyen IVA?',
            a: 'Sí, todos los precios publicados en el sitio incluyen IVA. No hay cargos ocultos al finalizar la compra.'
        },
        {
            q: '¿Puedo comprar sin crear una cuenta?',
            a: 'Por el momento la tienda permite agregar productos al carrito sin registrarse. Para finalizar la compra se requiere completar el formulario de contacto con tus datos.'
        }
    ],
    envios: [
        {
            q: '¿Cuánto tarda el envío?',
            a: 'Los envíos dentro de Neuquén capital se realizan en 24 a 48 horas hábiles. Para otras localidades del interior, el plazo es de 3 a 7 días hábiles según la distancia.'
        },
        {
            q: '¿Hacen envíos a todo el país?',
            a: 'Sí, enviamos a todo el territorio argentino mediante correo privado y OCA. El costo y tiempo de envío se calculan al momento de confirmar la compra según tu código postal.'
        },
        {
            q: '¿Cómo puedo rastrear mi pedido?',
            a: 'Una vez despachado el pedido, te enviamos por email el número de seguimiento y el enlace para rastrear el paquete en tiempo real.'
        },
        {
            q: '¿Ofrecen retiro en local?',
            a: 'Sí, podés retirar tu compra sin costo adicional en nuestra tienda en Av. Argentina 1234, Neuquén, de lunes a viernes de 9 a 18 hs y sábados de 9 a 13 hs.'
        }
    ],
    devoluciones: [
        {
            q: '¿Cuál es el plazo para devolver un producto?',
            a: 'Tenés 30 días corridos desde la fecha de recepción del producto para solicitar una devolución o cambio, siempre que el artículo esté en condiciones originales y con su embalaje.'
        },
        {
            q: '¿Cómo inicio una devolución?',
            a: 'Completá el formulario de contacto seleccionando "Devolución o cambio" como asunto, indicando tu número de pedido y el motivo. Nos comunicaremos en menos de 24 horas para coordinar.'
        },
        {
            q: '¿El costo de envío de la devolución es a mi cargo?',
            a: 'Si el producto tiene un defecto de fábrica o llegó dañado, el costo de envío corre por nuestra cuenta. En caso de cambio por arrepentimiento, el costo de envío es a cargo del cliente.'
        }
    ],
    garantia: [
        {
            q: '¿Qué garantía tienen los productos?',
            a: 'Todos los productos nuevos cuentan con garantía oficial del fabricante, que varía entre 6 meses y 2 años según la marca y categoría. El plazo se especifica en la descripción de cada producto.'
        },
        {
            q: '¿Cómo hago válida la garantía?',
            a: 'Contactanos mediante el formulario indicando el problema, tu número de pedido y, de ser posible, fotos o video del desperfecto. Evaluamos el caso y te indicamos los pasos a seguir.'
        },
        {
            q: '¿La garantía cubre daños por uso inadecuado?',
            a: 'No. La garantía cubre defectos de fabricación. Los daños causados por mal uso, caídas, líquidos o modificaciones no autorizadas quedan fuera de cobertura.'
        }
    ],
    pagos: [
        {
            q: '¿Qué medios de pago aceptan?',
            a: 'Aceptamos transferencia bancaria, tarjetas de crédito y débito (Visa, Mastercard, Naranja), Mercado Pago y pago en efectivo para retiro en local.'
        },
        {
            q: '¿Ofrecen cuotas sin interés?',
            a: 'Sí, ofrecemos cuotas sin interés con tarjetas de crédito seleccionadas. Las promociones vigentes varían según el banco y el monto de la compra. Consultanos para conocer las opciones disponibles.'
        },
        {
            q: '¿Es seguro pagar en el sitio?',
            a: 'Sí. Todas las transacciones se procesan a través de plataformas con encriptación SSL. No almacenamos datos de tarjetas en nuestros servidores.'
        }
    ]
}


// Se seleccionan los elementos del HTML que se van a modificar

const contenedorFaq = document.getElementById('faqList')
const botonesCategorias = document.querySelectorAll('.btn_categoria')



// FUNCIÓN: Mostrar las preguntas de una categoría

// Recibe el nombre de la categoría (ej: 'compras')
// Limpia el contenedor y crea el HTML de cada pregunta
function mostrarPreguntasDe(categoria) {

    // Se busca el array de preguntas de esa categoría
    const preguntas = faqs[categoria]

    // Se limpia lo que había antes
    contenedorFaq.innerHTML = ''

    // Se recorre cada pregunta y se crea su HTML
    for (let i = 0; i < preguntas.length; i++) {
        const pregunta = preguntas[i]

        // Creamos el contenedor de la pregunta
        const div = document.createElement('div')
        div.classList.add('pregunta_item')

        // Se arma el HTML interno: un botón con la pregunta y un div con la respuesta
        // Se usa data-index para poder identificar qué pregunta se clickeó
        div.innerHTML =
            '<button class="pregunta_boton" data-index="' + i + '">' +
                '<span>' + pregunta.q + '</span>' +
                '<svg class="icono_chevron" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">' +
                    '<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />' +
                '</svg>' +
            '</button>' +
            '<div class="respuesta" data-index="' + i + '">' +
                '<p>' + pregunta.a + '</p>' +
            '</div>'

        contenedorFaq.appendChild(div)
    }

    // Una vez que están en el HTML, se agregan los eventos de clic
    configurarAcordeon()
}



// FUNCIÓN: Configurar el acordeón (expandir/contraer respuestas)

// Se llama después de dibujar las preguntas porque los elementos
// deben existir en el HTML antes de poder agregarles eventos
function configurarAcordeon() {

    // Buscamos todos los botones de pregunta (ya en el DOM)
    const botonesPregunta = contenedorFaq.querySelectorAll('.pregunta_boton')

    botonesPregunta.forEach(function(boton) {

        boton.addEventListener('click', function() {

            // ¿Esta pregunta ya estaba abierta?
            const estabaAbierta = boton.classList.contains('open')

            // Paso 1: cerrar TODAS las preguntas
            // (el acordeón solo permite una abierta a la vez)
            const todosLosBotones = contenedorFaq.querySelectorAll('.pregunta_boton')
            const todasLasRespuestas = contenedorFaq.querySelectorAll('.respuesta')

            todosLosBotones.forEach(function(b) {
                b.classList.remove('open')
            })
            todasLasRespuestas.forEach(function(r) {
                r.classList.remove('open')
            })

            // Paso 2: si la pregunta estaba cerrada, la abrimos
            // (si estaba abierta, ya la cerramos arriba y no hacemos nada más)
            if (!estabaAbierta) {
                // Obtenemos el índice para encontrar la respuesta correspondiente
                const indice = boton.dataset.index
                const respuesta = contenedorFaq.querySelector('.respuesta[data-index="' + indice + '"]')

                boton.classList.add('open')
                respuesta.classList.add('open')
            }
        })
    })
}



// Eventos de los botones de categoría

botonesCategorias.forEach(function(boton) {

    boton.addEventListener('click', function() {

        //Se remueve "active" de todos los botones de categoría
        botonesCategorias.forEach(function(b) {
            b.classList.remove('active')
        })

        // Se lo asigna solo al que se clickeó
        boton.classList.add('active')

        // Se muestran las preguntas de esa categoría
        // data-cat tiene el nombre de la categoría, ej: "envios"
        mostrarPreguntasDe(boton.dataset.cat)
    })
})



// Al cargar la página: mostramos la categoría "compras" por defecto

mostrarPreguntasDe('compras')

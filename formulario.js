
// formulario.js — Validación del formulario de contacto

// Se selecciona el formulario y el toast (mensaje de confirmación)
const formulario = document.getElementById('contactForm')
const toast = document.getElementById('toast')

// FUNCIÓN: Mostrar un error debajo de un campo

// campo: el id del input (ej: 'nombre')
// mensaje: el texto del error (ej: 'Ingresá tu nombre.')
function mostrarError(campo, mensaje) {
    const input = document.getElementById(campo)
    const spanError = document.getElementById('error-' + campo)

    // Se busca el div padre (.campo_grupo) para aplicarle estilos de error
    let grupo = null
    if (input !== null) {
        grupo = input.closest('.campo_grupo')
    }

    // Se agrega la clase que pone el borde rojo
    if (input !== null) {
        input.classList.add('campo_con_error')
    }
    if (grupo !== null) {
        grupo.classList.add('grupo_con_error')
    }

    // Se muestra el texto del error
    if (spanError !== null) {
        spanError.textContent = mensaje
    }
}

// FUNCIÓN: Limpiar el error de un campo

// Se usa cuando el usuario empieza a escribir (para que el
// error desaparezca en cuanto empieza a corregirlo)
function limpiarError(campo) {
    const input = document.getElementById(campo)
    const spanError = document.getElementById('error-' + campo)

    let grupo = null
    if (input !== null) {
        grupo = input.closest('.campo_grupo')
    }

    if (input !== null) {
        input.classList.remove('campo_con_error')
    }
    if (grupo !== null) {
        grupo.classList.remove('grupo_con_error')
    }
    if (spanError !== null) {
        spanError.textContent = ''
    }
}

// FUNCIÓN: Verificar si un email tiene formato válido

/**  Se utiliza una expresión regular (regex) para chequear que tenga
     algo@algo.algo — no garantiza que el email exista, solo que
     tiene el formato correcto
 */
function esEmailValido(email) {
    // El regex busca: texto + @ + texto + . + texto
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
}

// FUNCIÓN: Verificar si un teléfono tiene al menos 8 dígitos

function esTelefonoValido(telefono) {
    // replace(/\D/g, '') elimina todo lo que NO sea dígito
    // así "299 422-0000" se convierte en "2994220000" (10 dígitos)
    const soloDigitos = telefono.replace(/\D/g, '')
    return soloDigitos.length >= 8
}


// Se busca si el usuario prefiere ser contactado por teléfono

// Si elige "Por teléfono", el campo de teléfono pasa a ser obligatorio

const radiosContacto = document.querySelectorAll('input[name="contacto_preferido"]')
const labelOpcional = document.getElementById('telefono-opcional')

// Se devuelve true si está seleccionado "Por teléfono"
function prefiereTelefono() {
    const radioMarcado = document.querySelector('input[name="contacto_preferido"]:checked')
    if (radioMarcado === null) {
        return false
    }
    return radioMarcado.value === 'telefono'
}

// Se muestra u oculta el texto "(opcional)" según la preferencia
function actualizarEtiquetaTelefono() {
    if (labelOpcional === null) {
        return
    }
    if (prefiereTelefono()) {
        labelOpcional.textContent = ''       // es obligatorio → no decimos "opcional"
    } else {
        labelOpcional.textContent = '(opcional)'
    }
}

// Cada vez que cambia la selección de radio, actualizamos la etiqueta
radiosContacto.forEach(function(radio) {
    radio.addEventListener('change', function() {
        actualizarEtiquetaTelefono()
        limpiarError('telefono')
    })
})

// Se ejecuta al cargar para que empiece con el estado correcto
actualizarEtiquetaTelefono()



// EVENTO PRINCIPAL: Submit del formulario

formulario.addEventListener('submit', function(evento) {

    // Prevenimos que la página se recargue (comportamiento por defecto del form)
    evento.preventDefault()

    // Variable que se va poniendo en false si encontramos algún error
    let formularioEsValido = true

    // Se limpian todos los errores anteriores antes de volver a validar
    const camposAValidar = ['nombre', 'apellido', 'email', 'telefono', 'asunto', 'mensaje', 'terminos']
    for (let i = 0; i < camposAValidar.length; i++) {
        limpiarError(camposAValidar[i])
    }

    // --- Leer los valores de cada campo ---
    const nombre   = document.getElementById('nombre').value.trim()
    const apellido = document.getElementById('apellido').value.trim()
    const email    = document.getElementById('email').value.trim()
    const telefono = document.getElementById('telefono').value.trim()
    const asunto   = document.getElementById('asunto').value
    const mensaje  = document.getElementById('mensaje').value.trim()
    const terminos = document.getElementById('terminos').checked   // true o false

    // --- Validar cada campo ---

    // Nombre: no puede estar vacío
    if (nombre === '') {
        mostrarError('nombre', 'Ingresá tu nombre.')
        formularioEsValido = false
    }

    // Apellido: no puede estar vacío
    if (apellido === '') {
        mostrarError('apellido', 'Ingresá tu apellido.')
        formularioEsValido = false
    }

    // Email: obligatorio y con formato válido
    if (email === '') {
        mostrarError('email', 'Ingresá tu correo electrónico.')
        formularioEsValido = false
    } else if (!esEmailValido(email)) {
        mostrarError('email', 'El correo no tiene un formato válido.')
        formularioEsValido = false
    }

    // Teléfono: obligatorio solo si eligió contacto por teléfono
    if (prefiereTelefono() && telefono === '') {
        mostrarError('telefono', 'Elegiste que te contactemos por teléfono: ingresá un número.')
        formularioEsValido = false
    } else if (telefono !== '' && !esTelefonoValido(telefono)) {
        // Si escribió algo pero no tiene suficientes dígitos
        mostrarError('telefono', 'Ese teléfono no parece válido, por favor, ingresá uno que sí lo sea.')
        formularioEsValido = false
    }

    // Asunto: debe seleccionarse una opción del select
    if (asunto === '') {
        mostrarError('asunto', 'Seleccioná un asunto.')
        formularioEsValido = false
    }

    // Mensaje: obligatorio y con al menos 10 caracteres
    if (mensaje === '') {
        mostrarError('mensaje', 'Escribí tu mensaje.')
        formularioEsValido = false
    } else if (mensaje.length < 10) {
        mostrarError('mensaje', 'El mensaje es demasiado corto.')
        formularioEsValido = false
    }

    // Términos: el checkbox debe estar tildado
    if (!terminos) {
        mostrarError('terminos', 'Tenés que aceptar los términos para continuar.')
        formularioEsValido = false
    }

    // --- Si hay algún error, detenemos el envío ---
    if (!formularioEsValido) {
        return   // sale de la función sin hacer nada más
    }

    // --- Si todo está bien, simulamos el envío ---
    const botonEnviar = formulario.querySelector('.btn_enviar')
    botonEnviar.textContent = 'Enviando...'
    botonEnviar.disabled = true

    // setTimeout ejecuta una función después de X milisegundos
    // Aca se simula que el servidor tardó 1.2 segundos en responder
    setTimeout(function() {

        // Limpiamos el formulario
        formulario.reset()
        actualizarEtiquetaTelefono()

        // Restauramos el botón
        botonEnviar.textContent = 'Enviar mensaje'
        botonEnviar.disabled = false

        // Mostramos el toast de confirmación
        toast.classList.remove('toast--oculto')

        // Se oculta de nuevo después de 4 segundos
        setTimeout(function() {
            toast.classList.add('toast--oculto')
        }, 4000)

    }, 1200)
})



// Limpiar errores mientras el usuario escribe

// Para cada campo, al detectar que el usuario escribe (evento 'input'),
// limpiamos el error de ese campo para no frustrarlo
const camposConLimpiador = ['nombre', 'apellido', 'email', 'telefono', 'asunto', 'mensaje']

for (let i = 0; i < camposConLimpiador.length; i++) {
    const campo = camposConLimpiador[i]
    const elemento = document.getElementById(campo)

    // Se usa una función autoejecutable para "capturar" el valor de campo
    // en cada iteración del for (de lo contrario todos usarían el último valor)
    if (elemento !== null) {
        elemento.addEventListener('input', (function(nombreCampo) {
            return function() {
                limpiarError(nombreCampo)
            }
        })(campo))
    }
}

// El checkbox de términos también limpia su error al hacer clic
const checkTerminos = document.getElementById('terminos')
if (checkTerminos !== null) {
    checkTerminos.addEventListener('change', function() {
        limpiarError('terminos')
    })
}

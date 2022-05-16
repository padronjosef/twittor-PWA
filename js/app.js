if (navigator.serviceWorker) {
  const url = window.location.href
  const swLocation = url.includes('localhost')
    ? swLocation = '/sw.js'
    : 'twittor-PWA/sw.js'

  navigator.serviceWorker.register(swLocation)
}

// Referencias de jQuery
let titulo = $('#titulo')
let nuevoBtn = $('#nuevo-btn')
let salirBtn = $('#salir-btn')
let cancelarBtn = $('#cancel-btn')
let postBtn = $('#post-btn')
let avatarSel = $('#seleccion')
let timeline = $('#timeline')

let modal = $('#modal')
let modalAvatar = $('#modal-avatar')
let avatarBtns = $('.seleccion-avatar')
let txtMensaje = $('#txtMensaje')

// El usuario, contiene el ID del héroe seleccionado
let usuario

// ===== Codigo de la aplicación
function crearMensajeHTML(mensaje, personaje) {
  let content = `
  <li class="animated fadeIn fast">
    <div class="bubble-container">
      <div class="arrow arrow-reverse"></div>
      <div class="bubble">
        <h3>@${personaje}</h3>
        <br/>
        ${mensaje}
      </div>
    </div>
    <div class="avatar">
      <img src="img/avatars/${personaje}.jpg">
    </div>
  </li>
  `
  timeline.prepend(content)
  cancelarBtn.click()
}

// Globals
function logIn(ingreso) {
  if (ingreso) {
    nuevoBtn.removeClass('oculto')
    salirBtn.removeClass('oculto')
    timeline.removeClass('oculto')
    avatarSel.addClass('oculto')
    modalAvatar.attr('src', 'img/avatars/' + usuario + '.jpg')
  } else {
    nuevoBtn.addClass('oculto')
    salirBtn.addClass('oculto')
    timeline.addClass('oculto')
    avatarSel.removeClass('oculto')
    titulo.text('Seleccione Personaje')
  }
}

// Seleccion de personaje
avatarBtns.on('click', function () {
  usuario = $(this).data('user')
  titulo.text('@' + usuario)
  logIn(true)
})

// Boton de salir
salirBtn.on('click', () => logIn(false))

// Boton de nuevo mensaje
nuevoBtn.on('click', () => {
  modal.removeClass('oculto')
  modal.animate({
    marginTop: '-=1000px',
    opacity: 1
  }, 200)
})

// Boton de cancelar mensaje
cancelarBtn.on('click', () => {
  modal.animate({
    marginTop: '+=1000px',
    opacity: 0
  }, 200, () => {
    modal.addClass('oculto')
    txtMensaje.val('')
  })
})

// Boton de enviar mensaje
postBtn.on('click', () => {
  let mensaje = txtMensaje.val()
  console.log("🚀 ~ file: app.js ~ line 93 ~ postBtn.on ~ mensaje", mensaje)
  if (mensaje.length === 0) return cancelarBtn.click()
  crearMensajeHTML(mensaje, usuario)
})
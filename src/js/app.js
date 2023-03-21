const DOM = document;

DOM.addEventListener('DOMContentLoaded', () => {
    iniciarApp();
})

function iniciarApp() {
    navegacionFija();
    crearGaleria();
    scrollNav();
}

function navegacionFija() {
    const barra = DOM.querySelector('.header');
    const sobreFestival = DOM.querySelector('.sobre-festival');
    const body = DOM.querySelector('body')

    window.addEventListener('scroll', () => {
        if (sobreFestival.getBoundingClientRect().bottom < 0) {
            barra.classList.add('fijo');
            body.classList.add('body-scroll')
        } else {
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');
        }
    })
}

function scrollNav() {
    const enlaces = DOM.querySelectorAll('.navegacion-principal a');
    enlaces.forEach(e => {
        e.addEventListener('click', (e) => {
            e.preventDefault();
            const seccionScroll = e.target.attributes.href.value;
            const seccion = DOM.querySelector(seccionScroll);

            seccion.scrollIntoView({
                behavior: "smooth"
            })
        })
    })
}

function crearGaleria() {
    const galeria = DOM.querySelector('.galeria-imagenes')
    for (let i = 1; i <= 12; i++) {
        const img = DOM.createElement('picture')
        img.innerHTML = `
                <source srcset="build/img/thumb/${i}.avif" type="image/avif">
                <source srcset="build/img/thumb/${i}.webp" type="image/webp">

                <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="Imagen galeria">`;

        img.onclick = () => {
            mostrarImagen(i);
        }
        galeria.appendChild(img);
    }
}


function mostrarImagen(id) {
    const img = DOM.createElement('picture')
    img.innerHTML = `
            <source srcset="build/img/grande/${id}.avif" type="image/avif">
            <source srcset="build/img/grande/${id}.webp" type="image/webp">

            <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="Imagen ${id} galeria">`;


    // Crea el overlay con la imagen
    const overlay = DOM.createElement('DIV');
    overlay.appendChild(img);
    overlay.classList.add('overlay');
    overlay.onclick = () => {
        overlay.remove();
        const body = DOM.querySelector('body');
        body.classList.remove('fijar-body');
    }


    // Boton para cerrar el modal
    const cerrarModal = DOM.createElement('P');
    cerrarModal.textContent = 'X';
    cerrarModal.title = 'Cerrar Imagen';
    cerrarModal.classList.add('btn-cerrar');
    cerrarModal.onclick = () => {
        overlay.remove();
        const body = DOM.querySelector('body');
        body.classList.remove('fijar-body');
    }
    overlay.appendChild(cerrarModal);

    // Añade el overlay al html
    const body = DOM.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');
}
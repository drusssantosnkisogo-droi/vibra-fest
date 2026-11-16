
/* =================================
   VIBRA FEST - FUNCIONALIDADES
================================= */

/* =================================
   MENÚ MÓVIL
================================= */

const botonMenu = document.querySelector('.menu-movil');
const menuPrincipal = document.querySelector('#menu-principal');

if (botonMenu && menuPrincipal) {

    botonMenu.addEventListener('click', () => {

        menuPrincipal.classList.toggle('activo');

        const abierto = menuPrincipal.classList.contains('activo');

        botonMenu.setAttribute('aria-expanded', abierto);

        botonMenu.textContent = abierto ? '✕' : '☰';

        botonMenu.setAttribute(
            'aria-label',
            abierto ? 'Cerrar menú' : 'Abrir menú'
        );

    });

    // Cerrar el menú al seleccionar un enlace

    menuPrincipal.querySelectorAll('a').forEach(enlace => {

        enlace.addEventListener('click', () => {

            menuPrincipal.classList.remove('activo');

            botonMenu.setAttribute('aria-expanded', 'false');

            botonMenu.textContent = '☰';

            botonMenu.setAttribute(
                'aria-label',
                'Abrir menú'
            );

        });

    });

}

/* =================================
   SISTEMA DE FAVORITOS
================================= */

const botonesFavoritos = document.querySelectorAll('.boton-favorito');

const CLAVE_FAVORITOS = 'vibrafest_favoritos';

// Recuperar favoritos guardados

function obtenerFavoritos() {

    try {

        const guardados = localStorage.getItem(CLAVE_FAVORITOS);

        const favoritos = guardados ? JSON.parse(guardados) : [];

        return Array.isArray(favoritos) ? favoritos : [];

    } catch (error) {

        return [];

    }

}

// Guardar favoritos

function guardarFavoritos(favoritos) {

    try {

        localStorage.setItem(
            CLAVE_FAVORITOS,
            JSON.stringify(favoritos)
        );

    } catch (error) {

        console.warn('No se pudieron guardar los favoritos.');

    }

}

// Actualizar apariencia de cada botón

function actualizarBoton(boton, activo) {

    boton.classList.toggle('activo', activo);

    boton.setAttribute('aria-pressed', String(activo));

    boton.textContent = activo ? '♥' : '♡';

    boton.setAttribute(
        'aria-label',
        activo ? 'Quitar de favoritos' : 'Añadir a favoritos'
    );

}

// Cargar favoritos al abrir la página

let favoritos = obtenerFavoritos();

botonesFavoritos.forEach(boton => {

    const tarjeta = boton.closest('.tarjeta-artista');

    const nombreArtista = tarjeta.querySelector('h3').textContent.trim();

    actualizarBoton(
        boton,
        favoritos.includes(nombreArtista)
    );

});

// Añadir o quitar favoritos al pulsar

botonesFavoritos.forEach(boton => {

    boton.addEventListener('click', () => {

        const tarjeta = boton.closest('.tarjeta-artista');

        const nombreArtista = tarjeta.querySelector('h3').textContent.trim();

        const activo = !boton.classList.contains('activo');

        if (activo) {

            if (!favoritos.includes(nombreArtista)) {

                favoritos.push(nombreArtista);

            }

        } else {

            favoritos = favoritos.filter(
                artista => artista !== nombreArtista
            );

        }

        actualizarBoton(boton, activo);

        guardarFavoritos(favoritos);

    });

});

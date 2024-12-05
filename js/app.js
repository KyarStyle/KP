// Selección de elementos
const menu = document.querySelector('.hamburguesa');
const navegacion = document.querySelector('.navegacion');
const imagenes = document.querySelectorAll('img');
const btnTodos = document.querySelector('.todos');
const btnEnsaladas = document.querySelector('.ensaladas');
const btnPasta = document.querySelector('.pasta');
const btnPizza = document.querySelector('.pizza');
const btnPostres = document.querySelector('.postres');
const btnPromo = document.querySelector('.promo'); // Botón de Promos Navideñas
const contenedorPlatillos = document.querySelector('.platillos');


// Arreglo global para almacenar los platillos
let platillosArreglo = [];

// Eventos principales
document.addEventListener('DOMContentLoaded', () => {
    configurarEventos();
    cargarPlatillos();
});

// Configuración de eventos
const configurarEventos = () => {
    menu.addEventListener('click', abrirMenu);
    // Agregar eventos de clic y touch para asegurar compatibilidad en móviles
    btnPromo.addEventListener('click', mostrarPromos);
    btnPromo.addEventListener('touchstart', mostrarPromos);
};

// Función para abrir el menú de navegación
const abrirMenu = () => {
    navegacion.classList.remove('ocultar'); // Mostrar navegación
    agregarBotonCerrar();
};

// Agregar botón de cierre al menú
const agregarBotonCerrar = () => {
    const btnCerrar = document.createElement('p');
    const overlay = document.createElement('div');
    overlay.classList.add('pantalla-completa');

    const body = document.querySelector('body');
    if (document.querySelectorAll('.pantalla-completa').length > 0) return;

    body.appendChild(overlay);
    btnCerrar.textContent = 'x';
    btnCerrar.classList.add('btn-cerrar');
    navegacion.appendChild(btnCerrar);

    cerrarMenu(btnCerrar, overlay);
};

// Función para cerrar el menú
const cerrarMenu = (boton, overlay) => {
    boton.addEventListener('click', () => {
        navegacion.classList.add('ocultar');
        overlay.remove();
        boton.remove();
    });

    overlay.addEventListener('click', () => {
        navegacion.classList.add('ocultar');
        overlay.remove();
        boton.remove();
    });
};

// Cargar imágenes con IntersectionObserver (Lazy Loading)
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const imagen = entry.target;
            imagen.src = imagen.dataset.src; // Cargar imagen
            observer.unobserve(imagen);
        }
    });
});

imagenes.forEach((imagen) => {
    observer.observe(imagen);
});

// Cargar y organizar los platillos
const cargarPlatillos = () => {
    const platillos = document.querySelectorAll('.platillo');
    platillosArreglo = Array.from(platillos); // Actualiza el arreglo global

    const ensaladas = platillosArreglo.filter((platillo) => platillo.getAttribute('data-platillo') === 'ensalada');
    const pastas = platillosArreglo.filter((platillo) => platillo.getAttribute('data-platillo') === 'pasta');
    const pizzas = platillosArreglo.filter((platillo) => platillo.getAttribute('data-platillo') === 'pizza');
    const postres = platillosArreglo.filter((platillo) => platillo.getAttribute('data-platillo') === 'postre');
    const promos = platillosArreglo.filter((platillo) => platillo.getAttribute('data-platillo') === 'promo');

    configurarBotones({ ensaladas, pastas, pizzas, postres, promos, todos: platillosArreglo });
};



// Configurar botones de filtro
const configurarBotones = ({ ensaladas, pastas, pizzas, postres, promos, todos }) => {
    btnEnsaladas.addEventListener('click', () => mostrarPlatillos(ensaladas));
    btnPasta.addEventListener('click', () => mostrarPlatillos(pastas));
    btnPizza.addEventListener('click', () => mostrarPlatillos(pizzas));
    btnPostres.addEventListener('click', () => mostrarPlatillos(postres));
    btnPromo.addEventListener('click', () => mostrarPlatillos(promos)); // Usa directamente la función genérica
    btnTodos.addEventListener('click', () => mostrarPlatillos(todos));
};


// Mostrar platillos filtrados
const mostrarPlatillos = (platillos) => {
    limpiarHtml(contenedorPlatillos); // Limpia el contenedor
    platillos.forEach((platillo) => contenedorPlatillos.appendChild(platillo)); // Muestra los nuevos platillos

    // Asegurarse de que el contenedor esté visible en dispositivos móviles
    contenedorPlatillos.scrollIntoView({ behavior: 'smooth', block: 'start' });
};


// Limpiar el contenedor de platillos
const limpiarHtml = (contenedor) => {
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }
};

// Mostrar promos navideñas (función separada para claridad)
const mostrarPromos = (e) => {
    e.preventDefault(); // Previene comportamientos no deseados

    // Filtrar las promos directamente del arreglo global
    const promos = platillosArreglo.filter((platillo) => platillo.getAttribute('data-platillo') === 'promo');
    
    limpiarHtml(contenedorPlatillos); // Limpia el contenedor
    promos.forEach((platillo) => contenedorPlatillos.appendChild(platillo)); // Muestra las promos
    contenedorPlatillos.scrollIntoView({ behavior: 'smooth', block: 'start' }); // Scroll automático
};


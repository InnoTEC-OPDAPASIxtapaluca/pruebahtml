// js/dashboard.js - VERSION RESPONSIVE COMPLETA

// Datos de las opciones principales
const mainOptions = [
    { id: 1, name: "Almacen", icon: "fas fa-warehouse", desc: "Gestión de almacenes y inventarios" },
    { id: 2, name: "Almacen a Usuario", icon: "fas fa-user-tag", desc: "Asignación de recursos a usuarios" },
    { id: 3, name: "Canales de Cielo Abierto", icon: "fas fa-water", desc: "Control de canales abiertos" },
    { id: 4, name: "Cargamos", icon: "fas fa-truck-loading", desc: "Sistema de carga y transporte" },
    { id: 5, name: "Dashboard", icon: "fas fa-tachometer-alt", desc: "Panel de control principal" },
    { id: 6, name: "Dreanje", icon: "fas fa-water", desc: "Sistema de drenaje" },
    { id: 7, name: "Linea de Agua", icon: "fas fa-ruler-combined", desc: "Monitoreo de líneas de agua" },
    { id: 8, name: "Pipas", icon: "fas fa-truck", desc: "Control de pipas de agua" },
    { id: 9, name: "Plantas", icon: "fas fa-industry", desc: "Gestión de plantas de tratamiento" },
    { id: 10, name: "Plantas de dimentadoras", icon: "fas fa-seedling", desc: "Control de plantas reguladoras" },
    { id: 11, name: "Pozos", icon: "fas fa-oil-well", desc: "Monitoreo de pozos de agua" },
    { id: 12, name: "Pozos de absorción", icon: "fas fa-filter", desc: "Control de pozos absorbentes" },
    { id: 13, name: "Presas de Gavion", icon: "fas fa-dam", desc: "Gestión de presas de gavión" },
    { id: 14, name: "Tanques", icon: "fas fa-droplet", desc: "Monitoreo de tanques de almacenamiento" },
    { id: 15, name: "Válvulas", icon: "fas fa-faucet", desc: "Control de válvulas del sistema" },
    { id: 16, name: "Zonas de Inundación", icon: "fas fa-house-flood-water", desc: "Monitoreo de zonas inundables" }
];

// Datos de las páginas HTML
const optionPages = {
    1: "almacen.html",
    2: "almacen-usuario.html",
    3: "canales-cielo-abierto.html",
    4: "cargamos.html",
    5: "dashboard.html",
    6: "dreanje.html",
    7: "linea-agua.html",
    8: "pipas.html",
    9: "plantas.html",
    10: "plantas-dimentadoras.html",
    11: "pozos.html",
    12: "pozos-absorcion.html",
    13: "presas-gavion.html",
    14: "tanques.html",
    15: "valvulas.html",
    16: "zonas-inundacion.html"
};

// Variables para paginación móvil
let currentPage = 1;
let cardsPerPage = 4;
let totalPages = 1;

// Función para calcular cards por página según el tamaño de pantalla
function calculateCardsPerPage() {
    const width = window.innerWidth;
    
    if (width >= 1200) {
        return 16; // Todas las tarjetas en pantallas grandes
    } else if (width >= 992) {
        return 12; // 3x4 en tablets grandes
    } else if (width >= 768) {
        return 9; // 3x3 en tablets
    } else if (width >= 600) {
        return 8; // 2x4 en móviles grandes
    } else if (width >= 480) {
        return 4; // 1x4 en móviles medianos
    } else {
        return 4; // 1x4 en móviles pequeños
    }
}

// Función para crear las tarjetas de opciones
function createOptionCards() {
    const grid = document.getElementById('optionsGrid');
    grid.innerHTML = '';
    
    // Calcular índice inicial y final para la página actual
    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = Math.min(startIndex + cardsPerPage, mainOptions.length);
    
    // Crear tarjetas para la página actual
    for (let i = startIndex; i < endIndex; i++) {
        const option = mainOptions[i];
        if (!option) continue;
        
        const card = document.createElement('div');
        card.className = 'option-card';
        card.setAttribute('data-id', option.id);
        
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">
                    <div class="card-icon">
                        <i class="${option.icon}"></i>
                    </div>
                    <h3 class="card-title">${option.name}</h3>
                </div>
                <div class="card-back">
                    <h3 class="card-back-title">${option.name}</h3>
                    <p class="card-back-desc">${option.desc}</p>
                    <button class="card-btn" onclick="redirectToPage(${option.id})" aria-label="Ingresar a ${option.name}">
                        <i class="fas fa-sign-in-alt"></i> <span>Ingresar</span>
                    </button>
                </div>
            </div>
        `;
        
        grid.appendChild(card);
    }
    
    // Actualizar paginación
    updatePagination();
}

// Función para actualizar la paginación
function updatePagination() {
    totalPages = Math.ceil(mainOptions.length / cardsPerPage);
    
    const currentPageEl = document.getElementById('currentPage');
    const totalPagesEl = document.getElementById('totalPages');
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    const pagination = document.querySelector('.mobile-pagination');
    
    if (currentPageEl) currentPageEl.textContent = currentPage;
    if (totalPagesEl) totalPagesEl.textContent = totalPages;
    
    // Mostrar/ocultar paginación según sea necesario
    if (pagination) {
        pagination.style.display = totalPages > 1 ? 'flex' : 'none';
    }
    
    // Habilitar/deshabilitar botones
    if (prevBtn) {
        prevBtn.disabled = currentPage === 1;
        prevBtn.style.opacity = currentPage === 1 ? '0.5' : '1';
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.style.opacity = currentPage === totalPages ? '0.5' : '1';
    }
}

// Función para redirigir a la página correspondiente
function redirectToPage(optionId) {
    const page = optionPages[optionId];
    if (page) {
        // Usar una ruta relativa a tu estructura
        window.location.href = `pages/${page}`;
    } else {
        alert(`La página para ${mainOptions.find(o => o.id === optionId)?.name} aún no está disponible.`);
    }
}

// Función para cargar el nombre del usuario
function loadUserName() {
    // Aquí puedes obtener el nombre del usuario de tu sistema de login
    // Por ahora usaremos un valor por defecto
    const username = localStorage.getItem('username') || 'Jefe de Departamento';
    document.getElementById('username').textContent = username;
}

// Función para manejar el logout
function setupLogout() {
    const logoutBtn = document.querySelector('.logout-btn');
    logoutBtn.addEventListener('click', function() {
        if (confirm('¿Está seguro que desea salir del sistema?')) {
            localStorage.removeItem('username');
            window.location.href = 'index.html'; // Cambia a tu página de login
        }
    });
}

// Función para manejar el menú activo
function setupActiveMenu() {
    const menuLinks = document.querySelectorAll('.menu-link, .modal-menu-item');
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            menuLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Cerrar modal si está abierto
            closeMobileMenu();
        });
    });
}

// Función para manejar menú móvil
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const modal = document.getElementById('mobileMenuModal');
    const modalClose = document.getElementById('modalClose');
    
    if (mobileMenuBtn && modal) {
        mobileMenuBtn.addEventListener('click', () => {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (modalClose && modal) {
        modalClose.addEventListener('click', closeMobileMenu);
    }
    
    // Cerrar modal al hacer clic fuera
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeMobileMenu();
            }
        });
    }
}

function closeMobileMenu() {
    const modal = document.getElementById('mobileMenuModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Función para manejar paginación móvil
function setupPagination() {
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                createOptionCards();
                scrollToTop();
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                createOptionCards();
                scrollToTop();
            }
        });
    }
}

// Función para hacer scroll suave al top
function scrollToTop() {
    window.scrollTo({
        top: document.querySelector('.dashboard-main').offsetTop - 20,
        behavior: 'smooth'
    });
}

// Función para manejar el responsive
function handleResponsive() {
    const newCardsPerPage = calculateCardsPerPage();
    
    if (newCardsPerPage !== cardsPerPage) {
        cardsPerPage = newCardsPerPage;
        currentPage = 1; // Resetear a primera página
        createOptionCards();
    }
}

// Función para configurar interacciones táctiles
function setupTouchInteractions() {
    // Para dispositivos táctiles, usar click en lugar de hover
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        const cards = document.querySelectorAll('.option-card');
        
        cards.forEach(card => {
            let isFlipped = false;
            
            card.addEventListener('click', (e) => {
                // No voltear si se hizo clic en el botón
                if (e.target.closest('.card-btn')) return;
                
                const inner = card.querySelector('.card-inner');
                isFlipped = !isFlipped;
                inner.style.transform = isFlipped ? 'rotateY(180deg)' : 'rotateY(0)';
            });
        });
    }
}

// Inicialización cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    // Calcular cards por página inicial
    cardsPerPage = calculateCardsPerPage();
    
    // Crear tarjetas iniciales
    createOptionCards();
    
    // Configurar funcionalidades
    loadUserName();
    setupLogout();
    setupActiveMenu();
    setupMobileMenu();
    setupPagination();
    setupTouchInteractions();
    
    // Configurar eventos de redimensionamiento
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleResponsive, 250);
    });
    
    // Efecto de carga suave
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Asegurar que el body tenga opacidad 0 inicialmente para la transición
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';

// Detectar si es un dispositivo táctil para ajustar comportamientos
if ('ontouchstart' in window) {
    document.documentElement.classList.add('touch-device');
} else {
    document.documentElement.classList.add('no-touch-device');
}
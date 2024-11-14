document.addEventListener('DOMContentLoaded', () => {
    const parametrizacionBtn = document.getElementById('parametrizacion-btn');
    const backgroundGrid = document.createElement('div');
    backgroundGrid.classList.add('background-grid');
    document.body.appendChild(backgroundGrid);

    const halo = document.createElement('div');
    halo.classList.add('halo');
    document.body.appendChild(halo);


    parametrizacionBtn.addEventListener('click', () => {
        parametrizacionBtn.classList.toggle('show'); // Alterna la clase 'show' para mostrar/ocultar el menú
    });
    
    // Cerrar el menú si se hace clic fuera de parametrización
    document.addEventListener('click', (event) => {
        if (!parametrizacionBtn.contains(event.target)) {
            parametrizacionBtn.classList.remove('show');
        }
    });
    

    // Actualizar la posición del halo en función de la posición del mouse
    document.addEventListener('mousemove', (event) => {
        const x = event.clientX;
        const y = event.clientY;

        // Posicionar el halo en función de la posición del cursor
        halo.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 40px)`;
    });

    const icons = document.querySelectorAll('.icon');

    icons.forEach((icon, index) => {
        icon.addEventListener('mouseover', () => {
   
            icon.style.transform = 'scale(1.2)';
            icon.style.margin ='0 10px';
            const tooltip = icon.querySelector('.tooltip');
            tooltip.style.opacity = '1';
            
            // Agrandar los íconos adyacentes
            if (icons[index - 1]) {
                icons[index - 1].style.transform = 'scale(1.05)';
            }
            if (icons[index + 1]) {
                icons[index + 1].style.transform = 'scale(1.05)';
            }
        });

        icon.addEventListener('mouseout', () => {
            // Restaurar el tamaño original de todos los íconos al quitar el mouse
            icons.forEach(i => i.style.transform = 'scale(1)');
            icons.forEach(i => i.style.margin ='0 5px');
            const tooltip = icon.querySelector('.tooltip');
            tooltip.style.opacity = '0';
        
        });
    });
});

function toggleMenu() {
    const sidebarMenu = document.getElementById('sidebarMenu');
    const menuButton = document.querySelector('.menu-button');
    const isMenuVisible = sidebarMenu.style.left === '0px';

    sidebarMenu.style.left = isMenuVisible ? '-270px' : '0px';
    
    // Cambia el color del botón y oculta la barra central al desplegar el menú
    if (isMenuVisible) {
        menuButton.classList.remove('active');
    } else {
        menuButton.classList.add('active');
    }
}

// Cierra el menú si se hace clic fuera de él
document.addEventListener('click', (event) => {
    const sidebarMenu = document.getElementById('sidebarMenu');
    const button = document.querySelector('.menu-button');
    if (!button.contains(event.target) && !sidebarMenu.contains(event.target)) {
        sidebarMenu.style.left = '-270px'; // Cierra el menú completamente fuera de la pantalla
        button.classList.remove('active'); // Remueve la clase activa del botón
    }
});





document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.icon').forEach((icon, index) => {
        icon.addEventListener('click', () => {
            switch(index) {
                case 0:
                    window.location.href = '../menuinicio.html';
                    break;
                case 1:
                    window.location.href = '../ventas/menuventas.html';
                    break;
                case 2:
                    window.location.href = '../inventario/inventariovista.html';
                    break;
                case 3:
                    break;
                case 4:
                        window.location.href = '../usuarios/creacionusuarios.html';
                    break;
            }
        });
    });
});

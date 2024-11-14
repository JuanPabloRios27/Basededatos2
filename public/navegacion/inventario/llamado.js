let currentPage = 1;
const limit = 10;
let totalPages = 1;

document.addEventListener('DOMContentLoaded', () => {
    actualizarInventario(); 
    setupSearchEvent(); 
});

function actualizarInventario() {
    const searchValue = document.getElementById('buscar').value;

    fetch(`/api/inventario/buscar?buscar=${searchValue}&page=${currentPage}&limit=${limit}`)
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById('inventarioTable').querySelector('tbody');
            tbody.innerHTML = ''; 

            data.items.forEach(item => {
                const row = document.createElement('tr');
                
                row.innerHTML = `
                    <td>${item.inventario_id}</td>
                    <td>${item.producto_id}</td>
                    <td>${item.nombre}</td>
                    <td>${item.descripcion}</td>
                    <td>${item.cantidad_disponible}</td>
                `;

                tbody.appendChild(row);
            });

           
            totalPages = Math.ceil(data.total / limit);
            document.getElementById('currentRecord').value = currentPage;
            document.getElementById('recordCount').textContent = `de ${totalPages}`;
        })
        .catch(error => console.error('Error al cargar el inventario:', error));
}


function setupSearchEvent() {
    const searchInput = document.getElementById('buscar');
    const searchButton = document.querySelector('button[onclick="actualizarInventario()"]');

    
    searchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            currentPage = 1;
            actualizarInventario();
        }
    });

   
    searchButton.addEventListener('click', () => {
        currentPage = 1;
        actualizarInventario();
    });
}

document.getElementById('prevRecordBtn').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        actualizarInventario();
    }
});


document.getElementById('nextRecordBtn').addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        actualizarInventario();
    }
});

document.addEventListener("DOMContentLoaded", function() {
    cargarProveedores();
});

function mostrarFormulario(formulario) {
    document.querySelectorAll('.formulario').forEach(form => form.classList.remove('activo'));
    document.querySelectorAll('.tab-button').forEach(tab => tab.classList.remove('active'));

    if (formulario === 'producto') {
        document.getElementById('formProducto').classList.add('activo');
        document.querySelector('.tab-button:nth-child(1)').classList.add('active');
        cargarProveedores();
    } else if (formulario === 'proveedor') {
        document.getElementById('formProveedor').classList.add('activo');
        document.querySelector('.tab-button:nth-child(2)').classList.add('active');
    }
}

function cargarProveedores() {
    fetch('/api/proveedores/busc')
        .then(response => response.json())
        .then(data => {
            const proveedorSelect = document.getElementById('proveedor_id');
            proveedorSelect.innerHTML = ''; 
            data.forEach(proveedor => {
                const option = document.createElement('option');
                option.value = proveedor.proveedor_id;
                option.textContent = proveedor.nombre;
                proveedorSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error al cargar los proveedores:', error));
}

function crearProducto() {
    const productoData = {
        proveedor_id: document.getElementById('proveedor_id').value,
        nombre_producto: document.getElementById('nombre_producto').value,
        descripcion: document.getElementById('descripcion').value || '',
        precio_unitario: parseFloat(document.getElementById('precio_unitario').value),
        fecha_vencimiento: document.getElementById('fecha_vencimiento').value,
        codigo_barras: document.getElementById('codigo_barras').value
    };

    if (!productoData.proveedor_id || !productoData.nombre_producto || isNaN(productoData.precio_unitario)) {
        alert('Por favor, complete todos los campos requeridos.');
        return;
    }

    fetch('/api/productos/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productoData)
    })
    .then(response => response.json())
    .then(result => {
        if (result.error) {
            alert('Error al crear el producto: ' + result.error);
        } else {
            alert(result.message);
        }
    })
    .catch(error => console.error('Error al crear el producto:', error));
}

function crearProveedor() {
    const proveedorData = {
        nombre: document.getElementById('nombre_proveedor').value,
        contacto: document.getElementById('contacto_proveedor').value,
        telefono: document.getElementById('telefono_proveedor').value,
        direccion: document.getElementById('direccion_proveedor').value
    };


    if (!proveedorData.nombre || !proveedorData.contacto || !proveedorData.telefono || !proveedorData.direccion) {
        alert('Por favor, complete todos los campos requeridos.');
        return;
    }

    fetch('/api/proveedores/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(proveedorData)
    })
    .then(response => response.json())
    .then(result => {
        if (result.error) {
            alert('Error al crear el proveedor: ' + result.error);
        } else {
            alert(result.message);
            limpiarFormularioProveedor();
        }
    })
    .catch(error => console.error('Error al crear el proveedor:', error));
}
function limpiarFormularioProveedor() {
    document.getElementById('nombre').value = '';
    document.getElementById('contacto').value = '';
    document.getElementById('telefono').value = '';
    document.getElementById('direccion').value = '';
}

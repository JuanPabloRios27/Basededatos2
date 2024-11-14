let totalRecords = 1;
let currentRecord = 1;
let isSimulated = false;

document.addEventListener('DOMContentLoaded', () => {
    obtenerTotalRegistros();

    cargarRegistro(currentRecord);
    document.getElementById('firstRecordBtn').addEventListener('click', () => irAPrimero());
    document.getElementById('prevRecordBtn').addEventListener('click', () => irAPrevio());
    document.getElementById('nextRecordBtn').addEventListener('click', () => irASiguiente());
    document.getElementById('lastRecordBtn').addEventListener('click', () => irAUltimo());
});

// Obtener el total de registros de la base de datos
function obtenerTotalRegistros() {
    fetch('/api/clientes/count')
        .then(response => response.json())
        .then(data => {
            totalRecords = data.total;
            document.getElementById('recordCount').textContent = `de ${totalRecords}`;
        })
        .catch(error => console.error('Error al obtener el total de registros:', error));
}

// Cargar un registro específico
function cargarRegistro(position) {
    fetch(`/api/clientes/get/${position}`)
        .then(response => response.json())
        .then(cliente => {
            if (cliente) {
                document.getElementById('codigo').value = cliente.cliente_id || '';
                document.getElementById('nombre').value = cliente.nombre || '';
                document.getElementById('apellido').value = cliente.apellido || ''; 
                document.getElementById('email').value = cliente.email || ''; 
                document.getElementById('telefono').value = cliente.telefono || '';
                document.getElementById('direccion').value = cliente.direccion || '';
                document.getElementById('estado-civil').value = cliente.estado_civil || '';
                document.getElementById('estado').value = cliente.estado || '';
                document.getElementById('currentRecord').value = position;
                currentRecord = position;
                isSimulated = false;
                deshabilitarEdicion();
            }
        })
        .catch(error => console.error('Error al cargar el registro:', error));
}


function irAPrimero() {
    if (totalRecords > 0) {
        cargarRegistro(1);
    }
}


function irAPrevio() {
    if (currentRecord > 1) {
        cargarRegistro(currentRecord - 1);
    }
}

function irASiguiente() {
    if (currentRecord < totalRecords) {
        cargarRegistro(currentRecord + 1);
    } else if (currentRecord === totalRecords && isSimulated) {
        cargarRegistroSimulado();
    }
}


function irAUltimo() {
    if (totalRecords > 0) {
        cargarRegistro(totalRecords);
    }
}

function actualizarCliente() {
    habilitarEdicion();
}


function crearCliente() {
    isSimulated = true;
    currentRecord = totalRecords + 1;

    limpiarFormulario();
    document.getElementById('codigo').value = ''; 
    document.getElementById('codigo').readOnly = true; 

    document.getElementById('currentRecord').value = currentRecord;
    document.getElementById('recordCount').textContent = `de ${totalRecords + 1}`;
    habilitarEdicion();
}


function guardarCliente() {
    const clienteData = {
        cliente_id: document.getElementById('codigo').value, 
        nombre: document.getElementById('nombre').value.trim(),
        apellido: document.getElementById('apellido').value.trim(),
        email: document.getElementById('email').value.trim(),
        telefono: document.getElementById('telefono').value.trim(),
        direccion: document.getElementById('direccion').value.trim(),
        estado_civil: document.getElementById('estado-civil').value,
        estado: document.getElementById('estado').value
    };

  
    if (!clienteData.cliente_id) {
        fetch('/api/clientes/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clienteData)
        })
        .then(response => response.json())
        .then(result => {
            if (result.error) {
                alert('Error al crear cliente: ' + result.error);
            } else {
                alert(result.message);
                obtenerTotalRegistros();
                cargarRegistro(totalRecords); 
                deshabilitarEdicion(); 
            }
        })
        .catch(error => console.error('Error al crear un nuevo cliente:', error));
    } else {
       
        fetch(`/api/clientes/update/${clienteData.cliente_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clienteData)
        })
        .then(response => response.json())
        .then(result => {
            if (result.error) {
                alert('Error al actualizar cliente: ' + result.error);
            } else {
                alert(result.message);
                deshabilitarEdicion();
            }
        })
        .catch(error => console.error('Error al actualizar el cliente:', error));
    }
}


function eliminarCliente() {
    const clienteId = document.getElementById('codigo').value; 
    if (!clienteId) {
        alert('Seleccione un cliente para eliminar');
        return;
    }

    if (confirm('¿Está seguro de que desea eliminar este cliente?')) {
        fetch(`/api/clientes/delete/${clienteId}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(result => {
            if (result.error) {
                alert('Error al eliminar cliente: ' + result.error);
            } else {
                alert(result.message);
                obtenerTotalRegistros(); 
                cargarRegistro(1); 
            }
        })
        .catch(error => console.error('Error al eliminar el cliente:', error));
    }
}



function deshacer() {
    cargarRegistro(currentRecord);
    deshabilitarEdicion();
}

function habilitarEdicion() {
    document.getElementById('codigo').readOnly = true; 
    document.getElementById('nombre').readOnly = false;
    document.getElementById('apellido').readOnly = false;
    document.getElementById('email').readOnly = false;
    document.getElementById('telefono').readOnly = false;
    document.getElementById('direccion').readOnly = false;
    document.getElementById('estado-civil').disabled = false;
    document.getElementById('estado').disabled = false;
}

function deshabilitarEdicion() {
    document.getElementById('codigo').readOnly = true;
    document.getElementById('nombre').readOnly = true;
    document.getElementById('apellido').readOnly = true;
    document.getElementById('email').readOnly = true;
    document.getElementById('telefono').readOnly = true;
    document.getElementById('direccion').readOnly = true;
    document.getElementById('estado-civil').disabled = true;
    document.getElementById('estado').disabled = true;
}


function limpiarFormulario() {
    document.getElementById('codigo').value = ''; 
    document.getElementById('nombre').value = '';
    document.getElementById('apellido').value = '';
    document.getElementById('email').value = '';
    document.getElementById('telefono').value = '';
    document.getElementById('direccion').value = '';
    document.getElementById('estado-civil').value = 'Soltero';
    document.getElementById('estado').value = 'Activo';
}

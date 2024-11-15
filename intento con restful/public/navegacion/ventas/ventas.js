document.addEventListener("DOMContentLoaded", function () {
    const realizarPagoBtn = document.getElementById("realizarPagoBtn");
    const realizarPagoModal = document.getElementById("realizarPagoModal");
    const cerrarModalBtn = document.getElementById("cerrarModalBtn");
    const generarFacturaBtn = document.getElementById("generarFacturaBtn");
    const generarVentaBtn = document.getElementById("generarVentaBtn");

    realizarPagoBtn.addEventListener("click", () => {
        realizarPagoModal.style.display = "block";
        cargarClientes();
        establecerFechas();
    });

    
    cerrarModalBtn.addEventListener("click", () => {
        realizarPagoModal.style.display = "none";
    });


    function cargarClientes() {
        fetch('/api/clientes/clientes')
            .then(response => response.json())
            .then(data => {
                const clienteSelect = document.getElementById("clienteSelect");
                clienteSelect.innerHTML = "";
                data.forEach(cliente => {
                    const option = document.createElement("option");
                    option.value = cliente.cliente_id;
                    option.textContent = cliente.nombre;
                    clienteSelect.appendChild(option);
                });
            })
            .catch(error => console.error('Error al cargar clientes:', error));
    }

 
    function establecerFechas() {
        const hoy = new Date();
        const fecha = hoy.toLocaleDateString("en-GB").split("/").reverse().join("-");
        document.getElementById("fecha").value = fecha;
        document.getElementById("fechaRealizada").value = fecha;
    }


    generarFacturaBtn.addEventListener("click", () => {
        const clienteId = document.getElementById("clienteSelect").value;
        const fecha = document.getElementById("fecha").value;
        const fechaRealizada = document.getElementById("fechaRealizada").value;

        fetch('/api/facturas/crear', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cliente_id: clienteId, fecha, fecha_realizada: fechaRealizada })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
            } else {
                alert('Factura generada exitosamente');
                generarVenta(data.factura_id);  
            }
        })
        .catch(error => console.error('Error al generar la factura:', error));
    });

    function generarVenta(facturaId) {
        const filas = document.querySelectorAll("#sales-rows tr");
        const ventas = [];

        filas.forEach(fila => {
            const inventarioId = fila.querySelector(".producto-input").value;
            const cantidad = parseInt(fila.querySelector(".cantidad-input").value) || 0;
            const subtotal = parseFloat(fila.querySelector(".total-producto-input").value) || 0;
            const totalVenta = subtotal * 1.19;  

            if (cantidad > 0) {
                ventas.push({
                    factura_id: facturaId,
                    inventario_id: inventarioId,
                    cantidad,
                    subtotal,
                    total_venta: totalVenta
                });
            }
        });

        ventas.forEach(venta => {
            fetch('/api/venta/crear', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(venta)
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    console.error('Error al generar la venta:', data.error);
                } else {
                    actualizarInventario(venta.inventario_id, venta.cantidad);
                }
            })
            .catch(error => console.error('Error al generar la venta:', error));
        });
    }

    function actualizarInventario(inventarioId, cantidad) {
        fetch(`/api/inventario/actualizar`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ inventario_id: inventarioId, cantidad })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error('Error al actualizar inventario:', data.error);
            }
        })
        .catch(error => console.error('Error al actualizar inventario:', error));
    }
});

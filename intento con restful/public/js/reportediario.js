document.addEventListener("DOMContentLoaded", function () {
    const generarReporteBtn = document.getElementById("generar-reporte-btn");
    const salesTableBody = document.getElementById("sales-rows");

   
    if (generarReporteBtn) {
        generarReporteBtn.addEventListener("click", generarReporte);
    }

    function generarReporte() {
        fetch('/api/reporte/facturas')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener el reporte');
                }
                return response.json();
            })
            .then(data => {
                mostrarDatosEnTabla(data);
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Error al generar el reporte.");
            });
    }

    function mostrarDatosEnTabla(data) {
        salesTableBody.innerHTML = ""; 
        data.forEach(factura => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${factura.numero_factura}</td>
                <td>${factura.producto_nombre}</td>
                <td>${factura.cliente_nombre}</td>
                <td>${factura.cajas}</td>
                <td>${factura.unidad}</td>
                <td>${factura.total_producto}</td>
            `;

            salesTableBody.appendChild(row);
        });
    }
});

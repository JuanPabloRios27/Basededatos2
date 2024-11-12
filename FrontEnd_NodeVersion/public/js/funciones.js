document.addEventListener("DOMContentLoaded", function () {
    const primeraFilaCodigoBarras = document.querySelector(".codigo-barras-input");
    if (primeraFilaCodigoBarras) {
        primeraFilaCodigoBarras.addEventListener("blur", buscarProducto);
    }

    const primeraFilaCantidad = document.querySelector(".cantidad-input");
    if (primeraFilaCantidad) {
        primeraFilaCantidad.addEventListener("input", verificarYAgregarFila);
        primeraFilaCantidad.addEventListener("blur", calcularTotales);
    }

    // Evento para calcular el cambio cuando el usuario introduce el dinero entregado
    document.querySelector(".totals-area input:nth-of-type(2)").addEventListener("blur", calcularCambio);

    document.getElementById("add-row-btn").addEventListener("click", agregarFila);
});

function agregarFila() {
    const tableBody = document.getElementById("sales-rows");
    const nuevaFila = document.createElement("tr");

    nuevaFila.innerHTML = `
        <td><input type="text" placeholder="Producto" class="producto-input" readonly></td>
        <td><input type="text" placeholder="Nombre Producto" readonly></td>
        <td><input type="text" placeholder="Código Barras" class="codigo-barras-input"></td>
        <td><input type="number" value="0" min="0" class="cantidad-input"></td>
        <td><input type="number" value="0" min="0" readonly class="total-unidad-input"></td>
        <td><input type="number" value="0" min="0"></td>
        <td><input type="number" value="0" min="0"></td>
        <td><input type="number" value="0" min="0" readonly class="total-producto-input"></td>
    `;

    tableBody.appendChild(nuevaFila);

    nuevaFila.querySelector(".codigo-barras-input").addEventListener("blur", buscarProducto);
    nuevaFila.querySelector(".cantidad-input").addEventListener("input", verificarYAgregarFila);
    nuevaFila.querySelector(".cantidad-input").addEventListener("blur", calcularTotales);
}

function verificarYAgregarFila(event) {
    const cantidad = parseInt(event.target.value, 10);

    if (cantidad > 0) {
        agregarFila();
        event.target.removeEventListener("input", verificarYAgregarFila);
    }
}

function buscarProducto(event) {
    const codigoBarras = event.target.value.trim();
    const fila = event.target.closest("tr");

    if (codigoBarras) {
        fetch(`/api/ventas/buscarPorCodigo?codigo_barras=${codigoBarras}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Producto no encontrado o stock insuficiente');
                }
                return response.json();
            })
            .then(data => {
                fila.querySelector(".producto-input").value = data.producto_id;
                fila.querySelector("td:nth-child(2) input").value = data.nombre_producto;
                fila.querySelector(".total-unidad-input").value = data.precio_unitario;
                fila.querySelector(".cantidad-input").setAttribute("max", data.cantidad_disponible);
                calcularTotales();
            })
            .catch(error => {
                console.error('Error al buscar el producto:', error);
                alert('Producto no encontrado o stock insuficiente');
            });
    }
}

function calcularTotales() {
    const filas = document.querySelectorAll("#sales-rows tr");
    let totalFacturado = 0;

    filas.forEach(fila => {
        const cantidad = parseFloat(fila.querySelector(".cantidad-input").value) || 0;
        const totalUnidad = parseFloat(fila.querySelector(".total-unidad-input").value) || 0;
        const totalProducto = cantidad * totalUnidad;

        fila.querySelector(".total-producto-input").value = totalProducto.toFixed(2);

        totalFacturado += totalProducto;
    });

    document.querySelector(".totals-area input").value = `$ ${totalFacturado.toFixed(2)}`;

    // Calcular IVA (19%) y total con IVA
    const ivaPorcentaje = 19;
    const valorConIva = totalFacturado * (1 + ivaPorcentaje / 100);

    // Mostrar el IVA y el total con IVA en la sección de descuentos
    document.querySelector(".discounts-area input:nth-of-type(1)").value = `${ivaPorcentaje}`;
    document.querySelector(".discounts-area input:nth-of-type(2)").value = `$ ${valorConIva.toFixed(2)}`;

    calcularCambio();
}

function calcularCambio() {
    const dineroEntregado = parseFloat(document.querySelector(".totals-area input:nth-of-type(2)").value) || 0;
    const valorConIva = parseFloat(document.querySelector(".discounts-area input:nth-of-type(2)").value.replace("$", "")) || 0;
    const cambio = dineroEntregado - valorConIva;

    document.querySelector(".totals-area input:nth-of-type(3)").value = `$ ${cambio.toFixed(2)}`;
}

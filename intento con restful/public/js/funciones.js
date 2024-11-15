document.addEventListener("DOMContentLoaded", function () {
    const primeraFilaCodigoBarras = document.querySelector(".codigo-barras-input");
    if (primeraFilaCodigoBarras) {
        primeraFilaCodigoBarras.addEventListener("blur", buscarProducto);
    }

    const primeraFilaCantidad = document.querySelector(".cantidad-input");
    if (primeraFilaCantidad) {
        primeraFilaCantidad.addEventListener("input", verificarYAgregarFila);
        primeraFilaCantidad.addEventListener("blur", validarNumeros);
        primeraFilaCantidad.addEventListener("blur", calcularTotales);
    }

    const dineroEntregadoInput = document.querySelector(".totals-area input:nth-of-type(2)");
    if (dineroEntregadoInput) {
        dineroEntregadoInput.addEventListener("blur", calcularCambio);
        dineroEntregadoInput.addEventListener("blur", validarNumeros);
    }
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
        <td><input type="number" value="0" min="0" class="desc-valor-input"></td>
        <td><input type="number" value="0" min="0" class="desc-porcentaje-input"></td>
        <td><input type="number" value="0" min="0" readonly class="total-producto-input"></td>
    `;

    tableBody.appendChild(nuevaFila);

    const codigoBarrasInput = nuevaFila.querySelector(".codigo-barras-input");
    const cantidadInput = nuevaFila.querySelector(".cantidad-input");
    const descPorcentajeInput = nuevaFila.querySelector(".desc-porcentaje-input");

    if (codigoBarrasInput) {
        codigoBarrasInput.addEventListener("blur", buscarProducto);
    }
    if (cantidadInput) {
        cantidadInput.addEventListener("input", verificarYAgregarFila);
        cantidadInput.addEventListener("blur", validarNumeros);
        cantidadInput.addEventListener("blur", calcularTotales);
    }
    if (descPorcentajeInput) {
        descPorcentajeInput.addEventListener("blur", validarNumeros);
        descPorcentajeInput.addEventListener("blur", aplicarDescuentoPorcentaje);
    }
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

function aplicarDescuentoPorcentaje(event) {
    const fila = event.target.closest("tr");
    const descuentoPorcentaje = parseFloat(event.target.value) || 0;
    const totalProducto = parseFloat(fila.querySelector(".total-producto-input").value) || 0;

    if (descuentoPorcentaje > 10) {
        const confirmar = confirm("El descuento es superior al 10%. ¿Está seguro de aplicar este descuento?");
        if (!confirmar) {
            event.target.value = 0; 
            return;
        }
    }

    const descuentoValor = (totalProducto * descuentoPorcentaje) / 100;
    fila.querySelector(".desc-valor-input").value = descuentoValor.toFixed(2);

    fila.querySelector(".total-producto-input").value = (totalProducto - descuentoValor).toFixed(2);
    calcularTotales();
}

function calcularTotales() {
    const filas = document.querySelectorAll("#sales-rows tr");
    let totalFacturado = 0;

    filas.forEach(fila => {
        const cantidad = parseFloat(fila.querySelector(".cantidad-input")?.value) || 0;
        const totalUnidad = parseFloat(fila.querySelector(".total-unidad-input")?.value) || 0;
        const descuentoValor = parseFloat(fila.querySelector(".desc-valor-input")?.value) || 0;
        const totalProducto = (cantidad * totalUnidad) - descuentoValor;

        if (fila.querySelector(".total-producto-input")) {
            fila.querySelector(".total-producto-input").value = totalProducto.toFixed(2);
        }

        totalFacturado += totalProducto;
    });

    const totalFacturadoInput = document.querySelector(".totals-area input:nth-of-type(1)");
    if (totalFacturadoInput) {
        totalFacturadoInput.value = `$ ${totalFacturado.toFixed(2)}`;
    }

    const ivaPorcentaje = 19;
    const valorConIva = totalFacturado * (1 + ivaPorcentaje / 100);
    const baseGravadaInput = document.querySelector(".discounts-area input:nth-of-type(1)");
    const valorTotalIvaInput = document.querySelector(".discounts-area input:nth-of-type(2)");

    if (baseGravadaInput) baseGravadaInput.value = `${ivaPorcentaje}`;
    if (valorTotalIvaInput) valorTotalIvaInput.value = `$ ${valorConIva.toFixed(2)}`;
}

function calcularCambio() {
    const dineroEntregadoInput = document.querySelector(".totals-area input:nth-of-type(2)");
    const cambioInput = document.querySelector(".totals-area input:nth-of-type(3)");
    const valorConIvaInput = document.querySelector(".discounts-area input:nth-of-type(2)");

    if (!dineroEntregadoInput || !cambioInput || !valorConIvaInput) {
        console.warn("Uno de los campos para calcular el cambio no se encontró en el DOM.");
        return;
    }

    const dineroEntregado = parseFloat(dineroEntregadoInput.value.replace("$", "").replace(",", "")) || 0;
    const valorConIva = parseFloat(valorConIvaInput.value.replace("$", "").replace(",", "")) || 0;

    if (dineroEntregado > 0) {
        if (dineroEntregado >= valorConIva) {
            const cambio = dineroEntregado - valorConIva;
            cambioInput.value = `$ ${cambio.toFixed(2)}`;
        } else {
            alert("El dinero entregado no es suficiente para cubrir el total con IVA.");
            dineroEntregadoInput.value = "$ 0.00"; 
            cambioInput.value = "$ 0.00";
        }
    } else {
        cambioInput.value = "$ 0.00";
    }
}

function validarNumeros(event) {
    const sanitizedValue = event.target.value.replace("$", "").replace(",", "").trim();
    if (sanitizedValue !== "" && !/^\d+(\.\d+)?$/.test(sanitizedValue)) { 
        alert("Por favor, introduzca un valor numérico válido.");
        event.target.value = "$ 0.00"; 
    }
}

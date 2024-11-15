document.addEventListener("DOMContentLoaded", function () {
    const realizarPagoBtn = document.getElementById("realizarPagoBtn"); 
    const salesArea = document.querySelector(".sales-area"); 
    const facturaArea = document.querySelector(".factura-area"); 

    realizarPagoBtn.addEventListener("click", () => {
        salesArea.classList.toggle("expand"); 
        facturaArea.classList.toggle("show"); 
        cargarClientes(); 
        establecerFechas(); 
    });

    document.getElementById("cerrarModalBtn").addEventListener("click", () => {
        salesArea.classList.remove("expand");
        facturaArea.classList.remove("show");
    });
});
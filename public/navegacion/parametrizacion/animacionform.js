document.addEventListener("DOMContentLoaded", function() {
    const tabs = document.querySelectorAll(".tab-button");
    const forms = document.querySelectorAll(".formulario");
    const formContainer = document.querySelector(".formulario-container");


    function ajustarAltura(formulario) {
        formContainer.style.height = formulario.offsetHeight + "px";
    }


    forms[0].classList.add("activo");
    ajustarAltura(forms[0]);

    tabs.forEach((tab, index) => {
        tab.addEventListener("click", () => {
            
            tabs.forEach((t) => t.classList.remove("active"));
            forms.forEach((form) => form.classList.remove("activo"));

            
            tab.classList.add("active");
            forms[index].classList.add("activo");

           
            ajustarAltura(forms[index]);
        });
    });
});

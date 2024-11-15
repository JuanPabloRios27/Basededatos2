document.addEventListener('DOMContentLoaded', () => {
    let isDirty = false; 

   
    const inputs = document.querySelectorAll('.sales-table input[type="text"], .sales-table input[type="number"]');

    
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            if (input.value.trim() !== '') {
                isDirty = true; 
            }
        });
    });

    
    window.addEventListener('beforeunload', (event) => {
        if (isDirty) { 
            const confirmationMessage = 'Tienes cambios sin guardar. ¿Estás seguro de que deseas salir?';
            event.returnValue = confirmationMessage; 
            return confirmationMessage; 
        }
    });
});

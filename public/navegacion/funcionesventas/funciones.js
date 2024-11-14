document.addEventListener('DOMContentLoaded', () => {
    const addRowBtn = document.getElementById('add-row-btn');
    const salesRows = document.getElementById('sales-rows');
    const scrollableTable = document.querySelector('.scrollable-table'); 
    const maxRows = 100; 

    addRowBtn.addEventListener('click', () => {
        const rowCount = salesRows.getElementsByTagName('tr').length;

        if (rowCount < maxRows) {
          
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td><input type="text" placeholder="Producto"></td>
                <td><input type="text" placeholder="Nombre Producto"></td>
                <td><input type="text" placeholder="Código Barras"></td>
                <td><input type="number" value="0" min="0"></td>
                <td><input type="number" value="0" min="0" readonly></td>
                <td><input type="number" value="0" min="0"></td>
                <td><input type="number" value="0" min="0" readonly></td>
                <td><input type="number" value="0" min="0"></td>
                <td><input type="number" value="0" min="0"></td>
                <td><input type="number" value="0" min="0" readonly></td>
            `;
            salesRows.appendChild(newRow);
            scrollableTable.scrollTop = scrollableTable.scrollHeight;
        } else {
            alert('Has alcanzado el número máximo de filas permitidas.');
        }
    });
});
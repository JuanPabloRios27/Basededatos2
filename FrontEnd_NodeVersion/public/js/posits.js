document.addEventListener('DOMContentLoaded', () => {
    // Selección de elementos existentes
    const createNoteLink = document.getElementById('create-note-link');
    const weeklyReportLink = document.getElementById('weekly-report-link'); 
    const note = document.getElementById('note');
    const weeklyNote = document.getElementById('weekly-note'); 
    const closeBtns = document.querySelectorAll('.close-btn');
    const noteHeader = note.querySelector('.note-header');
    const weeklyNoteHeader = weeklyNote.querySelector('.note-header');
    const cornersNote = note.querySelectorAll('.resize-corner');
    const cornersWeeklyNote = weeklyNote.querySelectorAll('.resize-corner');
    const generateReportBtn = document.getElementById('generate-report-btn'); // Botón para generar PDF
    
    let isDragging = false;
    let isResizing = false;
    let offsetX, offsetY, startWidth, startHeight, startX, startY, cornerClass, activeNote;
    
    const minWidth = 700;
    const minHeight = 380;
    const maxWidth = window.innerWidth - 200;
    const maxHeight = 780;

    function showNote(noteElement) {
        if (!noteElement.style.display || noteElement.style.display === 'none') {
            noteElement.style.display = 'block';
        }
        activeNote = noteElement;
    }

    // Mostrar la nota de "Ventas Diarias"
    createNoteLink.addEventListener('click', (event) => {
        event.preventDefault();
        showNote(note);
    });

    // Mostrar la nota de "Informes"
    weeklyReportLink.addEventListener('click', (event) => {
        event.preventDefault();
        showNote(weeklyNote);
        renderWeeklySalesChart();
    });

    // Cerrar notas
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.note').style.display = 'none';
        });
    });

    // Eventos para arrastrar las notas desde .note-header
    [noteHeader, weeklyNoteHeader].forEach(header => {
        header.addEventListener('mousedown', (e) => {
            isDragging = true;
            offsetX = e.clientX - header.closest('.note').getBoundingClientRect().left;
            offsetY = e.clientY - header.closest('.note').getBoundingClientRect().top;
            activeNote = header.closest('.note');
        });
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging && activeNote) {
            let newLeft = e.clientX - offsetX;
            let newTop = e.clientY - offsetY;

            newLeft = Math.max(0, Math.min(newLeft, window.innerWidth - activeNote.offsetWidth));
            newTop = Math.max(0, Math.min(newTop, window.innerHeight - activeNote.offsetHeight));

            activeNote.style.left = `${newLeft}px`;
            activeNote.style.top = `${newTop}px`;
        } else if (isResizing && activeNote) {
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            let newWidth = startWidth;
            let newHeight = startHeight;

            if (cornerClass.includes('top')) {
                newHeight = Math.max(minHeight, Math.min(maxHeight, startHeight - deltaY));
                activeNote.style.top = `${startY + deltaY}px`;
            } else if (cornerClass.includes('bottom')) {
                newHeight = Math.max(minHeight, Math.min(maxHeight, startHeight + deltaY));
            }

            if (cornerClass.includes('left')) {
                newWidth = Math.max(minWidth, Math.min(maxWidth, startWidth - deltaX));
                activeNote.style.left = `${startX + deltaX}px`;
            } else if (cornerClass.includes('right')) {
                newWidth = Math.max(minWidth, Math.min(maxWidth, startWidth + deltaX));
            }

            activeNote.style.width = `${newWidth}px`;
            activeNote.style.height = `${newHeight}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        isResizing = false;
    });

    // Eventos para redimensionar desde las esquinas de ambas notas
    [...cornersNote, ...cornersWeeklyNote].forEach(corner => {
        corner.addEventListener('mousedown', (e) => {
            e.stopPropagation();
            isResizing = true;
            cornerClass = e.target.className;
            startWidth = e.target.closest('.note').offsetWidth;
            startHeight = e.target.closest('.note').offsetHeight;
            startX = e.clientX;
            startY = e.clientY;
            activeNote = e.target.closest('.note');
        });
    });

    // Renderización de la gráfica de ventas semanales en la nota de "Informes"
    function renderWeeklySalesChart() {
        // Asegurarse de eliminar cualquier gráfico existente antes de crear uno nuevo
        const chartContainer = document.querySelector("#weekly-sales-chart");
        if (chartContainer.innerHTML !== "") {
            chartContainer.innerHTML = "";  // Limpia el contenedor
        }
        
        const options = {
            chart: {
                type: 'bar',
                height: 280,
                background: 'transparent'
            },
            series: [{
                name: 'Ventas Semanales',
                data: [30, 40, 35, 50, 49, 60, 70] // Datos de ejemplo
            }],
            xaxis: {
                categories: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
                title: {
                    text: 'Meses', // Título para el eje X
                }
            },
            yaxis: {
                title: {
                    text: 'Ventas (en miles)', // Título para el eje Y
                }
            },
            title: {
                text: 'Grafica',
                align: 'center'
            }
        };
    
        const chart = new ApexCharts(chartContainer, options);
        chart.render();
    }
    

    // Función para generar el PDF con la gráfica
    window.generateReport = function () {
        const chartContainer = document.querySelector("#weekly-sales-chart");
    
        if (chartContainer) {
            html2canvas(chartContainer).then(canvas => {
                const pdf = new window.jspdf.jsPDF(); // Cambia esto a window.jspdf.jsPDF()
                const imgData = canvas.toDataURL("image/png");
                pdf.addImage(imgData, "PNG", 10, 10, 180, 80);
                pdf.save("Informe_Semanal.pdf");
            });
        } else {
            console.error("El contenedor de la gráfica no se encontró.");
        }
    }
    
});

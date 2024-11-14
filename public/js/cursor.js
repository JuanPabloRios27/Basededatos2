document.addEventListener('DOMContentLoaded', () => {
    const customCursor = document.querySelector('.custom-cursor');

    document.addEventListener('mousemove', (e) => {
        customCursor.style.left = `${e.pageX}px`;
        customCursor.style.top = `${e.pageY}px`;
    });
});
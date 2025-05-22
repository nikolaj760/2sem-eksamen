
document.addEventListener("DOMContentLoaded", () => {
    const leveringsKnapper = document.querySelectorAll('.button-container button');

    leveringsKnapper.forEach(knap => {
        knap.addEventListener('click', () => {
            leveringsKnapper.forEach(k => k.classList.remove('valgt'));
            knap.classList.add('valgt');
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const leveringsKnapper = document.querySelectorAll('.button-dag-container button');

    leveringsKnapper.forEach(knap => {
        knap.addEventListener('click', () => {
            leveringsKnapper.forEach(k => k.classList.remove('valgt'));
            knap.classList.add('valgt');
        });
    });
});
document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll(".toggle-description");

    buttons.forEach(function(button) {
        button.addEventListener("click", function() {
            const targetId = this.getAttribute("data-target");
            const targetElement = document.querySelector(targetId);

            if (targetElement.style.display === "none" || targetElement.style.display === "") {
                targetElement.style.display = "block";
                this.textContent = "Ocultar Descripción";
            } else {
                targetElement.style.display = "none";
                this.textContent = "Mostrar Descripción";
            }
        });
    });
});

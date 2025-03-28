const API_URL = "https://validacioncliente.azurewebsites.net"; 

// Obtener el Lead ID de la URL
function obtenerLeadId() {
    const params = new URLSearchParams(window.location.search);
    return params.get("leadid");
}

// Manejo de eventos cuando la página está lista
document.addEventListener("DOMContentLoaded", function () {
    const leadId = obtenerLeadId();
    if (!leadId) {
        alert("Error: No se encontró Lead ID.");
        return;
    }

    // Botón de Confirmar Número (Ahora con CORS explícito)
    document.getElementById("btnConfirmar").addEventListener("click", async function () {
        try {
            const response = await fetch(`${API_URL}/confirmar_numero?leadid=${leadId}`, {
                method: "GET",
                mode: "cors", // 🔹 Forzar CORS
                headers: {
                    "Accept": "application/json"
                }
            });

            if (response.ok) {
                window.location.href = "https://www.tecniseguros.com/cotizacion_gracias/";
            } else {
                alert("Error al confirmar número.");
            }
        } catch (error) {
            alert("No se pudo conectar con el servidor.");
        }
    });

    // Botón de Cambiar Número con validación
    document.getElementById("btnCambiar").addEventListener("click", async function () {
        const nuevoTelefono = document.getElementById("telefono").value.trim();

        if (!/^\d{8}$/.test(nuevoTelefono)) {
            alert("Ingrese un número válido de 8 dígitos.");
            return;
        }

        try {
            const response = await fetch(`${API_URL}/cambiar_numero`, {
                method: "POST",
                mode: "cors", // 🔹 Forzar CORS
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ leadid: leadId, telefono: nuevoTelefono })
            });

            if (response.ok) {
                window.location.href = "https://www.tecniseguros.com/cotizacion_gracias/";
            } else {
                alert("Error al actualizar número.");
            }
        } catch (error) {
            alert("No se pudo conectar con el servidor.");
        }
    });
});

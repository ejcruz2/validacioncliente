const API_URL = "https://validacioncliente.azurewebsites.net";

// Obtener el Lead ID de la URL
function obtenerLeadId() {
    const params = new URLSearchParams(window.location.search);
    return params.get("leadid");
}

// Cuando la página esté lista
document.addEventListener("DOMContentLoaded", async function () {
    const leadId = obtenerLeadId();

    if (!leadId) {
        alert("Error: No se encontró Lead ID.");
        return;
    }

    // Llamada para obtener el número actual y ponerlo en el campo
    try {
        const response = await fetch(`${API_URL}/api/obtener_numero?leadid=${leadId}`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Accept": "application/json"
            }
        });

        if (response.ok) {
            const data = await response.json();
            // Suponiendo que la respuesta tenga una propiedad "telefono"
            document.getElementById("telefono").value = data.telefono;
        } else {
            console.warn("No se pudo obtener el número actual.");
        }
    } catch (error) {
        console.error("Error al obtener el número:", error);
    }

    // Botón Confirmar Número
    document.getElementById("btnConfirmar").addEventListener("click", async function () {
        try {
            const response = await fetch(`${API_URL}/api/confirmar_numero?leadid=${leadId}`, {
                method: "GET",
                mode: "cors",
                headers: {
                    "Accept": "application/json"
                }
            });

            if (response.ok) {
                window.location.href = "https://www.tecniseguros.com/individual-familias/";
            } else {
                alert("Error al confirmar número.");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            alert("No se pudo conectar con el servidor.");
        }
    });

    // Botón Cambiar Número
    document.getElementById("btnCambiar").addEventListener("click", async function () {
        const nuevoTelefono = document.getElementById("telefono").value.trim();

        if (!/^\d{8}$/.test(nuevoTelefono)) {
            alert("Ingrese un número válido de 8 dígitos.");
            return;
        }

        try {
            const response = await fetch(`${API_URL}/api/cambiar_numero`, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    leadid: leadId,
                    telefono: nuevoTelefono
                })
            });

            if (response.ok) {
                window.location.href = "https://www.tecniseguros.com/individual-familias/";
            } else {
                alert("Error al actualizar número.");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            alert("No se pudo conectar con el servidor.");
        }
    });
});

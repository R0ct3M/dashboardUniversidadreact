// src/services/authService.js

const MOCK_API_URL = "https://68f53ec2b16eb6f46836bb71.mockapi.io/api/v1/users";

export const apiLogin = async (username, password) => {
  try {
    // 1. Buscar usuario por username (como MockAPI requiere)
    const response = await fetch(`${MOCK_API_URL}?username=${username}`);

    if (!response.ok) {
      return {
        success: false,
        error: "Error de conexión o recurso no disponible.",
      };
    }

    const users = await response.json();

    if (users.length === 0) {
      return { success: false, error: "Usuario o contraseña incorrecta." };
    }

    const userFound = users[0];

    // 2. Verificación Local de Contraseña
    if (userFound.password === password) {
      const role = userFound.role || "user";

      return {
        success: true,
        user: {
          username: userFound.username,
          nombreCompleto: userFound.nombreCompleto || "Usuario Dashboard",
          role: role, // Asignación del rol
        },
        token: `fake-jwt-${userFound.id}`,
      };
    } else {
      // Contraseña incorrecta
      return { success: false, error: "Usuario o contraseña incorrecta." };
    }
  } catch (error) {
    console.error("Error en apiLogin:", error);
    return {
      success: false,
      error: "No se pudo conectar con la API de prueba.",
    };
  }
};

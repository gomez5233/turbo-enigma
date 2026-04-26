import { API_URL } from "../constants/config";

export async function getClientes() {
  console.log("Consultando:", `${API_URL}/clientes`);
  try {
    const response = await fetch(`${API_URL}/clientes`);
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (e) {
    console.error("Error:", e.message);
    throw e;
  }
}

export async function agregarCliente(cliente) {
  try {
    const response = await fetch(`${API_URL}/clientes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cliente),
    });
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    return await response.json();
  } catch (e) {
    console.error("Error:", e.message);
    throw e;
  }
}
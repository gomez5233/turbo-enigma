import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { agregarCliente } from "../services/api";

export default function FormularioCliente({ onClienteAgregado }) {
  const [form, setForm] = useState({ nombre: "", telefono: "", email: "" });
  const [guardando, setGuardando] = useState(false);

  function handleChange(campo, valor) {
    setForm((f) => ({ ...f, [campo]: valor }));
  }

  async function handleGuardar() {
    if (!form.nombre || !form.telefono || !form.email) {
      Alert.alert("Campos incompletos", "Por favor completa todos los campos.");
      return;
    }
    setGuardando(true);
    try {
      await agregarCliente(form);
      setForm({ nombre: "", telefono: "", email: "" });
      Alert.alert("Éxito", "Cliente agregado correctamente.");
      onClienteAgregado(); // refresca la lista
    } catch (e) {
      Alert.alert("Error", "No se pudo agregar el cliente.");
    } finally {
      setGuardando(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Nuevo Cliente</Text>

      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre completo"
        value={form.nombre}
        onChangeText={(v) => handleChange("nombre", v)}
      />

      <Text style={styles.label}>Teléfono</Text>
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        keyboardType="phone-pad"
        value={form.telefono}
        onChangeText={(v) => handleChange("telefono", v)}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        keyboardType="email-address"
        autoCapitalize="none"
        value={form.email}
        onChangeText={(v) => handleChange("email", v)}
      />

      <TouchableOpacity
        style={[styles.boton, guardando && styles.botonDeshabilitado]}
        onPress={handleGuardar}
        disabled={guardando}
      >
        {guardando ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.botonTexto}>Guardar Cliente</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    margin: 16,
    borderWidth: 0.5,
    borderColor: "#e0e0e0",
  },
  titulo: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111",
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    color: "#888",
    marginBottom: 4,
    marginTop: 8,
  },
  input: {
    borderWidth: 0.5,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    color: "#111",
  },
  boton: {
    backgroundColor: "#534AB7",
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
    marginTop: 16,
  },
  botonDeshabilitado: {
    backgroundColor: "#a09cd4",
  },
  botonTexto: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
  },
});

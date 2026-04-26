import { View, Text, StyleSheet } from "react-native";

export default function ClienteCard({ nombre, telefono, email }) {
  return (
    <View style={styles.card}>
      <Text style={styles.nombre}>{nombre}</Text>
      <View style={styles.fila}>
        <Text style={styles.label}>Teléfono</Text>
        <Text style={styles.valor}>{telefono}</Text>
      </View>
      <View style={styles.fila}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.valor}>{email}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 0.5,
    borderColor: "#e0e0e0",
  },
  nombre: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111",
    marginBottom: 8,
  },
  fila: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  label: {
    fontSize: 13,
    color: "#888",
  },
  valor: {
    fontSize: 13,
    color: "#333",
  },
});

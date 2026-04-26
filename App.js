import { useEffect, useState, useCallback } from "react";
import {
  View, Text, FlatList, ActivityIndicator,
  StyleSheet, SafeAreaView, TouchableOpacity
} from "react-native";
import { getClientes } from "./services/api";
import ClienteCard from "./components/ClienteCard";
import FormularioCliente from "./components/FormularioCliente";
import GraficaEstadisticas from "./components/GraficaEstadisticas";

export default function App() {
  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [mostrarGrafica, setMostrarGrafica] = useState(false);

  const cargarClientes = useCallback(() => {
    setCargando(true);
    getClientes()
      .then(setClientes)
      .catch(e => setError(e.message))
      .finally(() => setCargando(false));
  }, []);

  useEffect(() => {
    cargarClientes();
  }, []);

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.encabezado}>
        <Text style={styles.titulo}>Clientes</Text>
        <TouchableOpacity
          style={styles.btnEstadisticas}
          onPress={() => setMostrarGrafica(v => !v)}
        >
          <Text style={styles.btnEstadisticasTexto}>
            {mostrarGrafica ? "Ocultar" : "Estadísticas"}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={clientes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ClienteCard
            nombre={item.nombre}
            telefono={item.telefono}
            email={item.email}
          />
        )}
        ListHeaderComponent={
          <View>
            {mostrarGrafica && (
              <GraficaEstadisticas onCerrar={() => setMostrarGrafica(false)} />
            )}
            <FormularioCliente onClienteAgregado={cargarClientes} />
          </View>
        }
        ListEmptyComponent={
          cargando
            ? <ActivityIndicator size="large" color="#534AB7" style={{ marginTop: 40 }} />
            : <Text style={styles.vacio}>No hay clientes aún.</Text>
        }
        contentContainerStyle={{ paddingHorizontal: 0, paddingBottom: 16 }}
      />

      {error && <Text style={styles.error}>Error: {error}</Text>}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  encabezado: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "500",
    color: "#111",
  },
  btnEstadisticas: {
    backgroundColor: "#534AB7",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  btnEstadisticasTexto: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  vacio: { textAlign: "center", color: "#888", marginTop: 40 },
  error: { color: "red", textAlign: "center", padding: 16 },
});
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { PieChart } from "react-native-chart-kit";

const pantalla = Dimensions.get("window").width;

const datos = [
  {
    name: "Activos",
    population: 45,
    color: "#534AB7",
    legendFontColor: "#333",
    legendFontSize: 13,
  },
  {
    name: "Inactivos",
    population: 20,
    color: "#FF6384",
    legendFontColor: "#333",
    legendFontSize: 13,
  },
  {
    name: "Nuevos",
    population: 25,
    color: "#36A2EB",
    legendFontColor: "#333",
    legendFontSize: 13,
  },
  {
    name: "Pendientes",
    population: 10,
    color: "#FFCE56",
    legendFontColor: "#333",
    legendFontSize: 13,
  },
];

export default function GraficaEstadisticas({ onCerrar }) {
  return (
    <View style={styles.container}>
      <View style={styles.encabezado}>
        <Text style={styles.titulo}>Estadísticas de Clientes</Text>
        <TouchableOpacity onPress={onCerrar} style={styles.btnCerrar}>
          <Text style={styles.btnCerrarTexto}>✕</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitulo}>Distribución actual</Text>

      <PieChart
        data={datos}
        width={pantalla - 32}
        height={220}
        chartConfig={{
          backgroundColor: "#fff",
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="16"
        absolute={false}
      />

      <View style={styles.resumen}>
        {datos.map((item) => (
          <View key={item.name} style={styles.fila}>
            <View style={[styles.punto, { backgroundColor: item.color }]} />
            <Text style={styles.nombre}>{item.name}</Text>
            <Text style={styles.porcentaje}>{item.population}%</Text>
          </View>
        ))}
      </View>

      <Text style={styles.nota}>* Datos simulados para demostración</Text>
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
  encabezado: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  titulo: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111",
  },
  btnCerrar: {
    padding: 4,
  },
  btnCerrarTexto: {
    fontSize: 16,
    color: "#888",
  },
  subtitulo: {
    fontSize: 13,
    color: "#888",
    marginBottom: 12,
  },
  resumen: {
    marginTop: 8,
    borderTopWidth: 0.5,
    borderTopColor: "#e0e0e0",
    paddingTop: 12,
  },
  fila: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: "#f0f0f0",
  },
  punto: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  nombre: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },
  porcentaje: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111",
  },
  nota: {
    fontSize: 11,
    color: "#bbb",
    textAlign: "center",
    marginTop: 12,
  },
});

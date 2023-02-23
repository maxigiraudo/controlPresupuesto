import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import globalStyles from "../styles";
import CircularProgress from "react-native-circular-progress-indicator";

const ControlPresupuesto = ({ presupuesto, gastos, resetearApp }) => {
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);

  useEffect(() => {
    const totalGastado = gastos.reduce(
      (total, gasto) => Number(gasto.cantidad) + total,
      0
    );

    const totalDisponible = presupuesto - totalGastado;

    const nuevoPorcentaje =
      ((presupuesto - totalDisponible) / presupuesto) * 100;

    setPorcentaje(nuevoPorcentaje);

    setDisponible(totalDisponible);
    setGastado(totalGastado);
  }, [gastos]);

  return (
    <View style={styles.contenedor}>
      <View style={styles.centrarGrafica}>
        {/* <Image style={styles.imagen} source={require("../img/grafico.jpg")} /> */}
        <CircularProgress
          value={porcentaje}
          duration={1000}
          valueSuffix={"%"}
          title="Gastado"
          inActiveStrokeColor="#f5f5f5"
          inActiveStrokeWidth={20}
          activeStrokeColor="#3b82f6"
          activeStrokeWidth={20}
          titleStyle={{ fontWeight: "bold", fontSize: 20 }}
          titleColor="#64748b"
          radius={150}
        />
      </View>
      <View style={styles.contenedorTexto}>
        <Pressable onPress={resetearApp} style={styles.boton}>
          <Text style={styles.textoBoton}>Eliminar Presupuesto</Text>
        </Pressable>

        <Text style={styles.valor}>
          <Text style={styles.label}>Presupuesto: </Text>${presupuesto}
        </Text>

        <Text style={styles.valor}>
          <Text style={styles.label}>Disponible: </Text>${disponible}
        </Text>

        <Text style={styles.valor}>
          <Text style={styles.label}>Gastado: </Text>${gastado}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    ...globalStyles.contenedor,
  },
  centrarGrafica: {
    alignItems: "center",
  },

  contenedorTexto: {
    marginTop: 50,
  },
  valor: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 10,
  },
  label: {
    fontWeight: "700",
    color: "#3b82f6",
  },
  boton: {
    backgroundColor: "#DB2777",
    padding: 10,
    marginBottom: 40,
    borderRadius: 5,
  },
  textoBoton: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "700",
    textTransform: "uppercase",
  },
});

export default ControlPresupuesto;

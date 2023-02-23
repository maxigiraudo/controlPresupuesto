import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Gasto from "./Gasto";

const ListadoGastos = ({
  gastos,
  setModal,
  setGasto,
  filtro,
  gastosFiltrados,
}) => {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Gastos</Text>

      {filtro
        ? gastosFiltrados.map((gasto) => (
            <Gasto
              setGasto={setGasto}
              setModal={setModal}
              key={gasto.id}
              gasto={gasto}
            />
          ))
        : gastos.map((gasto) => (
            <Gasto
              setGasto={setGasto}
              setModal={setModal}
              key={gasto.id}
              gasto={gasto}
            />
          ))}

      {gastos.length === 0 ||
        (gastosFiltrados.length === 0 && !!filtro && (
          <Text style={styles.noGastos}>No hay gastos</Text>
        ))}
      {console.log(gastosFiltrados)}
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    marginTop: 30,
    marginBottom: 100,
  },
  titulo: {
    color: "#64748b",
    fontSize: 30,
    textAlign: "center",
    fontWeight: "700",
    marginTop: 20,
  },
  noGastos: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 20,
    marginVertical: 20,
  },
});

export default ListadoGastos;

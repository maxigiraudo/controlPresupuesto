import { Picker } from "@react-native-picker/picker";
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TextInput, Pressable } from "react-native";
import globalStyles from "../styles";

const FormularioGasto = ({
  modal,
  setModal,
  handleGasto,
  setGasto,
  gasto,
  eliminarGasto,
}) => {
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [categoria, setCategoria] = useState("");
  const [id, setId] = useState("");
  const [fecha, setFecha] = useState("");

  useEffect(() => {
    if (gasto?.nombre) {
      setNombre(gasto.nombre);
      setCantidad(gasto.cantidad);
      setCategoria(gasto.categoria);
      setId(gasto.id);
      setFecha(gasto.fecha);
    }
  }, [gasto]);

  return (
    <View style={styles.contenedor}>
      <View style={styles.contenedorAtrasEliminar}>
        <Pressable
          style={styles.brnCancelar}
          onPress={() => {
            setModal(!modal);
            setGasto({});
          }}
        >
          <Text style={styles.btnCancelarTexto}>{"<  Atras"}</Text>
        </Pressable>

        {!!id && (
          <Pressable
            onPress={() => eliminarGasto(id)}
            style={styles.btnEliminar}
          >
            <Text style={styles.btnEliminarTexto}>Eliminar Gasto</Text>
          </Pressable>
        )}
      </View>

      <View style={styles.formulario}>
        <Text style={styles.titulo}>
          {" "}
          {gasto?.nombre ? "Editar Gasto" : "Nuevo Gasto"}
        </Text>

        <View style={styles.campo}>
          <Text style={styles.label}>Gasto</Text>
          <TextInput
            onChangeText={setNombre}
            value={nombre}
            style={styles.input}
            placeholder="Nombre del gasto"
          />
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>Monto</Text>
          <TextInput
            onChangeText={setCantidad}
            value={cantidad}
            style={styles.input}
            keyboardType="numeric"
            placeholder="Cantidad del gasto"
          />
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>Categoria</Text>
          <Picker
            onValueChange={(valor) => {
              setCategoria(valor);
            }}
            selectedValue={categoria}
            style={styles.input}
          >
            <Picker.Item label="-- Seleccione --" value="" />
            <Picker.Item label="Ahorro" value="ahorro" />
            <Picker.Item label="Comida" value="comida" />
            <Picker.Item label="Casa" value="casa" />
            <Picker.Item label="Suscripciones" value="suscripciones" />
            <Picker.Item label="Varios" value="varios" />
            <Picker.Item label="Ocio" value="ocio" />
            <Picker.Item label="Salud" value="salud" />
          </Picker>
        </View>
        <Pressable
          onPress={() =>
            handleGasto({ nombre, cantidad, categoria, id, fecha })
          }
          style={styles.submitBtn}
        >
          <Text style={styles.submitBtnTexto}>
            {" "}
            {gasto?.nombre ? "Guardar Gasto Editado" : "Agregar Gasto"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: "#1e40af",
    flex: 1,
  },
  formulario: {
    ...globalStyles.contenedor,
  },
  titulo: {
    textAlign: "center",
    fontSize: 28,
    marginBottom: 30,
    color: "#64748b",
  },
  campo: {
    marginVertical: 10,
  },
  label: {
    color: "#64748b",
    textTransform: "uppercase",
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  submitBtn: {
    backgroundColor: "#3b82f6",
    padding: 10,
    marginTop: 20,
  },
  submitBtnTexto: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "700",
    textTransform: "uppercase",
  },
  brnCancelar: {
    flex: 1,
    padding: 10,
    marginTop: 30,
    marginHorizontal: 10,
    backgroundColor: "#fff",
    width: 90,
    borderRadius: 100,
    justifyContent: "center",
  },
  btnCancelarTexto: {
    color: "#db2777",
    textTransform: "uppercase",
    textAlign: "center",
  },
  contenedorAtrasEliminar: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btnEliminar: {
    flex: 1,
    padding: 10,
    marginTop: 30,
    marginHorizontal: 10,
    backgroundColor: "#db2777",
    width: 90,
    borderRadius: 100,
  },
  btnEliminarTexto: {
    color: "#fff",
    textTransform: "uppercase",
    textAlign: "center",
  },
});

export default FormularioGasto;

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Alert,
  Pressable,
  Image,
  Text,
  Modal,
  ScrollView,
} from "react-native";
import ControlPresupuesto from "./src/components/ControlPresupuesto";
import Filtro from "./src/components/Filtro";
import FormularioGasto from "./src/components/FormularioGasto";
import Header from "./src/components/Header";
import ListadoGastos from "./src/components/ListadoGastos";
import NuevoPresupuesto from "./src/components/NuevoPresupuesto";
import { generarId } from "./src/helpers";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [presupuesto, setPresupuesto] = useState(0);
  const [gastos, setGastos] = useState([]);
  const [modal, setModal] = useState(false);
  const [gasto, setGasto] = useState({});
  const [filtro, setFiltro] = useState("");
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  useEffect(() => {
    const obtenerPresupuestoStorage = async () => {
      try {
        const presupuestoStorage =
          (await AsyncStorage.getItem("planificador_presupuesto")) ?? 0;
        if (presupuestoStorage > 0) {
          setPresupuesto(presupuestoStorage);
          setIsValidPresupuesto(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    obtenerPresupuestoStorage();
  }, []);

  useEffect(() => {
    if (isValidPresupuesto) {
      const guardarPresupuestoStorage = async () => {
        try {
          await AsyncStorage.setItem("planificador_presupuesto", presupuesto);
        } catch (error) {
          console.log(error);
        }
      };
      guardarPresupuestoStorage();
    }
  }, [isValidPresupuesto]);

  useEffect(() => {
    const obtenerGastosStorage = async () => {
      try {
        const gastosStorage =
          (await AsyncStorage.getItem("planificador_gastos")) ?? [];
        setGastos(gastosStorage ? JSON.parse(gastosStorage) : []);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerGastosStorage();
  }, []);

  useEffect(() => {
    const guardarGastosStorage = async () => {
      try {
        await AsyncStorage.setItem(
          "planificador_gastos",
          JSON.stringify(gastos)
        );
      } catch (error) {
        console.log(error);
      }
    };
    guardarGastosStorage();
  }, [gastos]);

  const handleNuevoPresupuesto = (presupuesto) => {
    if (Number(presupuesto) > 0) {
      setIsValidPresupuesto(true);
    } else {
      Alert.alert("Error", "El presupuesto no puede ser 0 o menor");
    }
  };

  const handleGasto = (gasto) => {
    if ([gasto.nombre, gasto.categoria, gasto.cantidad].includes("")) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    if (gasto.id) {
      const gastosActualizados = gastos.map((gastoState) =>
        gastoState.id === gasto.id ? gasto : gastoState
      );
      setGastos(gastosActualizados);
    } else {
      gasto.id = generarId();
      gasto.fecha =
        new Date().toString().slice(8, 10) +
        " " +
        "de" +
        " " +
        new Date().toString().slice(4, 7) +
        " " +
        "de" +
        " " +
        new Date().toString().slice(11, 15);

      setGastos([...gastos, gasto]);
    }

    setModal(!modal);
  };

  const eliminarGasto = (id) => {
    Alert.alert(
      "¿Deseas eliminar este gasto?",
      "Un gasto eliminado no se puede recuperar",
      [
        { text: "No", style: "cancel" },
        {
          text: "Si, eliminar",
          onPress: () => {
            const gastosActualizados = gastos.filter(
              (gastoState) => gastoState.id !== id
            );

            setGastos(gastosActualizados);
            setModal(!modal);
            setGasto({});
          },
        },
      ]
    );
  };

  const resetearApp = () => {
    Alert.alert(
      "¿Deseas resetear la app?",
      "Esto eliminará el presupuesto y los gastos",
      [
        { text: "No", style: "cancel" },
        {
          text: "Si, eliminar",
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              setIsValidPresupuesto(false);
              setPresupuesto(0);
              setGastos([]);
            } catch (error) {
              console.log(error);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.contenedor}>
      <ScrollView>
        <View style={styles.header}>
          <Header />
          {isValidPresupuesto ? (
            <ControlPresupuesto
              resetearApp={resetearApp}
              gastos={gastos}
              presupuesto={presupuesto}
            />
          ) : (
            <NuevoPresupuesto
              presupuesto={presupuesto}
              setPresupuesto={setPresupuesto}
              handleNuevoPresupuesto={handleNuevoPresupuesto}
            />
          )}
        </View>

        {isValidPresupuesto && (
          <>
            <Filtro
              setGastosFiltrados={setGastosFiltrados}
              gastos={gastos}
              filtro={filtro}
              setFiltro={setFiltro}
            />
            <ListadoGastos
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
              setGasto={setGasto}
              setModal={setModal}
              gastos={gastos}
            />
          </>
        )}
      </ScrollView>
      {modal && (
        <Modal
          style={styles.modal}
          onRequestClose={() => {
            setModal(!modal);
          }}
          animationType="slide"
          visible={modal}
        >
          <FormularioGasto
            style={styles.formularioGasto}
            eliminarGasto={eliminarGasto}
            gasto={gasto}
            setGasto={setGasto}
            handleGasto={handleGasto}
            modal={modal}
            setModal={setModal}
          />
        </Modal>
      )}
      {isValidPresupuesto && (
        <Pressable style={styles.presable} onPress={() => setModal(!modal)}>
          <Image
            style={styles.imagen}
            source={require("./src/img/nuevo-gasto.png")}
          />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: "#f5f5f5",
    flex: 1,
  },
  header: {
    paddingTop: 20,
    minHeight: 400,
    backgroundColor: "#3b82f6",
  },
  modal: {},
  imagen: {
    width: 60,
    height: 60,
  },
  presable: {
    width: 60,
    height: 60,
    position: "absolute",
    bottom: 30,
    right: 30,
  },
});

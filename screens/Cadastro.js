import { useState } from "react";
import { Alert, Button, StyleSheet, TextInput, View } from "react-native";

import { auth } from "../firebaseConfig";

import { createUserWithEmailAndPassword } from "firebase/auth";

import { ActivityIndicator } from "react-native";

const Cadastro = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const cadastrar = () => {
    if (!email || !senha) {
      Alert.alert("Atenção", "Você deve preencher e-mail e senha");
      return;
    }
    setLoading(true);

    createUserWithEmailAndPassword(auth, email, senha)
      .then(() => {
        setLoading(false);

        const entrar = () => {
          navigation.navigate("AreaLogada");
        };

        const cancel = () => {
          navigation.navigate("Inicial");
        };

        Alert.alert(
          "Conta criada com sucesso.",
          "Deseja entrar no aplicativo?",
          [
            {
              text: "Sim! Quero entrar",
              onPress: entrar,
            },
            {
              text: "Não!",
              onPress: cancel,
            },
          ]
        );
      })
      .catch((error) => {
        console.log(error);
        let mensagem;
        switch (error.code) {
          case "auth/email-already-in-use":
            mensagem = "E-mail já cadastrado";
            break;
          case "auth/weak-password":
            mensagem = "Senha deve ter, pelo menos, seis digitos!";
            break;
          default:
            mensagem = "Algo deu errado... Tente novamente";
            break;
        }
        Alert.alert("Atenção!", mensagem);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View style={estilos.container}>
      <View style={estilos.formulario}>
        <TextInput
          placeholder="E-mail"
          style={estilos.input}
          keyboardType="email-address"
          onChangeText={(valor) => setEmail(valor)}
        />
        <TextInput
          placeholder="Senha"
          style={estilos.input}
          secureTextEntry
          onChangeText={(valor) => setSenha(valor)}
        />
        <View style={estilos.botoes}>
          <Button
            onPress={cadastrar}
            title="Cadastre-se"
            color="blue"
            disabled={loading}
          />
          {loading && <ActivityIndicator size="small" color="#0000ff" />}
        </View>
      </View>
    </View>
  );
};

export default Cadastro;

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center",
  },
  formulario: {
    marginVertical: 16,
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    marginVertical: 8,
    padding: 8,
    borderRadius: 4,
  },
  botoes: {
    marginVertical: 8,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

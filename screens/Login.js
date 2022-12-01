import { Alert, Button, StyleSheet, TextInput, View } from "react-native";
import { useState } from "react";

import { ActivityIndicator } from "react-native";

//Importação dos recursos de autenticação através das configurações do Firebase
import { auth } from "../firebaseConfig";

//Importação das funções de autenticação direto da biblioteca
import { signInWithEmailAndPassword } from "firebase/auth";
import { sendPasswordResetEmail } from "firebase/auth";
const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const login = () => {
    if (!email || !senha) {
      Alert.alert("Atenção!", "Você deve preencher todos os campos");
      return; //Para o processo
    }

    setLoading(true);

    signInWithEmailAndPassword(auth, email, senha)
      .then(() => {
        setLoading(false);

        navigation.navigate("AreaLogada");
      })
      .catch((error) => {
        let mensagem;
        switch (error.code) {
          case "auth/user-not-found":
            mensagem = "Usuário não encontrado!";
            break;
          case "auth/wrong-password":
            mensagem = "Senha incorreta";
            break;
          default:
            mensagem = "Houve um erro. Tente novamente mais tarde";
            break;
        }

        Alert.alert("Ops", mensagem);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const recuperarSenha = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert("Atenção!", "Verifique sua caixa de entrada");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={estilos.container}>
      <View style={estilos.formulario}>
        <TextInput
          onChangeText={(valor) => setEmail(valor)}
          placeholder="E-mail"
          style={estilos.input}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Senha"
          style={estilos.input}
          secureTextEntry
          onChangeText={(valor) => setSenha(valor)}
        />
        <View style={estilos.botoes}>
          <Button
            title="Entre"
            color="green"
            onPress={login}
            disabled={loading}
          />
          {loading && <ActivityIndicator size="small" color="#0000ff" />}
          <Button
            title="Esqueci minha senha"
            color="yellow"
            onPress={recuperarSenha}
          />
        </View>
      </View>
    </View>
  );
};

export default Login;

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgreen",
    alignItems: "center",
    justifyContent: "center",
  },
  formulario: {
    marginBottom: 32,
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

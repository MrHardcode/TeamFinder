import React, { useState } from "react";
import { View, Button, TextInput, StyleSheet, Modal } from "react-native";
import { Image } from "react-native";

const LoginInput = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const inputUsernameHandler = (input) => {
    setUsername(input);
  };

  const inputPasswordHandler = (input) => {
    setPassword(input);
  };

  const resetInput = () => {
    setUsername("");
    setPassword("");
  };

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="USERNAME"
          style={styles.input}
          onChangeText={inputUsernameHandler}
          value={username}
        />
        <TextInput
          placeholder="PASSWORD"
          style={styles.input}
          onChangeText={inputPasswordHandler}
          value={password}
          secureTextEntry={true}
        />
        <View style={styles.buttons}>
          <Button
            title="LOGIN"
            onPress={() => {
              resetInput();
              props.loginInputHandler(username, password);
            }}
          />
          {/*If you want to style e.g. the width of the buttons 
                 you have to wrap them in views*/}
          <Button
            title="CANCEL"
            color="grey"
            onPress={() => {
              resetInput();
              props.onCancel();
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

class LoginIcon extends React.Component {
  render() {
    return (
      <Image
        source={require("../assets/icons8_Login.png")}
        fadeDuration={0}
        style={{ width: 20, height: 20 }}
      />
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    padding: 6,
    marginBottom: 3,
  },
  buttons: {
    flexDirection: "row",
    padding: 5,
    justifyContent: "center",
  },
});

export { LoginIcon };
export default LoginInput;

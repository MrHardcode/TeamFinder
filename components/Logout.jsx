import React from "react";
import { View, Button, StyleSheet, Modal, Text } from "react-native";

const Logout = (props) => {
  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <Text style={{ fontSize: 20 }}>You are logged in</Text>
        <Text>Username: {props.user.username}</Text>
        <View style={styles.buttons}>
          <Button title="LOG OUT" onPress={props.logoutInputHandler} />
          <Button
            title="BACK"
            color="grey"
            onPress={() => {
              props.onCancel();
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    flexDirection: "row",
    padding: 5,
    justifyContent: "center",
  },
});

export default Logout;

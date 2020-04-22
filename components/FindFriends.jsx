import React, { useState } from "react";
import { View, Button, TextInput, StyleSheet, Modal } from "react-native";

const FindFriends = (props) => {
  const [inputDistance, setInputDistance] = useState("");

  const inputDistanceHandler = (distance) => {
    setInputDistance(""+distance);
  };

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Search radius"
          style={styles.input}
          onChangeText={inputDistanceHandler}
          value={inputDistance}
          keyboardType="numeric"
        />
        <View style={styles.buttons}>
          <Button
            title="SEARCH"
            onPress={props.search.bind(this, parseFloat(inputDistance))}
          />
          <Button title="CANCEL" color="grey" onPress={props.onCancel} />
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
  input: {
    width: "80%",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    padding: 5,
    marginBottom: 3,
  },
  buttons: {
    flexDirection: "row",
    padding: 5,
    justifyContent: "center",
  },
});

export default FindFriends;
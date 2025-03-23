import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import SunmiPrinter from "react-native-sunmi-printer";

const App = () => {
  const [ingredient, setIngredient] = useState("");

  const printLabel = async () => {
    if (!SunmiPrinter || !SunmiPrinter.text || !SunmiPrinter.print) {
      Alert.alert("Error", "Sunmi Printer is not available on this device.");
      console.error("SunmiPrinter is undefined or missing methods.");
      return;
    }

    if (!ingredient.trim()) {
      Alert.alert("Error", "Please enter an ingredient before printing.");
      return;
    }

    try {
      await SunmiPrinter.text(`Ingredient: ${ingredient}\n`);
      await SunmiPrinter.print();
      Alert.alert("Success", "Label printed successfully!");
    } catch (error) {
      console.error("Printing error:", error);
      Alert.alert("Error", "Failed to print label.");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Enter Ingredient:</Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: "#ddd",
          padding: 10,
          marginBottom: 20,
          borderRadius: 5,
        }}
        placeholder="Type ingredient here..."
        value={ingredient}
        onChangeText={setIngredient}
      />
      <Button title="Print Label" onPress={printLabel} />
    </View>
  );
};

export default App;

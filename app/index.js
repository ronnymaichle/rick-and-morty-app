import { StyleSheet, Text, SafeAreaView, Alert, View } from "react-native";

import Form from "./components/Form";
export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Rick and Morty guide</Text>
      </View>
      <Form />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    position: "relative",
    backgroundColor: "#62a4ab",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 0,
  },
  titleContainer: {
    marginTop: 100,
    height: "auto",
  },
  title: { fontSize: 28 },
});

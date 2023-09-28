import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  Image,
  Alert,
  View,
} from "react-native";
import { useState } from "react";
import { getCharacterImage } from "../services/rickAndMortyApi";

export default function Form() {
  const [inputTextField, setInputTextField] = useState("");
  const [loading, setLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [name, setName] = useState("");

  const onChangeText = (text) => {
    setInputTextField(text);
  };

  const clearForm = () => {
    setName("");
    setImgUrl("");
    setInputTextField("");
  };

  const handleSubmitButton = async () => {
    try {
      setLoading(true);
      const whitespacesRegex = /\s+/g;
      const trimmedInputTextField = inputTextField
        .trim()
        .replace(whitespacesRegex, " "); //replaces consecutive whitespaces with 1 instead
      const imgUrlString = await getCharacterImage(trimmedInputTextField);
      setImgUrl(imgUrlString);
      setName(trimmedInputTextField);
    } catch (error) {
      Alert.alert("Oops!", error.message, [
        { text: "OK", onPress: () => clearForm() },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={inputTextField}
          placeholder="type a character's name..."
          keyboardType="default"
        />
        <Button
          color="#f9bf1e"
          title="submit"
          disabled={loading}
          onPress={() => handleSubmitButton()}
        />
        <View style={styles.imgContainer}>
          {imgUrl && name && (
            <>
              <Text style={styles.imgName}>{name}</Text>
              <Image
                source={{ uri: imgUrl }}
                style={{ width: 250, height: 250 }}
              />
            </>
          )}
        </View>
      </View>
      {loading && (
        <ActivityIndicator
          color="#FFFFFF"
          style={styles.loading}
          size="large"
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    width: "100%",
    height: "auto",
    flexDirection: "column",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  imgContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imgName: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    marginTop: 50,
    height: 40,
    width: "60%",
    margin: 10,
    borderWidth: 1,
    padding: 8,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    fontSize: 14,
  },
  loading: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    zIndex: 100,
  },
});

import React, { useEffect, useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PromptModal({ visible, onClose, onSubmit, title }) {
  const [switch1, setSwitch1] = useState("");
  const [switch2,setSwitch2] = useState("")
  const [Switch3,setSwitch3] = useState("")
  const [Switch4,setSwitch4] = useState("")
  const [jsondata, setJson] = useState("")


  const handleSubmit = async()=> {
    onSubmit(switch1,switch2,Switch3,Switch4);
    setSwitch1("");
    setSwitch2("")
    setSwitch3("")
    setSwitch4("")
    console.log(switch1)
    console.log(switch2)
    console.log(Switch3)
    console.log(Switch4)

    const obj = {
        Switch_1:switch1,
        Switch_2:switch2,
        Switch_3:Switch3,
        Switch_4:Switch4
    }
    if(switch1 && switch2 && Switch3 && Switch4){
    setJson(obj)
    onClose();
    console.log(obj.Switch_1)
    const lastdata = JSON.stringify(obj)
    await AsyncStorage.setItem("data",lastdata)
    }

  };

{/*useEffect(()=>{
    const setData = async() => {
        if(jsondata){
        const lastdata = JSON.stringify(jsondata)
        await AsyncStorage.setItem("data",lastdata)
        console.log(lastdata)
        }
    }
    setData()
})*/}



  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Text style={styles.title}>{title}</Text>

          <TextInput
            placeholder="Switch 1"
            placeholderTextColor={"gray"}
            value={switch1}
            onChangeText={setSwitch1}
            style={styles.input}
            autoFocus
          />

          <TextInput
            placeholder="Switch 2"
            placeholderTextColor={"gray"}
            value={switch2}
            onChangeText={setSwitch2}
            style={styles.input}
            autoFocus
          />
          <TextInput
            placeholder="Switch 3"
            placeholderTextColor={"gray"}
            value={Switch3}
            onChangeText={setSwitch3}
            style={styles.input}
            autoFocus
          />
          <TextInput
            placeholder="Switch 4"
            placeholderTextColor={"gray"}
            value={Switch4}
            onChangeText={setSwitch4}
            style={styles.input}
            autoFocus
          />

          <View style={styles.row}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.cancel}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSubmit}>
              <Text style={styles.ok}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" },
  box: { width: "80%", backgroundColor: "#1c1c1e", padding: 20, borderRadius: 12 },
  title: { color: "white", fontSize: 16, marginBottom: 10 },
  input: { backgroundColor: "#2c2c2e", color: "white", borderRadius: 8, padding: 10,marginTop:8},
  row: { flexDirection: "row", justifyContent: "flex-end", marginTop: 15 },
  cancel: { color: "#aaa", marginRight: 20 },
  ok: { color: "#0a84ff" },
});

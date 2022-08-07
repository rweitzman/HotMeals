import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { LocationList } from "@components";

export default function MapList() {
  const [locations, setLocations] = useState([]);

  // This address is unique to your computer, please modify ipAddress accordingly. Instructions are in README.
  const ipAddress = "192.168.1.5";

  useEffect(() => {
    fetch(`http://${ipAddress}:8000/locations`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setLocations(data["connecticut"]))
      .catch((err) => console.log("request failred!", err));
  }, []);

  return (
    <View style={styles.container}>
      <LocationList locations={locations}></LocationList>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

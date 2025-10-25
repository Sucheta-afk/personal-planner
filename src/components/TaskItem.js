import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function TaskItem({ title }) {
  return (
    <View style={styles.taskItem}>
      <Text>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  taskItem: {
    padding: 12,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    marginBottom: 10,
  },
});

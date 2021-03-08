import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import EditableTimer from "./components/EditableTimer";
import ToggleableTimeForm from "./components/ToggleableTimeForm";
import uuidv4 from 'uuid/v4';
import { newTimer } from "./utils/TimerUtils"

export default class App extends Component {
state = {
  timers : [
    {
      title :" tondre le gazon",
      project: "Le jardin",
      id: uuidv4(),
      // elapsed : 5456099,
      isRunning : true
    },
    {
      title :" Faire à manger",
      project: "Cuisine",
      id: uuidv4(),
      // elapsed : 1273998,
      isRunning : false
    },
  ]
}
handleCreateFormSubmit = timer => {
  const { timers } = this.state;
  this.setState({ 
    timers: [newTimer(timer), ...timers],
  })
}

  render() {
    const { timers} = this.state;
    return (
      <View style={styles.appContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Timers</Text>
        </View>
        <ScrollView style={styles.timerList}>
          <ToggleableTimeForm onFormSubmit={this.handleCreateFormSubmit} />
          {timers.map(( {title,project,id, elapsed, isRunning})=> (
            <EditableTimer key={id}
            id={id}
            title={title}
            project={project}
            elapsed={elapsed}
            isRunning={isRunning}
            />
          ))}
          
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  titleContainer: {
    paddingTop: 35,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#D6D7DA",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  timerList: {
    paddingBottom: 15,
  },
});

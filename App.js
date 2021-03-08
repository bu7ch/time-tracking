import React, { Component } from "react";
import { ScrollView, StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import EditableTimer from "./components/EditableTimer";
import ToggleableTimeForm from "./components/ToggleableTimeForm";
import uuidv4 from "uuid/v4";
import { newTimer } from "./utils/TimerUtils";

export default class App extends Component {
  state = {
    timers: [
      // {
      //   title: " tondre le gazon",
      //   project: "Le jardin",
      //   id: uuidv4(),
      //   elapsed: 5456099,
      //   isRunning: true,
      // },
      // {
      //   title: " Faire à manger",
      //   project: "Cuisine",
      //   id: uuidv4(),
      //   elapsed: 1273998,
      //   isRunning: false,
      // },
    ],
  };
  handleCreateFormSubmit = (timer) => {
    const { timers } = this.state;
    this.setState({
      timers: [newTimer(timer), ...timers],
    });
  };
  handlerForSubmit = (attrs) => {
    const { timers } = this.state;
    this.setState({
      timers: timers.map((timer) => {
        if (timer.id === attrs.id) {
          const { title, project } = attrs;
          return {
            ...timer,
            title,
            project,
          };
        } else {
          return timer;
        }
      }),
    });
  };
  handleRemovePress = (timerId) => {
    this.setState({
      timers: this.state.timers.filter((timer) => timer.id !== timerId),
    });
  };

  componentDidMount() {
    const TIME_INTERVAL = 1000;

    this.intervalId = setInterval(() => {
      const { timers } = this.state;

      this.setState({
        timers: timers.map((timer) => {
          const { elapsed, isRunning } = timer;
          return {
            ...timer,
            elapsed: isRunning ? elapsed + TIME_INTERVAL : elapsed,
          };
        }),
      });
    }, TIME_INTERVAL);
  }
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  handleStartPress = () => {
    const { id, onStartPress } = this.props;
    onStartPress(id);
  };
  handleStopPress = () => {
    const { id, onStopPress } = this.props;
    onStopPress(id);
  };
  toggleTimer = timerId => {
    this.setState(prevState => {
      const {timers } = prevState;
      return {
        timers: timers.map(timer =>{
          const { id, isRunning } = timer;

          if (id===timerId) {
            return { 
              ...timer,
              isRunning: !isRunning
            }
          }
          return timer;
        })
      }
    })
  }
  render() {
    const { timers } = this.state;
    return (
      <View style={styles.appContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Timers</Text>
        </View>
        <KeyboardAvoidingView 
        behavior="padding"
        style={styles.timerListContainer}>
        <ScrollView contentContainerStyle={styles.timerList}>
          <ToggleableTimeForm onFormSubmit={this.handleCreateFormSubmit} />
          {timers.map(({ title, project, id, elapsed, isRunning }) => (
            <EditableTimer
              key={id}
              id={id}
              title={title}
              project={project}
              elapsed={elapsed}
              isRunning={isRunning}
              onFormSubmit={this.handlerForSubmit}
              onRemovePress={this.handleRemovePress}
              onStartPress= {this.toggleTimer}
              onStopPress = {this.toggleTimer}
            />
          ))}
        </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  timerListContainer: {
    flex: 1,
  },
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

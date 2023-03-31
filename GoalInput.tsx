import React, {useState} from 'react';
import {TextInput, View, Button, StyleSheet} from 'react-native';

export type GoalInputProp = {
  onAddGoal: (enterdText: string) => void;
  onCancel: () => {};
};

const GoalInput: React.FC<GoalInputProp> = ({onAddGoal, onCancel}) => {
  const [enterdText, setEnterdText] = useState('');

  const handleEnterText = (text: string) => {
    setEnterdText(text);
  };

  const handleAddGoal = () => {
    onAddGoal(enterdText);
    setEnterdText('');
    onCancel();
  };

  return (
    <View style={styles.sectionContainer}>
      <TextInput
        onChangeText={handleEnterText}
        value={enterdText}
        style={styles.input}
        placeholder="Enter new todo"
        onSubmitEditing={handleAddGoal}
      />
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button title="Cancel" onPress={onCancel} />
        </View>
        <View style={styles.button}>
          <Button title="Add goal" onPress={handleAddGoal} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  input: {
    borderBottomWidth: 2,
    padding: 10,
    borderBottomColor: '#007aff54',
    marginBottom: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  button: {
    margin: 5,
  },
});

export default GoalInput;

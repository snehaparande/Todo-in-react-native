import React from 'react';
import {View, Text, FlatList, Pressable} from 'react-native';

type GoalItemProps = {
  text: string;
  id: number;
  deleteGoal: (id: number) => void;
};

const GoalIetm: React.FC<GoalItemProps> = ({text, id, deleteGoal}) => {
  return (
    <Pressable style={styles.button} onPress={() => deleteGoal(id)}>
      <View>
        <Text>{text}</Text>
      </View>
    </Pressable>
  );
};

export type GoalItemsProps = {
  goalItems: {text: string; key: number}[];
  onDelete: (keyToBeDeleted: number) => void;
};

const GoalItems: React.FC<GoalItemsProps> = ({goalItems, onDelete}) => {
  return (
    <FlatList
      data={goalItems}
      renderItem={({item}) => (
        <GoalIetm text={item.text} id={item.key} deleteGoal={onDelete} />
      )}
    />
  );
};

const styles = {
  button: {
    borderBottomColor: '#007aff54',
    borderBottomWidth: 2,
    borderRadius: 10,
    padding: 10,
  },
};

export default GoalItems;

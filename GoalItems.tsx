import React from 'react';
import {View, Text, FlatList, Pressable, StyleSheet} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

type GoalItemProps = {
  text: string;
  id: number;
  isDone: boolean;
  onCheck: (keyToCheck: number, isChecked: boolean) => void;
  deleteGoal: (id: number) => void;
};

const GoalItem: React.FC<GoalItemProps> = ({
  text,
  id,
  isDone,
  onCheck,
  deleteGoal,
}) => {
  return (
    <View style={styles.goalIetm}>
      <BouncyCheckbox
        isChecked={isDone}
        onPress={(isChecked: boolean) => onCheck(id, isChecked)}
        text={text}
        size={15}
        fillColor={'#007AFF'}
        iconStyle={styles.checkBoxIcon}
        innerIconStyle={styles.checkBoxIcon}
      />
      <Pressable onPress={() => deleteGoal(id)}>
        <Text style={styles.buttonText}>x</Text>
      </Pressable>
    </View>
  );
};

export type GoalItemsProps = {
  goalItems: {text: string; key: number; isDone: boolean}[];
  onCheck: (keyToCheck: number, isChecked: boolean) => void;
  onDelete: (keyToBeDeleted: number) => void;
};

const GoalItems: React.FC<GoalItemsProps> = ({
  goalItems,
  onCheck,
  onDelete,
}) => {
  return (
    <FlatList
      data={goalItems}
      renderItem={({item}) => (
        <GoalItem
          text={item.text}
          id={item.key}
          isDone={item.isDone}
          onCheck={onCheck}
          deleteGoal={onDelete}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  goalIetm: {
    borderBottomColor: '#007aff54',
    borderBottomWidth: 2,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checkBoxIcon: {borderRadius: 2},
  buttonText: {
    color: '#007AFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default GoalItems;

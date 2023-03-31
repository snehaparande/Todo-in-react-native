import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {Button, Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import GoalInput from './GoalInput';
import GoalItems from './GoalItems';

const Stack = createNativeStackNavigator();

const GoalLogo = () => {
  return (
    <View style={styles.header}>
      <Image style={styles.logo} source={require('./assets/goal.png')} />
      <Text style={styles.headerTitle}>My Goals</Text>
    </View>
  );
};

const storeData = async (value: {text: string; key: number}[]) => {
  try {
    await AsyncStorage.setItem('todo', JSON.stringify(value));
  } catch (e) {}
};

const fetchData = async () => {
  let data = null;
  try {
    const value = await AsyncStorage.getItem('todo');
    if (value != null) {
      data = value;
    }
  } catch (e) {}
  return data;
};

const App = () => {
  const [goalItems, setGoalItems] = useState<{text: string; key: number}[]>([]);

  useEffect(() => {
    fetchData().then(x => {
      if (x) {
        setGoalItems(JSON.parse(x));
      }
    });
  }, []);

  const handleAddGoal = (enterdText: string) => {
    setGoalItems(oldItems => {
      const newGoalItems = [
        ...oldItems,
        {text: enterdText, key: new Date().getTime()},
      ];
      storeData(newGoalItems);
      return newGoalItems;
    });
  };

  const handleDeleteGoal = (keyToBeDeleted: number) => {
    setGoalItems(items => {
      const newItems = items.filter(({key}) => key !== keyToBeDeleted);
      storeData(newItems);
      return newItems;
    });
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen
          name="GoalItems"
          options={{headerTitle: () => <GoalLogo />}}>
          {({navigation}) => (
            <View style={styles.sectionContainer}>
              <StatusBar
                barStyle={'light-content'}
                backgroundColor={'#007AFF'}
              />
              <View style={styles.button}>
                <Button
                  title="Add new goal"
                  onPress={() => navigation.navigate('AddGoal')}
                />
              </View>
              <GoalItems goalItems={goalItems} onDelete={handleDeleteGoal} />
            </View>
          )}
        </Stack.Screen>
        <Stack.Screen name="AddGoal" options={{title: 'Add New Goal'}}>
          {({navigation}) => (
            <GoalInput
              onAddGoal={handleAddGoal}
              onCancel={() => navigation.navigate('GoalItems')}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const screenOptions: NativeStackNavigationOptions = {
  headerBackTitleVisible: false,
  headerStyle: {backgroundColor: '#007AFF'},
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

const styles = StyleSheet.create({
  header: {
    flex: 0.9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 22,
  },
  logo: {
    height: 25,
    width: 27,
    marginRight: 5,
  },
  sectionContainer: {
    padding: 20,
  },
  button: {
    marginVertical: 15,
  },
});

export default App;

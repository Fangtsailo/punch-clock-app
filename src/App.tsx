import 'react-native-gesture-handler';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import PunchClock from './screens/PunchClock';
import HistoryScreen from './screens/History';

const Drawer = createDrawerNavigator();

export default function App(): JSX.Element {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="打卡提醒">
          <Drawer.Screen name="打卡提醒" component={PunchClock} />
          <Drawer.Screen name="打卡歷史" component={HistoryScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

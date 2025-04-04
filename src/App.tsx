import 'react-native-gesture-handler';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import PunchClock from '@/screens/PunchClock';
import HistoryScreen from '@/screens/History';
import { PunchHistoryListProvider } from '@/context/PunchHistoryList';
import { ThenmeNavigationContainer } from '@/setting/NavigationContainer';

const Drawer = createDrawerNavigator();

export default function App(): JSX.Element {
  return (
    <PunchHistoryListProvider>
      <PaperProvider>
        <NavigationContainer theme={ThenmeNavigationContainer}>
          <Drawer.Navigator initialRouteName="打卡提醒">
            <Drawer.Screen name="打卡提醒" component={PunchClock} />
            <Drawer.Screen name="打卡歷史" component={HistoryScreen} />
          </Drawer.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </PunchHistoryListProvider>
  );
}

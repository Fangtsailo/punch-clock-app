import 'react-native-gesture-handler';
import React from 'react';
import { Icon, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import PunchClock from '@/screens/PunchClock';
import HistoryScreen from '@/screens/History';
import { PunchHistoryListProvider } from '@/context/PunchHistoryList';
import { ThenmeNavigationContainer } from '@/main/definition';
import PreferenceSetting from '@/screens/PreferenceSetting';
const Drawer = createDrawerNavigator();

export default function App(): JSX.Element {
  return (
    <PunchHistoryListProvider>
      <PaperProvider>
        <NavigationContainer theme={ThenmeNavigationContainer}>
          <Drawer.Navigator initialRouteName="打卡提醒">
            <Drawer.Screen
              options={{
                drawerIcon: ({ color, size }) => (
                  <Icon source="clock-outline" color={color} size={size} />
                ),
              }}
              name="打卡提醒"
              component={PunchClock}
            />
            <Drawer.Screen
              options={{
                drawerIcon: ({ color, size }) => (
                  <Icon source="history" color={color} size={size} />
                ),
              }}
              name="打卡歷史"
              component={HistoryScreen}
            />
            <Drawer.Screen
              options={{
                drawerIcon: ({ color, size }) => (
                  <Icon source="cog-outline" color={color} size={size} />
                ),
              }}
              name="偏好設定"
              component={PreferenceSetting}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </PunchHistoryListProvider>
  );
}

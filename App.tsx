import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { format, isSameDay } from 'date-fns';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

function PunchClockScreen(): JSX.Element {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [punchTime, setPunchTime] = useState<Date | null>(null);
  const [workDuration, setWorkDuration] = useState<number>(9 * 60 * 60 * 1000);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [punchHistory, setPunchHistory] = useState<{ date: string, time: string }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      if (endTime) {
        const diff = Math.max(endTime.getTime() - new Date().getTime(), 0);
        setTimeLeft(diff);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [endTime]);

  const handlePunch = (): void => {
    const now = new Date();
    if (punchTime && isSameDay(punchTime, now)) {
      Alert.alert('提示', '今天已經打卡過了！');
      return;
    }
    setPunchTime(now);
    const end = new Date(now.getTime() + workDuration);
    setEndTime(end);
    const newRecord = { date: format(now, 'yyyy-MM-dd'), time: format(now, 'HH:mm') };
    setPunchHistory((prev) => [...prev, newRecord]);
  };

  const handleReset = (): void => {
    setPunchTime(null);
    setEndTime(null);
    setTimeLeft(null);
  };

  const formatTime = (date: Date): string => format(date, 'HH:mm');
  const formatCountdown = (ms: number): string => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <View className="flex-1 bg-gray-900 items-center justify-center p-5">
      <View className="bg-gray-800 p-5 rounded-lg w-full mb-5">
        <Text className="text-2xl font-bold text-white mb-2.5">打卡提醒</Text>
        <Text className="text-white text-base mb-1">當前時間：{formatTime(currentTime)}</Text>
        {punchTime && <Text className="text-white text-base mb-1">上班時間：{formatTime(punchTime)}</Text>}
        {endTime && <Text className="text-white text-base mb-1">下班時間：{formatTime(endTime)}</Text>}
        {timeLeft !== null && <Text className="text-white text-base mb-1">倒計時：{formatCountdown(timeLeft)}</Text>}
      </View>
      <View className="flex-row justify-around w-full">
        <TouchableOpacity className="w-[120px] h-[120px] rounded-full bg-blue-600 justify-center items-center active:bg-blue-700" onPress={handlePunch}>
          <Text className="text-white text-xl font-bold">{punchTime ? '重新打卡' : '打卡'}</Text>
        </TouchableOpacity>
        <TouchableOpacity className="w-[120px] h-[120px] rounded-full bg-red-600 justify-center items-center active:bg-red-700" onPress={handleReset}>
          <Text className="text-white text-xl font-bold">重置</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function HistoryScreen(): JSX.Element {
  const [punchHistory] = useState<{ date: string, time: string }[]>([]);
  return (
    <View className="flex-1 bg-gray-900 p-5">
      <Text className="text-2xl font-bold text-white mb-4">打卡歷史</Text>
      {punchHistory.map((record, index) => (
        <Text key={index} className="text-white text-base mb-1">{record.date} - {record.time}</Text>
      ))}
    </View>
  );
}

export default function App(): JSX.Element {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="打卡提醒">
          <Drawer.Screen name="打卡提醒" component={PunchClockScreen} />
          <Drawer.Screen name="打卡歷史" component={HistoryScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

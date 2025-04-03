import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { format, isSameDay } from 'date-fns';
import { Provider as PaperProvider } from 'react-native-paper';

export default function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [punchTime, setPunchTime] = useState(null);
  const [workDuration, setWorkDuration] = useState(9 * 60 * 60 * 1000); // 9 hours
  const [endTime, setEndTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      if (endTime) {
        const diff = Math.max(endTime - new Date(), 0);
        setTimeLeft(diff);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [endTime]);

  const handlePunch = () => {
    const now = new Date();
    
    if (punchTime && isSameDay(punchTime, now)) {
      Alert.alert('提示', '今天已經打卡過了！');
      return;
    }

    setPunchTime(now);
    const end = new Date(now.getTime() + workDuration);
    setEndTime(end);
  };

  const handleReset = () => {
    setPunchTime(null);
    setEndTime(null);
    setTimeLeft(null);
  };

  const formatTime = (date) => format(date, 'HH:mm');
  const formatCountdown = (ms) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <PaperProvider>
      <View className="flex-1 bg-gray-900 items-center justify-center p-5">
        <View className="bg-gray-800 p-5 rounded-lg w-full mb-5">
          <Text className="text-2xl font-bold text-white mb-2.5">打卡提醒</Text>
          <Text className="text-white text-base mb-1">當前時間：{formatTime(currentTime)}</Text>
          {punchTime && <Text className="text-white text-base mb-1">上班時間：{formatTime(punchTime)}</Text>}
          {endTime && <Text className="text-white text-base mb-1">下班時間：{formatTime(endTime)}</Text>}
          {timeLeft !== null && <Text className="text-white text-base mb-1">倒計時：{formatCountdown(timeLeft)}</Text>}
        </View>
        <View className="flex-row justify-around w-full">
          <TouchableOpacity 
            className="w-[120px] h-[120px] rounded-full bg-blue-600 justify-center items-center active:bg-blue-700"
            onPress={handlePunch}
          >
            <Text className="text-white text-xl font-bold">
              {punchTime ? '重新打卡' : '打卡'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className="w-[120px] h-[120px] rounded-full bg-red-600 justify-center items-center active:bg-red-700"
            onPress={handleReset}
          >
            <Text className="text-white text-xl font-bold">重置</Text>
          </TouchableOpacity>
        </View>
      </View>
    </PaperProvider>
  );
}

import { format, isSameDay } from 'date-fns';
import { useContext, useEffect, useState } from 'react';
import { Alert, TouchableOpacity, View, Text } from 'react-native';
import uuid from 'react-native-uuid';
import {
  PunchHistory,
  PunchHistoryListContext,
} from '@/context/PunchHistoryList';

export default function PunchClock(): JSX.Element {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [punchTime, setPunchTime] = useState<Date | null>(null);
  const [workDuration, setWorkDuration] = useState<number>(9 * 60 * 60 * 1000);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const { contextPunchHistoryList, setContextPunchHistoryList } = useContext(
    PunchHistoryListContext
  );
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
    setPunchTime(now);
    const end = new Date(now.getTime() + workDuration);
    setEndTime(end);
    const newRecord: PunchHistory = {
      id: uuid.v4(),
      date: format(now, 'yyyy-MM-dd'),
      time: format(now, 'HH:mm'),
    };
    setContextPunchHistoryList([...contextPunchHistoryList, newRecord]);
  };

  const handleReset = (): void => {
    setPunchTime(null);
    setEndTime(null);
    setTimeLeft(null);
  };

  const formatTime = (date: Date): string => format(date, 'HH:mm:ss');
  const formatCountdown = (ms: number): string => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <View className="flex-1 bg-gray-900 items-center justify-center p-5">
      <View className="bg-gray-800 p-5 rounded-lg w-full mb-5">
        <Text className="text-3xl font-bold text-white mb-5">打卡提醒</Text>
        <View className="">
          <View className="flex-row justify-between mb-2">
            <Text className="text-white text-base mb-1">當前時間：</Text>
            <Text className="text-white text-base mb-1">
              {formatTime(currentTime)}
            </Text>
          </View>
          {punchTime && (
            <View className="flex-row justify-between mb-2">
              <Text className="text-white text-base mb-1">上班時間：</Text>
              <Text className="text-white text-base mb-1">
                {formatTime(punchTime)}
              </Text>
            </View>
          )}
          {endTime && (
            <View className="flex-row justify-between mb-2">
              <Text className="text-white text-base mb-1">下班時間：</Text>
              <Text className="text-white text-base mb-1">
                {formatTime(endTime)}
              </Text>
            </View>
          )}
          {timeLeft !== null && (
            <View className="flex-row justify-between mb-2">
              <Text className="text-white text-base mb-1">倒數計時：</Text>
              <Text className="text-white text-base mb-1">
                {formatCountdown(timeLeft)}
              </Text>
            </View>
          )}
        </View>
      </View>
      <View className="flex-row justify-around w-full">
        {punchTime === null && (
          <TouchableOpacity
            className="w-[120px] h-[120px] rounded-full bg-blue-600 justify-center items-center active:bg-blue-700"
            onPress={handlePunch}
          >
            <Text className="text-white text-xl font-bold">打卡</Text>
          </TouchableOpacity>
        )}
        {punchTime !== null && (
          <TouchableOpacity
            className="w-[120px] h-[120px] rounded-full bg-red-600 justify-center items-center active:bg-red-700"
            onPress={handleReset}
          >
            <Text className="text-white text-xl font-bold">重置</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

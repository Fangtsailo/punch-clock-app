import { format, isSameDay } from 'date-fns';
import { useContext, useEffect, useState } from 'react';
import { Alert, TouchableOpacity, View, Text } from 'react-native';
import uuid from 'react-native-uuid';
import {
  PunchHistory,
  PunchHistoryListContext,
} from '@/context/PunchHistoryList';
import PageContainer from '@/components/PageContainer';
import BaseText from '@/components/BaseText';
import RowContainer from '@/components/RowContainer';
import { Icon } from 'react-native-paper';
import PageHeader from '@/components/PageHeader';
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
    <PageContainer>
      <View className="flex-1 items-center justify-center">
        <View className="bg-gray-800 p-5 rounded-lg w-full mb-5">
          <PageHeader title="打卡提醒" icon="clock-outline" />
          <View className="">
            <RowContainer>
              <BaseText text="當前時間：" />
              <BaseText text={formatTime(currentTime)} />
            </RowContainer>
            {punchTime && (
              <RowContainer>
                <BaseText text="上班時間：" />
                <BaseText text={formatTime(punchTime)} />
              </RowContainer>
            )}
            {endTime && (
              <RowContainer>
                <BaseText text="下班時間：" />
                <BaseText text={formatTime(endTime)} />
              </RowContainer>
            )}
            {timeLeft !== null && (
              <RowContainer>
                <BaseText text="倒數計時：" />
                <BaseText text={formatCountdown(timeLeft)} />
              </RowContainer>
            )}
          </View>
        </View>
        <View className="flex-row justify-around w-full">
          {punchTime === null && (
            <TouchableOpacity
              className="w-[120px] h-[120px] rounded-full bg-blue-600 justify-center items-center active:bg-blue-700"
              onPress={handlePunch}
            >
              <Icon source="briefcase-check" color="#fff" size={36} />
            </TouchableOpacity>
          )}
          {punchTime !== null && (
            <TouchableOpacity
              className="w-[120px] h-[120px] rounded-full bg-red-600 justify-center items-center active:bg-red-700"
              onPress={handleReset}
            >
              <Icon source="undo-variant" color="#fff" size={36} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </PageContainer>
  );
}

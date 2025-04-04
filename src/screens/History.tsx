import { useContext } from 'react';
import { View, Text, FlatList } from 'react-native';
import {
  PunchHistory,
  PunchHistoryListContext,
} from '@/context/PunchHistoryList';
export default function HistoryScreen(): JSX.Element {
  const { contextPunchHistoryList: punchHistoryList } = useContext(
    PunchHistoryListContext
  );
  const punchHistoryItem = (record: PunchHistory, index: number) => {
    return (
      <View key={index} className="flex-row justify-between">
        <Text className="text-white text-base mb-4">{record.date}</Text>
        <Text className="text-white text-base mb-4">{record.time}</Text>
      </View>
    );
  };
  return (
    <View className="flex-1 bg-gray-900 p-5">
      <Text className="text-2xl font-bold text-white mb-4">打卡歷史</Text>
      <FlatList
        data={punchHistoryList}
        renderItem={({ item, index }) => punchHistoryItem(item, index)}
      />
    </View>
  );
}

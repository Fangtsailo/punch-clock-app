import { useState } from "react";
import { View, Text } from "react-native";
export default function HistoryScreen(): JSX.Element {
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
import { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Animated } from 'react-native';
import {
  PunchHistory,
  PunchHistoryListContext,
} from '@/context/PunchHistoryList';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';

export default function HistoryScreen(): JSX.Element {
  const {
    contextPunchHistoryList: contextPunchHistoryList,
    setContextPunchHistoryList,
  } = useContext(PunchHistoryListContext);
  const [punchHistoryList, setPunchHistoryList] = useState<PunchHistory[]>([]);
  // useEffect(() => {
  //   setPunchHistoryList(contextPunchHistoryList);
  // }, [contextPunchHistoryList]);
  const removeItem = (id: string) => {
    setContextPunchHistoryList(
      contextPunchHistoryList.filter((item) => item.id !== id)
    );
  };
  const removeAllItems = () => {
    setContextPunchHistoryList([]);
  };
  const renderRightActions = (id: string) => {
    return (
      <Animated.View>
        <TouchableOpacity onPress={() => removeItem(id)}>
          <Text className="text-white text-base mb-4 ml-4 bg-red-500 pl-4 pr-4">
            刪除
          </Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const punchHistoryItem = (record: PunchHistory, index: number) => {
    return (
      <Swipeable renderRightActions={() => renderRightActions(record.id)}>
        <View key={index} className="flex-row justify-between bg-gray-900">
          <Text className="text-white text-base mb-4">{record.date}</Text>
          <Text className="text-white text-base mb-4">{record.time}</Text>
        </View>
      </Swipeable>
    );
  };
  return (
    <View className="flex-1 bg-gray-900 p-5">
      <View className="flex-row justify-between">
        <Text className="text-2xl font-bold text-white mb-12">打卡歷史</Text>
        <TouchableOpacity onPress={() => removeAllItems()}>
          <Text className="text-2xl text-gray-400 font-thin mb-12">
            刪除全部
          </Text>
        </TouchableOpacity>
      </View>
      <GestureHandlerRootView>
        <FlatList
          data={contextPunchHistoryList}
          renderItem={({ item, index }) => punchHistoryItem(item, index)}
        />
      </GestureHandlerRootView>
    </View>
  );
}

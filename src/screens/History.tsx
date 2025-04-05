import { useContext, useEffect, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from 'react-native';
import {
  PunchHistory,
  PunchHistoryListContext,
} from '@/context/PunchHistoryList';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Swipeable, {
  SwipeableMethods,
} from 'react-native-gesture-handler/ReanimatedSwipeable';
import { Icon } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';

export default function HistoryScreen(): JSX.Element {
  const {
    contextPunchHistoryList: contextPunchHistoryList,
    setContextPunchHistoryList,
  } = useContext(PunchHistoryListContext);
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
          <Text className="text-white text-base mb-4 ml-4">
            <Icon source="trash-can" size={24} color="#F56565" />
          </Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const isFocused = useIsFocused();
  const swipeableRefs = useRef<Record<string, SwipeableMethods>>(
    Object.create(null)
  );
  useEffect(() => {
    if (isFocused) {
      Object.values(swipeableRefs.current).forEach((ref) => {
        ref?.close?.();
      });
    }
  }, [isFocused]);

  const punchHistoryItem = (record: PunchHistory, index: number) => {
    return (
      <Swipeable
        ref={(ref) => {
          if (ref) {
            swipeableRefs.current[record.id] = ref as SwipeableMethods;
          } else {
            delete swipeableRefs.current[record.id];
          }
        }}
        renderRightActions={() => renderRightActions(record.id)}
      >
        <View key={index} className="flex-row justify-between bg-gray-900">
          <Text className="text-white text-base mb-4">{record.date}</Text>
          <Text className="text-white text-base mb-4">{record.time}</Text>
        </View>
      </Swipeable>
    );
  };
  const styles = StyleSheet.create({
    inactive: {
      color: '#F56565',
    },
  });
  return (
    <View className="flex-1 bg-gray-900 p-5">
      <View className="flex-row justify-between items-center mb-8">
        <Text className="text-2xl font-bold text-white">打卡歷史</Text>
        <TouchableOpacity onPress={() => removeAllItems()}>
          <Text
            className="text-base text-gray-400 font-thin"
            style={contextPunchHistoryList.length > 0 && styles.inactive}
          >
            刪除全部
          </Text>
        </TouchableOpacity>
      </View>
      <GestureHandlerRootView>
        <FlatList
          keyExtractor={(item) => item.id}
          data={contextPunchHistoryList.slice().reverse()}
          renderItem={({ item, index }) => punchHistoryItem(item, index)}
        />
      </GestureHandlerRootView>
    </View>
  );
}

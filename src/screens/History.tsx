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
import PageContainer from '@/components/PageContainer';
import PageHeader from '@/components/PageHeader';
import BaseText from '@/components/BaseText';
import RowContainer from '@/components/RowContainer';
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
    if (!isFocused) {
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
        <RowContainer>
          <BaseText text={`${index < 9 ? '0' : ''}${index + 1}.`} />
          <BaseText text={record.date} />
          <BaseText text={record.time} />
        </RowContainer>
      </Swipeable>
    );
  };
  return (
    <PageContainer>
      <PageHeader title="打卡歷史" icon="history">
        <TouchableOpacity
          onPress={() => removeAllItems()}
          style={{
            paddingTop: 6,
          }}
        >
          <Icon
            source="delete-sweep-outline"
            size={28}
            color={contextPunchHistoryList.length > 0 ? '#F56565' : '#A1A1AA'}
          />
        </TouchableOpacity>
      </PageHeader>
      <GestureHandlerRootView>
        <FlatList
          keyExtractor={(item) => item.id}
          data={contextPunchHistoryList.slice().reverse()}
          renderItem={({ item, index }) => punchHistoryItem(item, index)}
        />
      </GestureHandlerRootView>
    </PageContainer>
  );
}

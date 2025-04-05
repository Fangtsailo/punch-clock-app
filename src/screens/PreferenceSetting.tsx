import PageContainer from '@/components/PageContainer';
import PageHeader from '@/components/PageHeader';
import { useState } from 'react';
import InputRow from '@/components/InputRow';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-paper';
export default function PreferenceSetting(): JSX.Element {
  const [nickname, setNickname] = useState('');
  const [dailyWorkTime, setDailyWorkTime] = useState('');
  const [recordSaveCount, setRecordSaveCount] = useState('');
  const [targetAsset, setTargetAsset] = useState('');
  const handleSave = (): void => {
    console.log('儲存');
  };
  return (
    <PageContainer>
      <PageHeader title="偏好設定" icon="cog-outline" />
      <InputRow
        label="暱稱"
        value={nickname}
        onChangeText={setNickname}
        placeholder="請輸入暱稱"
      />
      <InputRow
        label="每日工時"
        value={dailyWorkTime}
        onChangeText={setDailyWorkTime}
        placeholder="請輸入每日工時"
      />
      <InputRow
        label="記錄保存筆數"
        value={recordSaveCount}
        onChangeText={setRecordSaveCount}
        placeholder="請輸入記錄保存筆數"
      />
      <InputRow
        label="目標資產"
        value={targetAsset}
        onChangeText={setTargetAsset}
        placeholder="請輸入目標資產"
      />
      <View className="flex-row justify-center items-center">
        {/* <Button title="儲存" onPress={handleSave} /> */}
        <Text className="text-white text-base mb-4 ml-4">
          <Icon source="content-save-outline" size={36} color="green" />
        </Text>
      </View>
    </PageContainer>
  );
}

import { Text } from 'react-native';

export default function BaseText({ text }: { text: string }) {
  return <Text className="text-white text-base mb-1">{text}</Text>;
}

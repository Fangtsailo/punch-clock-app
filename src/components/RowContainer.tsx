import { View } from 'react-native';

export default function RowContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <View className="flex-row justify-between items-center mb-4">
      {children}
    </View>
  );
}

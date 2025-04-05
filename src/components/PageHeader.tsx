import { Text, View } from 'react-native';
import { Icon } from 'react-native-paper';

export default function PageHeader({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <View className="flex-row justify-between items-center mb-8">
      <View className="flex-row items-center">
        <View className="mr-2">
          {icon && <Icon source={icon} color="#A1A1AA" size={24} />}
        </View>
        <Text className="text-2xl font-bold text-gray-400">{title}</Text>
      </View>
      {children && children}
    </View>
  );
}

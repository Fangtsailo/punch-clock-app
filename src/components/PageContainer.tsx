import { View } from 'react-native';

export default function PageContainer({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <View className="flex-1 bg-gray-900 p-5">{children}</View>;
}

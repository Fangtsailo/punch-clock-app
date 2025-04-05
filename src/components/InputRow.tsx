import { TextInput, View } from 'react-native';
import RowContainer from '@/components/RowContainer';
import BaseText from '@/components/BaseText';

export default function InputRow({
  label,
  value,
  placeholder,
  onChangeText,
}: {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
}): JSX.Element {
  return (
    <RowContainer>
      <BaseText text={label} />
      <TextInput
        className="text-xl font-bold text-gray-400"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
      />
    </RowContainer>
  );
}

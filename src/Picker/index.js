import { Picker } from '@react-native-picker/picker';

export function PickerItem({ moedas, moedaSelecionada, onChange }) {
  return (
    <Picker selectedValue={moedaSelecionada} onValueChange={(valor) => onChange(valor)}>
      {moedas.map((moeda, index) => (
        <Picker.Item label={moeda.label} value={moeda.value} key={index} />
      ))}
    </Picker>
  );
}

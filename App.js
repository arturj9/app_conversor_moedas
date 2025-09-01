import { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { PickerItem } from './src/Picker';
import { api } from './src/Services/api';

function App() {
  const [loading, setLoading] = useState(true);
  const [moedas, setMoedas] = useState([]);
  const [moedaSelecionada, setMoedaSelecionada] = useState(null);
  const [moedaBValor, setMoedaBValor] = useState(0);
  const [valorMoeda, setValorMoeda] = useState(null);
  const [valorConvertido, setValorConvertido] = useState(0);

  useEffect(() => {
    async function loadMoedas() {
      const response = await api.get('all');
      let arrayMoedas = [];
      Object.keys(response.data).map(key => {
        arrayMoedas.push({
          key: key,
          label: key,
          value: key,
        });
      });
      setMoedas(arrayMoedas);
      setMoedaSelecionada(arrayMoedas[0].key);
      setLoading(false);
    }

    loadMoedas();
  }, []);

  async function converter() {
    if (moedaBValor === 0 || moedaBValor === '' || moedaSelecionada === null) {
      return;
    }

    const response = await api.get(`/all/${moedaSelecionada}-BRL`);
    let resultado =
      response.data[moedaSelecionada].ask * parseFloat(moedaBValor);
    setValorConvertido(resultado.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }));
    setValorMoeda(moedaBValor);
    Keyboard.dismiss();
  }

  if (loading) {
    return (
      <View
        style={{
          backgroundColor: '#101215',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.areaMoeda}>
          <Text style={styles.titulo}>Selecione sua moeda</Text>
          <PickerItem
            moedas={moedas}
            moedaSelecionada={moedaSelecionada}
            onChange={moeda => setMoedaSelecionada(moeda)}
          />
        </View>
        <View style={styles.areaValores}>
          <Text style={styles.titulo}>
            Digite um valor para converter em (R$)
          </Text>
          <TextInput
            style={styles.input}
            placeholder="EX: 1.50"
            keyboardType="numeric"
            value={moedaBValor}
            onChangeText={setMoedaBValor}
          />
        </View>
        <TouchableOpacity onPress={converter} style={styles.botaoArea}>
          <Text style={styles.botaoText}>Converter</Text>
        </TouchableOpacity>
        {valorConvertido !== 0 && (
          <View style={styles.areaResultado}>
            <Text style={styles.valorConvertido}>
              {valorMoeda} {moedaSelecionada}
            </Text>
            <Text style={{ fontSize: 18, margin: 8, color: '#000' }}>
              corresponde a
            </Text>
            <Text style={styles.valorConvertido}>{valorConvertido}</Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101215',
    paddingTop: 40,
    alignItems: 'center',
  },
  areaMoeda: {
    backgroundColor: '#f9f9f9',
    width: '90%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 8,
    marginBottom: 1,
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    paddingLeft: 5,
    paddingTop: 5,
  },
  areaValores: {
    backgroundColor: '#f9f9f9',
    width: '90%',
    paddingTop: 8,
    paddingBottom: 8,
  },
  input: {
    width: '100%',
    padding: 8,
    fontSize: 18,
    color: '#000',
  },
  botaoArea: {
    width: '90%',
    backgroundColor: '#fb4b57',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  botaoText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  areaResultado: {
    width: '90%',
    backgroundColor: '#fff',
    marginTop: 34,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  valorConvertido: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default App;

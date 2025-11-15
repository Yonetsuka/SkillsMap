import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, ActivityIndicator, Alert } from 'react-native';
import { loadCompetencies, removeCompetency } from '../services/storage';
import { useIsFocused } from '@react-navigation/native';
import CompetencyCard from '../components/CompetencyCard';
import { Competency } from '../types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const [items, setItems] = useState<Competency[]>([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  async function load() {
    setLoading(true);
    const data = await loadCompetencies();
    setItems(data);
    setLoading(false);
  }

  async function handleDelete(id: string) {
    console.log('[HomeScreen] handleDelete called for id:', id);
    try {
      console.log('[HomeScreen] removing...', id);
      setItems(prev => {
        const next = prev.filter(i => i.id !== id);
        console.log('[HomeScreen] items after local remove:', next.map(x => x.id));
        return next;
      });
      await removeCompetency(id);
      console.log('[HomeScreen] remove completed for id:', id);
    } catch (e) {
      console.error('[HomeScreen] remove failed', e);
      Alert.alert('Erro', 'Não foi possível remover a competência.');
      await load();
    }
  }

  useEffect(() => { if (isFocused) load(); }, [isFocused]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.heading}>Minhas competências</Text>
        <Button title="Adicionar" onPress={() => navigation.navigate('Add')} />
      </View>

      {loading ? <ActivityIndicator style={{ marginTop: 20 }} /> : (
        <FlatList
          data={items}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <CompetencyCard
              item={item}
              onPress={() => navigation.navigate('Detail', { id: item.id })}
              onDelete={() => handleDelete(item.id)}
            />
          )}
          ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>Nenhuma competência ainda</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: { padding: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  heading: { fontSize: 20, fontWeight: '700' },
});

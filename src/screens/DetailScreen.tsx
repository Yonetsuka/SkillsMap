import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Alert, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { loadCompetencies, updateCompetency, removeCompetency } from '../services/storage';
import { Competency } from '../types';
import ProgressBar from '../components/ProgressBar';
import { v4 as uuidv4 } from 'uuid';
import {stylesSkills} from '../styles/styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

export default function DetailScreen({ route, navigation }: Props) {
  const { id } = route.params;
  const [item, setItem] = useState<Competency | null>(null);
  const [newMilestoneLabel, setNewMilestoneLabel] = useState('');

  useEffect(() => { load(); }, []);

  async function load() {
    const all = await loadCompetencies();
    const found = all.find(i => i.id === id) ?? null;
    setItem(found);
  }

  async function changeProgress(delta: number) {
    if (!item) return;
    const next = Math.max(0, Math.min(100, item.progress + delta));
    const updated = { ...item, progress: next, updatedAt: new Date().toISOString() };
    await updateCompetency(updated);
    setItem(updated);
  }

  async function addMilestone() {
    if (!newMilestoneLabel.trim() || !item) return;
    const ms = { id: uuidv4(), label: newMilestoneLabel.trim(), completed: false };
    const updated = { ...item, milestones: [...(item.milestones ?? []), ms], updatedAt: new Date().toISOString() };
    await updateCompetency(updated);
    setItem(updated);
    setNewMilestoneLabel('');
  }

  async function toggleMilestone(mid: string) {
    if (!item) return;
    const m = (item.milestones ?? []).map(x => x.id === mid ? { ...x, completed: !x.completed } : x);
    const percent = computeProgressFromMilestones(m);
    const updated = { ...item, milestones: m, progress: percent, updatedAt: new Date().toISOString() };
    await updateCompetency(updated);
    setItem(updated);
  }

  function computeProgressFromMilestones(milestones = []) {
    if (!milestones || milestones.length === 0) return item?.progress ?? 0;
    const done = milestones.filter((x: any) => x.completed).length;
    return Math.round((done / milestones.length) * 100);
  }

  async function handleDelete() {
    Alert.alert('Confirmar', 'Deseja remover esta competência?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Remover', style: 'destructive', onPress: async () => { await removeCompetency(id); navigation.goBack(); } }
    ]);
  }

  if (!item) return <View style={{flex:1,alignItems:'center',justifyContent:'center'}}><Text>Carregando...</Text></View>;

  return (
    <View style={[stylesSkills.container, { flex: 1 }]}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.desc}>{item.description}</Text>

      <View style={{ marginVertical: 12 }}>
        <ProgressBar value={item.progress} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
          <TouchableOpacity style={stylesSkills.changeButton} onPress={() => changeProgress(-10)}>
            <Text style={stylesSkills.addButtonText}>-10</Text>
          </TouchableOpacity>
          <TouchableOpacity style={stylesSkills.changeButton} onPress={() => changeProgress(10)}>
            <Text style={stylesSkills.addButtonText}>+10</Text>
          </TouchableOpacity>
          <TouchableOpacity style={stylesSkills.resetButton} onPress={() => changeProgress(-item.progress)}>
            <Text style={stylesSkills.addButtonText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ marginTop: 16 }}>
        <Text style={{ fontWeight: '700' }}>Milestones</Text>
        {(item.milestones ?? []).map(ms => (
          <View key={ms.id} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 6 }}>
            <Button title={ms.completed ? '✔' : '○'} onPress={() => toggleMilestone(ms.id)} />
            <Text style={{ flex: 1, marginLeft: 8 }}>{ms.label}</Text>
          </View>
        ))}

        <TextInput placeholder="Nova milestone" value={newMilestoneLabel} onChangeText={setNewMilestoneLabel} style={stylesSkills.input} />
        <TouchableOpacity style={stylesSkills.addButton} onPress={addMilestone}>
          <Text style={stylesSkills.addButtonText}>Adicionar Milestone</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: '700' },
  desc: { color: '#444', marginTop: 6 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 8, borderRadius: 6, marginVertical: 8, backgroundColor: '#fff' },
});

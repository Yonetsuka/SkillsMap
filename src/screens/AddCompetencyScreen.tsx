import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import { addCompetency } from '../services/storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { stylesSkills } from '../styles/styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Add'>;

export default function AddCompetencyScreen({ navigation }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  async function handleSave() {
    if (!title.trim()) {
      Alert.alert('Erro', 'Digite o título da competência');
      return;
    }
    const now = new Date().toISOString();
    const newItem = {
      id: uuidv4(),
      title: title.trim(),
      description: description.trim(),
      progress: 0,
      milestones: [],
      createdAt: now,
      updatedAt: now,
    };
    await addCompetency(newItem);
    navigation.goBack();
  }

  return (
    <View style={stylesSkills.container}>
      <TextInput placeholder="Título" style={stylesSkills.input} value={title} onChangeText={setTitle} />
      <TextInput placeholder="Descrição (opcional)" style={[stylesSkills.input, { height: 100 }]} value={description} onChangeText={setDescription} multiline />
      <TouchableOpacity style={stylesSkills.addButton} onPress={handleSave}>
        <Text style={stylesSkills.addButtonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: { borderWidth: 1, borderColor: '#ddd', padding: 8, borderRadius: 6, marginBottom: 12, backgroundColor: '#fff' },
});

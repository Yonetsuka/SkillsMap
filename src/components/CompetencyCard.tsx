import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { Competency } from '../types';
import ProgressBar from './ProgressBar';

type Props = {
  item: Competency;
  onPress: () => void;
  onDelete?: () => void;
};

export default function CompetencyCard({ item, onPress, onDelete }: Props) {
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={onPress} onLongPress={() => onDelete && onDelete()} style={{ flex: 1 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>
        <ProgressBar value={item.progress} />
      </TouchableOpacity>

      <View style={styles.rightColumn}>
        <Text style={styles.date}>{new Date(item.updatedAt ?? item.createdAt).toLocaleDateString()}</Text>
        {onDelete ? (
          <View style={styles.deleteWrapper}>
            <Button title="Remover" color="#d9534f" onPress={() => { console.log('[CompetencyCard] onDelete pressed', item.id); onDelete(); }} />
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    backgroundColor: '#fff',
    marginVertical: 8,
    marginHorizontal: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: { fontWeight: '700', fontSize: 16 },
  desc: { color: '#666', marginVertical: 6 },
  date: { marginLeft: 8, color: '#999', fontSize: 12 },
  rightColumn: { alignItems: 'flex-end', marginLeft: 8 },
  deleteWrapper: { marginTop: 8, minWidth: 80 },
});

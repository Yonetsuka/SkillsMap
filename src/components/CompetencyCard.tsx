import React from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import { stylesSkills } from '../styles/styles';
import { Competency } from '../types';
import ProgressBar from './ProgressBar';

type Props = {
  item: Competency;
  onPress: () => void;
  onDelete?: () => void;
};

export default function CompetencyCard({ item, onPress, onDelete }: Props) {
  return (
    <View style={stylesSkills.skillItem}>
      <TouchableOpacity onPress={onPress} onLongPress={() => onDelete && onDelete()} style={{ flex: 1 }}>
        <Text style={stylesSkills.skillTitle}>{item.title}</Text>
        <Text style={stylesSkills.progressText} numberOfLines={2}>{item.description}</Text>
        <ProgressBar value={item.progress} />
      </TouchableOpacity>

      <View style={{ alignItems: 'flex-end', marginLeft: 8 }}>
        <Text style={[stylesSkills.progressText, { fontSize: 12 }]}>{new Date(item.updatedAt ?? item.createdAt).toLocaleDateString()}</Text>
        {onDelete ? (
          <View style={{ marginTop: 8 }}>
            <TouchableOpacity style={stylesSkills.removeButton} onPress={() => { console.log('[CompetencyCard] onDelete pressed', item.id); onDelete && onDelete(); }}>
              <Text style={stylesSkills.removeButtonText}>Remover</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </View>
  );
}

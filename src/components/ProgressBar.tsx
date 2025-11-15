import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = { value: number };

export default function ProgressBar({ value }: Props) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        <View style={[styles.fill, { width: `${pct}%` }]} />
      </View>
      <Text style={styles.label}>{pct}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center' },
  bar: {
    flex: 1,
    height: 12,
    backgroundColor: '#eee',
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 8,
  },
  fill: {
    height: '100%',
    backgroundColor: '#4caf50',
  },
  label: { width: 40, textAlign: 'right' },
});

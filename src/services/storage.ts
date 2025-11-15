import AsyncStorage from '@react-native-async-storage/async-storage';
import { Competency } from '../types';
const STORAGE_KEY = '@competency_map:competencies';

export async function loadCompetencies(): Promise<Competency[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Competency[];
  } catch (e) {
    console.error('loadCompetencies error', e);
    return [];
  }
}

export async function saveCompetencies(items: Competency[]): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error('saveCompetencies error', e);
  }
}

export async function addCompetency(item: Competency): Promise<void> {
  const items = await loadCompetencies();
  items.unshift(item);
  await saveCompetencies(items);
}

export async function updateCompetency(updated: Competency): Promise<void> {
  const items = await loadCompetencies();
  const idx = items.findIndex(i => i.id === updated.id);
  if (idx >= 0) {
    items[idx] = updated;
    await saveCompetencies(items);
  }
}

export async function removeCompetency(id: string): Promise<void> {
  try {
    console.log('[storage] removeCompetency called for id:', id);
    const items = await loadCompetencies();
    console.log('[storage] current items:', items.map(i => i.id));
    const filtered = items.filter(i => i.id !== id);
    await saveCompetencies(filtered);
    console.log('[storage] items after remove:', filtered.map(i => i.id));
  } catch (e) {
    console.error('[storage] removeCompetency error', e);
    throw e;
  }
}

export async function clearAll(): Promise<void> {
  await AsyncStorage.removeItem(STORAGE_KEY);
}

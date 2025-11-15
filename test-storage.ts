import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = '@competency_map:competencies';

interface Competency {
  id: string;
  title: string;
  description?: string;
  progress: number;
  milestones?: { id: string; label: string; completed: boolean }[];
  createdAt: string;
  updatedAt?: string;
}

async function testStorage() {
  try {
    console.log('=== Test 1: Clear and Create ===');
    await AsyncStorage.removeItem(STORAGE_KEY);
    const now = new Date().toISOString();
    
    const item1: Competency = {
      id: uuidv4(),
      title: 'Test Competency 1',
      description: 'Test desc 1',
      progress: 0,
      createdAt: now,
    };
    const item2: Competency = {
      id: uuidv4(),
      title: 'Test Competency 2',
      description: 'Test desc 2',
      progress: 50,
      createdAt: now,
    };
    
    console.log('Created items:', [item1.id, item2.id]);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([item1, item2]));
    
    console.log('\n=== Test 2: Load ===');
    const loaded = await AsyncStorage.getItem(STORAGE_KEY);
    const items = JSON.parse(loaded || '[]') as Competency[];
    console.log('Loaded items:', items.map(i => ({ id: i.id, title: i.title })));
    
    console.log('\n=== Test 3: Remove First Item ===');
    const toRemoveId = item1.id;
    console.log('Removing ID:', toRemoveId);
    const filtered = items.filter(i => i.id !== toRemoveId);
    console.log('After filter:', filtered.map(i => ({ id: i.id, title: i.title })));
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    
    console.log('\n=== Test 4: Verify Removal ===');
    const verify = await AsyncStorage.getItem(STORAGE_KEY);
    const verifyItems = JSON.parse(verify || '[]') as Competency[];
    console.log('Final items:', verifyItems.map(i => ({ id: i.id, title: i.title })));
    
    if (verifyItems.length === 1 && verifyItems[0].id === item2.id) {
      console.log('\n✅ PASS: Storage removal works correctly');
    } else {
      console.log('\n❌ FAIL: Storage removal did not work');
    }
  } catch (e) {
    console.error('Test error:', e);
  }
}

testStorage();

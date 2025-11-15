import { Competency } from '../types';
import { v4 as uuidv4 } from 'uuid';
export const sample: Competency[] = [
  {
    id: uuidv4(),
    title: 'TypeScript básico',
    description: 'Aprender tipos primitivos, interfaces e generics',
    progress: 20,
    milestones: [
      { id: uuidv4(), label: 'Variáveis e tipos', completed: true },
      { id: uuidv4(), label: 'Interfaces', completed: false },
      { id: uuidv4(), label: 'Generics', completed: false },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

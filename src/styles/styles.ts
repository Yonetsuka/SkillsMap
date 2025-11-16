import { StyleSheet } from 'react-native';

export const stylesSkills = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#81c9edff',
    padding: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 20,
  },

  input: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    fontSize: 16,
    marginBottom: 15,
  },

  changeButton:{
    backgroundColor: '#e2f04eff',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 15,
  },

  resetButton:{
    backgroundColor: '#ff0000ff',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 15,
  },

  addButton: {
    backgroundColor: '#0edbeaff',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },

  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },

  skillItem: {
    backgroundColor: '#89f88dff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  skillTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },

  progressText: {
    marginTop: 6,
    fontSize: 14,
    color: '#6B7280',
  },

  removeButton: {
    marginTop: 10,
    backgroundColor: '#EF4444',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },

  removeButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

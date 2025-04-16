import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type CheckboxProps = {
  label: string;
  value: boolean;
  onChange: (newValue: boolean) => void;
};

const Checkbox: React.FC<CheckboxProps> = ({ label, value, onChange }) => {
  return (
    <TouchableOpacity
      onPress={() => onChange(!value)}
      style={styles.container}
      activeOpacity={0.8}
    >
      <View style={[styles.checkbox, value && styles.checked]}>
        {value && <Ionicons name="checkmark" size={16} color="#fff" />}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Checkbox;

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 8,
    },
    checkbox: {
      width: 22,
      height: 22,
      borderWidth: 2,
      borderColor: '#1c7ed6',
      borderRadius: 6,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
    },
    checked: {
      backgroundColor: '#1c7ed6',
    },
    label: {
      fontSize: 16,
      color: '#333',
    },
  });
  
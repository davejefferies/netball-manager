import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Platform,
  TextInput,
} from 'react-native';
import { format } from 'date-fns';

type DateTimeProps = {
  value: Date
  onChange: (newDate: Date) => void
  label?: string
};

const isWeb = Platform.OS === 'web';

const DateTime: React.FC<DateTimeProps> = ({
  value,
  onChange,
  label = 'Select Date & Time',
}) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleChange = (field: 'date' | 'time', val: string) => {
    if (field === 'date') {
      const [year, month, day] = val.split('-').map(Number);
      const updated = new Date(value);
      updated.setFullYear(year);
      updated.setMonth(month - 1);
      updated.setDate(day);
      onChange(updated);
    } else {
      const [hours, minutes] = val.split(':').map(Number);
      const updated = new Date(value);
      updated.setHours(hours);
      updated.setMinutes(minutes);
      onChange(updated);
    }
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>

      <TouchableOpacity
        style={styles.display}
        onPress={() => setShowPicker(true)}
      >
        <Text style={styles.displayText}>
          {format(value, 'yyyy-MM-dd HH:mm')}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <Modal transparent animationType="fade" onRequestClose={() => setShowPicker(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <Text style={styles.modalLabel}>Date</Text>
              <TextInput
                style={styles.input}
                value={format(value, 'yyyy-MM-dd')}
                onChangeText={(text) => handleChange('date', text)}
                placeholder="YYYY-MM-DD"
              />

              <Text style={[styles.modalLabel, { marginTop: 12 }]}>Time</Text>
              <TextInput
                style={styles.input}
                value={format(value, 'HH:mm')}
                onChangeText={(text) => handleChange('time', text)}
                placeholder="HH:MM"
              />

              <TouchableOpacity
                onPress={() => setShowPicker(false)}
                style={styles.doneButton}
              >
                <Text style={styles.doneText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default DateTime;

const styles = StyleSheet.create({
    wrapper: {
      marginVertical: 12,
    },
    label: {
      fontWeight: 'bold',
      marginBottom: 6,
    },
    display: {
      borderWidth: 1,
      padding: 10,
      borderRadius: 6,
      backgroundColor: '#fff',
    },
    displayText: {
      fontSize: 16,
      color: '#000',
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: '#00000066',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalBox: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 12,
      width: '90%',
      maxWidth: 320,
    },
    modalLabel: {
      fontWeight: '600',
      fontSize: 14,
      marginBottom: 4,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 6,
      padding: 10,
      fontSize: 16,
    },
    doneButton: {
      marginTop: 16,
      backgroundColor: '#1c7ed6',
      padding: 12,
      borderRadius: 6,
      alignItems: 'center',
    },
    doneText: {
      color: '#fff',
      fontWeight: 'bold',
    },
  });
  
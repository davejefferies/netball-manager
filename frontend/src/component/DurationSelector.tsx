import React from 'react';
import { View, Text, StyleSheet, Picker } from 'react-native'

type DurationSelectorProps = {
    hours: number
    minutes: number
    onChange: (duration: { hours: number; minutes: number }) => void
};

const DurationSelector: React.FC<DurationSelectorProps> = ({
    hours,
    minutes,
    onChange
}) => {
    const hourOptions = Array.from({ length: 24 }, (_, i) => i)
    const minuteOptions = Array.from({ length: 60 }, (_, i) => i)

    return (
        <View style={styles.container}>
            <View style={styles.pickerContainer}>
                <Text style={styles.label}>Hours</Text>
                <Picker
                    selectedValue={hours}
                    style={styles.picker}
                    onValueChange={(val: number) => onChange({ hours: val, minutes })}
                >
                    {minuteOptions.map((m) => (
                        <Picker.Item key={m} label={`${m}`} value={m} />
                    ))}
                </Picker>
            </View>

            <View style={styles.pickerContainer}>
                <Text style={styles.label}>Minutes</Text>
                <Picker
                    selectedValue={minutes}
                    style={styles.picker}
                    onValueChange={(val: number) => onChange({ hours, minutes: val })}
                >
                    {minuteOptions.map((m) => (
                        <Picker.Item key={m} label={`${m}`} value={m} />
                    ))}
                </Picker>
            </View>
        </View>
    )
}

export default DurationSelector

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 16,
        justifyContent: 'center',
        marginVertical: 12
    },
    pickerContainer: {
        alignItems: 'center'
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 6
    },
    picker: {
        width: 100,
        height: 43,
        minHeight: 43,
        maxHeight: 43,
        borderRadius: 8
    },
});  
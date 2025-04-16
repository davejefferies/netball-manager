import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated,
    Modal,
    FlatList
} from 'react-native'

type DropdownProps = {
  label: string
  options: string[]
  value: number | null
  onChange: (value: number) => void
}

const Dropdown: React.FC<DropdownProps> = ({
    label,
    options,
    value,
    onChange
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showingText, setShowText] = useState(null);
    const labelAnim = useState(new Animated.Value(value ? 1 : 0))[0];

    useEffect(() => {
        Animated.timing(labelAnim, {
            toValue: isFocused || !!value ? 1 : 0,
            duration: 150,
            useNativeDriver: false
        }).start()
    }, [isFocused, value])

    useEffect(() => {
        const selected = options.find(option => option.id === value)
        if (selected)
            setShowText(selected.name)
        else
            setShowText(null)
    })

    const labelStyle = {
        position: 'absolute',
        left: 8,
        top: labelAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [14, -10]
        }),
        fontSize: labelAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [16, 12]
        }),
        color: '#555',
        backgroundColor: '#fff',
        paddingHorizontal: 3
    }

    return (
        <View style={styles.wrapper}>
            <View style={styles.content}>
                <Animated.Text style={labelStyle}>{label}</Animated.Text>

                <TouchableOpacity
                    style={styles.input}
                    onPress={() => {
                    setShowDropdown(true);
                    setIsFocused(true);
                    }}
                    activeOpacity={0.8}
                >
                    <Text style={{ color: showingText ? '#000' : '#999' }}>
                        {showingText || ''}
                    </Text>
                </TouchableOpacity>

                <Modal transparent visible={showDropdown} animationType="fade">
                    <TouchableOpacity
                        style={styles.modalOverlay}
                        onPress={() => {
                            setShowDropdown(false);
                            setIsFocused(false);
                        }}
                    >
                        <View style={styles.dropdown}>
                            <FlatList
                                data={options}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.option}
                                        onPress={() => {
                                            setShowText(item.name)
                                            onChange(item.id)
                                            setShowDropdown(false)
                                            setIsFocused(false)
                                        }}
                                    >
                                        <Text>{item.name}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    </TouchableOpacity>
                </Modal>
            </View>
        </View>
    )
}

export default Dropdown

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        marginBottom: 12,
        height: 43,
        alignItems: 'center',
        justifyContent: 'center'
    },
    content: {
        width: '90%',
        height: '100%'
    },
    input: {
        borderWidth: 1,
        padding: 10,
        fontSize: 16,
        marginBottom: 12, 
        borderRadius: 8,
        width: '100%',
        height: 43
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#00000050'
    },
    dropdown: {
        marginHorizontal: 30,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 12,
        maxHeight: 300
    },
    option: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    }
  })
  
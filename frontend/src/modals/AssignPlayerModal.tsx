import { Modal, View, Text, Pressable, FlatList } from 'react-native';

export default function AssignPlayerModal({ visible, onClose, positionCode, players, onAssign }) {
    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
            <View style={{ flex: 1, backgroundColor: '#000000aa', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ backgroundColor: '#fff', width: '80%', borderRadius: 10, padding: 20, maxHeight: '80%' }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
                        Assign to {positionCode}
                    </Text>
                    <FlatList
                        data={players}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <Pressable
                                onPress={() => {
                                onAssign(item);
                                onClose();
                                }}
                                style={{ paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#ddd' }}
                            >
                                <Text>{item.name}</Text>
                            </Pressable>
                        )}
                    />
                    <Pressable onPress={onClose} style={{ marginTop: 10, backgroundColor: '#eee', padding: 10, borderRadius: 6 }}>
                        <Text>Cancel</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}
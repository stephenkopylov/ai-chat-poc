/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useCallback, useState} from 'react';
import {
    SafeAreaView,
    View,
    Text,
    FlatList,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView
} from 'react-native';

type IMessage = {
    id: string;
    text: string;
    sender: 'user' | 'assistant';
    timestamp: string;
}


const messages: IMessage[] = [
    {id: '4', text: 'Sure, what’s your question?', sender: 'assistant', timestamp: '16:52'},
    {id: '3', text: 'I have a question.', sender: 'user', timestamp: '16:51'},
    {id: '2', text: 'Hi, how can I help you?', sender: 'assistant', timestamp: '16:50'},
    {id: '1', text: 'Hello!', sender: 'user', timestamp: '16:49'},
];

function App(): React.JSX.Element {
    const [chatMessages, setChatMessages] = useState(messages);
    const [newMessage, setNewMessage] = useState('');

    const renderItem = ({item}: { item: IMessage }) => (
        <View style={[styles.messageContainer, item.sender === 'user' ? styles.userMessage : styles.assistantMessage]}>
            <Text style={styles.messageText}>{item.text}</Text>
            <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
    );

    const handleSend = useCallback(() => {
        if (newMessage.trim()) {
            const message: IMessage = {
                id: (chatMessages.length + 1).toString(),
                text: newMessage,
                sender: 'user',
                timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
            };
            setChatMessages([message, ...chatMessages]);
            setNewMessage('');
        }
    }, [chatMessages, newMessage]);

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <FlatList
                style={styles.flatlist}
                data={chatMessages}
                renderItem={renderItem}
                keyExtractor={(item: IMessage) => item.id}
                inverted // This will make the FlatList start from the bottom
                contentContainerStyle={{paddingBottom: 10, paddingHorizontal: 10}}
            />
            <SafeAreaView>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Type a message..."
                        value={newMessage}
                        onChangeText={setNewMessage}
                    />
                    <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
                        <Text style={styles.sendButtonText}>Send</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    flatlist: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    messageContainer: {
        maxWidth: '70%',
        marginVertical: 5,
        padding: 10,
        borderRadius: 10,
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#0084ff',
        borderTopRightRadius: 0,
    },
    assistantMessage: {
        alignSelf: 'flex-start',
        backgroundColor: 'pink',
        borderTopLeftRadius: 0,
    },
    messageText: {
        color: '#fff',
    },
    timestamp: {
        fontSize: 10,
        color: '#ddd',
        textAlign: 'right',
        marginTop: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff',
    },
    input: {
        flex: 1,
        height: 40,
        paddingHorizontal: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
    },
    sendButton: {
        marginLeft: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#0084ff',
        borderRadius: 20,
    },
    sendButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default App;

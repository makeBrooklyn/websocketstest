/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useRef, useState } from 'react';
import {
  Alert,
  Button,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import io from 'socket.io-client';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const [host, setHost] = useState('http://192.168.86.192');
  const [port, setPort] = useState('3000');
  const socketRef = useRef<any>(null);

  const handleSubmit = () => {
    const url = `${host}:${port}`;
    Alert.alert(url);

    // Disconnect previous socket if exists
    if (socketRef.current) {
      socketRef.current.disconnect();
    }

    // Connect to new socket.io server
    socketRef.current = io(url, {
      transports: ['websocket'],
    });

    socketRef.current.on('connect', () => {
      console.log('Connected to', url);
    });

    socketRef.current.on('connect_error', (err: any) => {
      console.log('Connection error:', err);
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Text style={styles.headerText}>WebSockets Test</Text>

      {/* Host Address */}
      <Text style={styles.label}>Host Address</Text>
      <TextInput
        style={styles.input}
        value={host}
        onChangeText={setHost}
        placeholder="Enter host address"
        placeholderTextColor="#888"
        autoCapitalize="none"
      />

      {/* Port */}
      <Text style={styles.label}>Port</Text>
      <TextInput
        style={styles.input}
        value={port}
        onChangeText={setPort}
        placeholder="Enter port"
        placeholderTextColor="#888"
        keyboardType="numeric"
      />

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    color: 'white',
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    marginBottom: 24,
  },
  label: {
    color: 'white',
    fontSize: 16,
    marginTop: 12,
    marginBottom: 4,
    alignSelf: 'flex-start',
    marginLeft: 40,
  },
  input: {
    width: 250,
    height: 40,
    backgroundColor: '#222',
    color: 'white',
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
});

export default App;

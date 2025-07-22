import React, { FC, useState } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

// The URL for your Google Apps Script
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxwVsnATTM_KXe2yfFptmr2M9ojNjKQkXRhPb8aSSvd1T8o0Cve0YBoyG54FBrPQgYu5g/exec';

// Define a type for the expected response from your script
interface ScriptResponse {
  result: 'success' | 'error';
  data?: any; // You can make this more specific if you know what data you get back
  error?: string;
}

const App: FC = () => {
  // State variables are now typed with TypeScript
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [info, setInfo] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // The function is now an async arrow function with no parameters
  const handleSubmit = async (): Promise<void> => {
    // 1. Keep the validation from your original code
    if (!name || !email || !info) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
  
    setLoading(true);
  
    // 2. Create the URL-encoded string for the body
    // encodeURIComponent is important to safely handle special characters
   

    const formData = `Name=${encodeURIComponent(name)}&Email=${encodeURIComponent(email)}&Info=${encodeURIComponent(info)}`;

    try {
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: {
          // 3. Set the correct Content-Type header
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        // 4. Use the new form data string as the body
        body: formData,
      });

      // Assuming your script returns JSON, which is more reliable than text
      const data = await response.json() as ScriptResponse;
  
      if (data.result === 'success') {
        Alert.alert('Success!', 'You have been added to the waitlist. 🎉');
        setName('');
        setEmail('');
        setInfo('');
      } else {
        // Use the error from the script if it exists
        const errorMessage = data.error || 'Something went wrong. Please try again.';
        Alert.alert('Error', errorMessage);
        console.error('Submission Error:', data);
      }
    } catch (error) {
      console.error('Network Error:', error);
      Alert.alert('Error', `Could not submit your information. Please check your connection.`);
    } finally {
      // Use finally to ensure loading is always set to false
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Join Our Waitlist</Text>
      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={name}
        onChangeText={setName}
        editable={!loading}
        autoCapitalize="words"
      />
      <TextInput
        style={styles.input}
        placeholder="Your Email Address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!loading}
      />
      <TextInput
        style={styles.input}
        placeholder="Who Are You? (e.g., Developer, Founder)"
        value={info}
        onChangeText={setInfo}
        editable={!loading}
      />
      
      {/* Show a loading indicator next to the button text when submitting */}
      <View style={styles.buttonContainer}>
        {loading && <ActivityIndicator size="small" color="#0000ff" />}
        <Button
          title={loading ? 'Submitting...' : 'Join Now'}
          onPress={handleSubmit}
          disabled={loading}
        />
      </View>
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  }
});

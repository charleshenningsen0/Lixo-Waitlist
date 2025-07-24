import { Stack } from 'expo-router';

import React from 'react';



// Define the screens and their parameters
type RootStackParamList = {
  Waitlist: undefined; // 'Waitlist' screen takes no parameters
  Success: undefined;  // 'Success' screen takes no parameters
};




export default function RootLayout() {

  return (
    <Stack
    screenOptions={{
      headerShown: true,
      headerStyle: {
        backgroundColor: '#1E1E1E', // Your desired background color
      },
      headerTintColor: '#FFFFFF', // Color of the title and back button
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
      <Stack.Screen
        name="index" // This refers to app/index.tsx
        options={{ 
          title: 'Join the Waitlist',
          headerShown: false,

         }}
      />
      <Stack.Screen
        name="SucessScreen" // This refers to app/success.tsx
    
        options={{ 
          title: 'Back to Signup',
          headerShown: true,
         }} // Hide header on the success page
      />





      
    </Stack>
  );
};



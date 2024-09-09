import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const ProfileScreen = () => {
  const { userToken, logout } = useContext(AuthContext);
  const [user, setUser] = useState(null);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch('https://diverse-tightly-mongoose.ngrok-free.app/api/user/profile', {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.log('Error fetching profile:', error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <View>
      {user ? (
        <>
          <Text>Welcome, {user.first_name} {user.last_name}</Text>
          <Button title="Logout" onPress={logout} />
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default ProfileScreen;
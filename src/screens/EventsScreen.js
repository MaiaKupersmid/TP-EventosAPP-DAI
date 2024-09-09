import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const EventsScreen = () => {
  const { userToken } = useContext(AuthContext);
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const response = await fetch('https://diverse-tightly-mongoose.ngrok-free.app/api/event/?limit=10&offset=0', {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.log('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const renderItem = ({ item }) => (
    <View>
      <Text>{item.name}</Text>
      <Button title="View Details" onPress={() => console.log('View details of:', item.id)} />
    </View>
  );

  return (
    <View>
      <Text>Upcoming Events</Text>
      <FlatList data={events} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} />
    </View>
  );
};

export default EventsScreen;

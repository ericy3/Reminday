import { Image, StyleSheet, View, Text } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { EventsList } from '@/components/EventsList';
import { events } from '@/components/utils'


export default function HomeScreen() {
  return (
    <View style={styles.eventsContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Upcoming Events</Text>
      </View>
      <EventsList events={events}/>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 24,
  },
  eventsContainer: {
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

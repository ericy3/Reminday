import { View, Text, StyleSheet, type ViewProps } from 'react-native';
import { useState, useEffect } from 'react';
import * as utils from './utils';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  name: string;
  date: string;
};

export function EventBlock({ name, date }: ThemedViewProps) {

  // Find a way to parse date or set a universal date/time format
  const [daysLeft, setDaysLeft] = useState<number>(utils.getDaysDiff(date));
  const [hoursLeft, setHoursLeft] = useState<number>(utils.getHoursDiff(date));

  useEffect(() => {
    const timer = setInterval(() => {
      setDaysLeft(utils.getDaysDiff(date));
      setHoursLeft(utils.getHoursDiff(date));
    }, 1000 * 60 * 60);

    return () => clearInterval(timer);
  },[date])

  const renderTimeLeft = () => {
    if (daysLeft > 0) return <Text style={styles.daysLeft}>{daysLeft} days left</Text>;
    if (hoursLeft > 0) return <Text style={styles.daysLeft}>{hoursLeft} hours left</Text>;
    return <Text style={styles.daysLeft}>Event is happening now! Days ${hoursLeft}</Text>;
  };

    return (
      <View style={styles.card}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.date}>{utils.formatDate(date)}</Text>
        {renderTimeLeft()}
      </View>
    );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
    width: 300,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  date: {
    color: "gray",
    marginTop: 4,
  },
  daysLeft: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 8,
  },
});

import { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { EventBlock } from "./EventBlock"; 
import { getCurrentTime } from "./utils";

// Days left is handled by Event Block - bring out for easier sorting?
// Sort by days left and then separate by months?
interface EventProps {
    id: number;
    name: string;
    date: string;
} 


export function EventsList(
    events: Array<EventProps>,
) {
    const [date, setDate] = useState(Date());
    const sortedEvents = [...events].sort((event) => new Date(event.date).getTime() - new Date(date).getTime());

    useEffect(() => {
        const currentTime: Date = getCurrentTime()
    }
    , []);

    // Find closest days

    return (
        <FlatList   
            data = {}
        />
    );
}
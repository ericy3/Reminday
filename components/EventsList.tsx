import { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { EventBlock } from "./EventBlock"; 

// Days left is handled by Event Block - bring out for easier sorting?
// Sort by days left and then separate by months?
interface ListElemProps {
    type: string;
    element: EventProps | MonthTextProps;
}

interface EventProps {
    id: number;
    name: string;
    date: string;
};

interface MonthTextProps {
    month: string;
};


export function EventsList(
    events: Array<EventProps>,
) {
    const [date, setDate] = useState(Date());
    const sortedEvents = [...events].sort((event) => new Date(event.date).getTime() - new Date(date).getTime());

    useEffect(() => {
        const timer = setInterval(() => {
            setDate(Date());
          }, 1000 * 60 * 60);
          return () => clearInterval(timer);
    }, []);

    // Find closest days
    const groupedEvents: ListElemProps[] = [];
    let lastMonth = "";

    sortedEvents.forEach((event) => {
        const eventDate = new Date(event.date);
        // WHat does this actually output
        const monthYear = eventDate.toLocaleString("default", { month: "long", year: "numeric" });
        
        if (monthYear != lastMonth) {
            const monthText : MonthTextProps = { month: monthYear };
            const monthHeaderElem : ListElemProps = { type: "header", element: monthText };
            groupedEvents.push(monthHeaderElem);
            lastMonth = monthYear;
        }

        const eventElem : ListElemProps = { type: "event", element: event }
        groupedEvents.push(eventElem)
    }, [events]);

    return (
        // <FlatList   
        //     data = {}
        // />
        <View></View>
    );
}
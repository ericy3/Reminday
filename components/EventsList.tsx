import { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { EventBlock } from "./EventBlock"; 

enum Element {
    HEADER = "header",
    EVENT = "event",
};

// Days left is handled by Event Block - bring out for easier sorting?
// Sort by days left and then separate by months?
// type: header or element
interface ListElemProps {
    type: string;
    element: EventProps | MonthTextProps | YearTextProps;
};

interface EventProps {
    id: number;
    name: string;
    date: string;
};

interface MonthTextProps {
    month: string;
};

interface YearTextProps {
    year: string;
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
    let lastYear = "";
    

    // Determine if a header needs to be inserted and push header and events information into sorted list
    sortedEvents.forEach((event) => {
        const eventDate = new Date(event.date);
        // WHat does this actually output
        const monthYear = eventDate.toLocaleString("default", { month: "long", year: "numeric" }).split(" ");
        const monthStr = monthYear[0];
        const yearStr = monthYear[1];     

        if (yearStr != lastYear) {
            const yearText : YearTextProps = { year: yearStr };
            const yearHeaderElem : ListElemProps = { type: Element.HEADER, element: yearText };
            groupedEvents.push(yearHeaderElem);
            lastYear = yearStr;
        }

        if (monthStr != lastMonth) {
            const monthText : MonthTextProps = { month: monthStr };
            const monthHeaderElem : ListElemProps = { type: Element.HEADER, element: monthText };
            groupedEvents.push(monthHeaderElem);
            lastMonth = monthStr;
        }

        const eventElem : ListElemProps = { type: Element.EVENT, element: event }
        groupedEvents.push(eventElem)
    }, [events]);

    return (
        
        // <FlatList   
        //     data = {sortedEvents}
        //     keyExtractor={(item) => (item.type === Element.HEADER ? )}
        //     renderItem={}
        // />
        <View></View>
    );
}
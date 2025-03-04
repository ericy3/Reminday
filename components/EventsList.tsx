import { useEffect, useState } from "react";
import { View, Text, SectionList, StyleSheet } from "react-native";
import { EventBlock } from "./EventBlock"; 
import { EventProps, nextBirthdayDate } from "./utils";

interface EventSection {
    title: string;  // month value
    data: EventProps[];
    year: string;
    id: number;
}

// Days left is handled by Event Block - bring out for easier sorting?
// Sort by days left and then separate by months?
// type: header or element


export function EventsList(
    { events }: { events: Array<EventProps> }
) {
    const [sections, setSections] = useState<EventSection[]>([]);
    
    useEffect(() => {
        // Remove expired events that aren't birthdays + update next birthday date if applicable
        const valid_events = [...events]
        .filter((event) => (new Date(event.date) > new Date() || event.isBirthday))
        .map((event) => {
            if (event.isBirthday) {
                return { ...event, date: nextBirthdayDate(event.date) };
            }
            return event;
        })
        const sorted = [...valid_events].sort((event) => new Date(event.date).getTime() - new Date().getTime());
        const groupedEvents: { [year: string]: { [month: string]: EventProps[] } } = {};

        sorted.forEach((event) => {
            const eventDate = new Date(event.date);
            const year = eventDate.getFullYear().toString();
            const month = eventDate.toLocaleString("default", { month : "long" });

            if (!(year in groupedEvents)) {
                groupedEvents[year] = {};
            }
            
            if (!(month in groupedEvents[year])) {
                groupedEvents[year][month] = [];
            }

            groupedEvents[year][month].push(event);
        });

        const sectionData: EventSection[] = [];
        let index = 0;
        Object.keys(groupedEvents).forEach((year) => {
            Object.keys(groupedEvents[year]).forEach((month) => {
                sectionData.push({
                    title: month,
                    data: groupedEvents[year][month],
                    year: year,
                    id: index,
                })
                index++;
            });
        });
        setSections(sectionData);
    }, [events]);
    


    return (
        <SectionList   
            sections = { sections }
            keyExtractor={(item) => `event-${item.id}`}
            renderSectionHeader={({ section }) => {
                const index = section.id;
                return (
                    <>
                        {index === 0 || section.year !== sections[index - 1]?.year ? (
                            <Text style={styles.yearHeader}>{section.year}</Text>
                        ) : null}
                        <Text style={styles.monthHeader}>{section.title}</Text>
                    </>
                );
            }}
            renderItem={({item}) => {
                const props = {name: item.name, date: item.date, isBirthday: item.isBirthday, birthdayYear: item.birthdayYear}
                return <EventBlock {...props}/>
            }}
        />
    );
}

const styles = StyleSheet.create({
    yearHeader: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#000",
        textAlign: "center",
        marginTop: 20,
        paddingVertical: 8,
        backgroundColor: "#ddd",
      },
      monthHeader: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 8,
        marginBottom: 4,
        textAlign: "center",
        color: "#333",
        backgroundColor: "#f0f0f0",
        paddingVertical: 5,
      },
});
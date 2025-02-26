interface TimeDifference {
    years: number;
    months: number;
    days: number;
    hours: number;
}

interface DateBreakdown {
    year: number;
    month: number;
    day: number;
}

export interface EventProps {
    id: number;
    name: string;
    date: string;
    isBirthday?: boolean;
};

const months: Record<number, string> = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
};


export function getDateDiff(eventDate : string): TimeDifference {
    const eventTime = new Date(eventDate).getTime();
    const currTime = new Date().getTime();
    const msDiff = eventTime - currTime;

    const hourDiff = Math.floor(msDiff / (1000 * 60 * 60));
    const dayDiff = Math.floor(hourDiff / 24);
    const monthDiff = Math.floor(dayDiff / 30);
    const yearDiff = Math.floor(monthDiff / 12);
    return {
        years: yearDiff,
        months: monthDiff,
        days: dayDiff,
        hours: hourDiff
    };
}

export function getHoursDiff(eventDate : string): number {
    const timeDifferences: TimeDifference = getDateDiff(eventDate);
    return timeDifferences.hours;
}

export function getDaysDiff(eventDate : string): number {
    const timeDifferences: TimeDifference = getDateDiff(eventDate);
    return timeDifferences.days;
}

function getDaySuffix(day: number): string {
    if (day >= 11 && day <= 13) return "th"; 
    const lastDigit = day % 10;
    
    switch (lastDigit) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
    }
}

export function formatDate(date: string): string {
    const dateObj = new Date(date);
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    return `${months[month]} ${day}${getDaySuffix(day)}`;
}

export function parseDate(date: string): DateBreakdown | null {
    const dateRegex = /(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})|(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/;
    const match = date.match(dateRegex);

    if (!match) return null;

    if (match[1]) {
        // Format: YYYY-MM-DD
        return { year: parseInt(match[1]), month: parseInt(match[2]) - 1, day: parseInt(match[3]) };
    } else if (match[4]) {
        // Format: MM-DD-YYYY
        return { year: parseInt(match[6]), month: parseInt(match[4]) - 1, day: parseInt(match[5]) };
    }

    return null; // If no valid format is found
}

export function nextBirthdayDate(date: string): string {
    const dateInfo : DateBreakdown | null = parseDate(date);
    if (!dateInfo) {
        return ""
    }
    const currTime = new Date();
    const thisYear = currTime.getFullYear();

    const month : number = dateInfo.month;
    const day : number = dateInfo.day;
    const currYearBirthday = new Date(thisYear, month, day)

    return currYearBirthday > currTime ? currYearBirthday.toDateString() : new Date(thisYear + 1, month, day).toDateString();
}

// For case when use only inputs for month and day
export function monthDayToDate(month: string, day: string) {
    // TODO: Implement
    const date = new Date();
}

export const events: Array<EventProps> =
[
    { "id": 1, "date": "2025-01-02", "name": "Bob's Birthday", "isBirthday": true },
    { "id": 2, "date": "2025-02-14", "name": "Valentine’s Day date" },
    { "id": 3, "date": "2025-03-22", "name": "Big hiking trip with friends" },
    { "id": 4, "date": "2025-04-15", "name": "Tax deadline stress" },
    { "id": 5, "date": "2025-05-30", "name": "Friend’s wedding" },
    { "id": 6, "date": "2025-06-21", "name": "First day of summer BBQ" },
    { "id": 7, "date": "2025-07-12", "name": "Family reunion weekend" },
    { "id": 8, "date": "2025-08-18", "name": "Start of new job" },
    { "id": 9, "date": "2025-09-07", "name": "Fantasy football draft" },
    { "id": 10, "date": "2025-10-31", "name": "Halloween party" },
    { "id": 11, "date": "2025-11-27", "name": "Thanksgiving dinner" },
    { "id": 12, "date": "2025-12-31", "name": "New Year's Eve party" },
    { "id": 13, "date": "2026-02-20", "name": "Vacation to Europe" },
    { "id": 14, "date": "2026-04-08", "name": "Total solar eclipse watch party" },
    { "id": 15, "date": "2026-06-10", "name": "Moving to a new city" },
    { "id": 16, "date": "2026-07-19", "name": "Summer music festival" },
    { "id": 17, "date": "2026-09-03", "name": "Back to school shopping" },
    { "id": 18, "date": "2027-05-14", "name": "Sister’s graduation" },
    { "id": 19, "date": "2027-08-29", "name": "Anniversary trip" },
    { "id": 20, "date": "2028-06-11", "name": "Attending the Los Angeles Olympics" }
  ]
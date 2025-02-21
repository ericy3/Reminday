interface TimeDifference {
    years: number;
    months: number;
    days: number;
    hours: number;
}

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

// For case when use only inputs for month and day
export function monthDayToDate(month: string, day: string) {
    // TODO: Implement
    const date = new Date();
}
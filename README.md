# Welcome to your Reminday👋

Reminday is an app for remembering holidays and birthdays and tracking purchases for these special days.

### Event View
- Event sectioning with headers for relevant months and years for events.
- Number of days/hours till event countdown indicator.
- Conversion of date to English format (i.e. 05/09 to May 9th).
- Age tracker for birthday events.

### User Authentication 
#### Completed
- API handler functions for registering users and logging in.
- Database functions for retreiving and verifying user input and stored password hash.
- Database connection.
- Unique UUID for each user to reference their events in separate table.

#### In Progress
- Database boot-up process.
- Connecting user UUID to their events when accessing user events.
- Adding/removing events.


## Target Goals:
- Calendar view for birthdays and holidays
- Per event purchase list
- Adding/removing/checking purchases
- Migration to AWS DynamoDB

## Stretch Goals:
- Third party seller integration for purchase items
- PC version
- ics file importing

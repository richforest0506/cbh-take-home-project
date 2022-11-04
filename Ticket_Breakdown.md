# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

**Ticket 1: Modify Database** 
Assume this project is based in relational database - because data is saved in tables (not collections) and this data is suitable for RDBMS. so assuming the database server is SQL Server. 

Insert `customId` field into Agents table.

And then the table will be structured like this:

Facilities Table

- id
- name

Agents Table

- id
- customId                       <!--new field-->
- facilityId                         <!--The unique Id of the Facility to which the Agent belongs-->
- name

Shifts Table

- id
- agentId                          <!--The unique Id of the agent to which the shift belongs-->
- hours        :int                <!--Working hours-->
- date          :date             <!--Date worked-->

*There may be more fields in the tables, but undefined them here, as they do not affect the platform structure.*

**Ticket 2: Create Backend API**
Create an API that response with data from a database when it receives a request from the frontend. This can be easily done by creating a SQL query like the one below.

```sql
select agents.*,facilities.name as facilityName, a.hourSum from agents join (select agents.id, sum(shifts.hours) as hourSum from agents join shifts on agents.id=shifts.agentId where facilityId={$facilityId} and QUARTER(shifts.date)=QUARTER(CURDATE()) GROUP BY agents.id) a on agents.id=a.id join facilities on agents.facilityId=facilities.id where agents.facilityId={$facilityId}
```

**Ticket 3: Call Backend API and get data from that**
In the `getShiftsByFacility` function, call the API created in Ticket 2 to get the data.

**Ticket 4: Complete the `generateReport` function**
Create a function that convert into a PDF file from a list of Shifts.
There may be several ways to create PDF, but recommend using the `jsPDF` library.

**Ticket 5: Review and Refactoring**

### Estimated time to complete 5 tickets  < 2 hours.

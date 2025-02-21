import React, { useEffect, useState } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";

function CalendarComp ({events}){
    const localizer = dayjsLocalizer(dayjs)
    const [eventList, setEventList] = useState()
    
    useEffect(() => {
        const map = events.map(room => ({
            id: room._id,
            title: room.title,
            start: new Date(room.startDate),
            end: new Date(room.endDate),
        }));
        setEventList(map)
    
    
    }, [events])
       

    return(

        <div className="bg-white p-2 m-2">
            <Calendar
                localizer={localizer}
                events={eventList}
                startAccessor="start"
                endAccessor="end"
                style={{height:600, width: '100%' }}
                views={['month', 'week']}
                min={dayjs('2025-02-20T08:00').toDate()}
                max={dayjs('2025-02-20T18:00').toDate()}
            />
        </div>
    )
}
export default CalendarComp
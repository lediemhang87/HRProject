import React, { useState } from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles.scss'

const DashboardCalendar: React.FC = () => {
    const schedules = [
        {id: '1', date: '07/09/2023', time: '12:05', task: 'Development planning', location: 'In house'},
        {id: '2', date: '07/09/2023', time: '12:05', task: 'Development planning', location: 'In house'},
        {id: '3', date: '07/10/2023', time: '12:05', task: 'Development planning', location: 'In house'},
        {id: '4', date: '07/10/2023', time: '12:05', task: 'Development planning', location: 'In house'}
    ]

    return (
        <div className='calendar'>
            <div className='title'> Upcoming Schedule </div>

            <Calendar prev2Label={null} next2Label={null}/>

            <div className='event-title'> EVENTS </div>

            <div className='events'>
                {schedules.map((schedule) => {
                    const date = new Date(schedule.date);
                    const formattedDate = date.toLocaleDateString(undefined, { day: 'numeric' });
                    const dayOfWeek = date.toLocaleString(undefined, { weekday: 'long' });
                    const time = new Date(`2000-01-01T${schedule.time}`).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });

                    return (
                        <div key={schedule.id} className='event'>
                            <div className='date'>
                                <div className='formattedDate'> {formattedDate} </div>
                                <div className='dayOfWeek grey'> {dayOfWeek} </div>
                            </div>
                            <div className='content'>
                                <div className='task'> {schedule.task} </div>
                                <div className='location grey'> {schedule.location} </div>
                            </div>
                            <div className='time'> {time}</div>
                        </div>
                    );
                })}
            </div>
            
        </div>
    );
};

export default DashboardCalendar;

import React from 'react';
import EventCalendar from '../components/EventCalendar';
import '../css/Schedule.css';
import '../css/App.css';

const Schedule = ({ match }) => {
  return (
    <div>
    <h2>공연일정</h2>
      <EventCalendar></EventCalendar>
    </div>
  );
};
export default Schedule;
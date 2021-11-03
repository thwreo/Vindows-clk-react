import { useState, useEffect } from 'react';
import './App.css';

const lang = navigator.language;
const date = new Date();
const crtYear = date.getFullYear();
const crtMonth = date.getMonth();
const crtDate = date.getDate();
// var year = crtYear;
// var month = crtMonth;

function App() {
  return (
    <div id="winClk">
      <WindowsClock /> <WindowsDate /> <Line />
      <br /> <table id="dateTable"><Calendar /></table> <Line />
      {/* tabel componenta - change name - not verb (vb- metode, subst - altele) */}
    </div>
  );
}

function WindowsClock() {
  const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
  const [date, setDate] = useState(new Date());
  function refreshClock() {
    setDate(new Date());
  }
  // TODO: Attempt with hooks - useState is a hook
  useEffect(() => {
    const refresh = setInterval(refreshClock, 100);
    return function cleanup() {
      clearInterval(refresh);
    };
  }, []);
  return (
    <div id="clock">
      {date.toLocaleTimeString(lang, options)}
    </div>
  );
}

const Line = () => (
  <svg id="linespace">
    <rect id="line"></rect>
  </svg>
)

function WindowsDate() {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const [date, setDate] = useState(new Date());
  function refreshDate() {
    setDate(new Date());
  }
  // TODO: refresh - DONE
  useEffect(() => {
    const refresh = setInterval(refreshDate, 100);
    return function cleanup() {
      clearInterval(refresh);
    };
  }, []);
  return (
    <div id="date">
      {date.toLocaleDateString(lang, options)} 
    </div>
  );
}

function CalendarArray(y, m) {
  var monthThatChanges = new Date(y, m);
  var firstDayOfMonth = monthThatChanges.getDay() || 7;
  var prevMonth = m;
  (m === 0) ? prevMonth = 11 : prevMonth -= 1;
  var nrCrtMonth = new Date(y, m + 1, 0).getDate();
  var nrPrevMonth = new Date(y, prevMonth + 1, 0).getDate();

  var startNr = firstLineStartVal(nrPrevMonth, firstDayOfMonth);
  var nrNextMonth = 42 - nrCrtMonth - firstDayOfMonth + 1;

  var prevDays_aux = Array.from(Array(firstDayOfMonth - 1), (_,day) => {
    return {day: day + startNr, type: "prevMonth"}});
  var crtDays_aux = Array.from(Array(nrCrtMonth), (_,day) => {
    return {day: day + 1, type: "crtMonth"}});
  var nextDays_aux = Array.from(Array(nrNextMonth), (_,day) => {
    return {day: day + 1, type: "nextMonth"}});
  var a = prevDays_aux.concat(crtDays_aux.concat(nextDays_aux));
  // console.log(prevDays_aux[0].day.toString());

  //return 42 day objects
//   const getDays = () => {
//     return [
//       {day: 25, type: "prevMonth"},
//       {day: 26, type: "prevMonth"}
//     ];
//   }

//   // in Calendar component
//   const calendarDays = getDay();
//   const getClassForDayType = (dayType) => {}
//     switch (dayType) {
//       case "prevMonth":
//         return "calendar-day prev-month"
//       default:
//         return "calendar-day"
//     }  
//   const $calendarDaysCells = calendarDays.map(day => {
//     return `<td class="{$getClassForDay(day.type)}">day.day</td>`
//   });
//   return `<table>{$calendarDaysCells}</table>`

//   // in tests..
//   // const sampleMonth = import "./sampleMonth.json"
//   // getDays().assertEquals(sampleMonth)

//   // TODO: replace id with class - DONE
//   // TODO: Remove Array.from(Array()) - can't do that

  var prevMonthArray = Array.from(Array(firstDayOfMonth - 1).keys()).map(i => <td class="prevMonth">{i + startNr}</td>);
  var crtMonthArray = Array.from(Array(nrCrtMonth).keys()).map
    (i => (m === crtMonth && y === crtYear && i === crtDate - 1 ? <td class="crtDate">{i + 1}</td> : <td class="crtMonth">{i + 1}</td>));
  var nextMonthArray = Array.from(Array(nrNextMonth).keys()).map(i => <td class="nextMonth">{i + 1}</td>)
  var monthCalendar = prevMonthArray.concat(crtMonthArray.concat(nextMonthArray));
  for (var i = 0; i < 42; i += 8) {
    monthCalendar = [
      ...monthCalendar.slice(0, i), <tr></tr>, ...monthCalendar.slice(i)
    ];
  }
  monthThatChanges = monthThatChanges.toLocaleDateString(lang, { year: 'numeric', month: 'long' })

  var firstLine = <tr><td class="dateAndArr" colspan="5"><div id="underDate">{monthThatChanges}</div></td><ArrowUp /><ArrowDown /></tr>
 
  var nameOfDays = [];
  var baseDate = new Date('2021-11-01'); // get a Monday
  for (i = 0; i < 7; i++) {
    nameOfDays.push(baseDate.toLocaleDateString(lang, { weekday: 'short'}));
    baseDate.setDate(baseDate.getDate() + 1);
  }
  nameOfDays = nameOfDays.map(dayOfWeek => <th>{dayOfWeek[0] + dayOfWeek[1]}</th>);

  // TODO: Generate day of week - DONE
  // TODO: Challenge - option for first day of week (e.g. Su or Mo) 
  return (
    Array(firstLine).concat(Array(nameOfDays).concat(monthCalendar))
  );
}
const Calendar = () => (
  CalendarArray(crtYear, 9)
)

const firstLineStartVal = (nrDaysPrevMonth, firstDayOfCrtMonth) => (
  nrDaysPrevMonth - firstDayOfCrtMonth + 2
)
const ArrowUp = () => (
  <td class="dateAndArr" > <button class="arr"> <svg id="arrows">
    <polyline fill="#282c34" stroke="#a3a3a3" points="
       0,8 8,0 16,8 " />
  </svg>
  </button>
  </td >
)
const ArrowDown = () => (
  <td class="dateAndArr"><button class="arr"> <svg id="arrows">
    <polyline fill="#282c34" stroke="#a3a3a3" points="
0,0 8,8 16,0 " />
  </svg>
  </button>
  </td>
)

// return 42 day objects
function getDays(m, y) {
  var monthThatChanges = new Date(y, m);
  var firstDayOfMonth = monthThatChanges.getDay() || 7;
  var prevMonth = m;
  (m === 0) ? prevMonth = 11 : prevMonth -= 1;
  var nrCrtMonth = new Date(y, m + 1, 0).getDate();
  var nrPrevMonth = new Date(y, prevMonth + 1, 0).getDate();

  var startNr = firstLineStartVal(nrPrevMonth, firstDayOfMonth);
  var nrNextMonth = 42 - nrCrtMonth - firstDayOfMonth + 1;

  var prevDays_aux = Array.from(Array(firstDayOfMonth - 1), (_,day) => {
    return {day: day + startNr, type: "prevMonth"}});
  var crtDays_aux = Array.from(Array(nrCrtMonth), (_,day) => {
    return {day: day + 1, type: "crtMonth"}});
  var nextDays_aux = Array.from(Array(nrNextMonth), (_,day) => {
    return {day: day + 1, type: "nextMonth"}});
  var daysOfCalendarSheet = prevDays_aux.concat(crtDays_aux.concat(nextDays_aux));
  
  return daysOfCalendarSheet
}

function getDaysTable(m, y) {
  const calendarDays = getDays();

}

export default App;
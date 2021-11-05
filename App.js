import { useState, useEffect } from 'react';
import './App.css';

const lang = navigator.language;
const date = new Date();
const crtYear = date.getFullYear();
const crtMonth = date.getMonth();
const crtDate = date.getDate();
var year = crtYear;
var month = crtMonth;

function App() {
  // var calendar = Calendar();
  const [calendar, setCalendar] = useState(Calendar());
  useEffect(() => setCalendar(Calendar()), [month, calendar]);

  return (
    <div id="winClk">
      <WindowsClock /> <WindowsDate /> <Line />
      <br /> <table id="dateTable">{calendar}</table> <Line />
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
      //TODO: put console.log, investigate how many calls of clearInterval vs setTimeout
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
const ArrowUp = () => (
  // TODO: remove td container
  <td class="dateAndArr" > <button class="arr" onClick={changeWithPrevMonth}> <svg id="arrows">
    <polyline fill="#282c34" stroke="#a3a3a3" points="
       0,8 8,0 16,8 " />
  </svg>
  </button>
  </td >
)
const ArrowDown = () => (
  <td class="dateAndArr"><button class="arr" onClick={changeWithNextMonth}> <svg id="arrows">
    <polyline fill="#282c34" stroke="#a3a3a3" points="
0,0 8,8 16,0 " />
  </svg>
  </button>
  </td>
)

/**************************OLD CODE**************************** */
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
  var crtDays_aux = Array.from(Array(nrCrtMonth), (_,day) =>
    (m === crtMonth && y === crtYear && day === crtDate - 1) ? 
    {day: day + 1, type: "crtDate"} : {day: day + 1, type: "crtMonth"});
  var nextDays_aux = Array.from(Array(nrNextMonth), (_,day) => {
    return {day: day + 1, type: "nextMonth"}});
  var a = prevDays_aux.concat(crtDays_aux.concat(nextDays_aux));
  // console.log(getDaysTable(m, y));

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
    // Array(firstLine).concat(Array(nameOfDays).concat(monthCalendar))
    // getNameOfDays().concat(getDaysTable(m, y)) 
    // Array(firstLine).concat(getNameOfDays().concat(getDaysTable(m, y)))
    getTable(monthThatChanges, m, y)
  );
}
/**************************OLD CODE**************************** */

const Calendar = () => (
  generateTableCalendar()
)

function generateTableCalendar() {
  var monthThatChanges = new Date(year, month);
  monthThatChanges = monthThatChanges.toLocaleDateString(lang, { year: 'numeric', month: 'long' })
  return (
    getTable(monthThatChanges)
  );
}

const firstLineStartVal = (nrDaysPrevMonth, firstDayOfCrtMonth) => (
  nrDaysPrevMonth - firstDayOfCrtMonth + 2
)


// return 42 day objects
function getDays(m, y) {
  var firstDayOfMonth = (new Date(y, m, 1)).getDay() || 7;
  var prevMonth = m;
  (m === 0) ? prevMonth = 11 : prevMonth -= 1;
  var nrCrtMonth = new Date(y, m + 1, 0).getDate();
  var nrPrevMonth = new Date(y, prevMonth + 1, 0).getDate();

  var startNr = firstLineStartVal(nrPrevMonth, firstDayOfMonth);
  var nrNextMonth = 42 - nrCrtMonth - firstDayOfMonth + 1;

  var prevDays_aux = Array.from(Array(firstDayOfMonth - 1), (_,day) => {
    return {day: day + startNr, type: "prevMonth"}});
  var crtDays_aux = Array.from(Array(nrCrtMonth), (_,day) =>
    (m === crtMonth && y === crtYear && day === crtDate - 1) ? 
    {day: day + 1, type: "crtDate"} : {day: day + 1, type: "crtMonth"});
  var nextDays_aux = Array.from(Array(nrNextMonth), (_,day) => {
    return {day: day + 1, type: "nextMonth"}});
  var daysOfCalendarSheet = prevDays_aux.concat(crtDays_aux.concat(nextDays_aux));
  
  return daysOfCalendarSheet
}

function getDaysCells() {
  const calendarDays = getDays(month ,year);
  const getClassForDayType = (dayType) => {
    switch(dayType) {
      case "prevMonth":
        return "prevMonth"
      case "nextMonth":
        return "nextMonth"
      case "crtDate":
        return "crtDate"
      default:
        return "crtMonth"
    }
  }
  var $calendarDaysCells = calendarDays.map(day => {
    return <td class={getClassForDayType(day.type)}>{day.day}</td>
  });
  for (var i = 0; i < 42; i += 8) {
    $calendarDaysCells = [
      ...$calendarDaysCells.slice(0, i), <tr></tr>, ...$calendarDaysCells.slice(i)
    ];
  }
  return $calendarDaysCells
}

function getNameOfDays() {
  var nameOfDays = [];
  var baseDate = new Date('2021-11-01'); // get a Monday
  for (var i = 0; i < 7; i++) {
    nameOfDays.push(baseDate.toLocaleDateString(lang, { weekday: 'short'}));
    baseDate.setDate(baseDate.getDate() + 1);
  }
  nameOfDays = nameOfDays.map(dayOfWeek => <th>{dayOfWeek[0] + dayOfWeek[1]}</th>);
  return nameOfDays
}

const getFirstLine = (monthAndYear) => (
  <tr><td class="dateAndArr" colspan="5"><div id="underDate">{monthAndYear}</div></td><ArrowUp /><ArrowDown /></tr>
)

const getTable = (monthAndYear) => (
    <table id="dateTable">{Array(getFirstLine(monthAndYear)).concat(getNameOfDays().concat(getDaysCells()))}</table>
)
function changeWithPrevMonth() {
  if (month === 0) {
    month = 11;
    year -= 1;
  } else {
    month -= 1;
  }
  // console.log(month, year)
}
function changeWithNextMonth() {
  if (month === 11) {
    month = 0;
    year += 1;
  } else {
    month += 1;
  }
  // console.log(month, year)
}

export default App;
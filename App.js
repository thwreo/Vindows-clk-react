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
  const [calendar, setCalendar] = useState(Calendar());
  useEffect(() => setCalendar(Calendar()), [month, calendar]);

  return (
    <div id="winClk">
      <WindowsClock /> <WindowsDate />
      <Line />
      <br />
      {calendar}
      <Line />
    </div>
  );
}

function WindowsClock() {
  const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
  const [date, setDate] = useState(new Date());
  function refreshClock() {
    setDate(new Date());
  }
  useEffect(() => {
    const refresh = setInterval(refreshClock, 100);
    return function cleanup() {
      console.log("*Cleanup done*");
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
  <button class="arr" onClick={changeWithPrevMonth}> <svg id="arrows">
    <polyline fill="#282c34" stroke="#a3a3a3" points="
       0,8 8,0 16,8 " />
  </svg>
  </button>
)
const ArrowDown = () => (
  <button class="arr" onClick={changeWithNextMonth}> <svg id="arrows">
    <polyline fill="#282c34" stroke="#a3a3a3" points="
0,0 8,8 16,0 " />
  </svg>
  </button>
)
function Calendar() {
  var monthThatChanges = new Date(year, month, 1);
  monthThatChanges = monthThatChanges.toLocaleDateString(lang, { year: 'numeric', month: 'long' })
  return (
    getTable(monthThatChanges)
  );
}

const firstLineStartVal = (nrDaysPrevMonth, firstDayOfCrtMonth) => (
  nrDaysPrevMonth - firstDayOfCrtMonth + 2
)

function getDays(m, y) {
  var firstDayOfMonth = (new Date(y, m, 1)).getDay() || 7;
  var prevMonth = m;
  (m === 0) ? prevMonth = 11 : prevMonth -= 1;
  var nrCrtMonth = new Date(y, m + 1, 0).getDate();
  var nrPrevMonth = new Date(y, m, 0).getDate();

  var startNr = firstLineStartVal(nrPrevMonth, firstDayOfMonth);
  var nrNextMonth = 42 - nrCrtMonth - firstDayOfMonth + 1;

  var prevDays_aux = Array.from(Array(firstDayOfMonth - 1), (_, day) => {
    return { day: day + startNr, type: "prevMonth" }
  });
  var crtDays_aux = Array.from(Array(nrCrtMonth), (_, day) =>
    (m === crtMonth && y === crtYear && day === crtDate - 1) ?
      { day: day + 1, type: "crtDate" } : { day: day + 1, type: "crtMonth" });
  var nextDays_aux = Array.from(Array(nrNextMonth), (_, day) => {
    return { day: day + 1, type: "nextMonth" }
  });
  var daysOfCalendarSheet = prevDays_aux.concat(crtDays_aux.concat(nextDays_aux));

  return daysOfCalendarSheet
}

function getDaysCells() {
  const calendarDays = getDays(month, year);
  const getClassForDayType = (dayType) => {
    switch (dayType) {
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

function getNameOfDays(baseDate) {
  var nameOfDays = [];
  // var baseDate = new Date('2021-11-01'); // get a Monday
  for (var i = 0; i < 7; i++) {
    nameOfDays.push(baseDate.toLocaleDateString(lang, { weekday: 'short' }));
    baseDate.setDate(baseDate.getDate() + 1);
  }
  nameOfDays = nameOfDays.map(dayOfWeek => dayOfWeek[0] + dayOfWeek[1]);
  console.log(nameOfDays);
  return nameOfDays
}

function toTableHeader(arrayOfObjects) {
  return arrayOfObjects.map(obj => <th>{obj}</th>)
}

const getFirstLine = (monthAndYear) => (
  <tr><td class="dateAndArr" colspan="5"><div id="underDate">{monthAndYear}</div></td><td class="dateAndArr"><ArrowUp /></td>
    <td class="dateAndArr"><ArrowDown /></td></tr>
)

const getTable = (monthAndYear) => (
  <table id="dateTable">{Array(getFirstLine(monthAndYear)).concat(toTableHeader(getNameOfDays(new Date('2021-11-01'))).
  concat(getDaysCells()))}</table>
)
function changeWithPrevMonth() {
  if (month === 0) {
    month = 11;
    year -= 1;
  } else {
    month -= 1;
  }
}
function changeWithNextMonth() {
  if (month === 11) {
    month = 0;
    year += 1;
  } else {
    month += 1;
  }
}

export default App;
import { useState, useEffect } from 'react';
// import DatePicker from "react-datepicker";
import './App.css';

const lang = navigator.language;
const date = new Date();
const crtYear = date.getFullYear();
const crtMonth = date.getMonth();
const crtDate = date.getDate();
var year = crtYear;
var month = crtMonth;

function App() {
  return (
    <div id="winClk">
      <WindowsClock /> <WindowsDate /> <Line />
      <br /> <table id="dateTable"><Generate /></table> <Line />
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
  (m == 0) ? prevMonth = 11 : prevMonth -= 1;
  var nrCrtMonth = new Date(y, m + 1, 0).getDate();
  var nrPrevMonth = new Date(y, prevMonth + 1, 0).getDate();

  var startNr = firstLineStartVal(nrPrevMonth, firstDayOfMonth);
  var nrNextMonth = 42 - nrCrtMonth - firstDayOfMonth + 1;

  var prevMonthArray = Array.from(Array(firstDayOfMonth - 1).keys()).map(i => <td id="prevMonth">{i + startNr}</td>);
  var crtMonthArray = Array.from(Array(nrCrtMonth).keys()).map
    (i => (m == crtMonth && y == crtYear && i == crtDate - 1 ? <td id="crtDate">{i + 1}</td> : <td id="crtMonth">{i + 1}</td>));
  var nextMonthArray = Array.from(Array(nrNextMonth).keys()).map(i => <td id="nextMonth">{i + 1}</td>)
  var monthCalendar = prevMonthArray.concat(crtMonthArray.concat(nextMonthArray));
  for (var i = 0; i < 42; i += 8) {
    monthCalendar = [
      ...monthCalendar.slice(0, i), <tr></tr>, ...monthCalendar.slice(i)
    ];
  }
  monthThatChanges = monthThatChanges.toLocaleDateString(lang, { year: 'numeric', month: 'long' })

  var firstLine = <tr><td class="dateAndArr" colspan="5"><div id="underDate">{monthThatChanges}</div></td><ArrowUp /><ArrowDown /></tr>
  var nameOfDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  nameOfDays = nameOfDays.map(i => <th>{i}</th>);
  return (
    Array(firstLine).concat(Array(nameOfDays).concat(monthCalendar))
    // nameOfDays
  );
}
const Generate = () => (
  CalendarArray(crtYear, crtMonth)
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
export default App;
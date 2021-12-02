import React from 'react';
import {render} from '@testing-library/dom';
import App from './App.js'

const nameOfDaysStartingMonday = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const nameOfDaysStartingSunday = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

describe('Be on page', () => {
  test('Test Rendering', () => {
    const {getByTestId} = render(<App />)
    expect(getByTestId('winClk')).toBeInTheDocument()
  })
})
import React, { useState, useRef, useEffect } from 'react';
import "./DateFilter.css"
import { LuCalendarSearch } from "react-icons/lu";
import { DateRangePicker } from 'react-date-range';
import { format } from 'date-fns';
import { enIN } from 'date-fns/locale';
import 'react-date-range/dist/styles.css'; // Main style
import 'react-date-range/dist/theme/default.css'; // Theme style

const DateFilter = ({ value, handleSelect }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [range, setRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const dateFilterRef = useRef(null);

  const handleRangeChange = (ranges) => {
    const { startDate, endDate } = ranges.selection;
    setRange({ startDate, endDate, key: 'selection' });
    handleSelect({ startDate, endDate }); // Send the selected range to parent
    setShowPicker(false); // Close the picker after selection
  };

  const handleClickOutside = (event) => {
    if (dateFilterRef.current && !dateFilterRef.current.contains(event.target)) {
      setShowPicker(false); // Close the picker if clicked outside
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (value) {
      setRange({
        startDate: value.startDate ? new Date(value.startDate) : new Date(),
        endDate: value.endDate ? new Date(value.endDate) : new Date(),
        key: 'selection',
      });
    }
  }, [value]);

  const formattedValue = `${format(range.startDate, 'dd MMM, yyyy')} - ${format(range.endDate, 'dd MMM, yyyy')}`;

  return (
    <div ref={dateFilterRef} className="filter position-relative">
      <div
        className="d-flex align-items-center border rounded p-2"
        style={{ width: '100%', height: '2.5rem', cursor: 'pointer' }}
        onClick={() => setShowPicker(!showPicker)}
      >
        <LuCalendarSearch size={20} />
        <span className="ms-2">{formattedValue}</span>
      </div>

      {showPicker && (
        <div className="position-absolute" style={{ zIndex: 10 }}>
          <DateRangePicker
            ranges={[range]}
            onChange={handleRangeChange}
            locale={enIN} // Use Indian locale
            moveRangeOnFirstSelection={false}
            editableDateInputs={true}
          />
        </div>
      )}
    </div>
  );
};

export default DateFilter;

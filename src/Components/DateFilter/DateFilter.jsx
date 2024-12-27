import React , {useState} from 'react'
import { LuCalendarSearch } from "react-icons/lu";
import { Dropdown } from 'react-bootstrap';

const DateFilter = ({value,handleSelect}) => {

    // const [selectedStatus, setSelectedStatus] = useState( value || 'Prev Day'); 

    // const handleSelect = (status) => {
    //   setSelectedStatus(status);
    //   // if (onStatusChange) onStatusChange(status); // Pass selected status to parent
    // };
  
  
  return (
    <div className="filter d-flex border rounded" style={{width:'10.5rem',height:'2.5rem'}}>
    {/* <button>
        <span>
        <LuCalendarSearch size={20} />
        </span>
        <span className='text'>Last 12 Months</span>
        
    </button> */}

    <Dropdown onSelect={handleSelect}  size="sm" className='d-flex align-items-center w-100'>
      <Dropdown.Toggle variant="light" id="dropdown-basic" className="d-flex align-items-center justify-content-between gap-2 w-100 border border-0 ">
        <p className="m-0 d-flex align-items-center gap-2"><div><LuCalendarSearch size={20} /></div>{value}</p>
      </Dropdown.Toggle>

      <Dropdown.Menu className='w-100'>
        <Dropdown.Item eventKey="Prev Day">Prev Day </Dropdown.Item>
        <Dropdown.Item eventKey="Prev Week">Prev Week</Dropdown.Item>
        <Dropdown.Item eventKey="Prev Month">Prev Month</Dropdown.Item>
        <Dropdown.Item eventKey="Prev Quarter">Prev Quarter</Dropdown.Item>
        <Dropdown.Item eventKey="Prev Year">Prev Year</Dropdown.Item>
        <Dropdown.Item eventKey="All">All</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    </div>
  )
}

export default DateFilter
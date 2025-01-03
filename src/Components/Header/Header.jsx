import React from 'react'
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const Header = () => {

    const navigate = useNavigate()

  return (
    <div className="top d-flex  header w-100 justify-content-between">
        <span className="left-0 position-absolute" onClick={() => navigate(-1)}>
                <IoMdArrowBack size={22} />
        </span>

    </div>
  )
}

export default Header
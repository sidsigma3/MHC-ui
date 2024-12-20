import React, { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { AiFillHome } from "react-icons/ai";
import { IoPerson } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { MdGroups } from "react-icons/md";
import { RiBarChartFill } from "react-icons/ri";
import InputField from "../../Components/Inputs/InputField";
import PasswordInput from "../../Components/Inputs/PasswordInput";
import DateInput from "../../Components/Inputs/DateInput";
import NationalityInput from "../../Components/Inputs/NationalityInput";
import CityInput from "../../Components/Inputs/CityInput";
import PhoneNumberInput from "../../Components/Inputs/PhoneNumberInput";

const AdminProfilePage = () => {
  const navigate = useNavigate();

  const [activePage, setActivePage] = useState("profile");

  const handleActivePage = (page) => {
    setActivePage(page);

    if (page === "profile") {
      navigate("/admin-profile");
    } else if (page === "dashboard") {
      navigate("/dashboard");
    } else if (page === "analytics") {
      navigate("/analytics");
    } else {
      navigate("/teams");
    }
  };

  const [nationality, setNationality] = useState("IN");

  const handleNationalityChange = (event) => {
    setNationality(event.target.value);
  };


  const [city,setCity] = useState({code:'DEL',name:'Delhi'});

  const handleCityChange = (e) => {
    setCity(e)
  }


  const [phoneNum,setPhoneNum] = useState()

  const handlePhoneChange = (e) => {
    setPhoneNum(e)
  }

  return (
    <div className="h-100 w-100  overflow-hidden ">
      <div
        className="top d-flex  header"
        onClick={() => navigate("/dashboard")}
      >
        <span className="left-0 position-absolute">
          <IoMdArrowBack size={22} />
        </span>

        <h5 className="text-center w-100">Profile</h5>
      </div>

      <div className="content">
        <div className="text-center mt-3">
          <img src="./images/avatar.png"></img>
          <h4>Jane Skiter</h4>
          <h6 className="text-body-tertiary">Hyderabad,India</h6>
        </div>

        <div className="row row-gap-3 gx-0 p-3">
          <div className="col-6 pe-1">
            <InputField
              text={"First name *"}
              placeHolder={"Your name"}
            ></InputField>
          </div>

          <div className="col-6 ps-1">
            <InputField
              text={"Last name *"}
              placeHolder={"Your last name"}
            ></InputField>
          </div>

          <div className="col-12">
            <InputField
              text={"Email *"}
              placeHolder={"Yourmail@gmail.com"}
              icon={"email"}
            ></InputField>
          </div>

          <div className="col-12">
            {/* <InputField text={'Password *'} icon={'eye'}></InputField> */}
            <PasswordInput label={"Password"} placeholder={""}></PasswordInput>
          </div>

          <div className="col-12">
            <InputField text={"Phone *"} icon={"call"}></InputField>
            {/* <PhoneNumberInput label={'Phone'} onChange={handlePhoneChange}></PhoneNumberInput> */}
          </div>

          <div className="col-12">
            <CityInput label={'City'} value={city} onChange={handleCityChange}></CityInput>
          </div>

          <div className="col-12">
            {/* <InputField text={'Birthday *'} icon={'date'}></InputField> */}
            <DateInput
              label={"Birthday *"}
              placeholder={"DD/MM/YYYY"}
            ></DateInput>
          </div>

          <div className="col-12">
          
            <NationalityInput
              label={"Nationality *"}
              value={nationality}
              onChange={handleNationalityChange}
            ></NationalityInput>
          </div>
        </div>

        <div className="mt-2 d-flex flex-column gap-2 p-3">
          <button className="btn btn-dark btn-sm w-100">Update</button>

          <button className="rounded border border-secondary-subtle w-100 bg-white p-1">
            {" "}
            <h6 className="text-danger" onClick={()=>navigate('/')}>Logout</h6>
          </button>
        </div>
      </div>

      <div className="footer d-flex justify-content-around">
        <button
          onClick={() => handleActivePage("dashboard")}
          className="border border-0 bg-transparent p-1 w-25"
          style={{ color: activePage === "dashboard" ? "black" : "#ACB5BB" }}
        >
          <AiFillHome />
        </button>

        <button
          onClick={() => handleActivePage("teams")}
          className="border border-0 bg-transparent p-1 w-25"
          style={{ color: activePage === "teams" ? "black" : "#ACB5BB" }}
        >
          {" "}
          <MdGroups size={22} />
        </button>

        <button
          onClick={() => handleActivePage("analytics")}
          className="border border-0 bg-transparent p-1 w-25"
          style={{ color: activePage === "analytics" ? "black" : "#ACB5BB" }}
        >
          <RiBarChartFill />
        </button>

        <button
          onClick={() => handleActivePage("profile")}
          className="border border-0 bg-transparent p-1 w-25"
          style={{ color: activePage === "profile" ? "black" : "#ACB5BB" }}
        >
          <IoPerson />
        </button>
      </div>
    </div>
  );
};

export default AdminProfilePage;

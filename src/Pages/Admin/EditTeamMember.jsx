import React, { useState } from "react";
import { useNavigate ,useLocation} from "react-router-dom";
import InputField from "../../Components/Inputs/InputField";
import PasswordInput from "../../Components/Inputs/PasswordInput";
import CityInput from "../../Components/Inputs/CityInput";
import DateInput from "../../Components/Inputs/DateInput";
import NationalityInput from "../../Components/Inputs/NationalityInput";
import { IoMdArrowBack } from "react-icons/io";
import { RiBarChartFill } from "react-icons/ri";
import { AiFillHome } from "react-icons/ai";
import { IoPerson } from "react-icons/io5";
import { MdGroups } from "react-icons/md";


const EditTeamMember = () => {
    const navigate = useNavigate();
    const location = useLocation();

     const [activePage, setActivePage] = useState("teams");
    
      const [filterOption, setFilterOption] = useState("District");
    
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
    
  
    // Retrieve the team member data passed via navigation state
    const memberData = location.state || {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      city: "",
      birthday: "",
      nationality: "",
      password: "",
    };
  
    // Local state for each form field
    const [firstName, setFirstName] = useState(memberData.firstName);
    const [lastName, setLastName] = useState(memberData.lastName);
    const [email, setEmail] = useState(memberData.email);
    const [phone, setPhone] = useState(memberData.phone);
    const [city, setCity] = useState(memberData.city);
    const [birthday, setBirthday] = useState(memberData.birthday);
    const [nationality, setNationality] = useState(memberData.nationality);
    const [password, setPassword] = useState(memberData.password);
  
    const handleUpdate = () => {
      const updatedMemberData = {
        firstName,
        lastName,
        email,
        phone,
        city,
        birthday,
        nationality,
        password,
      };
  
      console.log("Updated Member Data:", updatedMemberData);
  
      // Navigate back to the teams page after updating
      navigate("/teams");
    };

  return (
    <div>

     <div className="top d-flex  header w-100 justify-content-between">
                  <span className="left-0 position-absolute" onClick={() => navigate(-1)}>
                    <IoMdArrowBack size={22} />
    </span>

    <h5 className="text-center w-100">
        {location.state !== null ? 'Profile' : 'Add a profile'}
    </h5>
                    
    </div>

    <div className="content">
      <div className="text-center mt-3">
        <img src="./images/avatar.png" alt="Avatar" className="rounded-circle" />
        <h4>{`${firstName} ${lastName}`}</h4>
        <h6 className="text-body-tertiary">{city}</h6>
      </div>

      <div className="row row-gap-3 gx-0 p-3">
        <div className="col-6 pe-1">
          <InputField
            text={"First name *"}
            placeHolder={"Your name"}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="col-6 ps-1">
          <InputField
            text={"Last name *"}
            placeHolder={"Your last name"}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="col-12">
          <InputField
            text={"Email *"}
            placeHolder={"Yourmail@gmail.com"}
            icon={"email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="col-12">
          <PasswordInput
            label={"Password"}
            placeholder={""}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="col-12">
          <InputField
            text={"Phone *"}
            icon={"call"}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="col-12">
          <CityInput
            label={"City"}
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <div className="col-12">
          <DateInput
            label={"Birthday *"}
            placeholder={"DD/MM/YYYY"}
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </div>

        <div className="col-12">
          <NationalityInput
            label={"Nationality *"}
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-2 d-flex flex-column gap-3 p-3">
        <button className="btn btn-dark btn-sm w-100 p-2" onClick={handleUpdate}>
          {location.state===null? 
            'Save':
            'Update'  
        }
        </button>

        {location.state && (
        <button
        className="rounded border border-secondary-subtle w-100 bg-white p-2"
        onClick={() => navigate("/")}
        >
        <h6 className="text-danger">Delete</h6>
        </button>
        )}

    
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

export default EditTeamMember;

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
import RoleInput from "../../Components/Inputs/RoleInput";
import { updateUserDetails } from "../../Services/Api";
import { signupUser } from "../../Services/Api";

const EditTeamMember = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [userDetails,setUserDetails] = useState()
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

    console.log(memberData)

    const [formData, setFormData] = useState({
        first_name: memberData.first_name  ||  "",
        last_name: memberData.last_name  ||  "",
        email: memberData.email  ||  "",
        password: memberData.password  ||  "",
        whatsapp: memberData.whatsapp  ||  "",
        phone: memberData.phone  ||  "",
        birthday: memberData.birthday  ||  "",
        jobProfile:memberData.jobProfile  ||  "",
        city:memberData.city  ||  "",
        jobProfile:memberData.jobProfile || "",
    });
    
    
  
    // Local state for each form field
    // const [firstName, setFirstName] = useState(memberData.firstName);
    // const [lastName, setLastName] = useState(memberData.lastName);
    // const [email, setEmail] = useState(memberData.email);
    // const [phone, setPhone] = useState(memberData.phone);
    // const [city, setCity] = useState(memberData.city);
    // const [birthday, setBirthday] = useState(memberData.birthday);
 
    // const [password, setPassword] = useState(memberData.password);

    const [nationality, setNationality] = useState(memberData?.nationality || "IN" );

    const handleNationalityChange = (event) => {
    setNationality(event.target.value);
    };

    
    
      const handleCityChange = (newValue) => {
        setFormData((prev)=>({
          ...prev,
          city:newValue
        }))
      }

      const handleRoleChange = (e) => {
        setFormData((prev)=>({
          ...prev,
          ['jobProfile']:e.target.value
        })) 
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      };
    
  
   const handleUpdate = async () => {
       try {
         const userId = memberData.userId
         
       
         const updatedData = {
           ...formData,         
            role:'user',    
           nationality: nationality, 
        
         };
     
         if (userId) {
            
            await updateUserDetails(userId, updatedData);
            alert("Profile updated successfully");
          } else {
         
            await signupUser(updatedData);
            alert("New user created successfully");
          }


       
     
       
         alert("Profile updated successfully");
       } catch (error) {
         console.error("Error updating profile:", error);
         alert("Failed to update profile");
       }
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
        <h4>{formData.first_name.toLowerCase()} {formData.last_name.toLowerCase()}</h4>
        <h6 className="text-body-tertiary">{formData.city}</h6>
      </div>

      <div className="row row-gap-3 gx-0 p-3">
      <div className="col-6">
          <InputField
            text="First name *"
            placeHolder="Your name"
            value={formData.first_name}
            name="first_name"
            onChange={handleInputChange}
          />
        </div>

        <div className="col-6 ps-1">
          <InputField
            text="Last name *"
            placeHolder="Your last name"
            value={formData.last_name}
            name="last_name"
            onChange={handleInputChange}
          />
        </div>

        <div className="col-12">
          <RoleInput
            label="Job profile"
            value={formData.jobProfile}
            name="role"
            onChange={handleRoleChange}
          />
        </div>

        <div className="col-12">
          <InputField
            text="Email *"
            placeHolder="Yourmail@gmail.com"
            value={formData.email}
            name="email"
            onChange={handleInputChange}
            icon="email"
          />
        </div>

        <div className="col-12">
          <PasswordInput
            label="Password"
            placeholder="Enter new password"
            value={formData.password}
            name="password"
            onChange={handleInputChange}
          />
        </div>

        <div className="col-12">
          <InputField
            text="Whatsapp *"
            icon="call"
            value={formData.whatsapp}
            name="whatsapp"
            onChange={handleInputChange}
          />
        </div>

        <div className="col-12">
          <InputField
            text="Phone *"
            icon="call"
            value={formData.phone}
            name="phone"
            onChange={handleInputChange}
          />
        </div>

        <div className="col-12">
          <CityInput
            label="City"
            value={formData.city}
            name="city"
            onChange={handleCityChange}
          />
        </div>

        <div className="col-12">
          <DateInput
            label="Birthday *"
            placeholder="DD/MM/YYYY"
            value={formData.birthday}
            name="birthday"
            onChange={handleInputChange}
          />
        </div>

        <div className="col-12">
          <NationalityInput
            label="Nationality *"
            value={nationality}
            name="nationality"
            onChange={handleNationalityChange}
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

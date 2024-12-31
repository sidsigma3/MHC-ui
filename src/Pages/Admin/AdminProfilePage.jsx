import React, { useState , useEffect} from "react";
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
import { getUserDetails } from "../../Services/Api";
import { updateUserDetails } from "../../Services/Api";
import RoleInput from "../../Components/Inputs/RoleInput";
import CircularProgress from '@mui/material/CircularProgress';

const AdminProfilePage = () => {
  const navigate = useNavigate();

  const [activePage, setActivePage] = useState("profile");

  const [loading, setLoading] = useState(true); 
  const [editing, setEditing] = useState(false); // State to toggle edit mode
  const [userDetails,setUserDetails] = useState()

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    whatsapp: "",
    phone: "",
    birthday: "",
    jobProfile:"",
    city:"",
  });

  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          console.error("User ID not found");
          navigate("/login");
          return;
        }

        // Fetch user data from API (example function)
        const userData = await getUserDetails(userId);
        setUserDetails(userData)
        // Set fetched data to form state
        setFormData({
          first_name: userData.first_name || "",
          last_name: userData.last_name || "",
          email: userData.email || "",
          password: userData.password || "",
          whatsapp: userData.whatsapp || "",
          phone: userData.phone || "",
          birthday: userData.birthday || "",
          jobProfile: userData.jobProfile || "Select the Job",
          city: userData.city || { name: 'Select a City' },
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);


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


  const handleCityChange = (newValue) => {
    console.log(newValue)
    setFormData((prev) => ({
      ...prev,
      city: newValue
    }));
  };


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
        const userId = localStorage.getItem("userId");
        const updatedData = {
          ...formData,         
          city:formData.city.name,    
          nationality: nationality, 
       
        };
    
   
        await updateUserDetails(userId, updatedData);
    
      
        alert("Profile updated successfully");
      } catch (error) {
        console.error("Error updating profile:", error);
        alert("Failed to update profile");
      }
    };
    
  
     if (loading) {
             return (
               <div
                 style={{
                   display: 'flex',
                   justifyContent: 'center',
                   alignItems: 'center',
                   height: '100vh', // Full viewport height
                 }}
               >
                 <CircularProgress />
               </div>
             );
           }
  

  return (
    <div className="h-100 w-100  overflow-hidden ">
      <div
        className="top d-flex  header"
      >
        {/* <span className="left-0 position-absolute">
          <IoMdArrowBack size={22} />
        </span> */}

        <h5 className="text-center w-100">Profile</h5>
      </div>

      <div className="content">
        <div className="text-center mt-3">
          <img src="./images/avatar.png"></img>
          <h4>{formData.first_name.toLowerCase()} {formData.last_name.toLowerCase()}</h4>
          <h6 className="text-body-tertiary fs-6">{formData.city} {userDetails.nationality}</h6>
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

        <div className="mt-2 d-flex flex-column gap-2 p-3">
          <button className="btn btn-dark btn-sm w-100 p-2" onClick={handleUpdate}>Update</button>

          <button className="rounded border border-secondary-subtle w-100 bg-white p-2">
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

import React, { useState } from "react";
import { useNavigate ,useLocation} from "react-router-dom";
import InputField from "../../Components/Inputs/InputField";
import PasswordInput from "../../Components/Inputs/PasswordInput";
import CityInput,{indianCities} from "../../Components/Inputs/CityInput";
import DateInput from "../../Components/Inputs/DateInput";
import NationalityInput from "../../Components/Inputs/NationalityInput";
import { IoMdArrowBack } from "react-icons/io";
import { RiBarChartFill } from "react-icons/ri";
import { AiFillHome } from "react-icons/ai";
import { IoPerson } from "react-icons/io5";
import { MdGroups } from "react-icons/md";
import RoleInput from "../../Components/Inputs/RoleInput";
import { createUser, updateUserDetails,deleteUser } from "../../Services/Api";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";

const EditTeamMember = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [userDetails,setUserDetails] = useState()
    const [activePage, setActivePage] = useState("teams");
    
    const [deleteSurveys, setDeleteSurveys] = useState(false);
    const [showModal, setShowModal] = useState(false);
    
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

    
    
    const [formData, setFormData] = useState({
        first_name: memberData.first_name  ||  "",
        last_name: memberData.last_name  ||  "",
        email: memberData.email  ||  "",
        password: memberData.password  ||  "",
        whatsapp: memberData.whatsapp  ||  "",
        phone: memberData.phone  ||  "",
        birthday: memberData.birthday  ||  "",
        jobProfile:memberData.jobProfile  ||  "",
        city: memberData.city || "",
        jobProfile:memberData.jobProfile || "",
    });
   
   

    const [nationality, setNationality] = useState(memberData?.nationality || "IN" );

    const handleNationalityChange = (event) => {
    setNationality(event.target.value);
    };

    
    
      const handleCityChange = (newValue) => {
        setFormData((prev)=>({
          ...prev,
          city:newValue
        }))
        console.log(newValue)
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
         
            await createUser(updatedData);
            alert("New user created successfully");
          }

         navigate('/teams')
       } catch (error) {
         console.error("Error updating profile:", error);
         alert("Failed to update profile");
       }
     };

     const handleDelete = async () => {
      try {
        const userId = location.state.userId; 
        const deleteSurveys = true; 
  
        const response = await deleteUser(userId, deleteSurveys);
  
        if (response.success) {
          alert("Profile deleted successfully!");
          navigate("/teams");
        } else {
          alert("Failed to delete user.");
        }
      } catch (err) {
        alert("An error occurred while deleting the user.");
      }
    };
     
  return (
    <div>

     <div className="top d-flex  header w-100 justify-content-between">
                  <span className="left-0 position-absolute" onClick={() => navigate(-1)}>
                    <IoMdArrowBack size={22} />
    </span>

    <h5 className="text-center w-100">
        {location.state !== null ? 'Profile' : 'Add sales executive'}
    </h5>
                    
    </div>

    <div className="content">
      <div className="text-center mt-3">
        <img src="./images/avatar.png" alt="Avatar" style={{ width: '100px', height: '100px', borderRadius: '50%' }} className="rounded-circle" />
        <h4 class="text-capitalize">{formData.first_name.toLowerCase()} {formData.last_name.toLowerCase()}</h4>
        <h6 className="text-body-tertiary">{formData.city}</h6>
      </div>

      <div className="row row-gap-3 gx-0 p-3">
      <div className="col-6">
          <InputField
            text="First name *"
            placeHolder="First name"
            value={formData.first_name}
            name="first_name"
            onChange={handleInputChange}
          />
        </div>

        <div className="col-6 ps-1">
          <InputField
            text="Last name *"
            placeHolder="Last name"
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
        <button className="btn btn-dark btn-sm w-100 p-2 fs-6" onClick={handleUpdate}>
          {location.state===null? 
            'Save':
            'Update'  
        }
        </button>

        {location.state && (
         <button
         className="rounded border border-secondary-subtle w-100 bg-white p-2 fs-6"
         onClick={() => setShowModal(true)}
       >
         <h6 className="text-danger fs-6 m-0 p-1">Delete</h6>
       </button>
      )}

    
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this user?</p>
          <Form.Check
            type="checkbox"
            id="deleteSurveys"
            label="Also delete associated surveys"
            checked={deleteSurveys}
            onChange={(e) => setDeleteSurveys(e.target.checked)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>
    
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

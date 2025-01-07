import React , {useState , useEffect}from 'react'
import { useNavigate } from 'react-router-dom'
import { IoMdArrowBack } from "react-icons/io";
import InputField from '../../Components/Inputs/InputField';
import { AiFillHome } from "react-icons/ai";
import { IoPerson } from "react-icons/io5";
import { BsClipboard2CheckFill } from "react-icons/bs";
import PasswordInput from '../../Components/Inputs/PasswordInput';
import CityInput from '../../Components/Inputs/CityInput';
import DateInput from '../../Components/Inputs/DateInput';
import NationalityInput from '../../Components/Inputs/NationalityInput';
import RoleInput from '../../Components/Inputs/RoleInput';
import { getUserDetails ,updateUserDetails,saveProfilePicture } from '../../Services/Api';
import CircularProgress from '@mui/material/CircularProgress';
import { HiPencil } from "react-icons/hi2";


const ProfilePage = () => {

    const navigate = useNavigate()
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
      profilePicture: "",
    });


    const convertBufferToBase64 = (bufferData) => {
      const binary = new Uint8Array(bufferData).reduce((acc, byte) => acc + String.fromCharCode(byte), '');
      return `data:image/jpeg;base64,${btoa(binary)}`;
    };
    

    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const userId = localStorage.getItem("userId");
          if (!userId) {
            console.error("User ID not found");
            navigate("/login");
            return;
          }
    
         
          const userData = await getUserDetails(userId);
    
        
          let base64ProfilePicture = "./images/avatar.png"; // Default picture
          if (userData.profilePicture && userData.profilePicture.data) {
            base64ProfilePicture = convertBufferToBase64(userData.profilePicture.data);
          }
    
          setUserDetails(userData);
    
        
          setFormData({
            first_name: userData.first_name || "",
            last_name: userData.last_name || "",
            email: userData.email || "",
            password: userData.password || "",
            whatsapp: userData.whatsapp || "",
            phone: userData.phone || "",
            birthday: userData.birthday || "",
            jobProfile: userData.jobProfile || "Select the Job",
            city: userData.city || "Select a City",
            profilePicture: base64ProfilePicture, 
          });
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      };
    
      fetchUserData();
    }, []);
    
  

    const [activePage,setActivePage] = useState('profile')


    const handleActivePage = (page) => {
        setActivePage(page)

        if (page ==='profile'){
            navigate('/profile')
        }

        else if (page ==='home'){
            navigate('/home')
        }

        else{
            navigate('/survey')
        }

    }

  const [nationality, setNationality] = useState(userDetails?.nationality || "IN" );

  const handleNationalityChange = (event) => {
    setNationality(event.target.value);
  };


 

  const handleCityChange = (newValue) => {
    setFormData((prev)=>({
      ...prev,
      city:newValue
    }))
  }


  const [phoneNum,setPhoneNum] = useState()

  const handlePhoneChange = (e) => {
    setPhoneNum(e)
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
      const userId = localStorage.getItem("userId");
      
    
      const updatedData = {
        ...formData,         
        city:formData.city,   
        nationality: nationality, 
     
      };

      console.log(updatedData)
      
      
      await updateUserDetails(userId, updatedData);
  
    
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };
  
  const handleProfilePictureUpload = (event) => {
    const file = event.target.files[0];
    const userId = localStorage.getItem("userId");
  
    if (!file) return;
  
    const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validImageTypes.includes(file.type)) {
      alert("Please upload a valid image (JPEG or PNG).");
      return;
    }
  
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const response = await saveProfilePicture(reader.result, userId);
        console.log("Profile picture uploaded and saved:", response);
        alert("Profile picture uploaded successfully!");
      } catch (error) {
        console.error("Error saving profile picture:", error);
        alert("Failed to upload profile picture. Please try again.");
      }
    };
    reader.readAsDataURL(file); // Convert file to Base64
  };


  // const handleProfilePictureUpload = async (event) => {
  //   const file = event.target.files[0];
  //   const userId = localStorage.getItem("userId");
  
  //   if (!file || !userId) {
  //     console.warn("File or User ID is missing.");
  //     return;
  //   }
  
  //   const formData = new FormData();
  //   formData.append("profilePicture", file);
  //   formData.append("userId", userId);
  
  //   try {
  //     const responseData = await saveProfilePicture(formData); // Use the utility
  //     console.log("Profile picture updated successfully:", responseData);
  
  //     // Update state to immediately reflect the new profile picture
  //     setFormData((prev) => ({
  //       ...prev,
  //       profilePicture: responseData.filePath, 
  //     }));
  //   } catch (error) {
  //     console.error("Error uploading profile picture:", error);
  //   }
  // };


  const handleLogout = () => {
 
    localStorage.clear();
    navigate('/');
};

  return (
    <div className="w-100 h-100">
  <div className="header">
    <div >
      
      <h5 className="text-center">Profile</h5>
    </div>
  </div>

  <div
    className="profile-page content"
  >

  {loading ? (
       
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        
        <>
   
    <div className="d-flex flex-column justify-content-center align-items-center mt-3">
            <div className='position-relative' style={{width:'fit-content'}}>
            <img
              src={formData.profilePicture}
              alt="Avatar"
              style={{ width: '100px', height: '100px', borderRadius: '50%' }}
            />
            <button
              className="btn btn-outline-light btn-sm rounded-circle position-absolute"
              style={{ bottom: '10px', right: '10px' }}
              onClick={() => document.getElementById('uploadProfilePicture').click()}
            >
              <HiPencil />
            </button>
            <input
              type="file"
              id="uploadProfilePicture"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleProfilePictureUpload}
            />
            </div>
            <h4 class="text-capitalize">{formData.first_name.toLowerCase()} {formData.last_name.toLowerCase()}</h4>
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
        <button className="btn btn-dark btn-sm w-100 p-2 fs-6" onClick={handleUpdate}>
          Update
        </button>
        <button
          onClick={handleLogout}
          className="rounded border border-secondary-subtle w-100 bg-white p-2"
        >
          <h6 className="text-danger fs-6 my-1">Logout</h6>
        </button>
        </div>

        </>

      )}
    </div>

        <div className="footer d-flex justify-content-around">
            <button
            onClick={() => handleActivePage('home')}
            className="border border-0 bg-transparent p-1 w-25"
            style={{ color: activePage === 'home' ? 'black' : '#ACB5BB' }}
            >
            <AiFillHome />
            </button>
            <button
            onClick={() => handleActivePage('survey')}
            className="border border-0 bg-transparent p-1 w-25"
            style={{ color: activePage === 'survey' ? 'black' : '#ACB5BB' }}
            >
            <BsClipboard2CheckFill />
            </button>
            <button
            onClick={() => handleActivePage('profile')}
            className="border border-0 bg-transparent p-1 w-25"
            style={{ color: activePage === 'profile' ? 'black' : '#ACB5BB' }}
            >
            <IoPerson />
            </button>
        </div>
    </div>
  )
}

export default ProfilePage
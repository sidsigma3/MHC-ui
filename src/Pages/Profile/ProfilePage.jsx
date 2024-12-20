import React , {useState}from 'react'
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

const ProfilePage = () => {

    const navigate = useNavigate()

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

  const [role,setRole] = useState ()

  const handleRoleChange = (e) => {
        setRole(e)
  }


  return (
    <div className="w-100 h-100">
  <div className="header">
    <div className="position-relative" onClick={() => navigate('/survey')}>
      <span className="position-absolute left-0">
        <IoMdArrowBack  size={22}/>
      </span>
      <h5 className="text-center">Profile</h5>
    </div>
  </div>

  <div
    style={{
      paddingTop: '7vh', // Space for the header
      paddingBottom: '7vh', // Space for the footer
      height: '93vh', // Remaining height
      overflowY: 'auto', // Enable scrolling for the content
    }}
    className="profile-page"
  >
    <div className="text-center mt-3">
      <img src="./images/avatar.png" alt="Avatar" />
      <h4>Jane Skiter</h4>
      <h6 className="text-body-tertiary">Hyderabad, India</h6>
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

          <div className='col-12'>
                <RoleInput label={'Job profile'} value={role} onChange={handleRoleChange}></RoleInput>
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
            <InputField text={"Whatsapp *"} icon={"call"}></InputField>
            {/* <PhoneNumberInput label={'Phone'} onChange={handlePhoneChange}></PhoneNumberInput> */}
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

        <div className='mt-2 d-flex flex-column gap-2 p-3'>
            <button className='btn btn-dark btn-sm w-100'>Update</button>


            <button onClick={()=>navigate('/')} className='rounded border border-secondary-subtle w-100 bg-white p-1'> <h6 className='text-danger'>Logout</h6></button>
        </div>


     
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
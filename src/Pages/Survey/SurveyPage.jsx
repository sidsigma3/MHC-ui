import React, { useEffect, useState } from 'react'
import { FaRegBell } from "react-icons/fa";
import { Badge } from '@mui/material';
import InputField from '../../Components/Inputs/InputField';
import { AiFillHome } from "react-icons/ai";
import { IoPerson } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { BsClipboard2CheckFill } from "react-icons/bs";
import { IoMdArrowBack } from "react-icons/io";
import { grey } from '@mui/material/colors';
import DateInput from '../../Components/Inputs/DateInput';
import { createSurvey, getUserDetails } from '../../Services/Api';
import { formToJSON } from 'axios';
import TextAreaInput from '../../Components/Inputs/TextAreaInput';

const getIndianDate = () => {
    const indianTimeOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds
    const now = new Date();
    const indianDate = new Date(now.getTime() + indianTimeOffset);
    return indianDate.toISOString().split('T')[0];
};


const SurveyPage = () => {

    const navigate = useNavigate()

    const [activePage,setActivePage] = useState('survey')

    const [formData, setFormData] = useState({
        firstName:'',
        lastName:'',
        hq: '',
        date: getIndianDate(),
        placeOfWork: '',
        doctorsInfo:[
            { nameOfDoctor: '' },
        ],
        chemistsInfo:[
            {nameOfChemists:''},
        ],
        // numDoctorsList: '',
        // numDoctorsVisited: '',
        // numDoctorsCall: '',
        // doctorsCallAvg: '',
        // numDoctorsMissed: '',
        // numChemistsVisited: '',
        // chemistCallAvg: '',
        monthlyPrimarySale: '',
        secondarySales: '',
        // nextMonthSalesPlan: '',
        closingStockValue: '',
        totalPOB: '',
        // paymentCollection: '',
        // nextMonthCollectionPlan: '',
        // paymentReceivedFromHQ: '',
        // paymentReceivedFromManager: '',
        productInfo:'',

    });


    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const userId = localStorage.getItem('userId') || '';
                if (userId) {
                    const data = await getUserDetails(userId);
                    setFormData((prevFormData) => ({
                        ...prevFormData,
                        firstName: data.first_name || '',
                        lastName: data.last_name || '',
                    }));
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserDetails(); 
    }, []); 


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


    const handleDoctorChange = (index, field, value) => {
        setFormData((prevFormData) => {
            const updatedDoctors = [...prevFormData.doctorsInfo];
            updatedDoctors[index][field] = value;
            return {
                ...prevFormData,
                doctorsInfo: updatedDoctors,
            };
        });
    };

    const handleChemistsChange = (index, field, value) => {
        setFormData((prevFormData) => {
            const updatedChemists = [...prevFormData.chemistsInfo];
            updatedChemists[index][field] = value;
            return {
                ...prevFormData,
                chemistsInfo : updatedChemists,
            };
        });
    };
    

    const addDoctor = () => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            doctorsInfo: [
                ...prevFormData.doctorsInfo,
                { nameOfDoctor: '' }, // Add new empty doctor entry
            ],
        }));
    };

    const addChemists = () => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            chemistsInfo: [
                ...prevFormData.chemistsInfo,
                { chemistsInfo: '' }, // Add new empty doctor entry
            ],
        }));
    };
    



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const userId = localStorage.getItem('userId') || ''; // Example using localStorage
    
            if (!userId) {
                alert('User ID is required to submit the survey.');
                return;
            }
    
            // Filter out empty entries from doctorsInfo and chemistsInfo
            const filteredDoctors = formData.doctorsInfo.filter(
                (doctor) => doctor.nameOfDoctor && doctor.nameOfDoctor.trim() !== ''
            );
            const filteredChemists = formData.chemistsInfo.filter(
                (chemist) => chemist.nameOfChemists && chemist.nameOfChemists.trim() !== ''
            );
    
            // Include userId and filtered data in the formData
            const dataToSubmit = {
                ...formData,
                userId,
                doctorsInfo: filteredDoctors,
                chemistsInfo: filteredChemists,
            };
    
            const response = await createSurvey(dataToSubmit); // Using the createSurvey API function

            if (response) {
                alert('Survey submitted successfully');
                // Clear the form after submission
                setFormData({
                    firstName: '',
                    lastName: '',
                    hq: '',
                    placeOfWork: '',
                    doctorsInfo:[
                        { nameOfDoctor: '' },
                    ],
                    chemistsInfo:[
                        {nameOfChemists:''},
                    ],

                    // numDoctorsList: '',
                    // numDoctorsVisited: '',
                    // numDoctorsCall: '',
                    // doctorsCallAvg: '',
                    // numDoctorsMissed: '',
                    // numChemistsVisited: '',
                    // chemistCallAvg: '',
                    monthlyPrimarySale: '',
                    secondarySales: '',
                    // nextMonthSalesPlan: '',
                    closingStockValue: '',
                    totalPOB: '',
                    // paymentCollection: '',
                    // nextMonthCollectionPlan: '',
                    // paymentReceivedFromHQ: '',
                    // paymentReceivedFromManager: '',
                    productInfo:'',
                });
            }
        } catch (error) {
            console.error('Error submitting survey:', error);
            alert(`Error: ${error.message}`);
        }
    };

  return (
    <div className='h-100 w-100'>
    <div className='survey-page content'>
        <div className='d-flex p-2 justify-content-between header'>
        <div className="position-relative w-100 p-3">
        {/* <span className="position-absolute left-0">
            <IoMdArrowBack  size={22}/>
        </span> */}
        <h5 >Survey</h5>
        </div>

        </div>


        <form onSubmit={handleSubmit}>
                <div className="p-3 row row-gap-3 gx-0 p-3">
                    <div className="col-6 pe-1">
                        <InputField
                            text="First name *"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-6 ps-1">
                        <InputField
                            text="Last name *"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-12">
                        <InputField
                            text="HQ *"
                            name="hq"
                            value={formData.hq}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-12">
                        <DateInput
                            label="Date"
                            name="date"
                            value={formData.date}
                            onChange={() => {}}
                            readOnly={true} // 
                            
                        />
                    </div>
                    <div className="col-12">
                        <InputField
                            text="Place of work *"
                            name="placeOfWork"
                            value={formData.placeOfWork}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Doctors Info */}
                    <div className="d-flex align-items-center">
                        <h6 style={{ marginRight: '1rem', whiteSpace: 'nowrap', color: 'grey' }}>Doctors Info</h6>
                        <hr style={{ flexGrow: 1, borderTop: '1px solid grey' }} />
                    </div>

                    {formData.doctorsInfo.map((doctor, index) => (
                        <div className="col-6 pe-1" key={index}>
                            <InputField
                                text={`Doctor ${index + 1} Name`}
                                value={doctor.nameOfDoctor}
                                onChange={(e) => handleDoctorChange(index, 'nameOfDoctor', e.target.value)}
                            />
                        </div>
                    ))}

                    <div className="mt-1">
                        <button
                            type="button"
                            onClick={addDoctor}
                            className="btn btn-outline-dark"
                        >
                            Add Doctor
                        </button>
                    </div>

                    {/* <div className="col-6 pe-1">
                        <InputField
                            text="No. of Drs on list *"
                            name="numDoctorsList"
                            type="number"
                            value={formData.numDoctorsList}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-6 ps-1">
                        <InputField
                            text="No. Drs visited *"
                            name="numDoctorsVisited"
                            type="number"
                            value={formData.numDoctorsVisited}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-6 pe-1">
                        <InputField
                            text="No. of Drs. call *"
                            name="numDoctorsCall"
                            type="number"
                            value={formData.numDoctorsCall}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-6 ps-1">
                        <InputField
                            text="Drs. call Average *"
                            name="doctorsCallAvg"
                            type="number"
                            step="0.01"
                            value={formData.doctorsCallAvg}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-12">
                        <InputField
                            text="No. of Drs. missed *"
                            name="numDoctorsMissed"
                            type="number"
                            value={formData.numDoctorsMissed}
                            onChange={handleChange}
                        />
                    </div> */}

                    {/* Chemist's Info */}
                    <div className="d-flex align-items-center">
                        <h6 style={{ marginRight: '1rem', whiteSpace: 'nowrap', color: 'grey' }}>Chemist's Info</h6>
                        <hr style={{ flexGrow: 1, borderTop: '1px solid grey' }} />
                    </div>

                    {formData.chemistsInfo.map((chemists, index) => (
                        <div className="col-6 pe-1" key={index}>
                            <InputField
                                text={`Chemists ${index + 1} Name`}
                                value={chemists.nameOfChemists}
                                onChange={(e) => handleChemistsChange(index, 'nameOfChemists', e.target.value)}
                            />
                        </div>
                    ))}

                    <div className="mt-1">
                        <button
                            type="button"
                            onClick={addChemists}
                            className="btn btn-outline-dark"
                        >
                            Add Chemists
                        </button>
                    </div>


                    {/* <div className="col-6 pe-1">
                        <InputField
                            text="No. Chemist Visited *"
                            name="numChemistsVisited"
                            type="number"
                            value={formData.numChemistsVisited}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-6 ps-1">
                        <InputField
                            text="Chemist Call Average *"
                            name="chemistCallAvg"
                            type="number"
                            step="0.01"
                            value={formData.chemistCallAvg}
                            onChange={handleChange}
                        />
                    </div> */}

                    {/* Sales */}
                    <div className="d-flex align-items-center">
                        <h6 style={{ marginRight: '1rem', whiteSpace: 'nowrap', color: 'grey' }}>Sales</h6>
                        <hr style={{ flexGrow: 1, borderTop: '1px solid grey' }} />
                    </div>
                    <div className="col-6 pe-1">
                        <InputField
                            text="Monthly Primary Sale *"
                            name="monthlyPrimarySale"
                            type="number"
                            step="0.01"
                            value={formData.monthlyPrimarySale}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-6 ps-1">
                        <InputField
                            text="Monthly Secondary Sales *"
                            name="secondarySales"
                            type="number"
                            step="0.01"
                            value={formData.secondarySales}
                            onChange={handleChange}
                        />
                    </div>

                    {/* <div className="col-12">
                        <InputField
                            text="Next month sales plan *"
                            name="nextMonthSalesPlan"
                            value={formData.nextMonthSalesPlan}
                            onChange={handleChange}
                        />
                    </div> */}

                    {/* Stocks */}
                    <div className="d-flex align-items-center">
                        <h6 style={{ marginRight: '1rem', whiteSpace: 'nowrap', color: 'grey' }}>Stocks</h6>
                        <hr style={{ flexGrow: 1, borderTop: '1px solid grey' }} />
                    </div>
                    <div className="col-6 pe-1">
                        <InputField
                            text="Closing Stock Value *"
                            name="closingStockValue"
                            type="number"
                            step="0.01"
                            value={formData.closingStockValue}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-6 ps-1">
                        <InputField
                            text="Total POB *"
                            name="totalPOB"
                            type="number"
                            step="0.01"
                            value={formData.totalPOB}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Returns */}
                    <div className="d-flex align-items-center">
                        <h6 style={{ marginRight: '1rem', whiteSpace: 'nowrap', color: 'grey' }}>Products Details</h6>
                        <hr style={{ flexGrow: 1, borderTop: '1px solid grey' }} />
                    </div>

                    <div className='col-12'>
                        <TextAreaInput
                        name="productInfo"
                        onChange={handleChange}
                        value={formData.productInfo}
                        >
                        </TextAreaInput>
                    </div>


                    {/* <div className="col-12">
                        <InputField
                            text="Payment Collection *"
                            name="paymentCollection"
                            type="number"
                            step="0.01"
                            value={formData.paymentCollection}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-12">
                        <InputField
                            text="Next month Collection Plan *"
                            name="nextMonthCollectionPlan"
                            value={formData.nextMonthCollectionPlan}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-12">
                        <InputField
                            text="Payment received from HQ *"
                            name="paymentReceivedFromHQ"
                            type="number"
                            step="0.01"
                            value={formData.paymentReceivedFromHQ}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-12">
                        <InputField
                            text="Payment received from Manager *"
                            name="paymentReceivedFromManager"
                            type="number"
                            step="0.01"
                            value={formData.paymentReceivedFromManager}
                            onChange={handleChange}
                        />
                    </div> */}

                    <div className="col-12">
                        <button type="submit" className="btn btn-dark btn-sm w-100 p-2">Submit</button>
                    </div>
                </div>
            </form>

     


      

    </div>

<div className='footer d-flex justify-content-around rounded shadow-sm mt-2 bottom-0'>
           
<button onClick={()=>handleActivePage('home')} className='border border-0 bg-transparent p-1 w-25' style={{color:activePage==='profile' ? 'black' : '#ACB5BB'}}><div><AiFillHome /></div></button>

<button onClick={()=>handleActivePage('survey')} className='border border-0 bg-transparent p-1 w-25 ' style={{color:activePage==='survey' ? 'black' : '#ACB5BB'}}><div><BsClipboard2CheckFill /></div></button>

<button onClick={()=>handleActivePage('profile')} className='border border-0 bg-transparent p-1 w-25 ' style={{color:activePage==='home' ? 'black' : '#ACB5BB'}}><div><IoPerson /></div></button>

</div>

</div>
  )
}

export default SurveyPage
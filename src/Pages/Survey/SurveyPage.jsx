import React, { useState } from 'react'
import { FaRegBell } from "react-icons/fa";
import { Badge } from '@mui/material';
import InputField from '../../Components/Inputs/InputField';
import { AiFillHome } from "react-icons/ai";
import { IoPerson } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { BsClipboard2CheckFill } from "react-icons/bs";
import { IoMdArrowBack } from "react-icons/io";

const SurveyPage = () => {

    const navigate = useNavigate()

    const [activePage,setActivePage] = useState('survey')


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



  return (
    <div className='h-100 w-100'>
    <div className='survey-page  overflow-auto' style={{height:'93vh',paddingTop:'7vh'}}>
        <div className='d-flex p-1 justify-content-between header'>
        <div className="position-relative w-100" onClick={() => navigate('/dashboard')}>
        <span className="position-absolute left-0">
            <IoMdArrowBack />
        </span>
        <h5 className="text-center">Survey</h5>
        </div>

        </div>


        <div className='p-3 row row-gap-3'>
            <div className='col-6' style={{padding:'0.1rem'}}>
                <InputField text={'First name *'}></InputField>
            </div>

            <div className='col-6' style={{padding:'0.1rem'}}>
                <InputField text={'Last name *'}></InputField>
            </div>

            <div className='col-12'>
                <InputField text={'HQ *'}></InputField>
            </div>

            <div className='col-12'>
                <InputField text={'Date'}></InputField>
            </div>

            <div className='col-6' style={{padding:'0.1rem'}}>
                <InputField text={'No. Drs visited *'}></InputField>
            </div>

            <div className='col-6' style={{padding:'0.1rem'}}>
                <InputField text={'No. of Drs on list *'}></InputField>
            </div>

            <div className='col-6' style={{padding:'0.1rem'}}>
                <InputField text={'No. of days filed works *'}></InputField>
            </div>

            <div className='col-6' style={{padding:'0.1rem'}}>
                <InputField text={'No. of Drs. call *'}></InputField>
            </div>

            <div className='col-6' style={{padding:'0.1rem'}}>
                <InputField text={'Drs. call Average *'}></InputField>
            </div>

            <div className='col-6' style={{padding:'0.1rem'}}>
                <InputField text={'No. of Drs. missed *'}></InputField>
            </div>

            <div className='col-6' style={{padding:'0.1rem'}}>
                <InputField text={'No. Chemist Visited *'}></InputField>
            </div>

            <div className='col-6' style={{padding:'0.1rem'}}>
                <InputField text={'Chemist Call Average *'}></InputField>
            </div>

            <div className='col-6' style={{padding:'0.1rem'}}>
                <InputField text={'Monthly Primary Sale *'}></InputField>
            </div>

            <div className='col-6' style={{padding:'0.1rem'}}>
                <InputField text={'Secondary Sales *'}></InputField>
            </div>

            <div className='col-6' style={{padding:'0.1rem'}}>
                <InputField text={'Closing Stock Value *'}></InputField>
            </div>

            <div className='col-6' style={{padding:'0.1rem'}}>
                <InputField text={'Total POB *'}></InputField>
            </div>

            <div className='col-6' style={{padding:'0.1rem'}}>
                <InputField text={'Payment Collection *'}></InputField>
            </div>

            <div className='col-6' style={{padding:'0.1rem'}}>
                <InputField text={'Returns Goods *'}></InputField>
            </div>

            <div className='col-6' style={{padding:'0.1rem'}}>
                <InputField text={'Returns Expiry *'}></InputField>
            </div>

            <div className='col-6' style={{padding:'0.1rem'}}>
                <InputField text={'Next Month Sales Plan *'}></InputField>
            </div>

            <div className='col-6' style={{padding:'0.1rem'}}>
                <InputField text={'Next month Collection Plan *'}></InputField>
            </div>

            <div className='col-6' style={{padding:'0.1rem'}}>
                <InputField text={'Payment received from HQ *'}></InputField>
            </div>

            <div className='col-12'>
                <InputField text={'Payment received from Manager *'}></InputField>
            </div>

        </div>

        <div className='mt-2'>
            <button className='btn btn-dark btn-sm w-100'>Submit</button>
        </div>


      

    </div>

<div style={{height:'7vh' ,width:'100%'}} className='d-flex justify-content-around rounded shadow-sm mt-2 position-fixed  bottom-0'>
           
<button onClick={()=>handleActivePage('home')} className='border border-0 bg-transparent p-1 w-25' style={{color:activePage==='profile' ? 'black' : '#ACB5BB'}}><div><AiFillHome /></div></button>

<button onClick={()=>handleActivePage('survey')} className='border border-0 bg-transparent p-1 w-25 ' style={{color:activePage==='survey' ? 'black' : '#ACB5BB'}}><div><BsClipboard2CheckFill /></div></button>

<button onClick={()=>handleActivePage('profile')} className='border border-0 bg-transparent p-1 w-25 ' style={{color:activePage==='home' ? 'black' : '#ACB5BB'}}><div><IoPerson /></div></button>

</div>

</div>
  )
}

export default SurveyPage
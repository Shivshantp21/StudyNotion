import React, { useEffect, useState } from 'react'
import CountryCode from "../../data/countrycode.json"
import { apiConnector } from '../../services/apiConnector'
import { contactusEndpoint } from '../../services/apis'
import {useForm} from 'react-hook-form';

const ContactUsForm = () => {

    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
      } = useForm()

    const submitContactForm = async (data) => {
        console.log("Logging Data", data);
        try {
            setLoading(true);
            const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data);
            // const response = { status: "OK" };
            console.log(" Form response ", response);
            setLoading(false);
        }
        catch (error) {
            console.log("Error in contact:", error.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                email: "",
                firstname: "",
                lastname: "",
                message: "",
                phoneNo: "",
            })
        }
    }, [reset, isSubmitSuccessful]);

    return (
        <form onSubmit={handleSubmit(submitContactForm)}>

            <div className='flex flex-col gap-4 justify-center items-center'>
                <div className='flex gap-5 w-[520px] '>
                    {/* firstName */}
                    <div className='flex flex-col gap-4'>
                        <label className='text-richblack-5' htmlFor='firstname'>First Name</label>
                        <input
                            type='text'
                            name='firstname'
                            id='firstname'
                            placeholder='Enter first name'
                            className='bg-richblack-800 w-[250px] h-[40px] px-3 rounded-md text-richblack-200'
                            {...register("firstname", { required: true })}
                        />
                        {
                            errors.firstname && (
                                <span>
                                    Please enter Your name
                                </span>
                            )
                        }
                    </div>

                    {/* lastName */}
                    <div className='flex flex-col gap-4'>
                        <label htmlFor='lastname'>Last Name</label>
                        <input
                            type='text'
                            name='lastname'
                            id='lastname'
                            className='bg-richblack-800 w-[250px] h-[40px] px-3 rounded-md text-richblack-200'
                            placeholder='Enter last name'
                            {...register("lastname")}
                        />

                    </div>

                </div>

                {/* email */}
                <div className='flex flex-col gap-4'>
                    <label htmlFor='email'>Email Address</label>
                    <input
                        type='email'
                        name='email'
                        id='email'
                        className='bg-richblack-800 w-[520px] h-[40px] px-3 rounded-md text-richblack-200'
                        placeholder='Enter email address'
                        {...register("email", { required: true })}
                    />
                    {
                        errors.email && (
                            <span>
                                Please enter your email address
                            </span>
                        )
                    }
                </div>

                {/* phoneNo */}
                <div className='flex flex-col gap-4 w-[520px]'>

                    <label htmlFor='phonenumber'>Phone Number</label>

                    <div className='flex flex-row gap-1'>
                        {/* dropdown */}

                        <select
                            name='dropdown'
                            id="dropdown"
                            className='bg-richblack-800 w-[80px] h-[40px] px-3 rounded-md text-richblack-200'
                            {...register("countrycode", { required: true })}
                        >
                            {
                                CountryCode.map((element, index) => {
                                    return (
                                        <option key={index} value={element.code}>
                                            {element.code} - {element.country}
                                        </option>
                                    )
                                })
                            }
                        </select>

                        <input
                            type='tel'
                            name='phonenumber'
                            id='phonenumber'
                            placeholder='12345 67890'
                            className='bg-richblack-800 h-[40px] px-3 rounded-md text-richblack-200 w-[calc(100%-80px)]'
                            {...register("phoneNo",
                                {
                                    required: { value: true, message: "Please enter Phone Number" },
                                    maxLength: { value: 10, message: "Invalid Phone Number" },
                                    minLength: { value: 8, message: "Invalid Phone Number" }
                                })}
                            style={{
                                appearance: "none",
                                MozAppearance: "textfield",
                                WebkitAppearance: "none"
                            }}
                        />

                    </div>
                    {
                        errors.phoneNo && (
                            <span>
                                {errors.phoneNo.message}
                            </span>
                        )
                    }

                </div>

                {/* message */}
                <div className='flex flex-col gap-4'>
                    <label htmlFor='message'>Message</label>
                    <textarea
                        name='message'
                        id='message'
                        cols="30"
                        className='bg-richblack-800 px-3 w-[520px] rounded-md text-richblack-200'
                        rows="7"
                        placeholder='Enter your message here'
                        {...register("message", { required: true })}
                    />
                    {
                        errors.message && (
                            <span>
                                Please enter your message.
                            </span>
                        )
                    }
                </div>

                <button
                    disabled={loading}
                    type="submit"
                    className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
                    ${ !loading && "transition-all duration-200 hover:scale-95 hover:shadow-none"}  disabled:bg-richblack-500 sm:text-[16px] `}>
                    
                    Send Message
                </button>
            </div>

        </form>
    )
}

export default ContactUsForm

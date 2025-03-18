import React, { useState } from 'react'
import Modals from '../ui/Modals';
import { API } from '../../services';
import { apiConfig } from '../../configs';
import { ToastContainer, toast } from 'react-toastify';
import Validators from '../common/validations/Validator';
import TextInput from '../ui/TextInput';
import Svg from '../ui/Svg';

const rules = {
    'your-name': 'required',
    'your-email': 'required|email',
    'your-subject': 'required',
}

const ContactModal = ({ onClose }) => {
    const initialFormData = {
        'your-name': '',
        'your-email': '',
        'your-subject': '',
        'your-message': '',
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleSubmit = () => {
        const form = new FormData();
        for (const [key, value] of Object.entries(formData)) {
            form.append(String(key), value);
        }

        API.post(apiConfig.submitContact, form)
            .then((response) => {
                toast.success('Form submitted successfully');
                setFormData(initialFormData);
            })
            .catch((error) => {
                toast.error('Form submission error', error);
            })
    };

    const onChange = ({ target: { name, value } }) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <Validators formData={formData} rules={rules}>
            {({ onSubmit, errors }) => {
                return (
                    <>
                        <Modals modalClass={'contact-modal'} id={'contact_modal'} modalLabel={"contact_modalLabel"}>
                            <div className='tpt-150 tpb-100'>
                                <h4 className='tk-degular fontSS leadingSS textdark fw-semibold dmb-20 res-text-white'>
                                    Ready to book a  <span className='textblue res-text-white'> Demo? </span>
                                </h4>
                                <h5 className='tk-degular fontS leadingM textdark fw-normal dmb-30 tmb-35 res-text-white'>
                                    Discover how Zipteam empowers companies to boost organizational agility. Book your demo today and see it in action!
                                </h5>
                                <form className='form-div dmb-30 tmb-15'>
                                    <TextInput
                                        label={'Email'}
                                        type="email"
                                        name="your-email"
                                        placeholder='Email…'
                                        value={formData['your-email']}
                                        onChange={onChange}
                                        error={errors}
                                    />
                                    <TextInput
                                        type="text"
                                        label={'Name'}
                                        name="your-name"
                                        placeholder='Name…'
                                        value={formData['your-name']}
                                        onChange={onChange}
                                        error={errors}
                                    />
                                    <TextInput
                                        type="text"
                                        label={'Subject'}
                                        name="your-subject"
                                        placeholder='Company name…'
                                        value={formData['your-subject']}
                                        onChange={onChange}
                                        error={errors}
                                    />
                                    <button type="button" className='tk-degular fontXX leadingXX text-white d-flex align-items-center justify-content-center btnA btnX rounded-5 mx-auto' onClick={() => onSubmit(handleSubmit)}>
                                        <span>Book a demo</span>
                                        <Svg ButtonArrow />
                                    </button>
                                </form>
                            </div>
                        </Modals>
                        <ToastContainer />
                    </>
                );
            }}
        </Validators>
    )
}

export default ContactModal

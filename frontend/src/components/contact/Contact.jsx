import "./contact.scss";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Oval } from 'react-loader-spinner';
import { FormGroup } from '@mui/material';
import { Input } from '@mui/material';
import TextField from '@mui/material/TextField'
import toast, { Toaster } from 'react-hot-toast';


export default function Contact () {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
   
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const { name, email, message } = formData;

    const [loading, setLoading] = useState(false);

    const onChange = e => setFormData(
        { ...formData, [e.target.name]: e.target.value }
    );
    
    const onSubmit = async (e) => {
        
        e.preventDefault();

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
                
            setLoading(true);

            axios.post(`${process.env.REACT_APP_API_URL}/api/blog/contact/`, {name, email, message }, config)
            .then(res => {

                if (res.status === 200) {
                    setFormData({
                        name: '',
                        email: '',
                        message: ''
                    });
                

                    toast.success('Thank You, your message was sent', {
                    
                        // Styling
                        className: 'Toast-Message',
                        icon: '',
                    
                    })
                }
                    
                setLoading(false);
                window.scrollTo(0, 0);
                    
            })
            .catch(err => {
                toast.success('Error sending message', {
                    
                    // Styling
                    className: 'Toast-Message',
                        icon: '',
                })
              
                setLoading(false);
                window.scrollTo(0, 0);
            })


        } catch (err) {
            console.log(err);
        }
            
        
    };

   

    return (
        <div className="contact" id="contact">
            
            <div className="left">
                
                <div className="Container">
                    <img src="assets/mailcontact.png" alt="" />
                </div>
  
            </div>
            <div className="right">
                <h2>Contact</h2><br/>

                <form className="contact__form" id="contact-form" onSubmit={e => onSubmit(e)}>
                    <FormGroup sx={{
                            
                            width: '40ch',
                        }}
                    > 
                        
                        <Input 
                            className='contact__form__input' 
                            name='name' 
                            type='text' 
                            placeholder='Full Name' 
                            onChange={e => onChange(e)} 
                            value={name} 
                            required 
                        />
                        <br/>
                        <Input 
                            className='contact__form__input' 
                            name='email' 
                            type='email' 
                            placeholder='example@mail.com' 
                            onChange={e => onChange(e)} 
                            value={email} 
                            required 
                        />
                        <br/>
                        <TextField
                            className='contact__form__textarea'
                            name='message'
                            multiline
                            rows={10}
                            placeholder='Message'
                            onChange={e => onChange(e)} 
                            value={message} 
                        />
                    </FormGroup>
                    <br/>
                 
                    <button 
                        className='contact__form__button' 
                        htmltype='submit'
                        disabled={loading}
                        
                    >
                        
                        {loading ? 
                            <div className="loader-message">
                                <Oval 
                                    color={'#424242'}
                                    height={20} 
                                    width={20}
                                /> Sending...
                            </div> 
                            
                            
                             : 'Send'
                        }
                    </button>
                    
                
                </form>
                
               

            </div>

            <Toaster
                position="top-right" 
                reverseOrder={false} 
            />
        </div>
    );
};


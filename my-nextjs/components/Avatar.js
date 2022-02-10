import { useState } from 'react';
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router';
import axios from 'axios';
const Avatar = () =>
{
    const [clickForm, setclickForm] = useState(true);

    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [face, setFace] = useState('');

    const handleclickForm = () =>
    {
        setclickForm(!clickForm);
    }


    const handleSubmit = async (e)=>
    {
        
        alert("Chọn OK để gửi liên hệ.");
        e.preventDefault();
        let contact = 
        {
            key :  Math.random() * 100000,
            email,
            phone,
            face,
        }
        console.log(contact);

        axios.post('http://localhost:5000/api/contacts/post',
            contact)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

        handleclickForm();
    }

    return(
        <div className= {styles.avatarContainer}>
            <img src='/huu.png' className={styles.avatar}/>
            <p>
                Văn Tố Hữu
            </p>
            <button onClick={handleclickForm}>
                Liên hệ
            </button>

            <div className={styles.containerForm} style={{display : clickForm ? 'none' : 'flex'}}>
                <form className={styles.form} onSubmit={handleSubmit} method='post'>
                    <h1>
                        Liên hệ
                    </h1>
                    <div>
                        <p> Email:</p>
                        <input type={'text'} name='email' onChange={(e) => setEmail(e.target.value)} value = {email} required/>
                    </div>
                    <div>
                        <p> Số điện thoại:</p>
                        <input type={'number'} name='number' onChange={(e) => setPhone(e.target.value)} value = {phone} required/>
                    </div>
                    <div>
                        <p> Facebook:</p>
                        <input type={'text'} name='facebook' onChange={(e) => setFace(e.target.value)} value = {face} required/>
                    </div>
                    <input  type={'submit'} value={'Gửi'} required/>
                </form>
            </div>   
        </div>
    );
}
export default Avatar;
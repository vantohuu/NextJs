import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Wheel } from "react-custom-roulette";
import styles from '../styles/Home.module.css'
import Head from 'next/head'
import axios from 'axios';
import { Button, notification } from 'antd';

export default () => {

    let listPrizes = [];
    let sumChance = 0;
    let arrSumChance = [];

    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [countdown, setCountdown] = useState(5);
    const [dataPrizes, setdataPrizes] = useState([]);

    const [clickForm, setclickForm] = useState(true);
    const [clickBtn, setclickBtn] = useState(true);

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [list, setList] = useState([]);

    const [dataUser, setdataUser] = useState([]);

    // xu li khi click vao spinner
    const handleSpinClick = () => {

        // random phan thuong
        let k = Math.floor(Math.random() * sumChance) + 1;
        let newPrizeNumber = 0;
        for (let i = 0; i < dataPrizes.length; i++) {
            if (k <= arrSumChance[i]) {
                newPrizeNumber = i;
                break;
            }
        }

        setPrizeNumber(newPrizeNumber);
        setMustSpin(true);
        setclickBtn(false);
        listPrizes.push(dataPrizes[newPrizeNumber].option);
        console.log(listPrizes.length);
        list.push(dataPrizes[newPrizeNumber].option)
        setList(list);
    };

    // lay cac giai thuong da tao o server dua vao spinner
    const getDataPrizes = async () => {
        let dt = [];
        let response = await fetch('http://localhost:5000/api/prizes',
            {
                method: 'GET',
            });
        dt = await response.json();

        setdataPrizes(dt);
    }
    useEffect(() => { getDataPrizes() }, []);

    // lay thong tin cac tai khoan da nhan thuong
    const getDataUser = async() => {
        let dt = [];
        let response = await fetch('http://localhost:5000/api/user-prize',
            {
                method: 'GET',
            });
        dt = await response.json();
        setdataUser(dt);
    }
    useEffect(getDataUser,[]);

    // kiem tra xem tai khoan da nhan thuong co thoa man dieu kien thoi gian nhan thuong trong ngay hay khong
    const checkPhone = (dt) => {
        let numberphone = dt.find(x => x.phone == phone);
        if (numberphone) {
            console.log(numberphone.createdAt);
            const dphone = new Date(numberphone.createdAt);
            const dnow = Date.now();
            if (dnow - dphone)
            {
                setCountdown(0);
                setclickBtn(false);
                notification.open({
                    message: 'HIHAHIHA',
                    description:
                        `B???n ???? h???t l?????t ch??i trong ng??y h??m nay. Vui l??ng th??? s??? ??i???n tho???i kh??c ho???c ?????i ?????n ng??y h??m sau ????? quay ti???p. `,
                    className: 'custom-class',
                    duration: 10,
                    style: {
                        width: 600,
                    },
                });
            }
            
        } else console.log(dt);
    }

    //khoi tao cac mang de xu li ti le thang cua cac phan thuong
    const createCheckChance = () => {
        for (let i = 0; i < dataPrizes.length; i++) {
            sumChance += dataPrizes[i].chance;
            if (i > 0) {
                arrSumChance[i] = arrSumChance[i - 1] + dataPrizes[i].chance;
            } else arrSumChance[i] = dataPrizes[i].chance;
        }
    }
    createCheckChance();

    // xu li khi submit
    const handleSubmit = async (e) => {

        alert("X??c nh???n.");
        e.preventDefault();
        checkPhone(dataUser);
        setclickForm(false);
    }

    const openNotification = () => {
        notification.open({
            message: 'XIN CH??C M???NG',
            description:
                `B???n ???? quay tr??ng v??o ??  ${dataPrizes[prizeNumber].option}`,
            className: 'custom-class',
            duration: 10,
            style: {
                width: 600,
            },
        });

        if (countdown == 1) {
            let user =
            {
                name,
                phone,
                email,
                list,
            }
            axios.post('http://localhost:5000/api/user-prize/post',
                user)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    };

    return (
        <>
            <div className={styles.containerSpinner}>
                <Head>
                    <title>Ph???n qu?? m??y m???n</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <div align="center" >
                    <h1 className={styles.ttSpinner} >V??NG QUAY MAY M???N D??NH CHO NG?????I MAY M???N</h1>
                    <h1 className={styles.ttSpinner} >B???n c??n {countdown} l?????t</h1>
                    <Wheel
                        mustStartSpinning={mustSpin}
                        prizeNumber={prizeNumber}
                        data={dataPrizes}
                        outerBorderColor={["#f2f2f2"]}
                        outerBorderWidth={[20]}
                        innerBorderColor={["#f2f2f2"]}
                        radiusLineColor={["#dedede"]}
                        radiusLineWidth={[10]}
                        textColors={["#ffffff"]}
                        fontSize={[18]}
                        perpendicularText={[true]}
                        backgroundColors={[
                            "#F22B35",
                            "#F99533",
                            "#24CA69",
                            "#514E50",
                            "#46AEFF",
                            "#9145B7",
                            "#F22B35",
                            "#F99533",
                            "#24CA69",
                            "#514E50",
                            "#46AEFF",
                            "#9145B7",
                            "#F22B35",
                            "#F99533",
                            "#24CA69",
                            "#514E50",
                            "#46AEFF",
                            "#9145B7",
                        ]}
                        onStopSpinning={() => {
                            // let c = countdown;
                            // c = c - 1;
                            setCountdown(countdown - 1);
                            console.log(countdown);
                            setMustSpin(false);
                            openNotification();

                            if (countdown > 1) setclickBtn(true);
                        }}
                    />
                    <button className={styles.btnSpin} onClick={handleSpinClick} style={{ visibility: clickBtn ? "visible" : "hidden" }} >
                        Quay
                    </button>
                </div>


                <div className={styles.containerForm} style={{ display: clickForm ? 'flex' : 'none' }}>
                    <form className={styles.form} onSubmit={handleSubmit} >
                        <h1>
                            Nh???p th??ng tin
                        </h1>
                        <div>
                            <p> H??? v?? t??n:</p>
                            <input type={'text'} name='name' onChange={(e) => setName(e.target.value)} value={name} required />
                        </div>
                        <div>
                            <p> Email:</p>
                            <input type={'text'} name='email' onChange={(e) => setEmail(e.target.value)} value={email} required />
                        </div>

                        <div>
                            <p> S??? ??i???n tho???i:</p>
                            <input type={'number'} name='number' onChange={(e) => setPhone(e.target.value)} value={phone} required />
                        </div>

                        <input type={'submit'} value={'??i ?????n v??ng quay'} />
                    </form>
                </div>
            </div>
        </>
    );
};

import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Avatar from '../components/Avatar';
import AboutMe from '../components/AboutMe';
import { Component, useState } from 'react';
import { BarsOutlined } from '@ant-design/icons';


const Main = () => {
    
    const [toggle, settoggle] = useState(true);
    const handleClick = () => {
        settoggle(!toggle);
    }
    const [bar1, setBar1] = useState(true);
    const [bar2, setBar2] = useState(false);
    const handleClickBar1 = () =>
    {
        setBar1(true);
        setBar2(false);
    }
    const handleClickBar2 = () =>
    {
        setBar1(false);
        setBar2(true);
    }
   
    const Component = () =>
    {
        if (bar1) return (<div><Avatar/></div>);
        if (bar2) return (<div><AboutMe/></div>);
    }
    return (
        <div className={styles.container}>
            <Head>
                <title>Văn Tố Hữu</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <nav className={styles.navigation}>
                <label>vantohuu</label>
                <BarsOutlined className={styles.bars} onClick={handleClick}/>
                <ul style={{ left: toggle ? -700 : 0 }}>
                    <li><p onClick={handleClickBar1} style={{color : bar1 ? 'yellow' : 'white'}}>Home</p></li>
                    <li><p onClick={handleClickBar2} style={{color : bar2 ? 'yellow' : 'white'}}>About me</p></li>
                </ul>
            </nav>
            <div className={styles.component}>
                <Component/>
            </div> 
        </div>
    )
}

export default Main;
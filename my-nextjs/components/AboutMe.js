import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css'

export default function AboutMe() {
    const [n, setn] = useState(0);

    const [dataIf, setdataIf] = useState([]);

    const getDataInfor = async () => {
        let dt = [];
        let response = await fetch('http://localhost:5000/api/accounts',
            {
                method: 'GET',
            });
        dt = await response.json();
        setdataIf(dt);
    }

    useEffect(() => { getDataInfor() }, [n]);

    const [dataPro, setdataPro] = useState([]);

    const getDataProduct = async () => {
        let dt = [];
        let response = await fetch('http://localhost:5000/api/products',
            {
                method: 'GET',
            });
        dt = await response.json();
        setdataPro(dt);
    }

    useEffect(() => { getDataProduct() }, [n]);



    const [clickProject, setclickProject] = useState(true);
    const handleclickProject = () => {
        setclickProject(!clickProject);
    }

    const TempCard = ({ it }) => {
        if (it) {
            return (
                <div className={styles.card}>
                    <img src={'/' + it.img} />
                    <h3>
                        {it.tt}
                    </h3>
                    <p>
                        {it.content}
                    </p>
                </div>
            );
        } else { return (<></>) }
    }

    const Product = ({ it }) => {
        if (it) {
            return (
                <div className={styles.containerProject} style={{ display: clickProject ? 'none' : 'flex' }}>
                    <div className={styles.project}>
                        <p>
                            {it.title}
                        </p>
                        <video width={100} controls autoPlay muted src='\video.mp4' />
                        <div>
                            <p>{it.des}</p>
                            <p>{it.lang}</p>
                            <p>{it.tools}</p>
                        </div>
                        <button onClick={handleclickProject}>
                            Thoát
                        </button>
                    </div>
                </div>
            );
        } else { return (<></>) }
    }


    return (
        <div className={styles.aboutme}>
            <div className={styles.containerCard}>
                <TempCard it={dataIf[0]} />
                <TempCard it={dataIf[1]} />
                <TempCard it={dataIf[2]} />
                <TempCard it={dataIf[3]} />
            </div>
            <Product it = {dataPro[0]}/>
            <button onClick={handleclickProject}>
                Dự án
            </button>

        </div>
    );
};
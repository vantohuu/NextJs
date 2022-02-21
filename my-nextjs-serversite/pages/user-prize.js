import "antd/dist/antd.css";
import { Table } from 'antd';
import { useState, useEffect } from "react";
import axios from 'axios';
import Head from 'next/head'

export default function Data() {

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'List Prize',
      dataIndex: 'list',
      key: 'list',
    },
  ];

  let mdata = [];
  const [data, setdata] = useState([]);

  const getData = async () => {
    let response = await fetch('http://localhost:5000/api/user-prize',
      {
        method: 'GET',
      });
    mdata = await response.json();
    setdata(mdata);
    console.log(mdata);
  }
  useEffect(() => { getData() }, []);

  return (
    <div>
      <Head>
        <title>Server user</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}




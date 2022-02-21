import "antd/dist/antd.css";
import { Table, Button, Space, Modal, Input } from 'antd';
import { useState, useEffect } from "react";
import axios from 'axios';
import Head from 'next/head'

export default function Data() {

  let mdata = [];
  const [n, setn] = useState(parseInt(Math.random() * 100000));
  const [stateEdit, setStateEdit] = useState(false);
  const [stateAdd, setStateAdd] = useState(false);


  const [option, setOption] = useState('');
  const [value, setValue] = useState(0);
  const [chance, setChance] = useState(0);
  const [_id, set_Id] = useState('');
  const [id, setId] = useState(0);
  let prize =
  {
    _id,
    id,
    option,
    value,
    chance,
  }
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Name',
      dataIndex: 'option',
      key: 'option',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
    },
    {
      title: 'Chance',
      dataIndex: 'chance',
      key: 'chance',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => {
        return (
          <Space size="middle">
            <a onClick={() => { onUpdatePrize(record) }}>Update </a>
            <a onClick={() => { onDeletePrize(record) }} > Delete </a>
          </Space>
        )
      },
    },
  ];


  const [data, setdata] = useState([]);
  const getData = async () => {
    let response = await fetch('http://localhost:5000/api/prizes',
      {
        method: 'GET',
      });
    mdata = await response.json();
    setdata(mdata);
    //console.log(mdata);
  }
  useEffect(() => { getData() }, [n]);


  const onUpdatePrize = (record) => {
    set_Id(record._id);
    setId(record.id);
    setStateEdit(true);
  }

  const onAddPrizeOK = async () => {
    await axios.post('http://localhost:5000/api/prizes/post', prize)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    setStateAdd(false);
  }

  const onUpdatePrizeOK = async () => {
    await axios.put('http://localhost:5000/api/prizes/put', prize)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    setStateEdit(false);
  }

  const onDeletePrize = (record) => {
    Modal.confirm({
      title: "Bạn có muốn xóa nó không?",
      onOk: async () => {
        await axios.delete('http://localhost:5000/api/prizes/delete', { data: { id: record._id } })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

        setn(parseInt(Math.random() * 100000));
      }
    })
  }



  return (
    <div>
      <Head>
        <title>Server prize</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Table columns={columns} dataSource={data} />
      <Modal title='Update prize'
        okText='Save'
        cancelText='Cancel'
        onOk={() => { onUpdatePrizeOK(), console.log('OK success'), setn(parseInt(Math.random() * 100000)); }}
        onCancel={() => { setStateEdit(false) }}
        visible={stateEdit}>
        <div>
          <p> Name</p>
          <Input onChange={(e) => { setOption(e.target.value) }} value={option} required />
        </div>
        <div>
          <p> Value</p>
          <Input onChange={(e) => { setValue(e.target.value) }} value={value} type='number' required />
        </div>

        <div>
          <p> Chance</p>
          <Input onChange={(e) => { setChance(e.target.value) }} value={chance} type='number' required />
        </div>

      </Modal>

      <Button type="primary" onClick={() => { setStateAdd(true) }}>Add Prize</Button>

      <Modal title='Add prize'
        okText='Save'
        cancelText='Cancel'
        onOk={() => { onAddPrizeOK(), console.log('ADD: OK success'), setn(parseInt(Math.random() * 100000)); }}
        onCancel={() => { setStateAdd(false) }}
        visible={stateAdd}>
        <div>
          <p> ID</p>
          <Input onChange={(e) => { setId(e.target.value) }} value={id} required />
        </div>
        <div>
          <p> Name</p>
          <Input onChange={(e) => { setOption(e.target.value) }} value={option} required />
        </div>
        <div>
          <p> Value</p>
          <Input onChange={(e) => { setValue(e.target.value) }} value={value} type='number' required />
        </div>

        <div>
          <p> Chance</p>
          <Input onChange={(e) => { setChance(e.target.value) }} value={chance} type='number' required />
        </div>

      </Modal>
    </div>
  );
}




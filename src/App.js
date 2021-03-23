import { Row, Col, Form, Input, Button, message } from 'antd';
import './App.css';
import Header from './components/Header';
import { useState } from 'react';
import axios from 'axios';

export default function App() {
  const [loading, setLoading] = useState(false);

  const handleSend = (val) => {
    setLoading(true);
    axios.post(process.env.REACT_APP_API, {
      email: val.email,
      phone: val.phone.replace(/^0+/, ''),
      wallet: val.wallet,
      link: val.link
    })
    .then(_=> {
      message.success('Your request has been submited!');
      setLoading(false);
    })
  }

  return (
    <>
      <Header/>
      <div className="App">
        <div className='app__container'>
          <Row justify='center'>
            <p className='app__title'>Request Testnet Token</p>
            <Form onFinish={handleSend}>
              <Form.Item 
                name='email' 
                rules={[
                  { required: true, message: 'Please input your Email!' },
                  { type: 'email', message: 'The input is not valid E-mail!'}
                ]}
              >
                <Input placeholder='Email'/>
              </Form.Item>
              <Form.Item 
                name='phone' 
                rules={[{ required: true, message: 'Please input your Phone Number!' }]}
              >
                <Input placeholder='Phone Number'/>
              </Form.Item>
              <Form.Item 
                name='wallet' 
                rules={[{ required: true, message: 'Please input your Wallet Address!' }]}
              >
                <Input placeholder='Wallet Address'/>
              </Form.Item>
              <Form.Item 
                name='link'
              >
                <Input placeholder='Social Link'/>
              </Form.Item>
              <Form.Item>
                <Button block htmlType='submit' loading={loading}>Send Testnet SEL</Button>
              </Form.Item>
            </Form>
          </Row>
        </div>
      </div>
    </>
  );
}
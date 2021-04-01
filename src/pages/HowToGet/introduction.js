import { Row, Col, Table, Steps, Button, Form, Input } from 'antd'
import { useState } from 'react'
import { ReactComponent as PIC } from '../../assets/pic.svg'
import axios from 'axios'
import { useHistory } from 'react-router'

export default function Introduction() {
  const history = useHistory();
  const { Step } = Steps;
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);
  const dataSource = [
    {
      key: '1',
      name: 'Airdrop',
      age: 'SEL',
      address: '%',
    },
    {
      key: '2',
      name: '1',
      age: '7,539,822',
      address: '0.24',
    },
    {
      key: '3',
      name: '2',
      age: '6,597,345',
      address: '0.21',
    },
    {
      key: '4',
      name: '3',
      age: '5,654,867',
      address: '0.18',
    },
    {
      key: '5',
      name: '4',
      age: '4,712,389',
      address: '0.15',
    },
    {
      key: '6',
      name: '5',
      age: '3,759,911',
      address: '0.12',
    },
    {
      key: '7',
      name: '6',
      age: '3,141,593',
      address: '0.10',
    },
  ];
  
  const columns = [
    {
      title: 'To',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '31,415,927',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Percentages',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  const onTwitter = () => {
    window.open('https://twitter.com/intent/tweet?url=https://twitter.com/selendraorg', '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
  }

  const onFacebook = (url, title, descr, image, winWidth, winHeight) => {
    const winTop = (window.screen.height / 2) - (420 / 2);
    const winLeft = (window.screen.width / 2) - (420 / 2);
    window.open('https://www.facebook.com/sharer/sharer.php?u=https://www.facebook.com/selendraio?s=100&p[title]=' + title + '&p[summary]=' + descr + '&p[url]=' + url + '&p[images][0]=' + image, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + 650 + ',height=' + 550);
  }

  const onTelegram = () => {
    window.open('https://t.me/selendraorg', '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
  }

  const onSubmit = (val) => {
    setLoading(true);
    axios.post('https://sheet.best/api/sheets/2b4de27a-7467-4f5a-af30-10ce0f135426', {
      email: val.email,
      phone: val.phone.replace(/^0+/, ''),
      wallet: val.wallet,
      link: val.link
    })
    .then(_=> {
      history.push('/success')
      setLoading(false);
    })
  }

  const steps = [
    {
      title: 'Introduction',
      content: 
        <Row align='middle' style={{height: '70vh'}}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <p className='intro__subTitle'>Introduction</p>
            <p className='intro__des'>We will conduct airdrop 6 sessions of amount 1% of SEL total issue. The first event will take place during Khmer New Year. Airdrop event will look like in the table.</p>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Table dataSource={dataSource} columns={columns} pagination={false}/>
          </Col>
        </Row>,
    },
    {
      title: 'Create BEP-20 Wallet',
      content: 
        <Row align='middle' style={{minHeight: '70vh'}}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <p className='intro__subTitle'>Create BEP-20 Wallet</p>
            <p className='intro__des'>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p>
            <div className='intro__btn'>
              <Button>Create BEP-20 Wallet</Button>
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Row justify='center'>
              <PIC style={{marginLeft: '4.4rem'}} className='about__pic' />
            </Row>
          </Col>
        </Row>
      ,
    },
    {
      title: 'Share Link',
      content: 
        <Row align='middle' style={{minHeight: '70vh'}}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <p className='intro__subTitle'>Share Link To Social Media</p>
            <div className='intro__btnShare'>
              <Button onClick={onTwitter}>Post In Twitter</Button>
              <Button onClick={onFacebook}>Post In Facebook</Button>
              <Button onClick={onTelegram}>Join Telegram Community</Button>
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Row justify='center'>
              <PIC style={{marginLeft: '4.4rem'}} className='about__pic' />
            </Row>
          </Col>
        </Row>
      ,
    },
    {
      title: 'Claim Airdrop',
      content: 
        <Row align='middle' style={{minHeight: '70vh'}}>
          <Col xs={0} sm={0} md={24} lg={12} xl={12}>
            <PIC />
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <p className='intro__subTitle'>Please Field The Form</p>
            <br />
            <Form className='intro__input' onFinish={onSubmit}>
              <Form.Item name='email'>
                <Input placeholder="Email"/>
              </Form.Item>
              <Form.Item name='phone'>
                <Input placeholder="Phone Number"/>
              </Form.Item>
              <Form.Item name='wallet'>
                <Input placeholder="Wallet Address"/>
              </Form.Item>
              <Form.Item name='link'>
                <Input placeholder="Social Link(Optional)"/>
              </Form.Item>
              <Form.Item>
                <Button htmlType='submit' loading={loading}>Claim Airdrop</Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>,
    },
  ];

  const onChange = (current) => {
    setCurrent(current)
  }

  return (
    <div className='intro'>
      <div className='intro__container'>
        <Steps current={current} onChange={onChange} style={{padding: '2rem 0'}}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">
          <p className='intro__title'>Step To Claim Airdrop</p>
          {steps[current].content}
        </div>
      </div>
    </div>
  )
}
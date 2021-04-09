import { Row, Col, Table, Steps, Button, Form, Input } from 'antd'
import { useRef, useState } from 'react'
import ReCAPTCHA from "react-google-recaptcha";
import { ReactComponent as PIC } from '../../assets/pic.svg'
import axios from 'axios'
import { useHistory } from 'react-router'
import Next from '../../assets/next.png'
import Back from '../../assets/back.png'
import { GoogleSpreadsheet } from "google-spreadsheet";

export default function Introduction() {
  const _reCaptchaRef = useRef();
  const history = useHistory();
  const { Step } = Steps;
  const [isVerified, setIsVerified] = useState(false);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);
  const handleChange = (value) => {
    // if value is null recaptcha expired
    if (value !== null) { 
      setIsVerified(true) 
    } else {
      setIsVerified(false)
    }
  };
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };
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
      datetime: 'April 2021'
    },
    {
      key: '3',
      name: '2',
      age: '6,597,345',
      address: '0.21',
      datetime: 'July 2021'
    },
    {
      key: '4',
      name: '3',
      age: '5,654,867',
      address: '0.18',
      datetime: 'October 2021'
    },
    {
      key: '5',
      name: '4',
      age: '4,712,389',
      address: '0.15',
      datetime: 'January 2022'
    },
    {
      key: '6',
      name: '5',
      age: '3,759,911',
      address: '0.12',
      datetime: 'April 2022'
    },
    {
      key: '7',
      name: '6',
      age: '3,141,593',
      address: '0.10',
      datetime: 'July 2022'
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
    {
      title: 'DateTime',
      dataIndex: 'datetime',
      key: 'datetime',
    },
  ];

  const shareMSG = 'Follow Selendra and get some $SEL for free. Share  https://twitter.com/selendraorg to get some more $SEL. Claim it at https://selendra.org/airdrop';
  const onTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=https%3A%2F%2Fselendra.org/airdrop%2F&text=${shareMSG}`, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
  }

  const onFacebook = () => {
    window.open(`http://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fselendra.org/airdrop&quote=${shareMSG}`, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600')
  }

  const onTelegram = () => {
    window.open('https://t.me/selendraorg', '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
  }

  const onSubmit = async(val) => {
    const SPREADSHEET_ID = process.env.REACT_APP_SPREADSHEET_ID;
    const SHEET_ID = process.env.REACT_APP_SHEET_ID;
    const CLIENT_EMAIL = process.env.REACT_APP_CLIENT_EMAIL;
    const PRIVATE_KEY = process.env.REACT_APP_PRIVATE_KEY.replace(/\\n/g, '\n')
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
    setLoading(true);
    await doc.useServiceAccountAuth({
      client_email: CLIENT_EMAIL,
      private_key: PRIVATE_KEY,
    });
    // loads document properties and worksheets
    await doc.loadInfo();

    const sheet = doc.sheetsById[SHEET_ID];
    const result = await sheet.addRow({
      Email: val.email, 
      Phone: val.phone, 
      Wallet: val.wallet, 
      Link: val.link
    })
    .then(_=> {
      history.push('/success');
      setLoading(false);
    })
    .catch(e => {
      console.error('Error: ', e);
    })
  }

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: 'Introduction',
      content: 
        <Row align='middle' style={{minHeight: '70vh'}}>
          <Col xs={24} sm={24} md={24} lg={11} xl={11}>
            <p className='intro__subTitle'>Introduction</p>
            <p className='intro__des'>We will conduct 3 airdrops, each drop will have 6 sessions of 1% of SEL total issue. Each session will last as long as 3 month. The first event will take place during Khmer New Year. Airdrop event will look like in the table.</p>
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
            <p className='intro__subTitle'>Share On Social Media</p>
            <div className='intro__btnShare'>
              <Button onClick={onTwitter}>Post in twitter</Button>
              <Button onClick={onFacebook}>Post in facebook</Button>  
              <Button onClick={onTelegram}>Join telegram community</Button>
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
              <Form.Item name='email' rules={[{ type: 'email' }, { required: true }]}>
                <Input placeholder="Email"/>
              </Form.Item>
              <Form.Item name='phone' rules={[{ required: true }]}>
                <Input placeholder="Phone Number"/>
              </Form.Item>
              <Form.Item name='wallet' rules={[{ required: true }]}>
                <Input placeholder="Wallet Address"/>
              </Form.Item>
              <Form.Item name='link'>
                <Input placeholder="Social Link(Optional)"/>
              </Form.Item>
              { isVerified &&
                <Form.Item>
                  <Button htmlType='submit' loading={loading}>Claim Airdrop</Button>
                </Form.Item>
              }
            </Form>
            <ReCAPTCHA
              style={{ display: "inline-block" }}
              ref={_reCaptchaRef}
              sitekey={process.env.REACT_APP_SITE_KEY}
              onChange={handleChange}
            />
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
        <Row>
          <Col xs={0} sm={0} md={24} lg={24} xl={24}>
            <Steps current={current} onChange={onChange} style={{padding: '2rem 0'}}>
              {steps.map(item => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>
          </Col>
        </Row>
        <div className="steps-content">
          <p className='intro__title'>Step To Claim Airdrop</p>
          {steps[current].content}
          <div style={{cursor: 'pointer'}} onClick={() => (current + 1)}></div>
        </div>
        <div className="steps-action">
          <Row align='middle'>
            <Col span={12}>
              {current > 0 && (
                <Button type='link' onClick={() => prev()}>
                  <img src={Back} alt='back' style={{marginBottom: '4px'}} /><span style={{fontSize: '16px', fontWeight: '700', marginLeft: '10px'}}>Previous</span>
                </Button>
              )}
            </Col>
            <Col span={12}>
              <Row justify='end'>
                {current < steps.length - 1 && (
                  <Button type='link' onClick={() => next()}>
                    <span style={{fontSize: '16px', fontWeight: '700', marginRight: '10px'}}>Next</span><img src={Next} alt='next' />
                  </Button>
                )}
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}
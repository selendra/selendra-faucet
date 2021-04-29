import { useRef, useState } from 'react';
import { Row, Col, Steps, Button, Form, Input, Radio, message } from 'antd';
import { ShareAltOutlined } from '@ant-design/icons'
import ReCAPTCHA from "react-google-recaptcha";
import { useHistory, useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';
import { GoogleSpreadsheet } from "google-spreadsheet";
import { ethers } from 'ethers';
import {Helmet} from "react-helmet";

import Next from '../assets/next.png';
import Back from '../assets/back.png';
import ShareOnSocial from '../assets/share.png';
import CreateWallet from '../assets/createwallet.png';
import Crypto from '../assets/Crypto.png';
import Airdrop1 from '../assets/airdrop1.png';
import Airdrop2 from '../assets/airdrop2.png';
import Airdrop3 from '../assets/airdrop3.png';
import { ReactComponent as Facebook } from '../assets/cfacebook.svg';
import { ReactComponent as Twitter } from '../assets/ctwitter.svg';
import { ReactComponent as Telegram } from '../assets/ctelegram.svg';

export default function Claim() {
  let query = useQuery();
  const _reCaptchaRef = useRef();
  const history = useHistory();
  const { Step } = Steps;
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(0);
  const [value, setValue] = useState(1);
  const [address, setAddress] = useState('');

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const twelveDigit = (str) => {
    return str.slice(-12);
  }

  const onChangeRadio = (e) => {
    setValue(e.target.value);
  };
  
  const handleChange = (value) => {
    // if value is null recaptcha expired
    if (value !== null) { 
      setIsVerified(true)
    } else {
      setIsVerified(false)
    }
  };

  const shareMSG = 'Follow Selendra and get free $SEL tokens. Share twitter.com/selendraorg to get more $SEL. Claim it at airdrop.selendra.org. Join t.me/selendraorg to connect with others in the community. #Selendra #Blockchain';
  const onTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=https%3A%2F%2Fairdrop.selendra.org%2F&text=${shareMSG}`, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
  }

  const onFacebook = () => {
    window.open(`http://www.facebook.com/sharer.php?u=http%3A%2F%2Fairdrop.selendra.org&quote=${shareMSG}`, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600')
  }

  const onTelegram = () => {
    window.open('https://t.me/selendraorg', '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
  }

  const onSubmit = async(val) => {
    const SPREADSHEET_ID = process.env.REACT_APP_SPREADSHEET_ID;
    const SHEET_ID = process.env.REACT_APP_SHEET_ID;
    const CLIENT_EMAIL = process.env.REACT_APP_CLIENT_EMAIL;
    const PRIVATE_KEY = process.env.REACT_APP_PRIVATE_KEY.replace(/\\n/g, '\n');

    const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
    setLoading(true);
    await doc.useServiceAccountAuth({
      client_email: CLIENT_EMAIL,
      private_key: PRIVATE_KEY,
    });
    // loads document properties and worksheets
    await doc.loadInfo();

    const isEtherAddress = ethers.utils.isAddress(val.wallet);
    if(!isEtherAddress) {
      setLoading(false);
      return message.error('Look like wallet address not valid!');
    } 

    const sheet = doc.sheetsById[SHEET_ID];
    await sheet.addRow({
      Email: val.email, 
      Phone: val.phone, 
      Wallet: val.wallet, 
      Link: val.link,
      Referralid: query.get("ref")
    })
    .then(_=> {
      history.push('/success');
      setLoading(false);
    })
    .catch(err => {
      console.error('Error: ', err);
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
          <Col xs={24} sm={24} md={24} lg={10} xl={10}>
            <p className='intro__subTitle'>Introduction</p>
            <p className='intro__des'>We will conduct 3 airdrops, each drop will have 6 sessions of 31,415,927 of SEL tokens. Each session will last as long as 3 months. The first event will take place during Khmer New Year of the year 2021. Airdrop event will look like in the table.</p>
          </Col>
          <Col xs={24} sm={24} md={24} lg={{span:12, offset: 1}} xl={{span:12, offset: 1}}>
            <Row justify='center'>
              <Radio.Group onChange={onChangeRadio} value={value}>
                <Radio value={1} style={{color: '#fff'}}>Stage1</Radio>
                <Radio value={2} style={{color: '#fff'}}>Stage2</Radio>
                <Radio value={3} style={{color: '#fff'}}>Stage3</Radio>
              </Radio.Group>
              <div style={{paddingBottom: '10px'}}/>
              {value === 1 && (
                <img src={Airdrop1} className='about__pic airdrop'/>
              )}
              { value === 2 && (
                <img src={Airdrop2} className='about__pic airdrop'/>
              )}
              { value === 3 && (
                <img src={Airdrop3} className='about__pic airdrop'/>
              )}
            </Row>
          </Col>
        </Row>,
    },
    {
      title: 'Create BEP-20 Wallet',
      content: 
        <Row align='middle' style={{minHeight: '70vh'}}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <p className='intro__subTitle'>Create BEP-20 Wallet</p>
            <p className='intro__des'>To recived the airdrop you need to have a Selendra BEP-20 wallet. Our Selendra airdrop is performing at Binace Smart chain. Binance Smart Chain has a BEP20 token standard that functions similarly to Ethereum’s ERC20 standard. BEP20 is a developer-friendly token standard that allows anyone to deploy fungible digital currencies or tokens on Binance Smart Chain.</p>
            <p className='intro__des'>The SEL BEP-20 token will be swapped for SEL native token when Selendra mainnet launches. The swap will be at 1:1 ratio. There will be nothing change on the value.</p>
            <div className='intro__btn'>
              <Button>
                <NavLink to='/createwallet' target="_blank">
                Create BEP-20 Wallet
                </NavLink>
              </Button>
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Row justify='center'>
              <img src={CreateWallet} className='about__pic'/>
            </Row>
          </Col>
        </Row>
      ,
    },
    // {
    //   title: 'Share On Social', 
    //   content: 
    //     <Row align='middle' style={{minHeight: '70vh'}}>
    //       <Col xs={24} sm={24} md={24} lg={12} xl={12}>
    //         <p className='intro__subTitle'>Share On Social Media</p>
    //         <div className='intro__btnShare'>
    //           <Button onClick={onTwitter}>Post in twitter</Button>
    //           <Button onClick={onFacebook}>Post in facebook</Button>  
    //           <Button onClick={onTelegram}>Join telegram community</Button>
    //         </div>
    //         <p>Note: Join Selendra community will get extra 5 $SEL, Each unique link shared will get extra 5 $SEL, Make Youtube video about Selendra will get +50 $SEL</p>
    //       </Col>
    //       <Col xs={24} sm={24} md={24} lg={12} xl={12}>
    //         <Row justify='center'>
    //           <img src={ShareOnSocial} className='about__pic'/>
    //         </Row>
    //       </Col>
    //     </Row>
    //   ,
    // },
    {
      title: 'Claim Airdrop',
      content: 
        <Row align='middle' style={{minHeight: '70vh'}}>
          <Col xs={0} sm={0} md={24} lg={12} xl={12}>
            <img src={Crypto} className='about__pic'/>
          </Col>
          <Col xs={24} sm={24} md={24} lg={{span: 11, offset: 1}} xl={{span: 11, offset: 1}}>
            <p className='intro__subTitle'>Field the form with your wallet to receive your $SEL</p>
            <br />
            <Form className='intro__input'  layout='vertical' onFinish={onSubmit}>
              <Form.Item name='email' rules={[{ type: 'email' }, { required: true }]}>
                <Input placeholder="Email (get +5 $SEL)"/>
              </Form.Item>
              <Form.Item name='phone' rules={[{ required: true }]}>
                <Input placeholder="Phone Number (get +5 $SEL)"/>
              </Form.Item>
              <Form.Item name='wallet' rules={[{ required: true }]}>
                <Input 
                  placeholder="Wallet Address (0xe0e5c149b9cdf9d2279b6ddfda9bc0a4a975285c)"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                />
              </Form.Item>
              <NavLink to='/createwallet' style={{padding: '4px'}}>Get Wallet (each address will get 100 $SEL)</NavLink>
              <Form.Item name='link'>
                <Input placeholder="Social Link(Optional)"/>
              </Form.Item>
              { query.get("ref") !== null && (
              <Form.Item name='referral' label='referral ID:'>
                <Input placeholder={query.get("ref")} disabled/>
              </Form.Item>
              )}
              {/* <NavLink to={'/invitation?ref=' + twelveDigit(address)} target="_blank">
                <div className='invite__btn'>
                  <Button icon={<ShareAltOutlined />}>Invite Now</Button>
                </div>
              </NavLink> */}
              <p style={{color: '#fff', paddingTop: '10px', fontSize: '16px'}}>Share:</p>
              <Row>
                <Twitter style={{cursor: 'pointer'}} onClick={onTwitter} />
                <Facebook style={{cursor: 'pointer', margin: '0 10px'}} onClick={onFacebook} />
                <Telegram style={{cursor: 'pointer'}} onClick={onTelegram} />
              </Row>
              <p style={{color: '#fff', paddingTop: '10px'}}>Notes: shared link of (twitter, linkedin, facebook) +5 $SEL each, YouTube video at least 30 second +50 $SEL, per each approved video.</p>
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
    setCurrent(current);
  }

  return (
    <div className='intro'>
      <Helmet>
        <title>Claim $SEL</title>
        <meta name="description" content="Create wallet and claim $SEL together" />
        <meta property="og:image" content="https://user-images.githubusercontent.com/38589050/116567208-9dbf8c80-a931-11eb-91f1-355b4c0805b1.png" />
      </Helmet>
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
          {steps[current].content}
          <div style={{cursor: 'pointer'}} onClick={() => (current + 1)}></div>
        </div>
        <div className="steps-action">
          <Row align='middle'>
            <Col span={12} style={{paddingTop: '10px'}}>
              {current > 0 && (
                <Button type='link' onClick={() => prev()}>
                  <img src={Back} alt='back' style={{marginBottom: '4px'}} /><span style={{fontSize: '16px', fontWeight: '700', marginLeft: '10px'}}>Previous</span>
                </Button>
              )}
            </Col>
            <Col span={12} style={{paddingTop: '10px'}}>
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
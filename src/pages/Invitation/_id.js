import { Row, Col, Card, Input, Button, message, Spin } from 'antd';
import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ShareOnSocial from '../../assets/share.png';
import { ethers } from 'ethers';
import { Helmet } from "react-helmet";
import { GoogleSpreadsheet } from "google-spreadsheet";

import { ReactComponent as Facebook } from '../../assets/cfacebook.svg';
import { ReactComponent as Twitter } from '../../assets/ctwitter.svg';
import { ReactComponent as LinkedIn } from '../../assets/clinkedin.svg';
import { ReactComponent as Telegram } from '../../assets/ctelegram.svg';
import { ReactComponent as Copy } from '../../assets/copy.svg';

function Invitation() {
  const SPREADSHEET_ID = process.env.REACT_APP_SPREADSHEET_ID;
  const SHEET_ID = process.env.REACT_APP_SHEET_ID;
  const CLIENT_EMAIL = process.env.REACT_APP_CLIENT_EMAIL;
  const PRIVATE_KEY = process.env.REACT_APP_PRIVATE_KEY.replace(/\\n/g, '\n');
  const cardStyle = {
    width: '100%', 
    background: '#1A2F3C',
    border: 'none',
    borderRadius: '8px'
  }
  const [address, setAddress] = useState('');
  const [allAddress, setAllAddress] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageLoad, setPageLoad] = useState(true);

  const LoadValue = async() => {
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
    await doc.useServiceAccountAuth({
      client_email: CLIENT_EMAIL,
      private_key: PRIVATE_KEY,
    });
    await doc.loadInfo();
    const sheet = doc.sheetsById[0];
    const rows = await sheet.getRows();
    setAllAddress(rows);
    setPageLoad(false);
  }

  useEffect(() => {
    LoadValue();
  }, [])

  const onCopy = () => {
    /* Get the text field */
    var copyText = document.getElementById("receive__wallet");
    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/
    /* Copy the text inside the text field */
    document.execCommand("copy");
    /* Alert the copied text */
    alert("Copied the text: " + copyText.value);
  }

  const twelveDigit = (str) => {
    return str.slice(-12);
  }

  const refLink = `${window.location.protocol}//${window.location.hostname}${ window.location.port ? ':' : ''}${ window.location.port ? window.location.port : ""}/claim-$sel?ref=${twelveDigit(address)}`

  const handleGetRef = () => {
    if(!address) return message.error('wallet address is required!');
    if(!(ethers.utils.isAddress(address))) return message.error('Look like wallet address not valid!');
    let single = allAddress.filter((obj) => {
      if(obj.Wallet === address){
        return true;
      } 
      return false;
    });
    
    if(single.length === 0) return message.error('Look like you not submit the form yet!');
    setLoading(true);
    setTimeout(() => {
      setVisible(true);
      setLoading(false);
    }, 1000);
  }

  const shareMSG = `Join me to get more Selendra $SEL token airdrop!. Just click ${refLink} to claim your tokens!. Connect with us @ t.me/selendraorg   http://twitter.com/selendraorg. %23Selendra %23Blockchain %23SmartContract %23OpenSource`;
  const onTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${refLink}&text=${shareMSG}`, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
  }

  const onFacebook = () => {
    window.open(`http://www.facebook.com/sharer.php?u=${refLink}&quote=${shareMSG}`, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600')
  }

  const onLinkedin = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.protocol}//${window.location.hostname}${ window.location.port ? ':' : ''}${ window.location.port ? window.location.port : ""}/claim-$sel?ref%3D${twelveDigit(address)}`, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600')
  }

  const onTelegram = () => {
    window.open(`https://t.me/share/url?url=${refLink}&text=${shareMSG}`, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600')
  }

  if(pageLoad) {
    return (
      <div style={{width: '100vw', display: 'flex', justifyContent: 'center'}}>
        <Spin />
      </div>
    )
  }

  return (
    <div className='intro'>
      <Helmet>
        <title>Invite Friends</title>
        <meta name="description" content="Invite friends and earn $SEL together" />
        <meta property="og:image" content="https://user-images.githubusercontent.com/38589050/116515221-2f110d80-a8f6-11eb-8400-7a9c758af183.png" />
      </Helmet>
      <div className='intro__container'>
        <Row align='middle' style={{minHeight: '70vh'}}>
          <Col xs={24} sm={24} md={24} lg={11} xl={11}>
            <p className='intro__subTitle'>Invite Friends. Earn $SEL Together</p>
            <p style={{color: '#4680a3', fontSize: '18px'}}>Earn up to 3 $SEL every time your friends use your referral id</p>
            <div style={{padding: '1rem 0'}}/>
            { !visible && (
            <div>
              <p style={{color: '#4680a3', fontSize: '18px'}}>Field your wallet address to get referral link :</p>
              <div className='intro__input'>
                <Input placeholder='wallet address (SEL address only)' value={address} onChange={e => setAddress(e.target.value)} />
              </div>
              <div style={{padding: '0.6rem 0'}}/>
              <div className='invite__getRef'>
                <Button loading={loading} onClick={handleGetRef}>Get Referral</Button>
              </div>
            </div>
            )}
            <div style={{padding: '1rem 0'}}/>
            { visible && (
            <Row>
              <Card style={cardStyle}>
                <p className='ref__title'>Share on social:</p><br/>
                <Row>
                  <Twitter style={{cursor: 'pointer'}} onClick={onTwitter} />
                  <Facebook style={{cursor: 'pointer', margin: '0 10px'}} onClick={onFacebook} />
                  <LinkedIn style={{cursor: 'pointer'}} onClick={onLinkedin} />
                  <Telegram style={{cursor: 'pointer', margin: '0 10px'}} onClick={onTelegram} />
                </Row>
                <div style={{padding: '1rem 0'}}/>
                <Row>
                  <Col span={12}> 
                    <p className='ref__title'>Default Link:</p>
                  </Col>
                  <Col span={12}>
                    <Row>
                      <p className='ref__id'>
                        {refLink} 
                        <input type="text" id="receive__wallet" value={refLink} />
                      </p>
                      <Copy onClick={onCopy} style={{color: '#fff', cursor: 'pointer'}}/>
                    </Row>
                  </Col>
                </Row>
                <div style={{padding: '1rem 0'}}/>
                <Row>
                  <Col span={12}>
                    <p className='ref__title'>You Receive</p><br/>
                    <p className='ref__id'>+3 $SEL</p>
                  </Col>
                  <Col span={12}>
                    <p className='ref__title'>Friend Receive</p><br/>
                    <p className='ref__id'>+3 $SEL</p>
                  </Col>
                </Row>
              </Card>
            </Row>
            )}
          </Col>
          <Col xs={24} sm={24} md={24} lg={{span:12, offset:1}} xl={{span:12, offset:1}}>
            <Row justify='center'>
              <img src={ShareOnSocial} className='about__pic'/>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Invitation;
import { 
  useHistory,
  useLocation
} from "react-router-dom";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { ethers } from 'ethers';
import { Row, Col, Card, message } from 'antd';
import { NavLink } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";
import { useRef, useState } from 'react';
import Crypto from '../../assets/Crypto.png';
import ShareOnSocial from '../../assets/share.png';

function Invitation() {
  const cardStyle = {
    width: '100%', 
    background: '#1A2F3C',
    border: 'none',
    borderRadius: '8px'
  }
  const history = useHistory();
  const _reCaptchaRef = useRef();
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  let query = useQuery();

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const handleChange = (value) => {
    // if value is null recaptcha expired
    if (value !== null) { 
      setIsVerified(true)
    } else {
      setIsVerified(false)
    }
  };
  {/* id: {query.get("ref")} */}
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
      Link: val.link
    })
    .then(_=> {
      history.push('/success');
      setLoading(false);
    })
    .catch(err => {
      console.error('Error: ', err);
    })
  }

  return (
    <div className='intro'>
      <div className='intro__container'>
        <Row align='middle' style={{minHeight: '70vh'}}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <p className='intro__subTitle'>Invite Friend. Earn $SEL Together</p>
            <p style={{color: '#4680a3', fontSize: '18px'}}>Earn up to 5 $SEL every time your friends use your referral id</p>
            <div style={{padding: '1rem 0'}}/>
            <Row>
              <Col span={12}>
                <p className='ref__title'>Default Referral ID:</p>
              </Col>
              <Col span={12}>
                <p className='ref__id'>{query.get("ref")}</p>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <p className='ref__title'>Default Link:</p>
              </Col>
              <Col span={12}>
                <p className='ref__id'>{`${window.location.protocol}//${window.location.hostname}:${ window.location.port ?  window.location.port : ""}/claim-$sel?ref=${query.get("ref")}`}</p>
              </Col>
            </Row>
            <div style={{padding: '1rem 0'}}/>
            <Row>
              <Card style={cardStyle}>
                <Row>
                  <Col span={12}>
                    <p className='ref__title'>You Receive</p><br/>
                    <p className='ref__id'>+5 $SEL</p>
                  </Col>
                  <Col span={12}>
                    <p className='ref__title'>Friend Receive</p><br/>
                    <p className='ref__id'>0 $SEL</p>
                  </Col>
                </Row>
              </Card>
            </Row>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Row justify='center'>
              <img src={ShareOnSocial} className='about__pic'/>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Invitation

import { Row, Col, Button } from 'antd';
import { ReactComponent as PIC } from '../assets/pic.svg'
import { NavLink } from 'react-router-dom';

export default function CreateWallet() {
  return (
    <Row align='middle' style={{minHeight: '70vh'}}>
      <Col xs={24} sm={24} md={24} lg={12} xl={12}>
        <p className='intro__subTitle'>How to Install and Create an Selendra Metamask Wallet Account</p>
        <p className='intro__des'>Get Started:</p>
        <div className='intro__btn'>
          <Button style={{height: '70px'}}>
            <a href='https://github.com/selendra/Selendra-BEP20/blob/main/docs/03-How-to-Get-BEP20-Address-On-Bitriel.md' target="_blank">
              How to Get Selendra BEP-20 wallet in Bitriel wallet
            </a>
          </Button>
        </div>
        <div className='intro__btn'>
          <Button style={{height: '70px'}}>
            <a href='https://github.com/selendra/Selendra-BEP20/blob/main/docs/01-install-metamask-on-smartphone.md' target="_blank">
            How to install Metamask on smartphone.
            </a>
          </Button>
        </div>
      </Col>
      <Col xs={24} sm={24} md={24} lg={12} xl={12}>
        <Row justify='center'>
          <PIC style={{marginLeft: '4.4rem'}} className='about__pic' />
        </Row>
      </Col>
    </Row>
  )
}
import {Row, Col, Button} from 'antd'
import { ReactComponent as PIC } from '../assets/pic.svg'
import { NavLink } from 'react-router-dom'

export default function About() {
  return (
    <div className='about'>
      <div className='about__container'>
        <Row align='middle' style={{minHeight: '80vh'}}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <p className='about__title'>SELENDRA</p>
            <p className='about__titlemd'>Air Drop</p>
            <div className='about__des'>
              <p>Selendra is a multi-sharding blockchain network built with Substrate that focuses on developability for developers to launch their applications on blockchain, take advantage of tokenization for platform their ecosystem expansion and users’ incentivization mechanism.</p>
            </div>
            <div className='about__btn'>
              <Button>
                <NavLink to='/claimairdrop'>Claim $SEL here</NavLink>
              </Button>
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Row justify='center'>
              <PIC style={{marginLeft: '4.4rem'}} className='about__pic' />
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  )
}
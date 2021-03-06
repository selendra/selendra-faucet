import { useState } from 'react'
import { Row, Col, Button } from 'antd'
import { NavLink } from 'react-router-dom'
import AboutUs from '../components/About'
import Artwork from '../assets/artwork.png'
import { Helmet } from 'react-helmet'

export default function About() {
  const [isReadmore, setIsReadmore] = useState(false);

  return (
    <div className='about'>
      <Helmet>
        <title>Selendra Airdrop</title>
        {/* <meta property="og:url" content="https://airdrop.selendra.org" /> */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Selendra Airdrop" />
        <meta property="og:description" content="A multi-sharding Blockchain network focuses on empowering developers to build real world Apps/Dapps for Web 3.0" />
        <meta property="og:image" content='https://user-images.githubusercontent.com/38589050/116519503-bf9e1c80-a8fb-11eb-9af1-726b68d53222.png' />
      </Helmet>
      <div className='about__container'>
        <Row align='middle' style={{ minHeight: '80vh' }}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <p className='about__title'>SELENDRA</p>
            <p className='about__titlemd'>AirDrop</p>
            <div className='about__des'>
              <p>Selendra is a blockchain network built with Substrate framework that support the building of business use-cases with developability and interoperability for developers to launch their applications in a decentralized manner with minimal learning curve. Developers can use tools they love to build business logic, user-friendly interfaces and take full advantage of tokeneconomic for their platform ecosystem and users’ expansion.
                <Button type='link' style={{paddingLeft: '0'}} onClick={() => setIsReadmore(true)}>...READ MORE</Button>
              </p>
              <AboutUs visible={isReadmore} setVisible={setIsReadmore} /> 
            </div>
            <div className='about__btn'>
              <Button>
                <NavLink to='/claim-$sel'>Claim $SEL here</NavLink>
              </Button>
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Row justify='center'>
              <img src={Artwork} className='about__pic'/>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  )
}
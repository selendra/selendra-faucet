import { Row, Col, Button } from 'antd'
import { ReactComponent as PIC } from '../assets/pic.svg'
import { NavLink } from 'react-router-dom'

export default function About() {
  return (
    <div className='about'>
      <div className='about__container'>
        <Row align='middle' style={{ minHeight: '80vh' }}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <p className='about__title'>SELENDRA</p>
            <p className='about__titlemd'>Air Drop</p>
            <div className='about__des'>
              <p>Selendra is a blockchain network built with Substrate framework that support the building of business use-cases with developability and interoperability for developers to launch their applications in a decentralized manner with minimal learning curve. Developers can use tools they love to build business logic, user-friendly interfaces and take full advantage of tokeneconomic for their platform ecosystem and users’ expansion.</p>
              <p>Our mission is to empower developers to create blockchain user-friendly applications for general users in asset tokenization, contents storage and computing, identity and governance, vote and other internet based microtransactions.</p>
              <p>Our vision is to be one of the open blockchain that contribute to the building of a healthy internet-of-blockchain and help introduce its benefits to reach users in every corner of the world, especially those in developing nations.</p>
            </div>
            <div className='about__btn'>
              <Button>
                <NavLink to='/claimairdrop'>Claim $SEL here</NavLink>
              </Button>
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Row justify='center'>
              <PIC style={{ marginLeft: '4.4rem' }} className='about__pic' />
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  )
}
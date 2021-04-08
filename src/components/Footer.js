import { Row, Col, Modal } from 'antd'
import selendra from '../assets/selendra.png'
import { ReactComponent as Medium } from '../assets/medium.svg'
import { ReactComponent as Telegram } from '../assets/telegram.svg'
import { ReactComponent as Twitter } from '../assets/twitter.svg'
import { ReactComponent as Facebook } from '../assets/facebook.svg'
import { ReactComponent as Linkedin } from '../assets/linkedin.svg'
import { useState } from 'react'
import About from './About'

export default function Footer() {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <div className='footer'>
        <div className='footer__container'>
          <Row>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <img src={selendra} alt='selendra' width='160px' height='58px'/>
              <ul style={{
                display: 'flex',
                flexDirection: 'column',
                paddingTop: '1rem'
              }}>
                <li>
                  <a
                    rel="noopener noreferrer"
                    onClick={() => setVisible(true)}
                  >
                    About Selendra
                  </a>
                </li>
                <li>
                  <a
                    href="https://docs.selendra.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/selendra"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <p className='footer__title'>Social Media</p>
              <Row>
                <Col>
                  <ul style={{
                    display: 'flex',
                    flexDirection: 'column',
                    paddingTop: '1rem'
                  }}>
                    <li>
                      <a
                        href="https://medium.com/selendra"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <Medium style={{marginRight: '6px'}} />Medium
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://t.me/selendraorg"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <Telegram style={{marginRight: '6px'}} />Telegram
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://twitter.com/selendraorg"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <Twitter style={{marginRight: '6px'}} />Twitter
                      </a>
                    </li>
                  </ul>
                </Col>
                <Col offset={4}>
                  <ul style={{
                    display: 'flex',
                    flexDirection: 'column',
                    paddingTop: '1rem'
                  }}>
                    <li>
                      <a
                        href="https://www.linkedin.com/company/selendra"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <Linkedin style={{marginRight: '6px'}} />Linkedin
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.facebook.com/selendraio"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <Facebook style={{marginRight: '6px'}} />Facebook
                      </a>
                    </li>
                  </ul>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
      <div style={{background: '#1D3442' }}>
        <div style={{maxWidth: '76rem', margin: '0 auto', padding: '1rem 0'}}>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
              <a href="mailto:info@selendra.org" style={{ color: '#f5f5f5' }}>
                info@selendra.org
              </a>
            </Col>
            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
              <p>Copyright © 2020 Selendra</p>
            </Col>
          </Row>
        </div>
      </div>
      <About visible={visible} setVisible={setVisible} />
    </>
  )
}
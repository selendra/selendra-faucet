import { Row, Layout, Col } from 'antd'
import React from 'react'
import logo from '../assets/selendra.png'
import '../styles/header.css'
import Footer from './Footer'

export default function Header(props) {
  const { Content } = Layout;

  return (
    <Layout className="layout">
      <div className='header'>
        <div className='header__container'>
          <Row justify='space-between' align='middle' className='header__row'>
            <Col>
              <img src={logo} className='header__logo' alt='logo'/>
            </Col>
            <Col>
              <Row justify='space-between' style={{width: 300}}>
                <p className='header__item'>How To Get</p>
                <p className='header__item'>About</p>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
      <Content>
        <div className="site-layout-content">
          <div className='content'>
            {props.children}
          </div>
        </div>
      </Content>
      <Footer></Footer>
    </Layout>
  )
}
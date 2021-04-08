import { Row, Layout, Col, Drawer } from 'antd'
import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../assets/selendra.png'
import '../styles/header.css'
import Footer from './Footer'
import { ReactComponent as Menu } from '../assets/menu.svg'
import About from './About'

export default function Header(props) {
  const { Content } = Layout;
  const [visible, setVisible] = React.useState(false); 
  const [modalVisible, setModalVisible] = React.useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  return (
    <Layout className="layout">
      <Drawer
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
        width={300}
        bodyStyle={{background: '#1A2F3C'}}
      >
        <img src={logo} className='header__logo' alt='logo'/>
        <div style={{padding: '1rem 0'}} />
        <NavLink to='/claimairdrop' onClick={onClose}>
          <p className='header__navItem'>How To Get</p>
        </NavLink>
        <NavLink to='/' onClick={() => setModalVisible(true)}>
          <p className='header__navItem'>About</p>
        </NavLink>
      </Drawer>
      <div className='header'>
        <div className='header__container'>
          <Row justify='space-between' align='middle' className='header__row'>
            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
              <NavLink to='/'>
                <img src={logo} className='header__logo' alt='logo'/>
              </NavLink>
            </Col>
            <Col xs={0} sm={0} md={12} lg={12} xl={12}>
              <Row justify='space-between' style={{width: 300}}>
                <NavLink to='/claimairdrop' style={{color: '#fff'}}>
                  <p className='header__item'>How To Get</p>
                </NavLink>
                <p className='header__item' onClick={() => setModalVisible(true)}>About</p>
              </Row>
            </Col>
            <Col xs={12} sm={12} md={0} lg={0} xl={0}>
              <Row justify='end'>
                <Menu style={{width: '44px', height: '44px', cursor: 'pointer'}} onClick={showDrawer} />
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
      <About visible={modalVisible} setVisible={setModalVisible} />
    </Layout>
  )
}
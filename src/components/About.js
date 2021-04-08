import { Modal } from 'antd';

export default function About(props) {
  return (
    <Modal title="" footer="" visible={props.visible} onCancel={()=> props.setVisible(false)}>
      <div className='footer__about'>
        <p className='footer__title'>About</p>
        <hr/>
        <p className='footer__subTitle'>Selendra is a multi-sharding blockchain network built with Substrate that focuses on interoperability with other open blockchains and developability for developers to launch their applications across blockchain networks, take full advantage of tokenization for their platform ecosystem expansion and users’ incentivization mechanism.</p>
        <br/>
        <p className='footer__subTitle'>Our mission is to empower developers to create blockchain user-friendly applications for general users to benefit from tokenization economy and internet based micro transactions.</p>
      </div>
    </Modal>
  )
}
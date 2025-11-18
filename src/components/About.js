import { Modal } from 'antd';

export default function About(props) {
  return (
    <Modal title="" footer="" visible={props.visible} onCancel={()=> props.setVisible(false)}>
      <div className='footer__about'>
        <p className='footer__title'>About</p>
        <hr/>
        <p className='footer__subTitle'>Selendra is a blockchain network built with Substrate framework that support the building of business use-cases with developability and interoperability for developers to launch their applications in a decentralized manner with minimal learning curve. Developers can use tools they love to build business logic, user-friendly interfaces and take full advantage of tokeneconomic for their platform ecosystem and users’ expansion.</p>
        <br/>
        <p className='footer__subTitle'>Our mission is to empower developers to create blockchain user-friendly applications for general users in asset tokenization, contents storage and computing, identity and governance, vote and other internet based microtransactions.</p>
        <br/>
        <p className='footer__subTitle'>Our vision is to be one of the open blockchain that contribute to the building of a healthy internet-of-blockchain and help introduce its benefits to reach users in every corner of the world, especially those in developing nations.</p>
      </div>
    </Modal>
  )
}
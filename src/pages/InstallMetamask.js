import { Anchor, Row, Col } from 'antd';
import { NavLink } from 'react-router-dom';

export default function InstallMetamask() {
  const { Link } = Anchor;

  return (
    <div className='about'>
      <div className='about__container'>
        <Row>
          <Col xs={0} sm={0} md={12} lg={6} xl={6}>
            <Anchor style={{borderRadius: '8px'}} className='anchor'>
              <Link href="#title" title="How to install MetaMask on your smartphone">
                <Link href="#step1" title="Step 1. Installation" />
                <Link href="#step2" title="Step 2. After installation, run it and click 'Start'" />
                <Link href="#step3" title="Step 3. In the new menu, click 'Create wallet'" />
                <Link href="#step4" title="Step 4. After that, enter the password that will be used to unlock and duplicate it, put a check mark with the consent of the Metamask conditions" />
                <Link href="#step5" title="Step 5. Again, press 'Start' twice" />
                <Link href="#step6" title="Step 6. After that, we definitely need to rewrite the secret phrases in the same order in which they were given to us. Without these words, you will not be able to restore the wallet, in any case, do not transfer them to third parties" />
                <Link href="#step7" title="Step 7. In the next window we have to repeat them in the same sequence and click continue" />
                <Link href="#step8" title="Step 8. Click on the agreement" />
                <Link href="#step9" title="Step 9. All our wallet is ready to go" />
              </Link>
            </Anchor>
          </Col>
          <Col xs={24} sm={24} md={12} lg={{span: 12, offset: 4}} xl={{span: 12, offset: 4}}>
            <div className='createwallet'>
              <p className='createwallet__title' id='title'>How to install MetaMask on your smartphone</p>
              <p>This is your personal wallet for the Selendra cryptocurrency, which will be used to receive affiliate rewards. The wallet belongs to you and is also used for automatic registration and authorization on the site.</p>
              <p className='createwallet__subTitle' id='step1'>1. Install</p>
              <p>- Get the compartiable metamask according to your devices</p>
              <p>For IOS Devices : <a href="https://apps.apple.com/us/app/metamask/id1438144202" target="_blank">https://apps.apple.com/us/app/metamask/id1438144202</a></p>
              <p>For Andriod Devices: <a href="https://play.google.com/store/apps/details?id=io.metamask" target="_blank">https://play.google.com/store/apps/details?id=io.metamask</a></p>
              <img src='https://user-images.githubusercontent.com/6874962/114138543-fd7cd600-9937-11eb-9f27-302a28497ad8.png'/>
              <p className="createwallet__subTitle" id='step2'>2. After installation, run it and click " Start"</p>
              <img src='https://user-images.githubusercontent.com/6874962/114138642-1eddc200-9938-11eb-977a-b911c45d316f.png'/>
              <p className="createwallet__subTitle" id='step3'>3. In the new menu, click " Create wallet"</p>
              <img src='https://user-images.githubusercontent.com/6874962/114138662-27ce9380-9938-11eb-8c01-fbb6622fff75.png'/>
              <p className="createwallet__subTitle" id='step4'>4. After that, enter the password that will be used to unlock and duplicate it, put a check mark with the consent of the Metamask conditions.</p>
              <img src='https://user-images.githubusercontent.com/6874962/114138728-3d43bd80-9938-11eb-8cb3-845b460576d0.png'/>
              <p className="createwallet__subTitle" id='step5'>5. Again, press "Start" twice</p>
              <img src='https://user-images.githubusercontent.com/6874962/114138791-577d9b80-9938-11eb-920a-325f9fa7b886.png'/>
              <p className="createwallet__subTitle" id='step6'>6. After that, we definitely need to rewrite the secret phrases in the same order in which they were given to us. Without these words, you will not be able to restore the wallet, in any case, do not transfer them to third parties.</p>
              <img src='https://user-images.githubusercontent.com/6874962/114138814-5e0c1300-9938-11eb-83c9-2ddd7d635134.png'/>
              <p className="createwallet__subTitle" id='step7'>7. In the next window we have to repeat them in the same sequence and click continue.</p>
              <img src='https://user-images.githubusercontent.com/6874962/114138825-63695d80-9938-11eb-8452-3e84d8b12a1b.png'/>
              <p>ATTENTION!! 12 phrases and your private key to your wallet are secret information, make sure to keep them as secure as possible. Never disclose them to anyone or any online service. An attacker can gain access to your secret information and steal your funds. Keep the combination of words and password in a safe place. It is advisable to additionally write down and save the combination of words and password on paper. Remember, you can't hack an Ethereum wallet, but hackers can steal login data from your computer or mobile device.</p>
              <p className="createwallet__subTitle" id='step8'>8. Click on the agreement</p>
              <img src='https://user-images.githubusercontent.com/6874962/114139040-b6431500-9938-11eb-82e4-5c6562de97e6.png'/>
              <p className="createwallet__subTitle" id='step9'>9. All our wallet is ready to go</p>
              <img src='https://user-images.githubusercontent.com/6874962/114139076-c0fdaa00-9938-11eb-8492-aab4e4fa847d.png'/>
              <p>Now you have MetaMask on your smartphone. By default your Metamask connected to Ethereum network you change to change it to Binance Smartchain in order to transaction the BEP-20 Tokens. Follow our Next tutorial on how to <NavLink to='/change-network-to-binance-smartchain'>Change network to Binance Smart chain</NavLink></p>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}
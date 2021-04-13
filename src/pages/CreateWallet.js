import { Row, Col, Button, Modal } from 'antd';
import { ReactComponent as PIC } from '../assets/pic.svg'
import { useState } from 'react';

export default function CreateWallet() {
  const [visible, setVisible] = useState(false);
  const [visibleBit, setVisibleBit] = useState(false);

  const metamask = (
    <div>
      <p>How to install MetaMask on your smartphone</p>
      <p>This is your personal wallet for the Selendra cryptocurrency, which will be used to receive affiliate rewards. The wallet belongs to you and is also used for automatic registration and authorization on the site.</p>
      <p>1. Install</p>
      <p>- Get the compartiable metamask according to your devices</p>
      <p>For IOS Devices : <a href="https://apps.apple.com/us/app/metamask/id1438144202" target="_blank">https://apps.apple.com/us/app/metamask/id1438144202</a></p>
      <p>For Andriod Devices: <a href="https://play.google.com/store/apps/details?id=io.metamask" target="_blank">https://play.google.com/store/apps/details?id=io.metamask</a></p>
      <img src='https://user-images.githubusercontent.com/6874962/114138543-fd7cd600-9937-11eb-9f27-302a28497ad8.png' width="520px" height="360"></img>
      <p>2. After installation, run it and click " Start"</p>
      <img src='https://user-images.githubusercontent.com/6874962/114138642-1eddc200-9938-11eb-977a-b911c45d316f.png' width="520px" height="1120"></img>
      <p>3. In the new menu, click " Create wallet"</p>
      <img src='https://user-images.githubusercontent.com/6874962/114138662-27ce9380-9938-11eb-8c01-fbb6622fff75.png' width="520px" height="1120"></img>
      <p>4. After that, enter the password that will be used to unlock and duplicate it, put a check mark with the consent of the Metamask conditions.</p>
      <img src='https://user-images.githubusercontent.com/6874962/114138728-3d43bd80-9938-11eb-8cb3-845b460576d0.png' width="520px" height="1120"></img>
      <p>5. Again, press "Start" twice</p>
      <img src='https://user-images.githubusercontent.com/6874962/114138791-577d9b80-9938-11eb-920a-325f9fa7b886.png' width="520px" height="1120"></img>
      <p>6. After that, we definitely need to rewrite the secret phrases in the same order in which they were given to us. Without these words, you will not be able to restore the wallet, in any case, do not transfer them to third parties.</p>
      <img src='https://user-images.githubusercontent.com/6874962/114138814-5e0c1300-9938-11eb-83c9-2ddd7d635134.png' width="520px" height="1120"></img>
      <p>7. In the next window we have to repeat them in the same sequence and click continue.</p>
      <img src='https://user-images.githubusercontent.com/6874962/114138825-63695d80-9938-11eb-8452-3e84d8b12a1b.png' width="520px" height="1120"></img>
      <p>ATTENTION!! 12 phrases and your private key to your wallet are secret information, make sure to keep them as secure as possible. Never disclose them to anyone or any online service. An attacker can gain access to your secret information and steal your funds. Keep the combination of words and password in a safe place. It is advisable to additionally write down and save the combination of words and password on paper. Remember, you can't hack an Ethereum wallet, but hackers can steal login data from your computer or mobile device.</p>
      <p>8. Click on the agreement</p>
      <img src='https://user-images.githubusercontent.com/6874962/114139040-b6431500-9938-11eb-82e4-5c6562de97e6.png' width="520px" height="1120"></img>
      <p>9. All our wallet is ready to go</p>
      <img src='https://user-images.githubusercontent.com/6874962/114139076-c0fdaa00-9938-11eb-8492-aab4e4fa847d.png' width="520px" height="1120"></img>
      <p>Now you have MetaMask on your smartphone. By default your Metamask connected to Ethereum network you change to change it to Binance Smartchain in order to transaction the BEP-20 Tokens. Follow our Next tutorial on how to <a href="">Change network to Binance Smart chain</a></p>
    </div>
  )

  const bitriel = (
    <div>
      <p>How to Get BEP20 Address On Bitriel?</p>
      <p>Bitriel Wallet supports BEP20 Tokens.</p>
      <p>What are BEP20 Tokens?</p>
      <p>BEP20 represents a token standard that is on the <a href="https://www.binance.org/en/smartChain" target='_blank'>Binance Smart Chain.</a></p>
      <p>BEP20 is similar to <a href="https://academy.binance.com/glossary/erc-20" target="_blank">ERC20</a> tokens that are issued and implemented on the <a href="https://academy.binance.com/blockchain/what-is-ethereum" target="_blank">Ethereum</a> blockchain.</p>
      <p>Bitiel Wallet team have implemented Binance Smart Chain to support BEP20 tokens.</p>
      <p>How to Get BEP20 Address On Bitriel?</p>
      <img src='https://user-images.githubusercontent.com/6874962/114149329-fc9e7100-9944-11eb-97c1-d5cbe86cfa18.png' width="520px"></img>
      <p>How to Get BEP20 Address?</p>
      <p>Smart Chain wallet will be enabled by default as soon as you Create a new wallet.</p>
      <img src='https://user-images.githubusercontent.com/6874962/114149395-0e801400-9945-11eb-937c-148e74d2deef.png' width="520px"></img>
      <p>Adding BEP20 to your wallet</p>
      <p>If you do not see your BEP20 token in your address yet, try to do a search or paste the BEP20 contract in the search bar.</p>
      <img src='https://user-images.githubusercontent.com/6874962/114149499-2e173c80-9945-11eb-83df-a1578d08479e.png' width="520px"></img>
      <p>Open your Smart Chain wallet, tap on Receive to get your BEP20 address.BNB is the main token on Binance Smart chain. Tap on Copy or Share your QR code for the Smart Chain address.</p>
      <img src='https://user-images.githubusercontent.com/6874962/114149539-3a02fe80-9945-11eb-8b80-a574a287a18a.png' width="520px"></img>
    </div>
  )

  return (
    <Row align='middle' style={{minHeight: '70vh'}}>
      <Col xs={24} sm={24} md={24} lg={12} xl={12}>
        <p className='intro__subTitle'>How to Install and Create an Selendra Metamask Wallet Account</p>
        <p className='intro__des'>Get Started:</p>
        <div className='intro__btn'>
          <Button style={{height: '70px'}} onClick={()=>setVisibleBit(true)}>
            How to Get Selendra BEP-20 wallet in Bitriel wallet
          </Button>
        </div>
        <div className='intro__btn'>
          <Button style={{height: '70px'}} onClick={()=>setVisible(true)}>
            How to install Metamask on smartphone.
          </Button>
        </div>
      </Col>
      <Col xs={24} sm={24} md={24} lg={12} xl={12}>
        <Row justify='center'>
          <PIC style={{marginLeft: '4.4rem'}} className='about__pic' />
        </Row>
      </Col>
      <Modal width={720} title="" footer="" visible={visible} onCancel={() => setVisible(false)}>
        {metamask}
      </Modal>
      <Modal width={720} title="" footer="" visible={visibleBit} onCancel={() => setVisibleBit(false)}>
        {bitriel}
      </Modal>
    </Row>
  )
}
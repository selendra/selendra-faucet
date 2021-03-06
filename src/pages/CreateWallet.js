import { useState } from 'react';
import { Row, Col, Button, Modal } from 'antd';
import CreateWalletArtwork from '../assets/createwallet.png';
import { NavLink } from 'react-router-dom';

export default function CreateWallet() {
  const [visible, setVisible] = useState(false);
  const [visibleBit, setVisibleBit] = useState(false);
  const [visibleNet, setVisibleNet] = useState(false);
  const [visibleTrust, setVisibleTrust] = useState(false);

  const metamask = (
    <div className='createwallet'>
      <p className='createwallet__title'>How to install MetaMask on your smartphone</p>
      <p>This is your personal wallet for the Selendra cryptocurrency, which will be used to receive affiliate rewards. The wallet belongs to you and is also used for automatic registration and authorization on the site.</p>
      <p className='createwallet__subTitle'>1. Install</p>
      <p>- Get the compartiable metamask according to your devices</p>
      <p>For IOS Devices : <a href="https://apps.apple.com/us/app/metamask/id1438144202" target="_blank">https://apps.apple.com/us/app/metamask/id1438144202</a></p>
      <p>For Andriod Devices: <a href="https://play.google.com/store/apps/details?id=io.metamask" target="_blank">https://play.google.com/store/apps/details?id=io.metamask</a></p>
      <img src='https://user-images.githubusercontent.com/6874962/114138543-fd7cd600-9937-11eb-9f27-302a28497ad8.png'/>
      <p className="createwallet__subTitle">2. After installation, run it and click " Start"</p>
      <img src='https://user-images.githubusercontent.com/6874962/114138642-1eddc200-9938-11eb-977a-b911c45d316f.png'/>
      <p className="createwallet__subTitle">3. In the new menu, click " Create wallet"</p>
      <img src='https://user-images.githubusercontent.com/6874962/114138662-27ce9380-9938-11eb-8c01-fbb6622fff75.png'/>
      <p className="createwallet__subTitle">4. After that, enter the password that will be used to unlock and duplicate it, put a check mark with the consent of the Metamask conditions.</p>
      <img src='https://user-images.githubusercontent.com/6874962/114138728-3d43bd80-9938-11eb-8cb3-845b460576d0.png'/>
      <p className="createwallet__subTitle">5. Again, press "Start" twice</p>
      <img src='https://user-images.githubusercontent.com/6874962/114138791-577d9b80-9938-11eb-920a-325f9fa7b886.png'/>
      <p className="createwallet__subTitle">6. After that, we definitely need to rewrite the secret phrases in the same order in which they were given to us. Without these words, you will not be able to restore the wallet, in any case, do not transfer them to third parties.</p>
      <img src='https://user-images.githubusercontent.com/6874962/114138814-5e0c1300-9938-11eb-83c9-2ddd7d635134.png'/>
      <p className="createwallet__subTitle">7. In the next window we have to repeat them in the same sequence and click continue.</p>
      <img src='https://user-images.githubusercontent.com/6874962/114138825-63695d80-9938-11eb-8452-3e84d8b12a1b.png'/>
      <p>ATTENTION!! 12 phrases and your private key to your wallet are secret information, make sure to keep them as secure as possible. Never disclose them to anyone or any online service. An attacker can gain access to your secret information and steal your funds. Keep the combination of words and password in a safe place. It is advisable to additionally write down and save the combination of words and password on paper. Remember, you can't hack an Ethereum wallet, but hackers can steal login data from your computer or mobile device.</p>
      <p className="createwallet__subTitle">8. Click on the agreement</p>
      <img src='https://user-images.githubusercontent.com/6874962/114139040-b6431500-9938-11eb-82e4-5c6562de97e6.png'/>
      <p className="createwallet__subTitle">9. All our wallet is ready to go</p>
      <img src='https://user-images.githubusercontent.com/6874962/114139076-c0fdaa00-9938-11eb-8492-aab4e4fa847d.png'/>
      <p>Now you have MetaMask on your smartphone. By default your Metamask connected to Ethereum network you change to change it to Binance Smartchain in order to transaction the BEP-20 Tokens. Follow our Next tutorial on how to <Button type='link' onClick={() => setVisibleNet(true)}>Change network to Binance Smart chain</Button></p>
    </div>
  )

  const bitriel = (
    <div className='createwallet'>
      <p className="createwallet__title">How to Get BEP20 Address On Bitriel?</p>
      <p>Bitriel Wallet supports BEP20 Tokens.</p>
      <p className="createwallet__subTitle">What are BEP20 Tokens?</p>
      <p>BEP20 represents a token standard that is on the <a href="https://www.binance.org/en/smartChain" target='_blank'>Binance Smart Chain.</a></p>
      <p>BEP20 is similar to <a href="https://academy.binance.com/glossary/erc-20" target="_blank">ERC20</a> tokens that are issued and implemented on the <a href="https://academy.binance.com/blockchain/what-is-ethereum" target="_blank">Ethereum</a> blockchain.</p>
      <p>Bitiel Wallet team have implemented Binance Smart Chain to support BEP20 tokens.</p>
      <p className="createwallet__subTitle">How to Get BEP20 Address On Bitriel?</p>
      <p>For Andriod Devices: <a href="https://play.google.com/store/apps/details?id=com.selendra.secure_wallet" target='_blank'>https://play.google.com/store/apps/details?id=com.selendra.secure_wallet</a></p>
      <img src='https://user-images.githubusercontent.com/6874962/114149329-fc9e7100-9944-11eb-97c1-d5cbe86cfa18.png'/>
      <p className="createwallet__subTitle">How to Get BEP20 Address?</p>
      <p>Smart Chain wallet will be enabled by default as soon as you Create a new wallet.</p>
      <img src='https://user-images.githubusercontent.com/38589050/114802246-9348b300-9dc7-11eb-98a8-d4c1a0967840.jpg'/>
      <p className="createwallet__subTitle">Adding BEP20 to your wallet</p>
      <p>If you do not see your BEP20 token in your address yet, try to do a search or paste the BEP20 contract in the search bar.</p>
      <img src='https://user-images.githubusercontent.com/6874962/114149499-2e173c80-9945-11eb-83df-a1578d08479e.png'/>
      <p>Open your Smart Chain wallet, tap on Receive to get your BEP20 address.BNB is the main token on Binance Smart chain. Tap on Copy or Share your QR code for the Smart Chain address.</p>
      <img src='https://user-images.githubusercontent.com/6874962/114149539-3a02fe80-9945-11eb-8b80-a574a287a18a.png'/>
    </div>
  )

  const changeNetwork = (
    <div className='createwallet'>
      <p className='createwallet__title'>Connecting MetaMask to Binance Smart Chain</p>
      <p>To communicate our metamask to Binance Smart Chain nodes we need to change the network setting as bellow:</p>
      <p className='createwallet__subTitle'>1. Navigate to icon account and choose Settings</p>
      <img src='https://user-images.githubusercontent.com/6874962/114129914-b687e400-9929-11eb-95e3-bac65470c6b1.png'/>
      <p className='createwallet__subTitle'>2. Add Network</p>
      <p>Click on Add Network at the top-right corner and manually fill the below informations.</p>
      <p>- Network Name: Binance Smart Chain</p>
      <p>- New RPC URL: <a href='https://bsc-dataseed.binance.org' target='_blank'>https://bsc-dataseed.binance.org</a></p>
      <p>- ChainID: 56</p>
      <p>- Symbol: BNB</p>
      <p>- Block Explorer URL: <a href='https://bscscan.com' target='_blank'>https://bscscan.com</a></p>
      <img src='https://user-images.githubusercontent.com/6874962/114134002-23eb4300-9931-11eb-8527-5450c48befaa.png'/>
      <p className='createwallet__subTitle'>3. Verify</p>
      <p>We recommend adding some funds if you intend to use MetaMask to transfer BNB or SEl token on Binance Smart Chain in the future. Once you Save the Network and return to the main view, you’ll notice two things: the network has automatically been set to the one you just entered, and the units are no longer denominated in ETH, but in BNB.</p>
      <img src='https://user-images.githubusercontent.com/6874962/114134197-893f3400-9931-11eb-9786-b5a5a8f3ed0e.png'/>
      <p>We’ve connected to Binance Smart Chain Mainnet.</p>
    </div>
  )

  const TrustWallet = (
    <div className='createwallet'>
      <p className='createwallet__title'>How to Add SELToken on Trust Wallet</p>
      <p className='createwallet__subTitle'>Step 1. Access Search Token Screen</p>
      <p>Tap on the toggle sign on the upper right corner of the Wallet Screen. Search for the token, and if the token is not available, you will get a “No Asset Found” screen with the Add Custom Token button. For Android devices, you can scroll down to the bottom of the list of available tokens and you will see there + Add Custom Token. </p>
      <img src='https://user-images.githubusercontent.com/6874962/114968309-4684db00-9ea0-11eb-954f-04b9a6c87497.png'/>
      <img src='https://user-images.githubusercontent.com/6874962/114968324-4c7abc00-9ea0-11eb-9b85-d933cb5802bd.png'/>
      <p className='createwallet__subTitle'>Step 2. Get Custom Token Information</p>
      <p>Here is the infomation of SELENDRA TOKEN on <a href="https://bscscan.com/address/0x288d3A87a87C284Ed685E0490E5C4cC0883a060a" target='_blank'></a> Binance Smart Chain.</p>
      <p>Note: This is the Contract number of SEL Information</p>
      <div style={{background: '#40a9ff', color: '#fff', padding: '6px', borderRadius: '8px'}}>
      <p>- Symbol: SEL</p>
      <p>- Contract Address: 0x288d3A87a87C284Ed685E0490E5C4cC0883a060a</p>
      <p>- Decimal: 18</p>
      </div>
      <p>How to get QR code of the token?
        Tap on the “Contract” address under “Profile Summary” to get to the Token Tracker page. On the upper left you can see there the Contract address. There will be a button there that you can click on to show the QR code details. This can be used on the next step.</p>
      <img src='https://user-images.githubusercontent.com/6874962/114969666-0f63f900-9ea3-11eb-9cd7-6e2626133e42.png'/>
      <p className='createwallet__subTitle'>Step 3. Fill up Token Details</p>
      <p>Using the information taken from BSC Scan, carefully fill up the required Token details Tap on scan icon and start scaning the QR code the informatino will fill automatically.</p>
      <img src='https://user-images.githubusercontent.com/6874962/114969672-15f27080-9ea3-11eb-80b7-23ed70f1566a.png'/>
      <p>Tap on Save once you are done.</p>
      <p className='createwallet__subTitle'>Step 4. Token Successfully Added</p>
      <p>On the main wallet screen, the token will now appear. Since this is still a new token, the logo as well as the price will not be available. The token has to be trading first.</p>
      <img src='https://user-images.githubusercontent.com/6874962/114969918-8f8a5e80-9ea3-11eb-91e3-a71c4a937f6c.png'/>
    </div>
  )

  return (
    <div className='about'>
      <div className='about__container'>
        <Row align='middle' style={{minHeight: '70vh'}}>
          <Col xs={24} sm={24} md={24} lg={11} xl={11}>
            <p className='intro__subTitle'>How to Install and Create an Selendra Metamask Wallet Account</p>
            <p className='intro__des'>Get Started:</p>
            <div className='intro__btn'>
              <Button style={{height: '70px'}}>
                <NavLink to='create-bep20wallet'>
                Selendra on BEP-20 wallet
                </NavLink>
              </Button>
            </div>
            <div className='intro__btn'>
              <Button style={{height: '70px'}}>
                <NavLink to='add-seltoken-on-trustwallet'>
                Selendra on Trust wallet
                </NavLink>
              </Button>
            </div>
            <div className='intro__btn'>
              <Button style={{height: '70px'}}>
                <NavLink to='install-metamask'>
                Selendra on Metamask
                </NavLink>
              </Button>
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={{span:12, offset:1}} xl={{span:12, offset:1}}>
            <Row justify='center'>
              <img src={CreateWalletArtwork} className='about__pic'/>
            </Row>
          </Col>
        </Row>
      </div>
      <Modal title="" footer="" visible={visible} onCancel={() => setVisible(false)}>
        {metamask}
      </Modal>
      <Modal title="" footer="" visible={visibleBit} onCancel={() => setVisibleBit(false)}>
        {bitriel} 
      </Modal>
      <Modal title="" footer="" visible={visibleNet} onCancel={() => setVisibleNet(false)}>
        {changeNetwork} 
      </Modal>
      <Modal title="" footer="" visible={visibleTrust} onCancel={() => setVisibleTrust(false)}>
        {TrustWallet} 
      </Modal>
    </div>
  )
}
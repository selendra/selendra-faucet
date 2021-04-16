import { Anchor, Row, Col } from 'antd';

export default function GetBEP20() {
  const { Link } = Anchor;

  return (
    <div className='about'>
      <div className='about__container'>
        <Row>
          <Col xs={0} sm={0} md={12} lg={6} xl={6}>
            <Anchor style={{borderRadius: '8px'}} className='anchor'>
              <Link href="#step1" title="How to Get BEP20 Address On Bitriel?">
                <Link href="#step2" title="What are BEP20 Tokens?" />
                <Link href="#step3" title="How to Get BEP20 Address On Bitriel?" />
                <Link href="#step4" title="Adding BEP20 to your wallet" />
              </Link>
            </Anchor>
          </Col>
          <Col xs={24} sm={24} md={12} lg={{span: 12, offset: 4}} xl={{span: 12, offset: 4}}>
            <div className='createwallet'>
              <p className="createwallet__title" id='step1'>How to Get BEP20 Address On Bitriel?</p>
              <p>Bitriel Wallet supports BEP20 Tokens.</p>
              <p className="createwallet__subTitle" id='step2'>What are BEP20 Tokens?</p>
              <p>BEP20 represents a token standard that is on the <a href="https://www.binance.org/en/smartChain" target='_blank'>Binance Smart Chain.</a></p>
              <p>BEP20 is similar to <a href="https://academy.binance.com/glossary/erc-20" target="_blank">ERC20</a> tokens that are issued and implemented on the <a href="https://academy.binance.com/blockchain/what-is-ethereum" target="_blank">Ethereum</a> blockchain.</p>
              <p>Bitiel Wallet team have implemented Binance Smart Chain to support BEP20 tokens.</p>
              <p className="createwallet__subTitle" id='step3'>How to Get BEP20 Address On Bitriel?</p>
              <p>For Andriod Devices: <a href="https://play.google.com/store/apps/details?id=com.selendra.secure_wallet" target='_blank'>https://play.google.com/store/apps/details?id=com.selendra.secure_wallet</a></p>
              <img src='https://user-images.githubusercontent.com/6874962/114149329-fc9e7100-9944-11eb-97c1-d5cbe86cfa18.png'/>
              <p className="createwallet__subTitle">How to Get BEP20 Address?</p>
              <p>Smart Chain wallet will be enabled by default as soon as you Create a new wallet.</p>
              <img src='https://user-images.githubusercontent.com/38589050/114802246-9348b300-9dc7-11eb-98a8-d4c1a0967840.jpg'/>
              <p className="createwallet__subTitle" id='step4'>Adding BEP20 to your wallet</p>
              <p>If you do not see your BEP20 token in your address yet, try to do a search or paste the BEP20 contract in the search bar.</p>
              <img src='https://user-images.githubusercontent.com/6874962/114149499-2e173c80-9945-11eb-83df-a1578d08479e.png'/>
              <p>Open your Smart Chain wallet, tap on Receive to get your BEP20 address.BNB is the main token on Binance Smart chain. Tap on Copy or Share your QR code for the Smart Chain address.</p>
              <img src='https://user-images.githubusercontent.com/6874962/114149539-3a02fe80-9945-11eb-8b80-a574a287a18a.png'/>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}
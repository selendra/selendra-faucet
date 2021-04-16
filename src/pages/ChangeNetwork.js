import { Anchor, Row, Col } from 'antd';

export default function ChangeNetwork() {
  const { Link } = Anchor;

  return (
    <div className='about'>
      <div className='about__container'>
        <Row>
          <Col xs={0} sm={0} md={12} lg={6} xl={6}>
            <Anchor style={{borderRadius: '8px'}} className='anchor'>
              <Link href="#title" title="Connecting MetaMask to Binance Smart Chain">
                <Link href="#step1" title="1. Navigate to icon account and choose Settings" />
                <Link href="#step2" title="2. Add Network" />
                <Link href="#step3" title="3. Verify" />
              </Link>
            </Anchor>
          </Col>
          <Col xs={24} sm={24} md={12} lg={{span: 12, offset: 4}} xl={{span: 12, offset: 4}}>
            <div className='createwallet'>
              <p className='createwallet__title' id='title'>Connecting MetaMask to Binance Smart Chain</p>
              <p>To communicate our metamask to Binance Smart Chain nodes we need to change the network setting as bellow:</p>
              <p className='createwallet__subTitle' id='step1'>1. Navigate to icon account and choose Settings</p>
              <img src='https://user-images.githubusercontent.com/6874962/114129914-b687e400-9929-11eb-95e3-bac65470c6b1.png'/>
              <p className='createwallet__subTitle' id='step2'>2. Add Network</p>
              <p>Click on Add Network at the top-right corner and manually fill the below informations.</p>
              <p>- Network Name: Binance Smart Chain</p>
              <p>- New RPC URL: <a href='https://bsc-dataseed.binance.org' target='_blank'>https://bsc-dataseed.binance.org</a></p>
              <p>- ChainID: 56</p>
              <p>- Symbol: BNB</p>
              <p>- Block Explorer URL: <a href='https://bscscan.com' target='_blank'>https://bscscan.com</a></p>
              <img src='https://user-images.githubusercontent.com/6874962/114134002-23eb4300-9931-11eb-8527-5450c48befaa.png'/>
              <p className='createwallet__subTitle' id='step3'>3. Verify</p>
              <p>We recommend adding some funds if you intend to use MetaMask to transfer BNB or SEl token on Binance Smart Chain in the future. Once you Save the Network and return to the main view, you’ll notice two things: the network has automatically been set to the one you just entered, and the units are no longer denominated in ETH, but in BNB.</p>
              <img src='https://user-images.githubusercontent.com/6874962/114134197-893f3400-9931-11eb-9786-b5a5a8f3ed0e.png'/>
              <p>We’ve connected to Binance Smart Chain Mainnet.</p>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}
import { Anchor, Row, Col } from 'antd';

export default function AddSelToken() {
  const { Link } = Anchor;

  return (
    <div className='about'>
      <div className='about__container'>
        <Row>
          <Col xs={0} sm={0} md={12} lg={6} xl={6}>
            <Anchor style={{borderRadius: '8px'}} className='anchor'>
              <Link href="#title" title="How to Add SELToken on Trust Wallet">
                <Link href="#step1" title="Step 1. Access Search Token Screen" />
                <Link href="#step2" title="Step 2. Get Custom Token Information" />
                <Link href="#step3" title="Step 3. Fill up Token Details" />
                <Link href="#step4" title="Step 4. Token Successfully Added" />
              </Link>
            </Anchor>
          </Col>
          <Col xs={24} sm={24} md={12} lg={{span: 12, offset: 4}} xl={{span: 12, offset: 4}}>
            <div className='createwallet'>
              <p className='createwallet__title' id='title'>How to Add SELToken on Trust Wallet</p>
              <p className='createwallet__subTitle' id='step1'>Step 1. Access Search Token Screen</p>
              <p>Tap on the toggle sign on the upper right corner of the Wallet Screen. Search for the token, and if the token is not available, you will get a “No Asset Found” screen with the Add Custom Token button. For Android devices, you can scroll down to the bottom of the list of available tokens and you will see there + Add Custom Token. </p>
              <img src='https://user-images.githubusercontent.com/6874962/114968309-4684db00-9ea0-11eb-954f-04b9a6c87497.png'/>
              <img src='https://user-images.githubusercontent.com/6874962/114968324-4c7abc00-9ea0-11eb-9b85-d933cb5802bd.png'/>
              <p className='createwallet__subTitle' id='step2'>Step 2. Get Custom Token Information</p>
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
              <p className='createwallet__subTitle' id='step3'>Step 3. Fill up Token Details</p>
              <p>Using the information taken from BSC Scan, carefully fill up the required Token details Tap on scan icon and start scaning the QR code the informatino will fill automatically.</p>
              <img src='https://user-images.githubusercontent.com/6874962/114969672-15f27080-9ea3-11eb-80b7-23ed70f1566a.png'/>
              <p>Tap on Save once you are done.</p>
              <p className='createwallet__subTitle' id='step4'>Step 4. Token Successfully Added</p>
              <p>On the main wallet screen, the token will now appear. Since this is still a new token, the logo as well as the price will not be available. The token has to be trading first.</p>
              <img src='https://user-images.githubusercontent.com/6874962/114969918-8f8a5e80-9ea3-11eb-91e3-a71c4a937f6c.png'/>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}
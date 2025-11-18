import { ReactComponent as Tick } from '../assets/checked.svg'
import { Row, Col, Button } from 'antd'
import {NavLink} from 'react-router-dom'

export default function Success() {
  return (
    <Row justify='center' align='middle' style={{height: '80vh'}}>
      <Col>
        <Tick style={{ width: '250px', height: '250px', marginBottom: '1rem' }}/>
        <p className='success__title'>Successfully Sent</p>
        <p className='success__subTitle'>Thank you for your submit</p>
        <div className='success__btn'>
          <Button>
            <NavLink to='/'>
            Back Home
            </NavLink>
          </Button>
        </div>
      </Col>
    </Row>
  )
}
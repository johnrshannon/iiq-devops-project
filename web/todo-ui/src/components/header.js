import logo from '../img/kubbq_small.png';
import '../css/App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'; 


function Header ({serverUp}) {
  const BASE_URL = window.BASE_URL;
  function serverStatus() {
    if (serverUp) {
      return <Col className={'serverUp'}>Connected to {BASE_URL}</Col>
    } else {
      return <Col className={'serverDown'}>Cannot connect to {BASE_URL}</Col>
    }
  }
  return (
    <Container className={'header'}>
      <Row>
        <Col><h1>Todo List</h1></Col>
        {serverStatus()}
        <Col><img src={logo} alt="logo" /></Col>
      </Row>
    </Container>
  )
}
export default Header
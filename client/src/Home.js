import React from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Home() {



  return (
    <Container>
      <Row>
        <Col>
          <div className='home-welcome'>Welcome to my extremely poorly put together project based around helping people find DnD groups</div>
        </Col>
        <Col>
          <img src='https://i.pinimg.com/736x/a0/4a/e8/a04ae8e4453dd202037b260d998fc57d.jpg' alt='homebg'  />
        </Col>
      </Row>
    </Container>
    )
}

export default Home;

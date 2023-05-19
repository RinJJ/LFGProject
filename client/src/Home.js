import React from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Home() {



  return (
    <Container>
      <Row>
        <Col>
          <div className='mt-5'>Welcome to my small coding Project.</div>
          <div>This was made to showcase some  of my current React and FlaskSQL</div>
          <div>abilities.</div>
          <div className="mb-5">  </div>
          <div>This project is a group management system themed around Wizard's of the Coast's Dungeon and Dragons 5th Edition. It's goal is to provide a way to simply find and join dnd groups with a character you have made</div>
          <div></div>

        </Col>
        <Col>
          <img src='https://i.pinimg.com/736x/a0/4a/e8/a04ae8e4453dd202037b260d998fc57d.jpg' alt='homebg'  />
        </Col>
      </Row>
    </Container>
    )
}

export default Home;

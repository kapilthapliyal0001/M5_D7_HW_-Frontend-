import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Row,
  Col,
  Card,
  Modal,
  Container,
} from "react-bootstrap";
import "./homePage.css";
export default class HomePage extends Component {
  // STATE
  state = {
    data: null,
    postSelected: false,
  };

  // const url = "http://localhost:3000";

  getElement = async (e) => {
    try {
      //   const {REACT_APP_URL} = process.env.PORT;
      //   console.log(REACT_APP_URL);
      console.log("I am there");
      const response = await fetch(`${process.env.REACT_APP_URL}/posts`);
      const file = await response.json();
      console.log("output files are: ", file);
      this.setState({
        data: file,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // post selected section;

  postSelected = () => {
    this.setState({
      postSelected: !this.state.postSelected,
    });
  };

  componentDidMount() {
    this.getElement();
  }
  render() {
    return (
      <div className="main-body">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-info">Search</Button>
          </Form>
        </Navbar>
        <div className="heading mt-2 d-flex justify-content-around">
          <h2 style={{color: "grey"}}>Strive School Blog Page</h2>
          <Button variant="dark ">Post a Review</Button>
        </div>
        {/* {this.state.postSelected ? (
          <></>
        ) : (
          <Modal show={this.state.postSelected} onHide={this.postSelected()}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Woohoo, you're reading this text in a modal!
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.postSelected()}>
                Close
              </Button>
              <Button variant="primary" onClick={this.postSelected()}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        )} */}
        <div>
          <Container fluid>
            <div className="fluid">
              {this.state.data ? (
                <Row className="d-flex justify-content-around">
                  {this.state.data.map((p) => {
                    return (
                      <Col
                        className="blog-col m-2 pl-3"
                        lg={3}
                        md={4}
                        style={{backgroundColor: "white"}}
                        key={p._id}
                      >
                        <Card style={{width: "18rem"}}>
                          <Card.Img
                            variant="top"
                            src={p.cover ? p.cover : "Unknown Author"}
                          />
                          {p.name}
                          <Card.Body>
                            <Card.Title>{p.title}</Card.Title>
                            <Card.Text>
                              {p.content
                                ? p.content.substring(0, 100)
                                : "Some Text"}
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                          </Card.Body>
                        </Card>
                      </Col>
                    );
                  })}
                </Row>
              ) : (
                <div>Check if i am there</div>
              )}
            </div>
          </Container>
        </div>
      </div>
    );
  }
}

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
    form: {
      name: "",
      title: "",
      category: "",
      content: "",
      url: "",
      cover: "",
    },
    outputFiles: null,
    postURL: process.env.REACT_APP_URL
      ? process.env.REACT_APP_URL
      : "http://localhost:3001/",
    editData: null,
    editSelected: false,
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

  closeEdit = () => {
    this.setState({
      editSelected: !this.state.editSelected,
    });
  };

  postForm = async (e) => {
    e.preventDefault()
      ? e.preventDefault()
      : console.log("Prevent Default not applicable");
    try {
      let response = await fetch(`${this.state.postURL}/posts/`, {
        method: "POST",
        body: JSON.stringify(this.state.form),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((data) => data.json())
        .then((files) => {
          console.log("These are the files: ", files);
          this.setState({
            outputFiles: files,
          });
          this.postSelected();
        });
    } catch (error) {
      console.log("There is an error: ", error);
    }
  };

  deletePost = async (id) => {
    try {
      console.log("The id passed is : ", id);
      let response = await fetch(`${this.state.postURL}/posts/${id}`, {
        method: "DELETE",
      }).then((files) => {
        console.log("These are the files: ", files);
        this.setState({
          outputFiles: files,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  editPost = async (id) => {
    try {
      let responce = await fetch(`${this.state.postURL}/posts/${id}`)
        .then((p) => p.json())
        .then((m) => {
          this.setState({
            editData: m,
          });
          return m;
        })
        .then((u) => {
          console.log("I am able to get the Edit Data : ", u);
        });
    } catch (error) {
      console.log(error);
    }
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
          <Button variant="dark " onClick={this.postSelected}>
            Post a Review
          </Button>
        </div>
        {this.state.postSelected ? (
          <Modal show={this.state.postSelected} onHide={!this.postSelected}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={(e) => this.postForm}>
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    value={this.state.form.name}
                    onChange={(e) => {
                      console.log(e.target.value);
                      this.setState({
                        form: {
                          ...this.state.form,
                          name: e.target.value,
                        },
                      });
                    }}
                  />
                  <Form.Text className="text-muted">
                    Your name will be private
                  </Form.Text>
                </Form.Group>
                <Form.Group
                  controlId="formTitle"
                  onSubmit={(e) => this.postForm}
                >
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter title"
                    value={this.state.form.title}
                    onChange={(e) => {
                      console.log(e.target.value);
                      this.setState({
                        form: {
                          ...this.state.form,
                          title: e.target.value,
                        },
                      });
                    }}
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formCategory">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Category"
                    value={this.state.form.category}
                    onChange={(e) => {
                      console.log(e.target.value);
                      this.setState({
                        form: {
                          ...this.state.form,
                          category: e.target.value,
                        },
                      });
                    }}
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formContentr">
                  <Form.Label>Content</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Content"
                    value={this.state.form.content}
                    onChange={(e) => {
                      console.log(e.target.value);
                      this.setState({
                        form: {
                          ...this.state.form,
                          content: e.target.value,
                        },
                      });
                    }}
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formContentr">
                  <Form.Label>Cover Image</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter the url for the Cover"
                    value={this.state.form.cover}
                    onChange={(e) => {
                      console.log(e.target.value);
                      this.setState({
                        form: {
                          ...this.state.form,
                          cover: e.target.value,
                        },
                      });
                    }}
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formCover">
                  <Form.Label>Cover URL</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter cover URL"
                    value={this.state.form.url}
                    onChange={(e) => {
                      console.log(e.target.value);
                      this.setState({
                        form: {
                          ...this.state.form,
                          url: e.target.value,
                        },
                      });
                    }}
                  />
                  <Form.Text className="text-muted">
                    Cover is for public display
                  </Form.Text>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.postSelected}>
                Close
              </Button>
              <Button variant="primary" onClick={this.postForm}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        ) : (
          <div></div>
        )}
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
                            src={p.url ? p.url : p.cover}
                            fluid
                          />
                          {p.name}
                          <Card.Body>
                            <Card.Title>{p.title}</Card.Title>
                            <Card.Text>
                              {p.content
                                ? p.content.substring(0, 100)
                                : "Some Text"}
                            </Card.Text>
                            <Button
                              variant="primary"
                              onClick={(e) => this.editPost(p._id)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="dark"
                              onClick={() => this.deletePost(p._id)}
                            >
                              Delete
                            </Button>
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

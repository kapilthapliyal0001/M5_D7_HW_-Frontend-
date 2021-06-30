import React, {Component} from "react";

export default class HomePage extends Component {
  state = {
    data: null,
  };

  // const url = "http://localhost:3000";

  getElement = async (e) => {
    try {
      const {REACT_APP_URL} = process.env;
      console.log(REACT_APP_URL);
      console.log("I am there");
      const response = await fetch(`https://kapil-blogs.herokuapp.com/blogs`);
      const file = await response.json();
      console.log("output files are: ", file);
      this.setState({
        data: file,
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
      <div style={{backgroundColor: "grey"}}>
        Hello there
        <div>
          {this.state.data ? (
            <div>
              {this.state.data.map((p) => {
                return <div key={p.id}>{p.title} 1</div>;
              })}
            </div>
          ) : (
            <div>Check if i am there</div>
          )}
        </div>
      </div>
    );
  }
}

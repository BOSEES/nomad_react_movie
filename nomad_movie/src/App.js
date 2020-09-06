import React from 'react';


class App extends React.Component {
  constructor(props) {
    super(props);
    console.log("hello");
  }

  state = {
    count : 0
  }
  
  add = () => {
    this.setState(current => ({ count : current.count + 1 }));
  }
  minus = () => {
    this.setState(current => ({ count : current.count - 1 }));
  }
  componentDidMount() {
    console.log("rendered");
  }
  componentDidUpdate() {
    console.log("i just update");
  }
  render() {
    console.log("i'm rendering");
    return(
      <div>
        <h1>The Number is : {this.state.count} </h1>
        <button onClick={this.add}>add</button>
        <button onClick={this.minus}>minus</button>
      </div>
    )   
  }
}

export default App;

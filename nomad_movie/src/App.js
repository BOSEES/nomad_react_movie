import React from 'react';
import Axios from "axios";

class App extends React.Component {
  state = {
    isLoading : true,
    movies : []
  };
  getMovies = async () => {
    const movies = await Axios.get("https://yts-proxy.now.sh/list_movies.json");
  }

  componentDidMount(){
    this.getMovies();
  }
  render() {
    const { isLoading } = this.state;
    return <div>{isLoading ? "Loading..." : "let's begin"}</div>
  }
}

export default App;

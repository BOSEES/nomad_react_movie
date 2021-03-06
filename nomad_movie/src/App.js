import React from 'react';
import { HashRouter , Route} from "react-router-dom";
import Home from "./routes/Home";
import About from "./routes/About";

function App() {
  return (
    <HashRouter>
      <Route path="/" exact={true} components={Home}></Route>
      <Route path="/about" components={About}></Route>
    </HashRouter>
  )
}

export default App;
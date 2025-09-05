import Nav from "./Nav";
import Interprets from "./Interprets";
import { useState } from "react";

function App() {
  const [actualInterpret, setInterpret] = useState();
  return (
    <div className="container">
        <Nav></Nav>
        <Interprets></Interprets>
    </div>
  )
}

export default App;

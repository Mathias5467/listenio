import Nav from "./Nav";
import Interprets from "./Interprets";
import Interpret from "./Interpret";
import { useState } from "react";
import { Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {
  const [actualInterpret, setInterpret] = useState();

  return (
    <BrowserRouter basename="/listenio">
      <div className="container">
        <Nav />
        <Routes>
          {/* All interprets list - now at /listenio/ */}
          <Route path="/" element={<Interprets setInterpret={setInterpret} />} />

          {/* Dynamic route for a single interpret - now at /listenio/interpret/:name */}
          <Route path="/interpret/:name" element={<Interpret />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
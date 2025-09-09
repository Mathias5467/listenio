import Nav from "./Nav";
import Interprets from "./Interprets";
import Interpret from "./Interpret";
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Favorite from "./Favorite";

function App() {

  return (
    <BrowserRouter basename="/listenio">
      <div className="container">
        <Nav />
        <Routes>
          <Route path="/" element={<Interprets />} />

          <Route path="/interpret/:name" element={<Interpret />} />
          <Route path="/interpret/favorite" element={<Favorite />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
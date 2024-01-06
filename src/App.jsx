import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Pages/Home";

import { View } from "./Pages/view";
import { Estoque } from "./Pages/estoque";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/View" element={<View />} />
        <Route path="/Estoque" element={<Estoque />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Search } from "./Pages/search";
import { View } from "./Pages/view";
import { Estoque } from "./Pages/estoque";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/View" element={<View />} />
        <Route path="/Estoque" element={<Estoque />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

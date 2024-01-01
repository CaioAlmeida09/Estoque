import Home from "./Pages/Home";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Search } from "./Pages/search";
import { View } from "./Pages/view";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/View" element={<View />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

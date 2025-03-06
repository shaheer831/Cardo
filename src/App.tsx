import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";
import NotFound from "./pages/NotFound.tsx";
import LocomotiveScroll from "locomotive-scroll";
import Games from "./pages/Games.tsx";
import Nav from "./assets/Components/Nav.tsx";
import SpaceFun from "./pages/SpaceFun.tsx";
import FoodWars from "./pages/FoodWars.tsx";

const App = () => {
  const locomotiveScroll = new LocomotiveScroll();
  return (
    <div className="overflow-hidden">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home />
              </>
            }
          />
          <Route
            path="/games"
            element={
              <>
                <Nav />
                <Games />
              </>
            }
          />
          <Route
            path="/games/space-fun"
            element={
              <>
                <Nav />
                <SpaceFun />
              </>
            }
          />
          <Route
            path="/games/food-wars"
            element={
              <>
                <Nav />
                <FoodWars />
              </>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

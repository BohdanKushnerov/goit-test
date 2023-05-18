import { Route, Routes } from "react-router-dom";
import Tweets from "./pages/Tweets";
import Layout from "./Layout";
import Home from "./pages/Home";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="tweets" element={<Tweets />} />
        {/* <Route path="*" element={<Error />} /> */}
      </Route>
    </Routes>
  );
};

export default App;

// 1.add state machine
// 2. мутиции

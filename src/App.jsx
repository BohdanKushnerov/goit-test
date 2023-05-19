import { Route, Routes } from "react-router-dom";
import Tweets from "./pages/Tweets";
import Layout from "./Layout";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="tweets" element={<Tweets />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
};

export default App;

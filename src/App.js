import { Route, Routes } from "react-router-dom";
import Layout from "components/Layout";
import Tweets from "pages/Tweets";
import Home from "pages/Home";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="tweets" element={<Tweets />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
};

// длинна 0 то пагинацию убрать и дабовить строку что типа нету
// обработать еррорки
// в кнопку добавить анимацию
// компонент кнопки

export default App;

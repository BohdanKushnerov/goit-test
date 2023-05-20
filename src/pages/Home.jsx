import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/", { search: "?updated=true" });
  }, [navigate]);

  return (
    <div>
      <h1>Welcome! </h1>
    </div>
  );
};

export default Home;

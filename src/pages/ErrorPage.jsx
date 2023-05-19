import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Error page! </h1>
      <button onClick={() => navigate("/")}>Back</button>
    </div>
  );
};

export default ErrorPage;

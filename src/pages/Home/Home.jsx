import { Button } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HomePageContainer } from "./Home.styled";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/", { search: "?updated=true" });
  }, [navigate]);

  return (
    <HomePageContainer>
      <h1>Welcome! </h1>
      <h2>This is your's Tweet Subscription Tracker</h2>
      <Button
        variant="contained"
        color="info"
        onClick={() => navigate("/tweets")}
      >
        Your Tweets is here
      </Button>
    </HomePageContainer>
  );
};

export default Home;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUsers } from "services";
import Status from "constants";
import { useLocalStorageInitialization } from "hooks";
import CardFilter from "components/CardFilter";
import CardList from "components/CardList";
import Paginate from "components/Pagination";
import { Box, Button, CircularProgress } from "@mui/material";
import {
  TweetsPageContainer,
  TweetsPageContent,
  TweetsPageActivityWrap,
} from "./Tweets.styled";

const Tweets = () => {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("show_all");
  const [filterUsers, setFilterUsers] = useState([]);
  const navigate = useNavigate();
  useLocalStorageInitialization("followingIDs", []);

  const cardsPerPage = 3;
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const cardsOnCurrentPage = filterUsers.slice(
    indexOfFirstCard,
    indexOfLastCard
  );
  const count = Math.ceil(filterUsers.length / cardsPerPage);

  if (cardsOnCurrentPage.length === 0 && currentPage !== 1) {
    setCurrentPage((prev) => (prev -= 1));
  }

  useEffect(() => {
    const followingIDs = JSON.parse(localStorage.getItem("followingIDs"));

    if (filter === "show_all") {
      setFilterUsers([...users]);
      setCurrentPage(1);
    } else if (filter === "follow") {
      const filteredUsers = users.filter(
        (user) => !followingIDs.includes(user.id)
      );

      setFilterUsers([...filteredUsers]);
      setCurrentPage(1);
    } else if (filter === "followings") {
      const filteredUsers = users.filter((user) =>
        followingIDs.includes(user.id)
      );

      setFilterUsers([...filteredUsers]);
      setCurrentPage(1);
    }
  }, [filter, users]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  useEffect(() => {
    const abortController = new AbortController();

    (async function fetch() {
      setStatus(Status.PENDING);
      try {
        const fetchedUsers = await fetchUsers(abortController);

        setUsers([...fetchedUsers]);
        setStatus(Status.RESOLVED);
      } catch (error) {
        setStatus(Status.REJECTED);
        console.log(error);
      }
    })();

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <TweetsPageContainer>
      {status === Status.REJECTED ? (
        <h2>
          An error occurred, we could not upload the data, please try reloading
          the page and try again :)
        </h2>
      ) : (
        <TweetsPageContent>
          <TweetsPageActivityWrap>
            <Button
              variant="contained"
              color="info"
              onClick={() => navigate("/")}
            >
              {"\u2190"} Back Home
            </Button>
            {status === Status.RESOLVED && (
              <CardFilter
                filter={filter}
                handleFilterChange={handleFilterChange}
              />
            )}
          </TweetsPageActivityWrap>
          {status === Status.PENDING && (
            <Box sx={{ margin: "0 auto" }}>
              <CircularProgress size={150} />
            </Box>
          )}
          {cardsOnCurrentPage.length === 0 && filter !== "show_all" ? (
            <h2>
              {filter === "followings"
                ? "There are no tweets you follow"
                : "You are subscribed to all suggested tweets"}
            </h2>
          ) : (
            status === Status.RESOLVED && (
              <>
                <CardList
                  users={cardsOnCurrentPage}
                  setFilterUsers={setFilterUsers}
                  filter={filter}
                />
                <Paginate
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  count={count}
                />
              </>
            )
          )}
        </TweetsPageContent>
      )}
    </TweetsPageContainer>
  );
};

export default Tweets;

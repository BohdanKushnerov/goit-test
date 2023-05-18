import { fetchUsers } from "../../services/fetchUsers";
import Card from "../Card/Card";
import { useEffect, useState } from "react";
import { CardList } from "./Tweets.styled";
import Status from "../../services/constants";
import { Box, CircularProgress, Pagination, Stack } from "@mui/material";

const Tweets = () => {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);
  const [page, setPage] = useState(1);

  useEffect(() => {
    JSON.parse(localStorage.getItem(`followingIDs`)) ??
      localStorage.setItem(`followingIDs`, JSON.stringify([]));
  }, []);

  useEffect(() => {
    const abortController = new AbortController();

    // IIFE
    (async function fetch() {
      setStatus(Status.PENDING);
      try {
        const fetchedUsers = await fetchUsers(page, abortController);

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
  }, [page]);

  const changePage = (_, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <CardList>
        {users &&
          users.length > 0 &&
          users.map((user) => (
            <li key={user.id}>
              <Card cardInfo={user} />
            </li>
          ))}
      </CardList>
      {status === Status.PENDING && (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}
      <Stack spacing={2}>
        <Pagination
          count={5}
          color="primary"
          page={page}
          onChange={changePage}
        />
      </Stack>
    </>
  );
};

export default Tweets;

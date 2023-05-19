import { useEffect, useState } from "react";
import { fetchUsers } from "../services/fetchUsers";
import Status from "../services/constants";
import useLocalStorageInitialization from "../hooks/useLocalStorageInitialization";
import CardFilter from "../components/CardFilter/CardFilter";
import { CardList } from "../components/CardList/CardList";
import Paginate from "../components/Pagination/Pagination";
import { Box, CircularProgress } from "@mui/material";

const Tweets = () => {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("show_all");
  const [filterUsers, setFilterUsers] = useState([]);
  useLocalStorageInitialization("followingIDs", []);

  const cardsPerPage = 4;
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const cardsOnCurrentPage = filterUsers.slice(
    indexOfFirstCard,
    indexOfLastCard
  );
  const count = Math.ceil(filterUsers.length / cardsPerPage);

  if (cardsOnCurrentPage.length === 0 && currentPage !== 1) {
    setCurrentPage((prev) => prev - 1);
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
    <>
      <CardFilter filter={filter} handleFilterChange={handleFilterChange} />
      {status === Status.PENDING ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : (
        <CardList
          users={cardsOnCurrentPage}
          setFilterUsers={setFilterUsers}
          filter={filter}
        />
      )}
      <Paginate
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        count={count}
      />
    </>
  );
};

export default Tweets;

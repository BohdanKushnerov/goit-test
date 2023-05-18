import { fetchUsers } from "../services/fetchUsers";
import { useEffect, useState } from "react";
import Status from "../services/constants";
import { Box, CircularProgress } from "@mui/material";
import { CardList } from "../components/CardList/CardList";
import Paginate from "../components/Pagination/Pagination";

const Tweets = () => {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);
  const [currentPage, setCurrentPage] = useState(1);

  const [filter, setFilter] = useState("show_all");
  const [filterUsers, setFilterUsers] = useState([]);

  useEffect(() => {
    const followingIDs = JSON.parse(localStorage.getItem("followingIDs"));

    if (filter === "show_all") {
      setFilterUsers([...users]);
      setCurrentPage(1);
    } else if (filter === "follow") {
      // не подписан
      const filteredUsers = users.filter(
        (user) => !followingIDs.includes(user.id)
      );

      setFilterUsers([...filteredUsers]);
      setCurrentPage(1);
    } else if (filter === "followings") {
      // подписан
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

  const cardsPerPage = 4;
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const cardsOnCurrentPage = filterUsers.slice(
    indexOfFirstCard,
    indexOfLastCard
  );
  const count = Math.ceil(filterUsers.length / cardsPerPage);

  useEffect(() => {
    JSON.parse(localStorage.getItem(`followingIDs`)) ??
      localStorage.setItem(`followingIDs`, JSON.stringify([]));
  }, []);

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

  const changePage = (_, newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <div>
        <select value={filter} onChange={handleFilterChange}>
          <option value="show_all">Show All</option>
          <option value="follow">Follow</option>
          <option value="followings">Followings</option>
        </select>
      </div>
      <CardList users={cardsOnCurrentPage} />
      {status === Status.PENDING && (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}
      <Paginate page={currentPage} changePage={changePage} count={count} />
    </>
  );
};

export default Tweets;

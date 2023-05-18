import { fetchUsers } from "../../services/FetchUsers";
import Card from "../Card/Card";
import { useEffect, useState } from "react";
import { FollowCardList } from "./CardList.styled";
import Status from "../../services/constants";

const CardList = () => {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);
  console.log(status);

  useEffect(() => {
    JSON.parse(localStorage.getItem(`followingIDs`)) ??
      localStorage.setItem(`followingIDs`, JSON.stringify([]));
  }, []);

  // console.log(users);

  useEffect(() => {
    const abortController = new AbortController();

    // IIFE
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
      <FollowCardList>
        {status === Status.PENDING && <p>Loading...</p>}
        {status === Status.RESOLVED &&
          users.map((user) => (
            <li key={user.id}>
              <Card cardInfo={user} />
            </li>
          ))}
      </FollowCardList>
    </>
  );
};

export default CardList;

import { fetchUsers } from "../../services/FetchUsers";
import Card from "../Card/Card";
import { useEffect, useState } from "react";
import { FollowCardList } from "./CardList.styled";

const CardList = () => {
  const [users, setUsers] = useState([]);

  console.log(users);

  useEffect(() => {
    const abortController = new AbortController();

    // IIFE
    (async function fetch() {
      // setStatus(Status.PENDING);
      try {
        const users = await fetchUsers(abortController);
        console.log(users);

        setUsers(users);

        // setStatus(Status.RESOLVED);
      } catch (error) {
        // setStatus(Status.REJECTED);

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
        {users && users.length > 0 ? (
          users.map((user) => (
            <li key={user.id}>
              <Card cardInfo={user} />
            </li>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </FollowCardList>
    </>
  );
};

export default CardList;

import PropTypes from "prop-types";
import { List } from "./CardList.styled";

import Card from "../Card/Card";

export const CardList = ({ users, setFilterUsers, filter }) => {
  return (
    <List>
      {users &&
        users.length > 0 &&
        users.map((user) => (
          <li key={user.id}>
            <Card
              cardInfo={user}
              setFilterUsers={setFilterUsers}
              filter={filter}
            />
          </li>
        ))}
    </List>
  );
};

CardList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  setFilterUsers: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};

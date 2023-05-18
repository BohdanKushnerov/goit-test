import PropTypes from "prop-types";
import { List } from "./CardList.styled";

import Card from "../Card/Card";

export const CardList = ({ users }) => {
  return (
    <List>
      {users &&
        users.length > 0 &&
        users.map((user) => (
          <li key={user.id}>
            <Card cardInfo={user} />
          </li>
        ))}
    </List>
  );
};

CardList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
};

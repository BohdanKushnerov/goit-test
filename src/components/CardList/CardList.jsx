import PropTypes from "prop-types";
import Card from "../Card/Card";
import { List } from "./CardList.styled";

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

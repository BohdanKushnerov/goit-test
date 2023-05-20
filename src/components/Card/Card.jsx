import PropTypes from "prop-types";
import { useState } from "react";
import Status from "../../constants/constants";
import formattedNumber from "../../utils/formattedNumber";
import { fetchFollowingUser } from "../../services/fetchFollowingUser";
import { fetchFollowUser } from "../../services/fetchFollowUser";
import useIsFollowingCard from "../../hooks/useIsFollowingCard";
import updateStorageFollowingIDs from "../../hooks/updateStorageFollowingIDs";
import {
  Avatar,
  Button,
  FollowCard,
  Followers,
  Line,
  Logo,
  Picture,
  Tweets,
} from "./Card.styled";
import picture from "../../assets/picture.png";
import logo from "../../assets/picture.png";

const Card = ({ cardInfo, setFilterUsers, filter }) => {
  const [state, setState] = useState(cardInfo);
  const [status, setStatus] = useState(Status.IDLE);
  const [isFollowing, setIsFollowing] = useIsFollowingCard(state.id);

  const handleFollowClick = async () => {
    setStatus(Status.PENDING);
    try {
      if (!isFollowing) {
        const followers = await fetchFollowUser(state);
        setState((prevState) => ({
          ...prevState,
          followers,
        }));

        if (filter !== "show_all") {
          setFilterUsers((prevState) =>
            prevState.filter((user) => user.id !== state.id)
          );
        }

        updateStorageFollowingIDs(state.id, isFollowing);
        setIsFollowing(true);
        setStatus(Status.RESOLVED);
      } else {
        const followers = await fetchFollowingUser(state);
        setState((prevState) => ({
          ...prevState,
          followers,
        }));

        if (filter !== "show_all") {
          setFilterUsers((prevState) =>
            prevState.filter((user) => user.id !== state.id)
          );
        }

        updateStorageFollowingIDs(state.id, isFollowing);
        setIsFollowing(false);
        setStatus(Status.RESOLVED);
      }
    } catch (error) {
      setStatus(Status.REJECTED);
      console.log(error);
    }
  };

  return (
    <FollowCard>
      <Logo src={logo} alt="logo" />
      <Picture src={picture} alt="picture" />
      <Avatar imageUrl={state.avatar}></Avatar>
      <Line></Line>
      <Tweets>{state.tweets} Tweets</Tweets>
      <Followers>{formattedNumber(state.followers)} Followers</Followers>
      <Button
        isFollowing={isFollowing}
        onClick={handleFollowClick}
        disabled={status === Status.PENDING}
      >
        {isFollowing ? "Following" : "Follow"}
      </Button>
    </FollowCard>
  );
};

Card.propTypes = {
  cardInfo: PropTypes.shape({
    user: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    tweets: PropTypes.number.isRequired,
    followers: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  setFilterUsers: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};

export default Card;

import PropTypes from "prop-types";

import picture from "../../img/picture.png";
import logo from "../../img/logo.png";

import {
  Avatar,
  Button,
  FollowCard,
  Followers,
  Line,
  Tweets,
} from "./Card.styled";
import axios from "axios";
import { useEffect, useState } from "react";
import Status from "../../services/constants";
import formattedNumber from "../../services/formattedNumber";

const useIsFollowing = (cardID) => {
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const followingIDs = JSON.parse(localStorage.getItem("followingIDs"));
    setIsFollowing(followingIDs.some((id) => id === cardID));
  }, [cardID]);

  return [isFollowing, setIsFollowing];
};

const updateStorageFollowingIDs = (ID, isFollowing) => {
  const followingIDs = JSON.parse(localStorage.getItem("followingIDs")) || [];

  if (!isFollowing) {
    localStorage.setItem("followingIDs", JSON.stringify([...followingIDs, ID]));
  } else {
    const newArr = followingIDs.filter((id) => id !== ID);
    localStorage.setItem("followingIDs", JSON.stringify([...newArr]));
  }
};

const Card = ({ cardInfo, setFilterUsers, filter }) => {
  const [state, setState] = useState(cardInfo);
  const [status, setStatus] = useState(Status.IDLE);
  const [isFollowing, setIsFollowing] = useIsFollowing(state.id);

  console.log("Render card ", state.id);

  const handleFollowClick = async () => {
    setStatus(Status.PENDING);
    try {
      if (!isFollowing) {
        const res = await axios.put(`/users/${state.id}`, {
          ...state,
          followers: (state.followers += 1),
        });
        setState((prevState) => ({
          ...prevState,
          followers: res.data.followers,
        }));

        // ========================
        if (filter !== "show_all") {
          setFilterUsers((prevState) =>
            prevState.filter((user) => user.id !== state.id)
          );
        }
        // ========================

        updateStorageFollowingIDs(state.id, isFollowing);
        setIsFollowing(true);
        setStatus(Status.RESOLVED);
      } else {
        const res = await axios.put(`/users/${state.id}`, {
          ...state,
          followers: (state.followers -= 1),
        });
        setState((prevState) => ({
          ...prevState,
          followers: res.data.followers,
        }));

        // ========================
        if (filter !== "show_all") {
          setFilterUsers((prevState) =>
            prevState.filter((user) => user.id !== state.id)
          );
        }
        // ========================

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
      <img
        src={picture}
        alt="picture"
        style={{
          position: "absolute",
          width: 308,
          height: 168,
          left: 36,
          top: 28,
        }}
      />
      <img
        src={logo}
        alt="logo"
        style={{
          position: "absolute",
          width: 76,
          height: 22,
          left: 20,
          top: 20,
        }}
      />
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

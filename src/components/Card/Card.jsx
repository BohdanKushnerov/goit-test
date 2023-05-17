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

const Card = ({ cardInfo }) => {
  const [state, setState] = useState(cardInfo);
  const [isFollowing, setIsFollowing] = useState(() => {
    return (
      JSON.parse(localStorage.getItem(`followingStatus_${state.id}`)) ?? false
    );
  });

  useEffect(() => {
    localStorage.setItem(`followingStatus_${state.id}`, isFollowing.toString());
  }, [isFollowing, state.id]);

  const handleFollowClick = async () => {
    try {
      if (!isFollowing) {
        const res = await axios.put(`/users/${state.id}`, {
          ...state,
          followers: (state.followers += 1),
        });
        console.log(res);
        setState(res.data);
        setIsFollowing(true);
      } else {
        const res = await axios.put(`/users/${state.id}`, {
          ...state,
          followers: (state.followers -= 1),
        });
        console.log(res);
        setState(res.data);
        setIsFollowing(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formattedNumber = state.followers.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

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
      <Followers>{formattedNumber} Followers</Followers>
      <Button isFollowing={isFollowing} onClick={handleFollowClick}>
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
};

export default Card;

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

const Card = ({ user }) => {
  const [state, setState] = useState(user);
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
      <Followers>{state.followers} Followers</Followers>
      <Button onClick={handleFollowClick}>
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
    </FollowCard>
  );
};

Card.propTypes = {
  user: PropTypes.shape({}).isRequired,
};

export default Card;

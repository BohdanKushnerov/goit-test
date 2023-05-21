import PropTypes from "prop-types";
import { useState } from "react";
import { picture, logo } from "assets/images";
import Status from "constants";
import { useIsFollowingCard } from "hooks";
import { fetchFollowingUser, fetchFollowUser } from "services";
import { formattedNumber, updateStorageFollowingIDs } from "utils";
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
import { Box, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";

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
        disabled={status === Status.PENDING || status === Status.REJECTED}
      >
        {status === Status.REJECTED ? (
          <div>Error...</div>
        ) : (
          <>
            {status !== Status.PENDING && (
              <Box>{isFollowing ? "Following" : "Follow"}</Box>
            )}
            {status === Status.PENDING && (
              <Box>
                <CircularProgress size={24} />
              </Box>
            )}
          </>
        )}
      </Button>
      {status === Status.REJECTED &&
        toast.error(
          "Error...please check your internet connection and reload page!"
        )}
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

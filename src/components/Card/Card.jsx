import PropTypes from "prop-types";
import { useState } from "react";
import { picture, logo } from "assets/images";
import Status from "constants";
import { useIsFollowingCard } from "hooks";
import { fetchFollowingUser, fetchFollowUser } from "services";
import { formattedNumber, updateStorageFollowingIDs } from "utils";
import {
  Avatar,
  FollowCard,
  Followers,
  Line,
  Logo,
  Picture,
  Tweets,
} from "./Card.styled";
import { toast } from "react-toastify";
import FollowButton from "components/FollowButton";

const Card = ({ cardInfo, setFilterUsers, filter }) => {
  const [currentCardUser, setCurrentCardUser] = useState(cardInfo);
  const [status, setStatus] = useState(Status.IDLE);
  const [isFollowing, setIsFollowing] = useIsFollowingCard(currentCardUser.id);

  console.log("rerender ", currentCardUser.id);

  const handleFollowClick = async () => {
    setStatus(Status.PENDING);
    try {
      if (!isFollowing) {
        const followers = await fetchFollowUser(currentCardUser);
        setCurrentCardUser((prevState) => ({
          ...prevState,
          followers,
        }));

        if (filter !== "show_all") {
          setFilterUsers((prevState) =>
            prevState.filter((user) => user.id !== currentCardUser.id)
          );
        }

        updateStorageFollowingIDs(currentCardUser.id, isFollowing);
        setIsFollowing(true);
        setStatus(Status.RESOLVED);
      } else {
        const followers = await fetchFollowingUser(currentCardUser);
        setCurrentCardUser((prevState) => ({
          ...prevState,
          followers,
        }));

        if (filter !== "show_all") {
          setFilterUsers((prevState) =>
            prevState.filter((user) => user.id !== currentCardUser.id)
          );
        }

        updateStorageFollowingIDs(currentCardUser.id, isFollowing);
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
      <Avatar imageUrl={currentCardUser.avatar}></Avatar>
      <Line></Line>
      <Tweets>{currentCardUser.tweets} Tweets</Tweets>
      <Followers>
        {formattedNumber(currentCardUser.followers)} Followers
      </Followers>
      <FollowButton
        isFollowing={isFollowing}
        handleFollowClick={handleFollowClick}
        status={status}
      />
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

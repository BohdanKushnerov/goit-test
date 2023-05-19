import { useEffect, useState } from "react";

const useIsFollowingCard = (cardID) => {
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const followingIDs = JSON.parse(localStorage.getItem("followingIDs"));
    setIsFollowing(followingIDs.some((id) => id === cardID));
  }, [cardID]);

  return [isFollowing, setIsFollowing];
};

export default useIsFollowingCard;

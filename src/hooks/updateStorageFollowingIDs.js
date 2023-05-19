const updateStorageFollowingIDs = (ID, isFollowing) => {
  const followingIDs = JSON.parse(localStorage.getItem("followingIDs")) || [];

  if (!isFollowing) {
    localStorage.setItem("followingIDs", JSON.stringify([...followingIDs, ID]));
  } else {
    const newArr = followingIDs.filter((id) => id !== ID);
    localStorage.setItem("followingIDs", JSON.stringify([...newArr]));
  }
};

export default updateStorageFollowingIDs;

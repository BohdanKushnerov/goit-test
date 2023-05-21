import PropTypes from "prop-types";
import Status from "constants";
import { Button } from "./FollowButton.styled";
import { Box, CircularProgress } from "@mui/material";

const FollowButton = ({ isFollowing, handleFollowClick, status }) => {
  return (
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
  );
};

FollowButton.propTypes = {
  isFollowing: PropTypes.bool.isRequired,
  handleFollowClick: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
};

export default FollowButton;

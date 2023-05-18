import { styled } from "@mui/material";

export const FollowCard = styled("div")({
  position: "relative",
  background:
    "linear-gradient(114.99deg, #471CA9 -0.99%, #5736A3 54.28%, #4B2A99 78.99%)",
  width: 380,
  height: 460,
  borderRadius: "20px",
  textAlign: "center",

  // padding: '28px 36px',

  // backgroundImage: `url(${picture})`,
  // backgroundSize: 'cover',
  // backgroundRepeat: 'no-repeat',
  // backgroundPosition: 'center',
});

export const Line = styled("div")({
  position: "absolute",
  top: 214,
  left: 0,
  // transform: 'translateX(-50%)',
  width: 380,
  height: 8,
  backgroundColor: "#EBD8FF",
  boxShadow:
    "0px 3.43693px 3.43693px rgba(0, 0, 0, 0.06), inset 0px -1.71846px 3.43693px #AE7BE3, inset 0px 3.43693px 2.5777px #FBF8FF",
});

export const Avatar = styled("div")(({ imageUrl }) => ({
  position: "absolute",
  top: "48%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 80,
  height: 80,

  zIndex: 1,
  background: "#5736A3",
  border: "8px solid #EBD8FF",
  borderRadius: "50%",
  backgroundImage: `url("${imageUrl}")`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
}));

export const Button = styled("button")(({ isFollowing }) => ({
  position: "absolute",
  left: 92,
  top: 374,
  width: 196,
  height: 50,

  fontFamily: "inherit",
  fontWeight: 600,
  textTransform: "uppercase",
  fontSize: "18px",
  lineHeight: "22px",
  background: isFollowing ? "#5CD3A8" : "#EBD8FF",
  boxShadow: "0px 3.43693px 3.43693px rgba(0, 0, 0, 0.25)",
  border: "none",
  borderRadius: "10.3108px",
}));

export const Tweets = styled("p")({
  position: "absolute",
  top: 284,
  // left: 124,
  left: "50%",
  transform: "translateX(-50%)",

  fontWeight: 500,
  fontSize: "20px",
  lineHeight: "24px",
  textTransform: "uppercase",
  color: "#EBD8FF",
});

export const Followers = styled("p")({
  position: "absolute",
  top: 324,
  // left: 83,
  left: "50%",
  transform: "translateX(-50%)",
  width: 214,

  // fontWeight: 500,
  fontSize: "20px",
  lineHeight: "24px",
  textTransform: "uppercase",
  color: "#EBD8FF",
});

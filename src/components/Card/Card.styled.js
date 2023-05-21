import { styled } from "@mui/material";

export const Logo = styled("img")({
  position: "absolute",
  width: 76,
  height: 22,
  left: 20,
  top: 20,
});

export const Picture = styled("img")({
  position: "absolute",
  width: 308,
  height: 168,
  left: 36,
  top: 28,
});

export const FollowCard = styled("div")({
  position: "relative",
  background:
    "linear-gradient(114.99deg, #471CA9 -0.99%, #5736A3 54.28%, #4B2A99 78.99%)",
  width: 380,
  height: 460,
  borderRadius: "20px",
  textAlign: "center",
});

export const Line = styled("div")({
  position: "absolute",
  top: 214,
  left: 0,
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

export const Tweets = styled("p")({
  position: "absolute",
  top: 284,
  left: "50%",
  transform: "translateX(-50%)",

  fontSize: "20px",
  lineHeight: "24px",
  textTransform: "uppercase",
  color: "#EBD8FF",
});

export const Followers = styled("p")({
  position: "absolute",
  top: 324,
  left: "50%",
  transform: "translateX(-50%)",
  width: 214,

  fontSize: "20px",
  lineHeight: "24px",
  textTransform: "uppercase",
  color: "#EBD8FF",
});

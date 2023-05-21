import { styled } from "@mui/material";

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

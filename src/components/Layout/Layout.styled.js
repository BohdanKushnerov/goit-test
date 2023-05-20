import { styled } from "@mui/material";

import { NavLink } from "react-router-dom";

export const NavList = styled("ul")({
  display: "flex",
  gap: 16,
});

export const StyledNavLink = styled(NavLink)({
  fontWeight: 700,
  fontSize: 26,
  color: "black",
  textDecoration: "none",

  "&.active": {
    color: "orangered",
  },

  ":hover": {
    color: "gray",
  },
});

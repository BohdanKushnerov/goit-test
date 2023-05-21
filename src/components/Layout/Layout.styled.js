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
  border: "1px solid black",
  textDecoration: "none",
  borderRadius: 3,

  "&.active": {
    color: "orangered",
    border: "1px solid orangered",
  },

  ":hover": {
    color: "#b2e395",
    border: "1px solid #b2e395",
    boxShadow:
      "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.14) 0px 2px 1px, rgba(0, 0, 0, 0.2) 0px 2px 2px",
  },
});

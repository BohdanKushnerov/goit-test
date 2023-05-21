import { GlobalStyles as MuiGlobalStyles, css } from "@mui/material";

const GlobalStyles = () => (
  <MuiGlobalStyles
    styles={css`
      body {
        margin: 0;
        padding: 16px;

        font-family: "Montserrat", sans-serif;
        font-style: normal;
        font-weight: 500;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: #fffdef;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      p {
        margin: 0;
      }

      ul {
        margin: 0;
        padding: 0;
        list-style: none;
      }

      img {
        display: block;
        max-width: 100%;
        height: auto;
      }
    `}
  />
);

export default GlobalStyles;

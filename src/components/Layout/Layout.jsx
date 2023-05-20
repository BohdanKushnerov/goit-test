import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { NavList, StyledNavLink } from "./Layout.styled";

const Layout = () => {
  return (
    <div>
      <header>
        <nav>
          <NavList>
            <li>
              <StyledNavLink to="/">Home</StyledNavLink>
            </li>
            <li>
              <StyledNavLink to="/tweets">Tweets</StyledNavLink>
            </li>
          </NavList>
        </nav>
      </header>
      <main>
        <section>
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </section>
      </main>
    </div>
  );
};

export default Layout;

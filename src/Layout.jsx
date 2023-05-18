import { Suspense } from "react";
import { NavLink, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/tweets">Tweets</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <div>
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </div>
      </main>
    </div>
  );
};

export default Layout;

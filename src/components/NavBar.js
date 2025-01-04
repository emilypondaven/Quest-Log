import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav>
      <NavLink
        to="/"
        style={({ isActive }) => ({ color: isActive ? 'var(--pink)' : 'black ' })}
      >
        Daily Stuff
      </NavLink>

      <NavLink
        to="/focus"
        style={({ isActive }) => ({ color: isActive ? 'var(--pink)' : 'black ' })}
      >
        Right Now
      </NavLink>
    </nav>
  );
}

export default NavBar;
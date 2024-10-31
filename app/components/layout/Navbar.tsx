import { NavLink } from "@remix-run/react";
import { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import type { ReactNode } from "react";

const NavMenuItems = ({ children }: { children: ReactNode }) => {
  return (
    <MenuItems
      anchor="bottom start"
      transition
      className="w-52 origin-top-right rounded-xl border border-white/5 bg-white p-1 text-sm/6 text-black transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 z-50"
    >
      {children}
    </MenuItems>
  );
};

const Navbar = () => {
  return (
    <nav className="bg-accent fixed top-0 w-screen px-6 h-11 flex justify-between items-center z-50">
      <ul className="flex flex-row space-x-6 items-center ml-6 text-white">
        <li>
          <NavLink to="/">
            <img src="/images/logo192.png" alt="" className="w-auto h-8" />
            <span className="sr-only">Link to Home</span>
          </NavLink>
        </li>

        <li className="text-xl">
          <NavLink to="/">OpenWorld Atlanta</NavLink>
        </li>

        <li>
          <Menu>
            <MenuButton as={Fragment}>
              {({ active }) => (
                <button>
                  Buildings
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    rotation={active ? undefined : 180}
                    className="transition-transform duration-100 ease-out ml-2"
                  />
                </button>
              )}
            </MenuButton>
            <NavMenuItems>
              <MenuItem>
                {({ close }) => (
                  <NavLink
                    to="/buildings/1928"
                    className={({ isActive }) =>
                      `group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-accent/50 hover:bg-accent/50 ${isActive ? "bg-accent text-white" : ""}`
                    }
                  >
                    1928
                  </NavLink>
                )}
              </MenuItem>
            </NavMenuItems>
          </Menu>
        </li>
        <li>
          <Menu>
            <MenuButton as={Fragment}>
              {({ active }) => (
                <button>
                  Boundaries
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    rotation={active ? undefined : 180}
                    className="transition-transform duration-100 ease-out ml-2"
                  />
                </button>
              )}
            </MenuButton>
            <NavMenuItems>
              <MenuItem>
                {({ close }) => (
                  <NavLink
                    to="/annexations"
                    className={({ isActive }) =>
                      `group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-accent/50 hover:bg-accent/50 ${isActive ? "bg-accent text-white" : ""}`
                    }
                  >
                    Annexations
                  </NavLink>
                )}
              </MenuItem>
            </NavMenuItems>
          </Menu>
        </li>
        <li>
          <Menu>
            <MenuButton as={Fragment}>
              {({ active }) => (
                <button>
                  Transportation
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    rotation={active ? undefined : 180}
                    className="transition-transform duration-100 ease-out ml-2"
                  />
                </button>
              )}
            </MenuButton>
            <NavMenuItems>
              <MenuItem>
                {({ close }) => (
                  <NavLink
                    to="/streetcars/1928"
                    className={({ isActive }) =>
                      `group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-accent/50 hover:bg-accent/50 ${isActive ? "bg-accent text-white" : ""}`
                    }
                  >
                    Streetcars 1928
                  </NavLink>
                )}
              </MenuItem>
            </NavMenuItems>
          </Menu>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

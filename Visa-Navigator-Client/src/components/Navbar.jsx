import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { ThemeContext } from "../provider/ThemeProvider";
import { Tooltip } from "react-tooltip";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

export default function Navbar() {
  const { user, logOut } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const openSidebar = () => {
    document.getElementById("sidebar").style.transform = "translateX(-16rem)";
  };
  const closeSidebar = () => {
    document.getElementById("sidebar").style.transform = "translateX(16rem)";
  };
  return (
    <nav
      className={`${theme === "light" ? "" : "dark"} sticky top-0 z-50 bg-[#F6F4EB] dark:bg-gray-900`}
    >
      <section className="mx-auto flex w-11/12 max-w-screen-2xl items-center justify-between gap-4 py-4">
        <div className="flex items-center justify-center gap-2">
          <img
            src="/visa-navigator-logo-48.png"
            className="h-8"
            alt="Visa Navigator Logo"
          />
          <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
            Visa Navigator
          </span>
        </div>
        <div className="hidden items-center justify-center gap-8 whitespace-nowrap lg:flex dark:text-white">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "active font-semibold text-[#4682A9] underline decoration-[#4682A9] decoration-2 underline-offset-4"
                : ""
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/all-visas"
            className={({ isActive }) =>
              isActive
                ? "active font-semibold text-[#4682A9] underline decoration-[#4682A9] decoration-2 underline-offset-4"
                : ""
            }
          >
            All Visas
          </NavLink>
          <NavLink
            to="/add-visa"
            className={({ isActive }) =>
              isActive
                ? "active font-semibold text-[#4682A9] underline decoration-[#4682A9] decoration-2 underline-offset-4"
                : ""
            }
          >
            Add Visa
          </NavLink>
          <NavLink
            to="/my-added-visas"
            className={({ isActive }) =>
              isActive
                ? "active font-semibold text-[#4682A9] underline decoration-[#4682A9] decoration-2 underline-offset-4"
                : ""
            }
          >
            My Added Visas
          </NavLink>
          <NavLink
            to="/my-visa-applications"
            className={({ isActive }) =>
              isActive
                ? "active font-semibold text-[#4682A9] underline decoration-[#4682A9] decoration-2 underline-offset-4"
                : ""
            }
          >
            My Visa Applications
          </NavLink>
        </div>
        <div className="hidden items-center justify-center gap-4 lg:flex">
          <input
            type="checkbox"
            className="toggle"
            checked={theme === "dark"}
            onChange={toggleTheme}
            data-tooltip-id="toggle-tooltip"
            data-tooltip-content="Toggle Theme"
          />
          <Tooltip id="toggle-tooltip" />

          {user && user?.email ? (
            <div className="group relative flex items-center gap-2">
              <div>
                <img src={user?.photoURL} alt="" className="h-8 w-8 rounded" />
              </div>
              <div className="absolute right-0 top-full hidden w-72 rounded bg-white p-4 shadow group-hover:block dark:bg-gray-800 dark:text-white">
                <div className="space-y-4">
                  <p className="whitespace-nowrap font-semibold">
                    {user?.displayName}
                  </p>
                  <button
                    onClick={logOut}
                    className="w-full rounded border border-[#4682A9] px-3 py-1 text-center text-[#4682A9]"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-4">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "active rounded border-[#4682A9] bg-[#4682A9] px-3 py-1 font-semibold text-white"
                    : "rounded border border-[#4682A9] px-3 py-1 text-[#4682A9]"
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive
                    ? "active rounded border-[#4682A9] bg-[#4682A9] px-3 py-1 font-semibold text-white"
                    : "rounded border border-[#4682A9] px-3 py-1 text-[#4682A9]"
                }
              >
                Register
              </NavLink>
            </div>
          )}
        </div>
        <div className="lg:hidden">
          <button
            className="flex h-8 w-8 items-center justify-center text-3xl dark:text-white"
            onClick={openSidebar}
          >
            <FiMenu />
          </button>
        </div>
      </section>

      {/* sidebar */}
      <section
        id="sidebar"
        className="fixed -right-64 bottom-0 top-0 z-50 flex h-screen w-64 flex-col gap-4 bg-[#F6F4EB] p-10 shadow transition duration-500 lg:hidden dark:bg-gray-900 dark:text-white"
      >
        <div>
          <button
            className="absolute right-4 top-4 h-8 w-8 text-3xl dark:text-white"
            onClick={closeSidebar}
          >
            <IoClose />
          </button>
        </div>
        <div className="flex h-full flex-col gap-4">
          <div className="flex flex-grow flex-col gap-4">
            <NavLink
              to="/"
              onClick={closeSidebar}
              className={({ isActive }) =>
                isActive
                  ? "active font-semibold text-[#4682A9] underline decoration-[#4682A9] decoration-2 underline-offset-4"
                  : ""
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/all-visas"
              onClick={closeSidebar}
              className={({ isActive }) =>
                isActive
                  ? "active font-semibold text-[#4682A9] underline decoration-[#4682A9] decoration-2 underline-offset-4"
                  : ""
              }
            >
              All Visas
            </NavLink>
            <NavLink
              to="/add-visa"
              onClick={closeSidebar}
              className={({ isActive }) =>
                isActive
                  ? "active font-semibold text-[#4682A9] underline decoration-[#4682A9] decoration-2 underline-offset-4"
                  : ""
              }
            >
              Add Visa
            </NavLink>
            <NavLink
              to="/my-added-visas"
              onClick={closeSidebar}
              className={({ isActive }) =>
                isActive
                  ? "active font-semibold text-[#4682A9] underline decoration-[#4682A9] decoration-2 underline-offset-4"
                  : ""
              }
            >
              My Added Visas
            </NavLink>
            <NavLink
              to="/my-visa-applications"
              onClick={closeSidebar}
              className={({ isActive }) =>
                isActive
                  ? "active font-semibold text-[#4682A9] underline decoration-[#4682A9] decoration-2 underline-offset-4"
                  : ""
              }
            >
              My Visa Applications
            </NavLink>
          </div>
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              Toogle Theme
              <input
                type="checkbox"
                className="toggle"
                checked={theme === "dark"}
                onChange={toggleTheme}
              />
            </div>
            {user && user?.email ? (
              <div className="space-y-4">
                <div>
                  <img
                    src={user?.photoURL}
                    alt=""
                    className="h-12 w-12 rounded"
                  />
                </div>
                <p className="font-semibold">{user?.displayName}</p>
                <button
                  onClick={logOut}
                  className="w-full rounded border border-[#4682A9] px-3 py-1 text-center text-[#4682A9]"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <NavLink
                  to="/login"
                  onClick={closeSidebar}
                  className={({ isActive }) =>
                    isActive
                      ? "active rounded border-[#4682A9] bg-[#4682A9] px-3 py-1 text-center font-semibold text-white"
                      : "rounded border border-[#4682A9] px-3 py-1 text-center text-[#4682A9]"
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  onClick={closeSidebar}
                  className={({ isActive }) =>
                    isActive
                      ? "active rounded border-[#4682A9] bg-[#4682A9] px-3 py-1 text-center font-semibold text-white"
                      : "rounded border border-[#4682A9] px-3 py-1 text-center text-[#4682A9]"
                  }
                >
                  Register
                </NavLink>
              </div>
            )}
          </section>
        </div>
      </section>
    </nav>
  );
}

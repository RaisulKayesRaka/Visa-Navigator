import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosCall } from "react-icons/io";
import { IoMail } from "react-icons/io5";
import { ThemeContext } from "../provider/ThemeProvider";
import { useContext } from "react";
export default function Footer() {
  const { theme } = useContext(ThemeContext);
  return (
    <footer
      className={`${theme === "light" ? "" : "dark"} bg-[#F6F4EB] dark:bg-gray-900 dark:text-white`}
    >
      <div className="mx-auto w-11/12 max-w-screen-2xl">
        <div className="flex flex-col items-center justify-between gap-4 py-4 sm:flex-row">
          <div className="flex items-center justify-center gap-2">
            <img
              src="/visa-navigator-logo-48.png"
              className="h-8"
              alt="Visa Navigator Logo"
            />
            <span className="self-center whitespace-nowrap text-2xl font-semibold">
              Visa Navigator
            </span>
          </div>
          <div className="flex flex-col items-center justify-center lg:flex-row lg:gap-8">
            <div className="flex items-center gap-2">
              <FaLocationDot />
              <p>Dhaka, Bangladesh</p>
            </div>
            <div className="flex items-center gap-2">
              <IoIosCall />
              <p>+880123456789</p>
            </div>
            <div className="flex items-center gap-2">
              <IoMail />
              <p>info@visanavigator.com</p>
            </div>
          </div>
        </div>
        <hr />
        <div className="flex flex-col-reverse items-center justify-between gap-4 py-4 sm:flex-row">
          <div>
            <p>&copy; Copyright 2024. All rights reserved.</p>
          </div>
          <div className="flex gap-4">
            <FaTwitter />
            <FaFacebook />
            <FaLinkedin />
          </div>
        </div>
      </div>
    </footer>
  );
}

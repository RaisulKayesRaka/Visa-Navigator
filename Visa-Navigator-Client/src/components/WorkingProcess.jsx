import { FaTelegramPlane } from "react-icons/fa";
import { useContext } from "react";
import { ThemeContext } from "../provider/ThemeProvider";

export default function WorkingProcess() {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <section
        className={`${theme === "light" ? "" : "dark"} py-12 dark:bg-gray-800 dark:text-white`}
      >
        <div className="mx-auto w-11/12 max-w-screen-2xl">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-[#4682A9]">
              <FaTelegramPlane />
              <h3 className="font-semibold">Our Working Process</h3>
            </div>
            <h2 className="text-2xl font-semibold">
              Simplifying Your Visa Journey in Just Three Steps
            </h2>
          </div>
          <div className="h-8"></div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            <div className="relative rounded border p-6">
              <h3 className="mb-4 w-11/12 text-xl font-semibold">
                Discover Your Requirements
              </h3>
              <p>
                Understand the visa requirements for your destination country
                with our easy-to-navigate portal.
              </p>
              <div className="absolute right-2 top-2 flex h-12 w-12 items-center justify-center rounded bg-[#4682A9]">
                <span className="text-lg font-semibold text-white">1</span>
              </div>
            </div>
            <div className="relative rounded border p-6">
              <h3 className="mb-4 w-11/12 text-xl font-semibold">
                Submit Your Application
              </h3>
              <p>
                Submit your application online with clear instructions and
                guidance at every step.
              </p>
              <div className="absolute right-2 top-2 flex h-12 w-12 items-center justify-center rounded bg-[#4682A9]">
                <span className="text-lg font-semibold text-white">2</span>
              </div>
            </div>
            <div className="relative rounded border p-6">
              <h3 className="mb-4 w-11/12 text-xl font-semibold">
                Receive Your Visa
              </h3>
              <p>
                Receive your visa approval and be ready to embark on your
                journey!
              </p>
              <div className="absolute right-2 top-2 flex h-12 w-12 items-center justify-center rounded bg-[#4682A9]">
                <span className="text-lg font-semibold text-white">3</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

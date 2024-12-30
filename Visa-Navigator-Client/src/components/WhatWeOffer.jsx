import { FaTelegramPlane } from "react-icons/fa";
import { useContext } from "react";
import { ThemeContext } from "../provider/ThemeProvider";

export default function WhatWeOffer() {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <section
        className={`${theme === "light" ? "" : "dark"} py-12 dark:bg-gray-800 dark:text-white`}
      >
        <section className="mx-auto w-11/12 max-w-screen-2xl">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-[#4682A9]">
              <FaTelegramPlane />
              <h3 className="font-semibold">What We Offer</h3>
            </div>
            <h2 className="text-2xl font-semibold">
              Simplifying Your Journey with Tailored Visa Solutions
            </h2>
          </div>
          <div className="h-8"></div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div className="rounded border p-6">
              <h3 className="mb-4 text-xl font-semibold">
                Comprehensive Visa Information
              </h3>
              <p>
                Access detailed and accurate visa requirements for countries
                around the globe, tailored to your travel needs.
              </p>
            </div>
            <div className="rounded border p-6">
              <h3 className="mb-4 text-xl font-semibold">
                Easy Application Process
              </h3>
              <p>
                Seamlessly apply for visas online with our user-friendly forms
                and guided steps.
              </p>
            </div>

            <div className="rounded border p-6">
              <h3 className="mb-4 text-xl font-semibold">
                Personalized Support
              </h3>
              <p>
                Get assistance from our dedicated support team to address all
                your visa-related queries.
              </p>
            </div>
            <div className="rounded border p-6">
              <h3 className="mb-4 text-xl font-semibold">Fast and Reliable</h3>
              <p>
                Enjoy swift processing times and reliable updates, ensuring
                you’re always on schedule.
              </p>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}

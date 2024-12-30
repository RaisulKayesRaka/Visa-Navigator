import { FaTelegramPlane } from "react-icons/fa";
import { Link } from "react-router-dom";
import { VisaContext } from "../provider/VisaProvider";
import { useContext } from "react";
import { ThemeContext } from "../provider/ThemeProvider";
import { Bounce } from "react-awesome-reveal";

export default function LatestVisas() {
  const { visas } = useContext(VisaContext);
  const { theme } = useContext(ThemeContext);

  const latestVisas = visas
    .slice()
    .sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate))
    .slice(0, 6);
  return (
    <section
      className={`${theme === "light" ? "" : "dark"} py-12 dark:bg-gray-800 dark:text-white`}
    >
      <div className="mx-auto w-11/12 max-w-screen-2xl">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-[#4682A9]">
            <FaTelegramPlane />
            <h3 className="font-semibold">Latest Visas</h3>
          </div>

          <h2 className="text-2xl font-semibold">
            Explore the Newest Visa Opportunities Worldwide
          </h2>
        </div>
        <div className="h-8"></div>
        <section className="gird-cols-1 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {latestVisas.map((visa) => (
            <Bounce key={visa.id}>
              <section key={visa._id} className="rounded border p-4">
                <img
                  src={visa.countryImage}
                  alt={visa.countryName}
                  className="h-48 w-full rounded object-cover"
                />
                <h3 className="p-2 text-center text-lg font-semibold text-[#4682A9]">
                  {visa.countryName}
                </h3>
                <hr />
                <div className="my-2 flex justify-between">
                  <p className="font-semibold">Visa type</p>
                  <p>{visa.visaType}</p>
                </div>
                <hr />
                <div className="my-2 flex justify-between">
                  <p className="font-semibold">Procession time</p>
                  <p>{visa.processingTime}</p>
                </div>
                <hr />
                <div className="my-2 flex justify-between">
                  <p className="font-semibold">Fee</p>
                  <p>${visa.fee}</p>
                </div>
                <hr />
                <div className="my-2 flex justify-between">
                  <p className="font-semibold">Validity</p>
                  <p>{visa.validity}</p>
                </div>
                <hr />
                <div className="my-2 flex justify-between">
                  <p className="font-semibold">Application Mathod</p>
                  <p>{visa.applicationMethod}</p>
                </div>
                <div className="mt-4">
                  <Link
                    to={`/visa-details/${visa._id}`}
                    className="block w-full rounded bg-[#4682A9] py-2 text-center text-white"
                  >
                    See Details
                  </Link>
                </div>
              </section>
            </Bounce>
          ))}
        </section>
        <div className="h-8"></div>

        <Link
          to="/all-visas"
          className="block w-full rounded border border-[#4682A9] p-1 text-center font-semibold text-[#4682A9]"
        >
          See all visas
        </Link>
      </div>
    </section>
  );
}

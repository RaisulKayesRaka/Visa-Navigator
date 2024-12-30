import { useContext, useState } from "react";
import { VisaContext } from "../provider/VisaProvider";
import { Link } from "react-router-dom";
import { Bounce } from "react-awesome-reveal";
import { Helmet } from "react-helmet-async";

export default function AllVisas() {
  const { visas } = useContext(VisaContext);
  const [selectedVisaType, setSelectedVisaType] = useState("");

  const handleFilter = (e) => {
    e.preventDefault();
    setSelectedVisaType(e.target.value);
  };

  const filteredVisas = selectedVisaType
    ? visas.filter((visa) => visa.visaType === selectedVisaType)
    : visas;

  return (
    <>
      <Helmet>
        <title>All Visas | Visa Navigator</title>
      </Helmet>
      <section className="py-12">
        <div className="mx-auto w-11/12 max-w-screen-2xl">
          <section className="relative mb-8 h-32 rounded bg-[url('../assets/heading.png')] bg-cover bg-center bg-no-repeat">
            <div className="absolute inset-0 flex h-full w-full items-center justify-center rounded bg-[#4682A9]/70">
              <h2 className="w-11/12 text-center text-4xl font-semibold text-white">
                All Visas
              </h2>
            </div>
          </section>
          <section className="mb-8 flex flex-col items-center gap-4 sm:flex-row">
            <h2 className="text-xl font-semibold">Filter By:</h2>
            <form className="flex items-center gap-4">
              <label htmlFor="visaType" className="sr-only">
                Visa Type
              </label>
              <select
                onChange={handleFilter}
                id="visaType"
                name="visaType"
                className="rounded border px-4 py-2 focus:outline-none focus:ring focus:ring-[#749BC2]"
              >
                <option value="">All</option>
                <option value="Tourist visa">Tourist visa</option>
                <option value="Student visa">Student visa</option>
                <option value="Official visa">Official visa</option>
                <option value="Business visa">Business visa</option>
              </select>
            </form>
          </section>
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredVisas.map((visa) => (
              <Bounce key={visa.id}>
                <section key={visa._id} className="rounded p-4 shadow">
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
                    <p className="font-semibold">Processing time</p>
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
        </div>
      </section>
    </>
  );
}

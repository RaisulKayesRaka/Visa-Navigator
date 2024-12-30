import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";
import { useContext } from "react";
import { Helmet } from "react-helmet-async";

export default function VisaDetails() {
  const loaderData = useLoaderData();
  const { user } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const appliedDate = new Date().toISOString().slice(0, 10);

    const application = {
      firstName,
      lastName,
      appliedDate,
      email,
      countryName: loaderData.countryName,
      countryImage: loaderData.countryImage,
      visaType: loaderData.visaType,
      processingTime: loaderData.processingTime,
      ageRestriction: loaderData.ageRestriction,
      fee: loaderData.fee,
      validity: loaderData.validity,
      applicationMethod: loaderData.applicationMethod,
      description: loaderData.description,
      requiredDocuments: loaderData.requiredDocuments,
    };

    fetch("https://visa-navigator-server-chi.vercel.app/applications", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(application),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Application submitted successfully",
            icon: "success",
            confirmButtonText: "Ok",
          });

          document.getElementById("my_modal_3").close();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
      <Helmet>
        <title>Visa Details | Visa Navigator</title>
      </Helmet>
      <section className="py-12">
        <div className="mx-auto w-11/12 max-w-screen-2xl">
          <section className="relative mb-8 h-32 rounded bg-[url('../assets/heading.png')] bg-cover bg-center bg-no-repeat">
            <div className="absolute inset-0 flex h-full w-full items-center justify-center rounded bg-[#4682A9]/70">
              <h2 className="w-11/12 text-center text-4xl font-semibold text-white">
                Visa Details
              </h2>
            </div>
          </section>

          <section className="">
            <div className="space-y-6">
              {/* Country Image */}
              <div>
                <img
                  src={loaderData.countryImage}
                  alt=""
                  className="aspect-video w-full rounded object-cover"
                />
              </div>
              {/* Country Name */}
              <h3 className="text-center text-3xl font-bold text-[#4682A9] lg:text-left">
                {loaderData.countryName}
              </h3>

              {/* Divider */}
              <hr className="border-gray-300" />

              {/* Dynamic Information */}
              <ul className="space-y-4">
                <li className="flex items-center justify-between text-gray-700">
                  <span className="font-semibold">Visa Type:</span>
                  <span>{loaderData.visaType}</span>
                </li>
                <li className="flex items-center justify-between text-gray-700">
                  <span className="font-semibold">Processing Time:</span>
                  <span>{loaderData.processingTime}</span>
                </li>
                <li className="flex items-center justify-between text-gray-700">
                  <span className="font-semibold">Age Restriction:</span>
                  <span>{loaderData.ageRestriction}</span>
                </li>
                <li className="flex items-center justify-between text-gray-700">
                  <span className="font-semibold">Fee:</span>
                  <span>${loaderData.fee}</span>
                </li>
                <li className="flex items-center justify-between text-gray-700">
                  <span className="font-semibold">Validity:</span>
                  <span>{loaderData.validity}</span>
                </li>
                <li className="flex items-center justify-between text-gray-700">
                  <span className="font-semibold">Application Method:</span>
                  <span>{loaderData.applicationMethod}</span>
                </li>
              </ul>

              {/* Required Documents */}
              <div className="rounded bg-[#F6F4EB] p-4">
                <p className="mb-2 font-semibold">Required Documents:</p>
                <ul className="list-inside list-disc space-y-1">
                  {loaderData.requiredDocuments.map((doc, index) => (
                    <li key={index}>{doc}</li>
                  ))}
                </ul>
              </div>
              {/* Description */}
              <div className="rounded bg-[#F6F4EB] p-4">
                <p className="mb-2 font-semibold">Description:</p>
                <p>{loaderData.description}</p>
              </div>
              <div>
                <button
                  onClick={() =>
                    document.getElementById("my_modal_3").showModal()
                  }
                  className="w-full rounded bg-[#4682A9] py-2 text-white"
                >
                  Apply for the Visa
                </button>
              </div>
            </div>
          </section>

          <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
              <form method="dialog">
                <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor="email" className="mb-2 block font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      defaultValue={user?.email}
                      className="w-full rounded border px-4 py-2 focus:outline-none focus:ring focus:ring-[#749BC2]"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="firstName"
                      className="mb-2 block font-medium"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="Enter first name"
                      className="w-full rounded border px-4 py-2 focus:outline-none focus:ring focus:ring-[#749BC2]"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="mb-2 block font-medium"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="Enter last name"
                      className="w-full rounded border px-4 py-2 focus:outline-none focus:ring focus:ring-[#749BC2]"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="fee" className="mb-2 block font-medium">
                      Fee
                    </label>
                    <input
                      type="number"
                      id="fee"
                      name="fee"
                      disabled
                      placeholder="Enter fee amount"
                      defaultValue={loaderData.fee}
                      className="w-full rounded border px-4 py-2 focus:outline-none focus:ring focus:ring-[#749BC2]"
                      required
                    />
                  </div>
                  {/* applied date */}
                  <div>
                    <label
                      htmlFor="appliedDate"
                      className="mb-2 block font-medium"
                    >
                      Applied Date
                    </label>
                    <input
                      type="date"
                      id="appliedDate"
                      name="appliedDate"
                      disabled
                      defaultValue={new Date().toISOString().slice(0, 10)}
                      className="w-full rounded border px-4 py-2 focus:outline-none focus:ring focus:ring-[#749BC2]"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      className="w-full rounded bg-[#4682A9] py-2 font-bold text-white"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </dialog>
        </div>
      </section>
    </>
  );
}

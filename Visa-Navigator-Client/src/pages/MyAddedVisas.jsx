import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { VisaContext } from "../provider/VisaProvider";
import Swal from "sweetalert2";
import { Bounce } from "react-awesome-reveal";
import { Helmet } from "react-helmet-async";

export default function MyAddedVisas() {
  const { user } = useContext(AuthContext);
  const { visas, setVisas } = useContext(VisaContext);
  const [myAddedVisas, setMyAddedVisas] = useState([]);

  useEffect(() => {
    setMyAddedVisas(visas.filter((visa) => visa?.email === user?.email));
  }, [visas, user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://visa-navigator-server-chi.vercel.app/visas/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Visa deleted successfully.",
                icon: "success",
              });
              const remainingMyAddedVisas = myAddedVisas.filter(
                (visa) => visa._id !== id,
              );
              setMyAddedVisas(remainingMyAddedVisas);
              const remainingVisas = visas.filter((visa) => visa._id !== id);
              setVisas(remainingVisas);
            }
          });
      }
    });
  };

  const handleUpdate = (e, id) => {
    e.preventDefault();
    const form = e.target;
    const updatedVisa = {
      countryName: form.countryName.value,
      countryImage: form.countryImage.value,
      visaType: form.visaType.value,
      processingTime: form.processingTime.value,
      ageRestriction: form.ageRestriction.value,
      fee: form.fee.value,
      validity: form.validity.value,
      applicationMethod: form.applicationMethod.value,
      description: form.description.value,
      requiredDocuments: Array.from(form.requiredDocuments)
        .filter((doc) => doc.checked)
        .map((doc) => doc.value),
    };

    fetch(`https://visa-navigator-server-chi.vercel.app/visas/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedVisa),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          Swal.fire({
            title: "Updated!",
            text: "Visa updated successfully",
            icon: "success",
          });

          document.getElementById(`my_modal_${id}`).close();

          const updatedVisas = myAddedVisas.map((visa) =>
            visa._id === id ? { ...visa, ...updatedVisa } : visa,
          );
          setMyAddedVisas(updatedVisas);
          const updatedAllVisas = visas.map((visa) =>
            visa._id === id ? { ...visa, ...updatedVisa } : visa,
          );
          setVisas(updatedAllVisas);
        }
      });
  };

  return (
    <>
      <Helmet>
        <title>My Added Visas | Visa Navigator</title>
      </Helmet>
      <section className="py-12">
        <div className="mx-auto w-11/12 max-w-screen-2xl">
          <section className="relative mb-8 h-32 rounded bg-[url('../assets/heading.png')] bg-cover bg-center bg-no-repeat">
            <div className="absolute inset-0 flex h-full w-full items-center justify-center rounded bg-[#4682A9]/70">
              <h2 className="w-11/12 text-center text-4xl font-semibold text-white">
                My Added Visas
              </h2>
            </div>
          </section>
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {myAddedVisas.map((visa) => (
              <Bounce key={visa._id}>
                <section key={visa._id} className="rounded p-4 shadow">
                  <img
                    src={visa.countryImage}
                    alt={visa.countryName}
                    className="h-48 w-full rounded object-cover"
                  />
                  <h3 className="text -center p-2 text-lg font-semibold text-[#4682A9]">
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
                  <hr />
                  <div className="my-2 flex justify-between">
                    <p className="font-semibold">Application Method</p>
                    <p>{visa.applicationMethod}</p>
                  </div>
                  <div className="mt-4 flex gap-4">
                    <button
                      onClick={() =>
                        document
                          .getElementById(`my_modal_${visa._id}`)
                          .showModal()
                      }
                      className="w-full rounded bg-[#4682A9] py-2 text-white"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(visa._id)}
                      className="w-full rounded bg-[#4682A9] py-2 text-white"
                    >
                      Delete
                    </button>
                  </div>
                  <dialog id={`my_modal_${visa._id}`} className="modal">
                    <div className="modal-box max-w-screen-xl">
                      <form method="dialog">
                        <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
                          ✕
                        </button>
                      </form>
                      <form onSubmit={(e) => handleUpdate(e, visa._id)}>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          {/* Country Name */}
                          <div>
                            <label
                              htmlFor="countryName"
                              className="mb-2 block font-medium"
                            >
                              Country Name
                            </label>
                            <input
                              type="text"
                              id="countryName"
                              name="countryName"
                              placeholder="Enter country name"
                              defaultValue={visa.countryName}
                              className="w-full rounded border px-4 py-2 focus:outline-none focus:ring focus:ring-[#749BC2]"
                              required
                            />
                          </div>
                          {/* Country Image */}
                          <div>
                            <label
                              htmlFor="countryImage"
                              className="mb-2 block font-medium"
                            >
                              Country Image
                            </label>
                            <input
                              type="url"
                              id="countryImage"
                              name="countryImage"
                              placeholder="Enter image URL (e.g., imgbb)"
                              defaultValue={visa.countryImage}
                              className="w-full rounded border px-4 py-2 focus:outline-none focus:ring focus:ring-[#749BC2]"
                              required
                            />
                          </div>

                          {/* Visa Type */}
                          <div>
                            <label
                              htmlFor="visaType"
                              className="mb-2 block font-medium"
                            >
                              Visa Type
                            </label>
                            <select
                              id="visaType"
                              name="visaType"
                              defaultValue={visa.visaType}
                              className="w-full rounded border px-4 py-2 focus:outline-none focus:ring focus:ring-[#749BC2]"
                              required
                            >
                              <option value="Tourist visa">Tourist visa</option>
                              <option value="Student visa">Student visa</option>
                              <option value="Official visa">
                                Official visa
                              </option>
                              <option value="Business visa">
                                Business visa
                              </option>
                            </select>
                          </div>
                          {/* Processing Time */}
                          <div>
                            <label
                              htmlFor="processingTime"
                              className="mb-2 block font-medium"
                            >
                              Processing Time
                            </label>
                            <input
                              type="text"
                              id="processingTime"
                              name="processingTime"
                              defaultValue={visa.processingTime}
                              placeholder="Enter processing time (e.g., 10 business days)"
                              className="w-full rounded border px-4 py-2 focus:outline-none focus:ring focus:ring-[#749BC2]"
                              required
                            />
                          </div>

                          {/* Age Restriction */}
                          <div>
                            <label
                              htmlFor="ageRestriction"
                              className="mb-2 block font-medium"
                            >
                              Age Restriction
                            </label>
                            <input
                              type="number"
                              id="ageRestriction"
                              name="ageRestriction"
                              defaultValue={visa.ageRestriction}
                              placeholder="Enter minimum age"
                              className="w-full rounded border px-4 py-2 focus:outline-none focus:ring focus:ring-[#749BC2]"
                              required
                            />
                          </div>
                          {/* Fee */}
                          <div>
                            <label
                              htmlFor="fee"
                              className="mb-2 block font-medium"
                            >
                              Fee
                            </label>
                            <input
                              type="number"
                              id="fee"
                              name="fee"
                              defaultValue={visa.fee}
                              placeholder="Enter fee amount"
                              className="w-full rounded border px-4 py-2 focus:outline-none focus:ring focus:ring-[#749BC2]"
                              required
                            />
                          </div>
                          {/* Validity */}
                          <div>
                            <label
                              htmlFor="validity"
                              className="mb-2 block font-medium"
                            >
                              Validity
                            </label>
                            <input
                              type="text"
                              id="validity"
                              name="validity"
                              defaultValue={visa.validity}
                              placeholder="Enter validity period (e.g., 6 months)"
                              className="w-full rounded border px-4 py-2 focus:outline-none focus:ring focus:ring-[#749BC2]"
                              required
                            />
                          </div>
                          {/* Application Method */}
                          <div>
                            <label
                              htmlFor="applicationMethod"
                              className="mb-2 block font-medium"
                            >
                              Application Method
                            </label>
                            <input
                              type="text"
                              id="applicationMethod"
                              name="applicationMethod"
                              defaultValue={visa.applicationMethod}
                              placeholder="Enter application method (e.g., Online)"
                              className="w-full rounded border px-4 py-2 focus:outline-none focus:ring focus:ring-[#749BC2]"
                              required
                            />
                          </div>
                          {/* Description */}
                          <div className="sm:col-span-2">
                            <label
                              htmlFor="description"
                              className="mb-2 block font-medium"
                            >
                              Description
                            </label>
                            <textarea
                              id="description"
                              name="description"
                              defaultValue={visa.description}
                              rows={4}
                              placeholder="Enter description"
                              className="w-full rounded border px-4 py-2 focus:outline-none focus:ring focus:ring-[#749BC2]"
                              required
                            />
                          </div>
                          {/* Required Documents */}
                          <div className="sm:col-span-2">
                            <label className="mb-2 block font-medium">
                              Required Documents
                            </label>
                            <div className="flex flex-wrap items-center gap-4">
                              <label className="flex items-center">
                                <input
                                  type="checkbox"
                                  name="requiredDocuments"
                                  defaultValue="Valid passport"
                                  className="mr-2"
                                  defaultChecked={visa.requiredDocuments.includes(
                                    "Valid passport",
                                  )}
                                />
                                Valid passport
                              </label>
                              <label className="flex items-center">
                                <input
                                  type="checkbox"
                                  name="requiredDocuments"
                                  defaultValue="Visa application form"
                                  className="mr-2"
                                  defaultChecked={visa.requiredDocuments.includes(
                                    "Visa application form",
                                  )}
                                />
                                Visa application form
                              </label>
                              <label className="flex items-center">
                                <input
                                  type="checkbox"
                                  name="requiredDocuments"
                                  defaultValue="Recent passport-sized photograph"
                                  className="mr-2"
                                  defaultChecked={visa.requiredDocuments.includes(
                                    "Recent passport-sized photograph",
                                  )}
                                />
                                Recent passport-sized photograph
                              </label>
                            </div>
                          </div>

                          {/* Submit Button */}
                          <div className="sm:col-span-2">
                            <button
                              type="submit"
                              className="w-full rounded bg-[#4682A9] py-2 font-bold text-white"
                            >
                              Update Visa
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </dialog>
                </section>
              </Bounce>
            ))}
          </section>
        </div>
      </section>
    </>
  );
}

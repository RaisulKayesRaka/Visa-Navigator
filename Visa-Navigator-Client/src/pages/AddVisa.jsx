import { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";
import { VisaContext } from "../provider/VisaProvider";
import { Helmet } from "react-helmet-async";

export default function AddVisa() {
  const { user } = useContext(AuthContext);
  const { visas, setVisas } = useContext(VisaContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const countryName = form.countryName.value;
    const countryImage = form.countryImage.value;
    const visaType = form.visaType.value;
    const processingTime = form.processingTime.value;
    const ageRestriction = form.ageRestriction.value;
    const fee = form.fee.value;
    const validity = form.validity.value;
    const applicationMethod = form.applicationMethod.value;
    const description = form.description.value;

    const requiredDocuments = [];
    form.requiredDocuments.forEach((document) => {
      if (document.checked) {
        requiredDocuments.push(document.value);
      }
    });

    const newVisa = {
      email: user?.email,
      countryName,
      countryImage,
      visaType,
      processingTime,
      ageRestriction,
      fee,
      validity,
      applicationMethod,
      description,
      requiredDocuments,
      addedDate: new Date().toISOString(),
    };

    fetch("https://visa-navigator-server-chi.vercel.app/visas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newVisa),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Visa added successfully",
            icon: "success",
            confirmButtonText: "Ok",
          });
          setVisas([...visas, newVisa]);
          e.target.reset();
        }
      })
      .catch((error) => {
        console.error("Error adding visa:", error);
      });
  };

  return (
    <>
      <Helmet>
        <title>Add Visa | Visa Navigator</title>
      </Helmet>
      <section className="py-12">
        <div className="mx-auto w-11/12 max-w-screen-2xl">
          <section className="relative mb-8 h-32 rounded bg-[url('../assets/heading.png')] bg-cover bg-center bg-no-repeat">
            <div className="absolute inset-0 flex h-full w-full items-center justify-center rounded bg-[#4682A9]/70">
              <h2 className="w-11/12 text-center text-4xl font-semibold text-white">
                Add Visa
              </h2>
            </div>
          </section>
          <section className="rounded p-6 shadow">
            <form onSubmit={handleSubmit}>
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
                    className="w-full rounded border px-4 py-2 focus:outline-none focus:ring focus:ring-[#749BC2]"
                    required
                  />
                </div>

                {/* Visa Type */}
                <div>
                  <label htmlFor="visaType" className="mb-2 block font-medium">
                    Visa Type
                  </label>
                  <select
                    id="visaType"
                    name="visaType"
                    className="w-full rounded border px-4 py-2 focus:outline-none focus:ring focus:ring-[#749BC2]"
                    required
                  >
                    <option value="Tourist visa">Tourist visa</option>
                    <option value="Student visa">Student visa</option>
                    <option value="Official visa">Official visa</option>
                    <option value="Business visa">Business visa</option>
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
                    placeholder="Enter minimum age"
                    className="w-full rounded border px-4 py-2 focus:outline-none focus:ring focus:ring-[#749BC2]"
                    required
                  />
                </div>
                {/* Fee */}
                <div>
                  <label htmlFor="fee" className="mb-2 block font-medium">
                    Fee
                  </label>
                  <input
                    type="number"
                    id="fee"
                    name="fee"
                    placeholder="Enter fee amount"
                    className="w-full rounded border px-4 py-2 focus:outline-none focus:ring focus:ring-[#749BC2]"
                    required
                  />
                </div>
                {/* Validity */}
                <div>
                  <label htmlFor="validity" className="mb-2 block font-medium">
                    Validity
                  </label>
                  <input
                    type="text"
                    id="validity"
                    name="validity"
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
                    rows={4}
                    placeholder="Enter description"
                    className="w-full rounded border px-4 py-2 focus:outline-none focus:ring focus:ring-[#749BC2]"
                    required
                    defaultValue={""}
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
                      />
                      Valid passport
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="requiredDocuments"
                        defaultValue="Visa application form"
                        className="mr-2"
                      />
                      Visa application form
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="requiredDocuments"
                        defaultValue="Recent passport-sized photograph"
                        className="mr-2"
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
                    Add Visa
                  </button>
                </div>
              </div>
            </form>
          </section>
        </div>
      </section>
    </>
  );
}

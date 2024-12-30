import { useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useContext } from "react";
import Swal from "sweetalert2";
import { Bounce } from "react-awesome-reveal";
import { Helmet } from "react-helmet-async";

export default function AllVisaApplications() {
  const { user } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);

  useEffect(() => {
    fetch("https://visa-navigator-server-chi.vercel.app/applications")
      .then((res) => res.json())
      .then((data) => {
        const myApplications = data.filter(
          (application) => application.email === user.email,
        );
        setApplications(myApplications);
        setFilteredApplications(myApplications);
      });
  }, [user]);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchQuery = e.target.search.value;
    const filtered = applications.filter((application) =>
      application.countryName.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredApplications(filtered);
  };

  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://visa-navigator-server-chi.vercel.app/applications/${id}`,
          {
            method: "DELETE",
          },
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Application canceled successfully.",
                icon: "success",
              });
              const remainingApplications = applications.filter(
                (application) => application._id !== id,
              );
              setApplications(remainingApplications);
              setFilteredApplications(remainingApplications);
            }
          });
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>My Visa Applications | Visa Navigator</title>
      </Helmet>
      <section className="py-12">
        <div className="mx-auto w-11/12 max-w-screen-2xl">
          <section className="relative mb-8 h-32 rounded bg-[url('../assets/heading.png')] bg-cover bg-center bg-no-repeat">
            <div className="absolute inset-0 flex h-full w-full items-center justify-center rounded bg-[#4682A9]/70">
              <h2 className="w-11/12 text-center text-4xl font-semibold text-white">
                All Visa Applications
              </h2>
            </div>
          </section>
          <section className="mb-8">
            <form onSubmit={handleSearch} className="flex items-center gap-4">
              <input
                type="text"
                name="search"
                placeholder="Search by country"
                id="search"
                className="w-full rounded border px-4 py-2 focus:outline-none focus:ring focus:ring-[#749BC2]"
              />
              <button
                type="submit"
                className="rounded bg-[#4682A9] px-4 py-2 text-white"
              >
                Search
              </button>
            </form>
          </section>
          <section className="gird-cols-1 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredApplications.map((application) => (
              <Bounce key={application._id}>
                <section key={application._id} className="rounded p-4 shadow">
                  <img
                    src={application.countryImage}
                    alt={application.countryName}
                    className="h-48 w-full rounded object-cover"
                  />
                  <h3 className="p-2 text-center text-lg font-semibold text-[#4682A9]">
                    {application.countryName}
                  </h3>
                  <hr />
                  <div className="my-2 flex justify-between">
                    <p className="font-semibold">Visa type</p>
                    <p>{application.visaType}</p>
                  </div>
                  <hr />
                  <div className="my-2 flex justify-between">
                    <p className="font-semibold">Procession time</p>
                    <p>{application.processingTime}</p>
                  </div>
                  <hr />
                  <div className="my-2 flex justify-between">
                    <p className="font-semibold">Fee</p>
                    <p>${application.fee}</p>
                  </div>
                  <hr />
                  <div className="my-2 flex justify-between">
                    <p className="font-semibold">Validity</p>
                    <p>{application.validity}</p>
                  </div>
                  <hr />
                  <div className="my-2 flex justify-between">
                    <p className="font-semibold">Application Method</p>
                    <p>{application.applicationMethod}</p>
                  </div>
                  <hr />
                  <div className="my-2 flex justify-between">
                    <p className="font-semibold">Applied Date</p>
                    <p>{application.appliedDate}</p>
                  </div>
                  <hr />
                  <div className="my-2 flex justify-between">
                    <p className="font-semibold">Applicants Name</p>
                    <p>
                      {application.firstName} {application.lastName}
                    </p>
                  </div>
                  <hr />
                  <div className="my-2 flex justify-between">
                    <p className="font-semibold">Applicants Email</p>
                    <p>{application.email}</p>
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={() => handleCancel(application._id)}
                      className="block w-full rounded bg-[#4682A9] py-2 text-center text-white"
                    >
                      Cancel
                    </button>
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

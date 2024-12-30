import { Helmet } from "react-helmet-async";
import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  return (
    <>
      <Helmet>
        <title>Error | Visa Navigator</title>
      </Helmet>
      <div className="flex h-screen w-screen flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center rounded-xl border-4 border-red-500 p-4">
          <h1 className="text-5xl font-bold text-red-500">{error.status}</h1>
          <p className="text-xl font-medium">
            {error.statusText || error.message}
          </p>
        </div>
        <Link to="/" class="btn btn-sm mt-4 font-bold">
          Back to Home
        </Link>
      </div>
    </>
  );
}

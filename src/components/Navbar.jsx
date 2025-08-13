import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import images from "../img/img.jpeg";
import { FcHome, FcList } from "react-icons/fc";
import { RiSave3Fill } from "react-icons/ri";

export default function NavBar() {
  const config = process.env.REACT_APP_API_URL;

  const [navbar, setNavbar] = useState(false);
  const navigate = useNavigate();
  const id = localStorage.getItem("idUser");
  //console.log(id)

  const handleSubmit = (e) => {
    navigate("/login", { replace: true });
  };
  const handleClick = (e) => {
    (async () => {
      const headers = new Headers();
      headers.append("content-type", "application/json");

      const body = JSON.stringify({ userId: id });

      const init = {
        method: "POST",
        headers,
        body,
      };

      const response = await fetch(`${config}/mail/api/auth/logout`, init);
      //console.log(`response status is ${response.status}`);
      const mediaType = response.headers.get("content-type");
     
      if (mediaType.includes("json")) {
        await response.json();
      } else {
         await response.text();
      }
      //console.log(data);
    })();
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("idUser");
    localStorage.removeItem("structure");
    navigate("/index", { replace: true });
  };
  return (
    <nav className="w-full bg-slate-600 md:h-18">
      <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div>
          <div className="flex items-center justify-between py-3 md:py-4 md:block">
            <div className="flex">
              <img
                src={images}
                alt=""
                className="ml-0 mr-1 w-10 h-10 rounded-full"
              />
              <h5 className="ml-0 mr-2 font-semibold text-2xl px-2 pt-1 text-orange-100 hover:text-red-300">
                MAIL.
              </h5>
            </div>
            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}>
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}>
            <ul className="items-center justify-center space-y-6 md:flex md:space-x-6 md:space-y-0">
              <li className="text-white hover:text-indigo-200 text-sm font-medium">
                <Link to="/" className="flex">
                  <FcHome size="16" className=" mr-2 mt-0" />
                  Home
                </Link>
              </li>
              <li className="text-white hover:text-indigo-200 text-sm font-medium">
                <Link to="/list" className="flex">
                  <FcList size="16" className=" mr-2 mt-0" /> Liste Arrivé
                </Link>
              </li>
              <li className="text-white hover:text-indigo-200 text-sm font-medium">
                <Link to="/departTable" className="flex">
                  <FcList size="16" className=" mr-2 mt-0" /> Liste Départ
                </Link>
              </li>
              <li className="text-white hover:text-indigo-200 text-sm font-medium">
                <Link to="/new" className="flex">
                  <RiSave3Fill size="16" color="white" className="mr-2 mt-0" />{" "}
                  Enregistrer Arrivé
                </Link>
              </li>
              <li className="text-white hover:text-indigo-200 text-sm font-medium">
                <Link to="/depart" className="flex">
                  <RiSave3Fill size="16" color="white" className="mr-2 mt-0" />{" "}
                  Enregistrer départ
                </Link>
              </li>
            </ul>

            <div className="mt-3 space-y-2 md:hidden">
              <Link
                to="/login"
                className="inline-block w-full px-4 py-2 text-center text-white bg-gray-600 rounded-md shadow hover:bg-gray-800">
                Sign in
              </Link>
              <button
                onClick={(e) => handleClick(e)}
                className=" inline-block w-full px-4 py-2 text-center text-gray-800 bg-white rounded-md shadow hover:bg-gray-100">
                Signout
              </button>
            </div>
          </div>
        </div>

        <div className="hidden space-x-2 md:flex ml-2">
          <button
            onClick={(e) => handleSubmit(e)}
            className="w-24 px-2 py-1 text-white bg-gray-400 rounded-md shadow hover:bg-gray-600">
            Sign in
          </button>
          <button
            onClick={(e) => handleClick(e)}
            className="w-24 px-2 py-1 text-gray-800 bg-white rounded-md shadow hover:bg-gray-300">
            Signout
          </button>
        </div>
      </div>
      <hr className="h-px w-full my-2 bg-gray-200 border-0"></hr>
    </nav>
  );
}

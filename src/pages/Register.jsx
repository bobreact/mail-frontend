import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Url } from "../components/slices/UrlSlice";
//import authHeader from "../services/auth-header";

//const config = process.env.REACT_APP_API_URL;
const picture = new URL("../img/signup.jpg", import.meta.url).href;

export const Register = () => {
  const userRef = useRef();
  const errRef = useRef();
const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const [structure, setStructure] = useState("");
  const [structures, setStructures] = useState([]);

useEffect(() => {
    axios
      .get(`/configuration.json`, { cache: "force-cache" })
      .then((response) => {
        dispatch(Url(response.data.API_URL));
       // console.log(response.data.API_URL);
      });
  }, []);
 
const config = useSelector((state) => state.url.url);

  const REGISTER_URL = `${config}/mail/api/auth/register`;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    setErrMsg("");
  }, [username, email, password, verifyPassword, structure]);

 useEffect(() => {
    axios
      .get(`${config}/mail/api/auth/structures`, { cache: "force-cache" })
      .then((response) => {
        setStructures(response.data);
        console.log(response.data);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setErrMsg("Password sup ou égal à 06 char");
      return;
    }

    if (password !== verifyPassword) {
      setErrMsg("Wrong password");
      return;
    }

    if (structure === 0) {
      setErrMsg("selectionner une structure");
      return;
    }

    try {
      await axios.post(
        REGISTER_URL,
        JSON.stringify({ username, email, password, structure }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      //console.log(JSON.stringify(response));
      //console.log(JSON.stringify(response));

      setUsername("");
      setEmail("");
      setPassword("");
      navigate("/login", { replace: true });
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.message) {
        setErrMsg(err.response.data.message);
      } else {
        //console.log(err);
        setErrMsg(err.code);
        return;
      }
      //console.log(errMsg);
      errRef.current.focus();
      navigate("/register", { replace: true });
    }
  };
  return (
    <div className="">
      <p
        ref={errRef}
        className={
          errMsg
            ? "errmsg uppercase max-w-3xl items-center mx-auto text-center bg-red-500 text-white font-bold px-4 py-2"
            : "offscreen"
        }
        aria-live="assertive">
        {errMsg}
      </p>
      <div className="max-w-3xl max-h-full md:flex mx-auto my-0">
        <div className="md:flex-1">
          <img
            className="md:h-full md:w-full object-cover"
            src={picture}
            alt="/"
          />
        </div>
        <div className="md:h-full md:w-full px-6 flex-1 w-full py-4 bg-white rounded-none shadow-xl items-center justify-center">
          <h1 className="text-3xl font-semibold text-center text-purple-700 uppercase">
            sign up
          </h1>

          <form
            className="mt-6 mx-auto max-w-xl md:w-full flex-1"
            onSubmit={handleSubmit}>
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Username
              </label>
              <input
                className="block w-full px-4 py-2 mt-0 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                type="text"
                required="true"
                ref={userRef}
                autoComplete="off"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Email
              </label>
              <input
                type="email"
                required="true"
                className="block w-full px-4 py-2 mt-0 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder=""
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Password
              </label>
              <input
                type="password"
                className="block w-full px-4 py-2 mt-0 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder=""
                required="true"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Verify Password
              </label>
              <input
                type="password"
                className="block w-full px-4 py-2 mt-0 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder=""
                required="true"
                onChange={(e) => setVerifyPassword(e.target.value)}
              />
            </div>

  <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Structure
              </label>
              <select
                type="number"
                placeholder="Projet"
                className="block w-full px-4 py-2 mt-0 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={(e) => setStructure(e.target.value)}>
                <option>-- Selectionner --</option>
                {structures.map((item, itemIndex) => (
                  // eslint-disable-next-line react/jsx-key
                  <option value={item.id} key={itemIndex}>
                    {item.denomination}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-6">
              <button
                className="shadow-2xl w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                type="submit">
                Enregistrer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
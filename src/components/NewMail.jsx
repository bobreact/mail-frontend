import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MatTable from "./MatTable";
import { useSelector, useDispatch } from "react-redux";
import { AddNewMailArrive } from "./slices/ArriveSlice";

export default function NewMail() {
  const userRef = useRef();
  const errRef = useRef();
  const config = process.env.REACT_APP_API_URL;
  const token = useSelector((state) => state.token.token);
  const structure = useSelector((state) => state.structure.structure);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [numArrive, setNumArrive] = useState("");
  const [dateArrivee, setDateArrivee] = useState("");
  const [numDepartExp, setNumDepartExp] = useState("");
  const [dateDepartExp, setDateDepartExp] = useState("");
  const [expediteur, setExpediteur] = useState("");
  const [objet, setObjet] = useState("");
  const [numReponse, setNumReponse] = useState("");
  const [files, setFiles] = useState([]);
  const [success, setSuccess] = useState(false);

  const [numArriveError, setNumArriveError] = useState("");
  const [dateArriveeError, setDateArriveeError] = useState("");
  const [numDepartExpError, setNumDepartExpError] = useState("");
  const [dateDepartExpError, setDateDepartExpError] = useState("");
  const [expediteurError, setExpediteurError] = useState("");
  const [objetError, setObjetError] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [dateArrivee < dateDepartExp, numArrive, numDepartExp, dateDepartExp]);

  useEffect(() => {
    setNumArriveError("");
  }, [numArrive]);

  useEffect(() => {
    setDateArriveeError("");
  }, [dateArrivee]);
  useEffect(() => {
    setNumDepartExpError("");
  }, [numDepartExp]);
  useEffect(() => {
    setDateDepartExpError("");
  }, [dateDepartExp]);
  useEffect(() => {
    setExpediteurError("");
  }, [expediteur]);
  useEffect(() => {
    setObjetError("");
  }, [objet]);

  useEffect(() => {
    // when the component is mounted, the alert is displayed for 2 seconds
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  }, [success]);

  function handleChange(event) {
    setFiles(event.target.files);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (dateArrivee < dateDepartExp) {
      setErrMsg("Date d'arrivée doit être après la date de départ");
      window.scrollTo(0, 0);
      return;
    }

    const mail = {
      numArrive,
      dateArrivee,
      numDepartExp,
      dateDepartExp,
      expediteur,
      objet,
      numReponse,
      structure,
    };
    const url = `${config}/mail/api/mail/upload`;
    //console.log(files)
    //console.log(mail)
    const FormData = require("form-data");
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append(`file`, files[i]);
      formData.append("fileName", files[i].name);
    }

    formData.append(
      "mail",
      new Blob([JSON.stringify(mail)], { type: "application/json" })
    );

    try {
      await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      //console.log('response', response);
      setSuccess(true);
      dispatch(AddNewMailArrive(mail));

      window.scrollTo(0, 0);
      //alert('Mail ajouté avec succés')
      //navigate('/list', { replace: true });
      navigate("/new");
      e.target.reset();
      setNumArrive(null);
      setDateArrivee("");
      setNumDepartExp("");
      setDateDepartExp("");
      setExpediteur("");
      setObjet("");
      setNumReponse(null);
      setFiles("");
    } catch (error) {
      //console.log('error', error)

      if (error.response?.data.message === "Error: Mail already exists!") {
        setErrMsg("Courrier existe déjà");
      }
      if (error.response?.status === 401) {
        setErrMsg("Authentification requise");
      }

      if (error.response?.status === 403) {
        setErrMsg("Autorisation requise");
      } else if (error.response.data.fieldErrors) {
        //console.log(error.response.data.fieldErrors)
        error.response.data.fieldErrors.forEach((fieldError) => {
          if (fieldError.field === "numArrive") {
            setNumArriveError(fieldError.message);
          }
          if (fieldError.field === "dateArrivee") {
            setDateArriveeError(fieldError.message);
          }
          if (fieldError.field === "numDepartExp") {
            setNumDepartExpError(fieldError.message);
          }
          if (fieldError.field === "dateDepartExp") {
            setDateDepartExpError(fieldError.message);
          }
          if (fieldError.field === "expediteur") {
            setExpediteurError(fieldError.message);
          }
          if (fieldError.field === "objet") {
            setObjetError(fieldError.message);
          }
        });
      } else if (!error.response?.data) {
        setErrMsg("network error");
      }
      errRef.current.focus();
      navigate("/new", { replace: true });
      window.scrollTo(0, 0);
    }
  };
  return (
    <div className="bg-slate-600 relative flex flex-col justify-center min-h-min overflow-clip">
      <div className=" w-full pt-2 p-6 my-1 mx-auto bg-white rounded-md shadow-xl">
        <p
          ref={errRef}
          className={
            errMsg
              ? "errmsg uppercase text-center bg-red-500 text-white px-4 py-2"
              : "offscreen"
          }
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h5 className="h-10 border-spacing-2 border-2 border-slate-500 bg-green-500 pl-2 pt-1.5 text-start hover:text-center text-base font-semibold uppercase text-white">
          Nouveau courrier arrive
        </h5>

        {success ? (
          <div
            className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800 duration:2000"
            role="alert"
          >
            <p className="font-medium text-center text-lg">
              Courrier enregistré avec succès
            </p>
          </div>
        ) : (
          ""
        )}
        <form
          className="mt-2 grid grid-cols-1 gap-1 sm:grid-cols-1 md:grid-cols-2"
          onSubmit={handleSubmit}
        >
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Numéro
            </label>
            <input
              className="font-semibold h-8 block w-full px-4 py-0 mt-0 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              type="number"
              min="1"
              required
              ref={userRef}
              autoComplete="off"
              value={numArrive}
              onChange={(e) => setNumArrive(e.target.value)}
            />
          </div>

          {numArriveError ? (
            <p style={{ color: "red", fontSize: "14px" }}>{numArriveError}</p>
          ) : (
            ""
          )}

          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              {" "}
              Date d'arrivée
            </label>
            <input
              type="date"
              required
              className="font-semibold h-8 block w-full px-4 py-2 mt-0 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder=""
              onChange={(e) => setDateArrivee(e.target.value)}
            />
            {dateArriveeError ? (
              <span style={{ color: "red", fontSize: "14px" }}>
                {dateArriveeError}
              </span>
            ) : (
              ""
            )}
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Numéro de départ
            </label>
            <input
              type="number"
              min="1"
              required
              className="font-semibold h-8 block w-full px-4 py-2 mt-0 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder=""
              onChange={(e) => setNumDepartExp(e.target.value)}
            />
            {numDepartExpError ? (
              <span style={{ color: "red", fontSize: "1214px" }}>
                {numDepartExpError}
              </span>
            ) : (
              ""
            )}
          </div>

          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Date de départ
            </label>
            <input
              type="date"
              required
              className="font-semibold h-8 block w-full px-4 py-2 mt-0 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder=""
              onChange={(e) => setDateDepartExp(e.target.value)}
            />
            {dateDepartExpError ? (
              <span style={{ color: "red", fontSize: "14px" }}>
                {dateDepartExpError}
              </span>
            ) : (
              ""
            )}
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800 ">
              Expediteur
            </label>
            <input
              type="text"
              required
              className="font-semibold h-8 block w-full px-4 py-2 mt-0 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder=""
              onChange={(e) => setExpediteur(e.target.value)}
            />
            {expediteurError ? (
              <span style={{ color: "red", fontSize: "14px" }}>
                {expediteurError}
              </span>
            ) : (
              ""
            )}
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Objet
            </label>
            <input
              type="text"
              required
              className="font-semibold h-8 block w-full px-4 py-2 mt-0 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder=""
              onChange={(e) => setObjet(e.target.value)}
            />
            {objetError ? (
              <span style={{ color: "red", fontSize: "14px" }}>
                {objetError}
              </span>
            ) : (
              ""
            )}
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Numéro reponse
            </label>
            <input
              type="number"
              min="1"
              className="font-semibold h-8 block w-full px-4 py-2 mt-0 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder=""
              onChange={(e) => setNumReponse(e.target.value)}
            />
          </div>
          <div>
            <input
              style={{ color: "brown" }}
              type="file"
              onChange={handleChange}
              multiple
              required
              className="h-8 block w-full text-sm text-slate-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-violet-50 file:text-violet-700
                                    hover:file:bg-violet-100 mt-5"
            />
          </div>
          <div className="mt-2">
            <button
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
              type="submit"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
      <div>
        <MatTable />
      </div>
    </div>
  );
}

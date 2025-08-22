import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DepartTable from "../components/DepartTable";
import { useDispatch, useSelector } from "react-redux";
import { AddNewMailDepart } from "../components/slices/DepartSlice";
export default function Depart() {
  const config = process.env.REACT_APP_API_URL;
  const userRef = useRef();
  const errRef = useRef();

  const structure = useSelector((state) => state.structure.structure);
  const token = useSelector((state) => state.token.token);
  console.log('structure', structure);
  console.log('token', token);
  const navigate = useNavigate();
  const [numDepart, setNumDepart] = useState("");
  const [dateDepart, setDateDepart] = useState("");
  const [destinataire, setDestinataire] = useState("");
  const [objet, setObjet] = useState("");

  const [files, setFiles] = useState([]);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();

  const [numDepartError, setNumDepartError] = useState("");
  const [dateDepartError, setDateDepartError] = useState("");
  const [destinataireError, setDestinataireError] = useState("");

  const [objetError, setObjetError] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const url = `${config}/mail/api/mail/depart/upload`;
  console.log(url);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [numDepart, dateDepart, destinataire, objet]);

  useEffect(() => {
    setNumDepartError("");
  }, [numDepart]);

  useEffect(() => {
    setDateDepartError("");
  }, [dateDepart]);
  useEffect(() => {
    setDestinataireError("");
  }, [destinataire]);

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

    const mail = { numDepart, dateDepart, destinataire, objet, structure };
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
      dispatch(AddNewMailDepart(mail));
      window.scrollTo(0, 0);
      //alert('Mail ajouté avec succés')
      //navigate('/list', { replace: true });
      navigate("/depart");
      e.target.reset();
      setNumDepart(null);
      setDateDepart("");
      setDestinataire("");
      setObjet("");
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
          if (fieldError.field === "numDepart") {
            setNumDepartError(fieldError.message);
          }
          if (fieldError.field === "dateDepart") {
            setDateDepartError(fieldError.message);
          }
          if (fieldError.field === "destinataire") {
            setDestinataireError(fieldError.message);
          }
          if (fieldError.field === "objet") {
            setObjetError(fieldError.message);
          }
        });
      } else if (!error.response?.data) {
        setErrMsg("network error");
      }
      errRef.current.focus();
      navigate("/depart", { replace: true });
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
          aria-live="assertive">
          {errMsg}
        </p>
        <h5 className="h-10 border-spacing-2 rounded-full border-2 border-slate-500 bg-green-500 pl-2 pt-1.5 text-start hover:text-center text-base font-semibold uppercase text-white">
          Nouveau courrier Depart
        </h5>
        
        {success ? (
          <div
            className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800 duration:2000"
            role="alert">
            <p className="font-medium text-center text-lg">
              Courrier enregistré avec succès
            </p>
          </div>
        ) : (
          ""
        )}
        <form className="mt-2 grid grid-cols-1 gap-1 sm:grid-cols-1 md:grid-cols-2" onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Numéro départ
            </label>
            <input
              className="font-semibold h-8 block w-full px-4 py-0 mt-0 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              type="number"
              min="1"
              required
              ref={userRef}
              autoComplete="off"
              value={numDepart}
              onChange={(e) => setNumDepart(e.target.value)}
            />
          </div>

          {numDepartError ? (
            <p style={{ color: "red", fontSize: "14px" }}>{numDepartError}</p>
          ) : (
            ""
          )}

          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              {" "}
              Date départ
            </label>
            <input
              type="date"
              required
              className="font-semibold h-8 block w-full px-4 py-2 mt-0 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder=""
              onChange={(e) => setDateDepart(e.target.value)}
            />
            {dateDepartError ? (
              <span style={{ color: "red", fontSize: "14px" }}>
                {dateDepartError}
              </span>
            ) : (
              ""
            )}
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Destinataire
            </label>
            <input
              type="text"
              required
              className="font-semibold h-8 block w-full px-4 py-2 mt-0 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder=""
              onChange={(e) => setDestinataire(e.target.value)}
            />
            {destinataireError ? (
              <span style={{ color: "red", fontSize: "1214px" }}>
                {destinataireError}
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
                                    hover:file:bg-violet-100 mt-7"
            />
          </div>
          <div className="mt-2">
            <button
              className="w-full px-4 py-2 mt-4 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
              type="submit">
              Enregistrer
            </button>
          </div>
        </form>
      </div>
      <div>
        <DepartTable />
      </div>
    </div>
  );
}

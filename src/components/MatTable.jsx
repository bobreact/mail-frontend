import React, { useState, useEffect, forwardRef } from "react";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@mui/material";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import axios from "axios";
import { Button } from "@material-ui/core";
import authHeader from "../services/auth-header";

function MatTable() {
  const config = process.env.REACT_APP_API_URL;
  const structure = localStorage.getItem("structure");
  console.log(structure);
  const [mail, setMail] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const defaultMaterialTheme = createTheme();
  const [fichier, setFichier] = useState("");

  const token = localStorage.getItem("token");
  //console.log(fichier)
  //console.log(token)

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const URL = `${config}/mail/api/mail/download/${fichier}`;

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };

  async function download() {
    try {
      // It doesn't matter whether this api responds with the Content-Disposition header or not
      const response = await axios.get(URL, {
        responseType: "blob", // this is important!
        headers: { Authorization: `Bearer ${token}` },
      });
      //console.log(response)
      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/zip" })
      ); // you can mention a type if you wish
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fichier); //this is the name with which the file will be downloaded
      document.body.appendChild(link);
      link.click();
      // no need to append link as child to body.
      setTimeout(() => window.URL.revokeObjectURL(url), 0); // this is important too, otherwise we will be unnecessarily spiking memory!
    } catch (err) {
      //console.log(err)
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 403 || err.response?.status === 401) {
        //console.log(err.response?.status)
        setErrMsg("Erreur " + err.response?.status + " : Autorisation requise");
      } else {
        setErrMsg("Erreur : File or folder not exist");
      }
      window.scrollTo(0, 0);
    }
  }

  useEffect(() => {
    const response = axios
      .get(`${config}/mail/api/mail`, {
        headers: authHeader(),

        params: {
          structure: structure,
        },
      })
      .then((response) => {
        setMail(response.data);
        console.log(response.data);
      })
      .catch((Error) => {
        if (Error.response?.status === 403) {
          //console.log(Error.response?.status)
          setErrMsg(
            "Erreur " + Error.response?.status + " : Autorisation requise"
          );
        }
        if (Error.response?.status === 401) {
          //console.log(Error.response?.status)
          setErrMsg(
            "Erreur " + Error.response?.status + " : authentification requise"
          );
        } else {
          setErrMsg("No server response");
        }
      });
  }, []);

  const columns = [
    { title: "Numéro", field: "numArrive", align: "center" },
    { title: "Date Arrivée", field: "dateArrivee", align: "center" },
    { title: "N° d'Envoi", field: "numDepartExp", align: "center" },
    { title: "Date Départ", field: "dateDepartExp", align: "center" },
    { title: "Expediteur", field: "expediteur", align: "center" },
    { title: "Objet", field: "objet", align: "center" },
    { title: "N° Reponse", field: "numReponse", align: "center" },
    {
      title: "Fichier",
      field: "file",
      align: "center",
      render: (rowData) => (
        <Button
          style={{ height: 25, mt: 4, color: "blue" }}
          onFocus={() => setFichier(rowData.file)}
          onClick={download}
        >
          <CloudDownloadIcon />
        </Button>
      ),
    },
  ];

  return (
    <>
      <div className="bg-slate-600 mx-2 my-4 h-full">
        <p
          className={
            errMsg
              ? "errmsg uppercase text-center bg-red-500 text-white font-bold px-4 py-2"
              : "offscreen"
          }
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <div>
          <ThemeProvider theme={defaultMaterialTheme}>
            <div>
              <MaterialTable
                icons={tableIcons}
                columns={columns}
                data={mail}
                title=""
                px
                localization={{
                  pagination: {
                    labelRowsPerPage: "",
                    labelDisplayedRows: "{from}-{to} De {count}",
                    labelRowsSelect: "Lignes par page",
                  },
                  body: {
                    emptyDataSourceMessage: "Pas d'enregistrements à afficher",
                  },
                }}
                options={{
                  showEmptyDataSourceMessage: true,
                  padding: "dense",
                  sorting: true,
                  search: true,
                  searchFieldVariant: "standard",
                  filtering: false,
                  paging: true,
                  paginationType: "stepped",
                  pageSize: 10,
                  pageSizeOptions: [5, 10, 15, 20, mail.length],
                  exportButton: true,
                  headerStyle: {
                    background: "#838996",
                    fontWeight: "bold",
                    fontSize: "14px",
                    color: "white",
                  },
                  rowStyle: (_data, index) =>
                    index % 2 === 0
                      ? {
                          background: "#eeeef1",
                          fontWeight: "bold",
                          fontSize: "14px",
                          color: "#7777f5",
                        }
                      : {
                          background: "#FBFBF9",
                          fontWeight: "bold",
                          fontSize: "14px",
                          color: "#747475",
                        },
                }}
              />
            </div>
          </ThemeProvider>
        </div>
      </div>
    </>
  );
}

export default MatTable;

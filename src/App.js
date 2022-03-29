/** @format */
import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import "./App.css";
import ModalDetalle from "./components/ModalDetalle";
import moment from "moment";
import { Spinner } from "react-bootstrap";

function App() {
  const [dataCoins, setDataCoins] = useState(null);
  const [OpenModal, setOpenModal] = useState(false);
  const [dataModal, setDataModal] = useState(null);
  const [stateViews, setStateViews] = useState(false);
  const [txtForm, setTextForm] = useState({
    search: "",
  });
  const { search } = txtForm;

  useEffect(() => {
    getDatosApiMarket();
  }, []);

  const getDatosApiMarket = () => {
    /* console.log("pasa a ejecutar la api"); */

    fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=100&page=1&sparkline=false
    `)
      .then((response) => response.json())
      .then((data) => {
        setDataCoins(data);
        /*    setTimeout(() => {
             setDataCoins(data);
           }, 1000); */
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleChange = (e) => {
    setTextForm({ ...txtForm, [e.target.name]: e.target.value });
  };

  const getSearchcoins = (search) => {
    const data = dataCoins.filter((coins) =>
      coins.name.toLowerCase().includes(search.toLowerCase())
    );
    if (data.length > 0) {
      setDataCoins(data);
    } else {
      alert("Sin resultado con los parametros...");
      getDatosApiMarket();
    }
  };

  const handleOpenModal = () => {
    setOpenModal(!OpenModal);
  };

  const handleDetalle = (datais) => {
    /*  console.log(datais); */
    setDataModal(datais);
    handleOpenModal();
  };

  const tableDatos = (
    <>
      <div
        className="table-responsive sticky-top"
        style={{ maxHeight: "600px" }}
      >
        <table
          className="responsive table text-white"
          style={{ minHeight: "400px", backgroundColor: "#111b21" }}
        >
          <thead>
            <tr>
              {!isMobile ? <th></th> : ""}
              <th className="text-start fw-bold p-4">COINS</th>
              <th className="text-end fw-bold p-4">CURRENT PRICE</th>
              {!isMobile ? (
                <>
                  <th className="text-end fw-bold p-4">HIGH 24h</th>
                  <th className="text-end fw-bold p-4">LOW 24h</th>
                  <th className="text-end fw-bold p-4">VOLUMEN 24h</th>
                  <th className="text-end fw-bold p-4">
                    OUTSTANDING SHARED PRICES
                  </th>
                </>
              ) : (
                " "
              )}
            </tr>
          </thead>
          <tbody>
            {dataCoins && dataCoins.length > 0
              ? dataCoins.map((d, index) => (
                  <tr
                    className="color-celda"
                    key={d.id}
                    onClick={() => handleDetalle(d)}
                  >
                    {!isMobile ? (
                      <>
                        <td className="fw-bold text-center text-uppercase p-4">
                          {index + 1}
                        </td>
                      </>
                    ) : (
                      ""
                    )}
                    <td>
                      <img src={d.image} alt={d.name} className="m-2" />{" "}
                      {d.name} <b className="text-uppercase">{d.symbol}</b>{" "}
                    </td>
                    <td className="text-end fw-bold p-4">
                      {d.current_price.toLocaleString()}
                    </td>
                    {!isMobile ? (
                      <>
                        <td className="text-end fw-bold text-success p-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-arrow-up-short"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"
                            />
                          </svg>{" "}
                          {d.high_24h.toLocaleString()}
                        </td>
                        <td className="text-end fw-bold text-danger p-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-arrow-down-short"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"
                            />
                          </svg>
                          {d.low_24h.toLocaleString()}
                        </td>
                        <td className="text-end fw-bold p-4">
                          $ {d.total_volume.toLocaleString("es")}{" "}
                        </td>
                        <td className="text-end fw-bold p-4">
                          {d.circulating_supply.toLocaleString("es")}{" "}
                          <b className="text-uppercase">{d.symbol}</b>
                        </td>
                      </>
                    ) : (
                      ""
                    )}
                  </tr>
                ))
              : ""}
          </tbody>
        </table>
      </div>
    </>
  );

  return (
    <div className="body-container">
      <ModalDetalle
        OpenModal={OpenModal}
        handleOpenModal={handleOpenModal}
        dataModal={dataModal}
      />

      {dataCoins && dataCoins.length > 0 ? (
        <>
          <div className="my-1">
            <b
              className="text-center fw-500 btn btn-success float-end"
              style={{ fontSize: 11 }}
            >
              update Date:{" "}
              {dataCoins && dataCoins.length > 0
                ? moment(dataCoins?.last_updated).format("DD-MM-YYYY HH:mm:ss")
                : ""}
            </b>
            <a
              href="https://www.coingecko.com/"
              target="_blank"
              rel="noreferrer"
            >
              coingecko.com
            </a>
            <div className="clearfix my-3 m-auto">
              <h1 className="title-app mb-2">
                Cryptocurrency Prices by Market Cap App
              </h1>
            </div>

            <div className="clearfix my-3 m-auto">
              <input
                type="search"
                className="class-input my-3 mb-2"
                placeholder="Buscar NFT"
                name="search"
                value={search}
                onChange={handleChange}
                onBlur={() => getSearchcoins(search)}
              />
              <button
                className="btn btn-dark float-end my-3"
                onClick={getDatosApiMarket}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  className="bi bi-arrow-clockwise"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
                  />
                  <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                </svg>
              </button>
            </div>

            <div className="clearfix my-4">
              <button
                className="btn btn-dark m-1"
                onClick={() => setStateViews(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  className="bi bi-card-list"
                  viewBox="0 0 16 16"
                >
                  <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
                  <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
                </svg>
              </button>
              <button
                className="btn btn-dark m-1"
                onClick={() => setStateViews(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  className="bi bi-columns-gap"
                  viewBox="0 0 16 16"
                >
                  <path d="M6 1v3H1V1h5zM1 0a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1H1zm14 12v3h-5v-3h5zm-5-1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-5zM6 8v7H1V8h5zM1 7a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H1zm14-6v7h-5V1h5zm-5-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1h-5z" />
                </svg>
              </button>
            </div>
          </div>
          {/*  <TredingCoins /> */}
          <hr />
          {!stateViews ? (
            tableDatos
          ) : (
            <div
              className="row"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {dataCoins.map((data, index) => (
                <div
                  className="card m-2"
                  onClick={() => handleDetalle(data)}
                  key={data.name}
                >
                  <div className="text-center p-1">
                    <div className="card-body">
                      <img
                        className="img-fluid"
                        src={`${data.image}`}
                        alt={data.name}
                        width="120"
                      />
                      <div className="my-2">
                        <b className="text-center text-uppercase fw-bold">
                          {data.name}
                          <div className="my-3 text-center">
                            <span className="text-center">
                              PRICE: ${data.current_price.toLocaleString()}
                            </span>
                            {/*  <b className="float-end text-success">$ {data.high_24h.toLocaleString()}</b> */}
                          </div>
                        </b>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="loading-container text-center">
          <Spinner animation="grow" variant="light" />
          <h4>Loading informations...</h4>
        </div>
      )}
    </div>
  );
}

export default App;

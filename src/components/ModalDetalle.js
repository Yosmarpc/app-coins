/** @format */

import React from "react";
import { Modal, Button } from "react-bootstrap";
const ModalDetalle = ({ OpenModal, handleOpenModal, dataModal }) => {
  /* console.log(dataModal); */
  return (
    <div>
      {dataModal != null ? (
        <Modal
          show={OpenModal}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header
            style={{
              border: "none",
              backgroundColor: "#111b21",
              color: "#fff",
            }}
          >
            <Modal.Title
              id="contained-modal-title-vcenter"
              style={{ backgroundColor: "#111b21", color: "#fff" }}
            >
              <div className="clearfix">
                <img
                  className="img-fluid"
                  src={`${dataModal.image}`}
                  alt={dataModal.name}
                  width="200"
                />{" "}
                {dataModal.name} (
                <b className="text-uppercase">{dataModal.symbol}</b>)

              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: "#111b21", color: "#fff" }}>

            <div
              className="table-responsive sticky-top"
              style={{ maxHeight: "600px" }}
            >
               <Button
                  className="btn btn-dark  float-end"
                  onClick={handleOpenModal}>
                  Close
          </Button>
              <table
                className="table text-white"
                style={{ backgroundColor: "#111b21" }}
              >
                <thead>
                  <tr>
                    <td></td>
                    <th className="text-end fw-bold p-4">CURRENT PRICE</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center fw-bold fs-3">
                      RANKING: <br /> {dataModal.market_cap_rank}
                    </td>
                    <td className="text-end fw-bold p-4">
                      $ {dataModal.current_price.toLocaleString("es")} {dataModal.market_cap_change_percentage_24h.toLocaleString()}%
                    </td>
                  </tr>
                  <tr>
                    <td className="text-end fw-bold p-4">HIGH/LOW 24h</td>
                    <td className="text-end  fw-bold p-4">
                    <div className="text-success">
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
                      $ {dataModal.high_24h != null ? dataModal.high_24h.toLocaleString("es") : 0}
                    </div>
                    <div className="text-danger">
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
                      </svg>{" "}
                      $ {dataModal.low_24h != null ? dataModal.low_24h.toLocaleString("es") : 0}
                    </div>
                    </td>
                  </tr>
                  <tr>
                  <th className="text-end fw-bold p-4 text-uppercase">PRICE CHANGE 24H</th>
                    <td className="text-end text-danger fw-bold p-4">
                    $ {dataModal.price_change_24h != null ? dataModal.price_change_24h.toLocaleString("es") : 0}
                    </td>
                  </tr>
 <tr>
                    <td className="text-start fw-bold p-4 bg-dark">
                      TOTAL VOLUMEN{" "}
                    </td>
                    <td className="text-end fw-bold p-4">
                      $ {dataModal.total_volume != null ? dataModal.total_volume.toLocaleString("es") : 0 }
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start fw-bold p-4 bg-dark">
                      MARKET CAP{" "}
                    </td>
                    <td className="text-end fw-bold p-4">
                      $ { dataModal.market_cap != null ?  dataModal.market_cap.toLocaleString("es") : 0}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start fw-bold p-4 bg-dark">
                      MARKET CAP CHANGE 24H
                    </td>
                    <td className="text-end fw-bold p-4">
                      $ {dataModal.market_cap_change_24h != null ? dataModal.market_cap_change_24h.toLocaleString("es") : 0}
                    </td>
                  </tr>
                  <tr>
                    <th className="text-start fw-bold p-4 bg-dark">% 24H</th>
                    <td className="text-end fw-bold p-4">
                      {new Intl.NumberFormat("es", {
                        maximumSignificantDigits: 2,
                      }).format(
                        dataModal.market_cap_change_percentage_24h
                      )}{" "}
                      %
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start fw-bold p-4 bg-dark">
                     MAX SUPPLY
                    </td>
                    <td className="text-end fw-bold p-4">
                      $ {dataModal.max_supply != null ? dataModal.max_supply.toLocaleString("es") : 0}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start fw-bold p-4 bg-dark">
                     TOTAL SUPPLY
                    </td>
                    <td className="text-end fw-bold p-4">
                      $ { dataModal.total_supply != null ? dataModal.total_supply.toLocaleString("es") : 0}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start fw-bold p-4 bg-dark">
                     CIRCULATING SUPPLY
                    </td>
                    <td className="text-end fw-bold p-4">
                      $ {dataModal.circulating_supply != null ? dataModal.circulating_supply.toLocaleString("es") : 0}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Modal.Body>
          <Modal.Footer
            style={{
              border: "none",
              backgroundColor: "#111b21",
              color: "#fff",
            }}
          >
            <Button className="btn btn-dark" onClick={handleOpenModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
};

export default ModalDetalle;

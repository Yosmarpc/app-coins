/** @format */

import React, { useState, useEffect } from "react";
import "../App.css";

const TredingCoins = () => {
  const [dataTreding, setDataTreding] = useState(null);

  useEffect(() => {
    tredingTopSeven();
  }, [])

  const tredingTopSeven = () => {
    fetch(`https://api.coingecko.com/api/v3/search/trending`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setDataTreding(data)
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {dataTreding && dataTreding?.coins.length > 0 ?
      <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        {dataTreding?.coins?.map((data, index) => (
          <div className="card m-2" style={{ width: '10rem', backgroundColor: '#111b21' }}>
            
              <div class="text-center p-1">
                <div className="card-body">
                <img className="img-fluid" src={`${data?.item.large}`}
                  alt={data?.item.name}
                  width="100"
                   />
                <p className="text-center text-uppercase fw-bold">{data?.item.name}</p>
              </div>
              </div>
              </div>
            ))}
        </div>
        : ''}
    </div>
  );
};

export default TredingCoins;

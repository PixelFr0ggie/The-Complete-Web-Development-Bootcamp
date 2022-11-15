import React, { useState } from "react";
import { Principal } from "@dfinity/principal";
import { token } from "../../../declarations/token";

// 2rk4m-ag4de-q5jka-yzwkv-gusm3-mpxkh-lpw2g-izm3h-3xtql-icgdl-7qe

function Balance() {

  const [inputValue, setInput] = useState("");
  const [balanceResult, setBalance] = useState("none");
  const [cryptoSymbol, setSymbol] = useState("");
  const [isHidden, setHidden] = useState(true);
  
  async function handleClick() {  

    // console.log(inputValue);

    if (inputValue !== "" &&
        inputValue !== undefined) {

      const principal = Principal.fromText(inputValue);
      const balance = await token.balanceOf(principal);
      
      setBalance(balance.toLocaleString());
      setSymbol(await token.getSymbol());
      setHidden(false);
    }
    
  }


  return (
    <div className="window white">
      <label>Check account token balance: </label>    
      <br /> 
      <label>2rk4m-ag4de-q5jka-yzwkv-gusm3-mpxkh-lpw2g-izm3h-3xtql-icgdl-7qe</label> 
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value={inputValue}
          onChange={(e) => setInput(e.target.value)}
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}>
          Check Balance
        </button>
      </p>
      <p hidden={isHidden}>This account has a balance of {balanceResult} {cryptoSymbol}.</p>
    </div>
  );
}

export default Balance;

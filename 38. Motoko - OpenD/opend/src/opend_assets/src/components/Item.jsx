import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "../../../declarations/nft";
import { idlFactory as tokenIdlFactory } from "../../../declarations/token";
import { Principal } from "@dfinity/principal";
import Button from "./Button";
import { opend } from "../../../declarations/opend";
import CURRENT_USER_ID from "../index";
import PriceLabel from "./PriceLabel";

function Item(props) {

  const [name, setName] = useState();
  const [owner, setOwner] = useState();
  const [image, setImage] = useState();
  const [button, setButton] = useState();
  const [priceInput, setPriceInput] = useState();
  const [loaderHidden, setLoaderHidden] = useState(true);
  const [blur, setBlur] = useState();
  const [sellStatus, setSellStatus] = useState("");
  const [priceLabel, setPriceLabel] = useState();
  const [shouldDisplay, setDisplay] = useState(true);

  const id = props.id;

  const localHost = "http://localhost:8080/";
  const agent = new HttpAgent({ host: localHost });

  //TODO: When deploy live, remove the following line.
  agent.fetchRootKey();

  let NFTActor;
  let price;

  useEffect(() => {

    loadNFT();

  }, []);

  async function loadNFT() {

    NFTActor = await Actor.createActor(idlFactory, {
      agent: agent,
      canisterId: id,
    });

    const name = await NFTActor.getName();
    setName(name);

    const owner = await NFTActor.getOwner();
    setOwner(owner.toText());

    const imageData = await NFTActor.getAsset();
    const imageContent = new Uint8Array(imageData);
    const imageBlob = new Blob([imageContent.buffer], { type: "image/png" });
    const image = URL.createObjectURL(imageBlob);
    setImage(image);

    console.log("Image Data: " + imageData);
    console.log("Image Content: " + imageContent);
    console.log("Image Blob: " + imageBlob);

    if (props.role == "collection") {

      const nftIsListed = await opend.isListed(props.id);

      if (nftIsListed) {

        setOwner("OpenD");
        setBlur({ filter: "blur(4px)" });
        setSellStatus("Listed");

      } else {

        setButton(<Button handleClick={handleSell} text={"Sell"} />);

      }

    } else if (props.role == "discover") {

      const originalOwner = await opend.getOriginalOwner(props.id);

      if (owner.toText() != CURRENT_USER_ID.toText()) {
        setButton(<Button handleClick={handleBuy} text={"Buy"} />);
      }

      const price = await opend.getListedNFTPrice(props.id);

      setPriceLabel(<PriceLabel sellPrice={price.toString()} />);
    }
  }

  function handleSell() {

    console.log("Sell clicked!");

    setPriceInput(<input
      placeholder="Price in $DFr0g"
      type="number"
      className="price-input"
      value={price}
      onChange={(e) => price = e.target.value}
    />);

    setButton(<Button handleClick={sellItem} text={"Confirm"} />);
  }

  async function sellItem() {

    setLoaderHidden(false);

    console.log("Confirm clicked!");
    console.log("Set price = " + price);

    const listingResult = await opend.listItem(props.id, Number(price));

    console.log("Listing: " + listingResult);

    if (listingResult == "Success") {

      const openDId = await opend.getOpenDCanisterID();
      const transferResult = await NFTActor.transferOwnership(openDId);

      console.log("Transfer: " + transferResult);

      if (transferResult == "Success") {

        setLoaderHidden(true);
        setButton();
        setPriceInput();
        setOwner("OpenD");
        setBlur({ filter: "blur(4px)" });
        setSellStatus("Listed");

      }

    }

  }

  async function handleBuy() {
    
    console.log("Buy was triggered");

    setLoaderHidden(false);

    // const tokenActor = await Actor.createActor(tokenIdlFactory, {
    //   agent,
    //   canisterId: Principal.fromText("rrkah-fqaaa-aaaaa-aaaaq-cai")
    // });

    // const sellerId = await opend.getOriginalOwner(props.id);
    // const itemPrice = await opend.getListedNFTPrice(props.id);

    // const result = await tokenActor.transfer(sellerId, itemPrice);
    // console.log(result);

    // if (result == "Success") {

    //   const purchaseResult = await opend.completePurchase(props.id, sellerId, CURRENT_USER_ID);
    //   console.log("Purchase: " + purchaseResult);

    // }

    const sellerId = await opend.getOriginalOwner(props.id);
    const purchaseResult = await opend.completePurchase(props.id, sellerId, CURRENT_USER_ID);
    console.log("Purchase: " + purchaseResult);

    setLoaderHidden(true);
    setDisplay(false);
  }

  return (
    <div style={{display: shouldDisplay ? "inline" : "none"}} className="disGrid-item">
      <div className="disPaper-root disCard-root makeStyles-root-17 disPaper-elevation1 disPaper-rounded">
        <img
          className="disCardMedia-root makeStyles-image-19 disCardMedia-media disCardMedia-img"
          src={image}
          style={blur}
        />

        <div className="lds-ellipsis" hidden={loaderHidden}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>

        <div className="disCardContent-root">

          {priceLabel}

          <h2 className="disTypography-root makeStyles-bodyText-24 disTypography-h5 disTypography-gutterBottom">
            {name}<span className="purple-text"> {sellStatus} </span>
          </h2>
          <p className="disTypography-root makeStyles-bodyText-24 disTypography-body2 disTypography-colorTextSecondary">
            Owner: {owner}
          </p>
          {priceInput}
          {button}
        </div>
      </div>
    </div>
  );
}

export default Item;

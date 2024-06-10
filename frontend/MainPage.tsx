import React, { useEffect, useState } from "react"
import { AssetManager } from "@dfinity/assets";
import { PlugLogin, Types } from "ic-auth";
import { HttpAgent, Actor } from "@dfinity/agent";


export function MainPage() {
  //@ts-ignore
  const [userObject, setUserObject] = useState(Types.UserObject);

  const link = document.getElementById('link') as HTMLAnchorElement;
  // const canisterID = "psgx2-yiaaa-aaaam-qba7a-cai";
  const canisterID = "sjxke-3iaaa-aaaap-qbvjq-cai";
  const whitelist = [canisterID];

  const handleLogin = async() => {
    const userObject = await PlugLogin(whitelist);
    setUserObject(userObject);
    console.log(userObject);
    const button = document.getElementById('login') as HTMLButtonElement;
    button.disabled = true;
    button.style.cursor = 'not-allowed';
    button.innerHTML = 'Logged In';
  }

  const handleAssetUpload = async() => {
    const assetManager = new AssetManager({
      agent: userObject.agent! as HttpAgent,
      canisterId: canisterID
    });
    const fileInput = document.getElementById('file') as HTMLInputElement;
    const file = fileInput.files![0];
    console.log("Uploading file...");
    const key = await assetManager.store(file);
    const link = document.getElementById('link') as HTMLAnchorElement;
    link.href = `https://${canisterID}.raw.icp0.io${key}`;
    link.target = '_blank';
    link.innerHTML = `https://${canisterID}.raw.icp0.io${key}`;
    console.log("Upload complete, verifying...");
    const result = await assetManager.get(key);
    console.log(result);
  }

  const listFiles = async() => {
    const assetManager = new AssetManager({
      agent: userObject.agent! as HttpAgent,
      canisterId: canisterID
    });
    const files = await assetManager.list();
    console.log(files);
  }

  return (
    <div className="app">
      <div className="header">
        <h1>Welcome!</h1>
      </div>
      <div className="content">
        <button id='login' onClick={handleLogin}>Login</button>
        <input type="file" id="file" />
        <button onClick={handleAssetUpload}>Test Upload</button>
        <button onClick={listFiles}>List Files</button>
        <a id='link' />
      </div>
    </div>
  )
}
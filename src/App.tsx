import Web3 from "web3";
import './App.css';
import buttonABI from "./button.json";
import { ethValue } from "./constant/ethValue";
import { useState, useEffect } from 'react';

declare let window: any;

function App() {
  // let web3 = new Web3('https://rpc.goerli.mudit.blog');
  let web3: Web3;

  if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
    // We are in the browser and metamask is running.
    window.ethereum.enable();
    web3 = new Web3(window.web3.currentProvider);
    var address = window.web3.currentProvider.selectedAddress;
    console.log(address);
    //console.log(window.ethereum);
  } else {
    // We are on the server *OR* the user is not running metamask
    // const provider = new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/dd5e8c6ebc7340f3a800df5a4c9aa832");
    console.log('test');

    web3 = new Web3(window.web3.currentProvider);
    //window.web3.currentProvider.enable();
  }

  const buttonAddress = "0x33fcD7c2D394bA074cDba63DE6b9D1445629370E"
  const buttonCount = new web3.eth.Contract(buttonABI as any, buttonAddress);
  const [isFinish, setIsFinish] = useState(false);

  const count = async () => {
    const button = await buttonCount.methods.buttonCount().call()
    console.log(button);
  }

  const sendEth = async () => {
    web3.eth.sendTransaction({
      from: address,
      to: buttonAddress,
      value: String(Number(ethValue.eth) * 1)
    }).then(
      await buttonCount.methods.addButton().send({from:address}).then(getIsfinish)
      )
  }

  const getIsfinish = () => {
    buttonCount.methods.finish().call().then(
      (res: any) => {setIsFinish(res);
      }
    )
  }

  const getResult = () => {
    sendEth();
    count();
  }

  useEffect(()=> {
    console.log('isFinish',isFinish);
  }, [isFinish])

  return (
    <div className="App">
      <button onClick={getResult}>Push Me</button>
      { isFinish && <p>Game Over</p>}
    </div>
  );
}

export default App;
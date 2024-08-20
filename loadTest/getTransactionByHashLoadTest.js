import http from "k6/http";
import { check, sleep } from "k6";


export let options = {
  stages: [
    { duration: '5s', target: 10 },
    { duration: '35s', target: 200 },
    { duration: '20s', target: 50 },
  ],
};


export default function () {
   
  const res = http.post("https://site1.moralis-nodes.com/eth/7050d039b999486b95d6bb73bcbefd55", {
    jsonrpc: '2.0',
    id: 1,
    method: 'eth_getTransactionByHash',
    params: ['0xd4b2e80202cc55517c328412a7792772e1bdd925ac1a2120aeafe84316206ad3'],
  },
   { 'Content-Type': 'application/json'});

  check(res, {
    "is status 200": (r) => r.status === 200,
    "result exists": (r) => r.json().hasOwnProperty("result"),
  });

  sleep(5);
}

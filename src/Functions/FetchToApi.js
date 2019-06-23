/*
*** Route = string
*** Methode = string ('POST', 'GET', ...)
*** body = object     // si utilisation de méthode Post
*/

import { API_ROUTE } from './../Constantes/ApiRoute.js'

export const fetchDataToApi = (route, method, body) => {
    if (body === undefined) {
      return fetch(API_ROUTE + route,  {mode: 'cors', method: method,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      .then((res)=>{
          if (res.status !== 200) {
             return;
          }
          return res.json()
        })
    }
    else {
      return fetch(API_ROUTE + route,  {mode: 'cors', method: method,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body : JSON.stringify(body)
      })
      .then((res)=>{
          if (res.status !== 200) {
             return;
          }
          return res.json()
        })
    }
  }

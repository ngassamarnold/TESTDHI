import Axios from 'axios';

var configs = {
    headers:
    {
        accept: 'application/json',
        'Content-Type': 'application/json'

    }
};
export const URL2 = "http://helpstofind.fr/test2/api/";
export const URL = "https://my-coolpay.com/api/409dfb2f-f98f-4f97-9584-0d2bf1573571/paylink";
//pour demander un paiment
export function loadProducts(body) {
    return Axios.post(URL,
         JSON.stringify(body),
         configs
 )
}
export function insertCMD(body) {
  return Axios.post(URL2+'ajouter-cmd',
       JSON.stringify(body),
       configs
)
}

export const CountryWorker = {
    getAllCountries: async () => {
      return await fetch("http://helpstofind.fr/test2/api/produits")
        .then((response) => response.json())
        .then((json) => {
          if (json.length != 0) {
           
            return json;
          }
          callback({});
        })
        .catch((error) => console.warn(error));
    },
  };

//   export const CountryWorker = {
//     getAllCountries: async () => {
//       return await fetch("https://restcountries.eu/rest/v1/all")
//         .then((response) => response.json())
//         .then((json) => {
//           if (json.length != 0) {
//             const data = {};
//             for (const country of json) {
//               data[`${country.alpha2Code}`] = country.name;
//             }
//             return data;
//           }
//           callback({});
//         })
//         .catch((error) => console.warn(error));
//     },
//   };


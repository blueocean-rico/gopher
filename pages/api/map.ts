// var axios = require("axios");
import axios from 'axios';
import NextCors from "nextjs-cors";

// const config = {
//   method: "get",
//   url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522%2C151.1957362&radius=1500&type=restaurant&keyword=cruise&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS}`,
//   headers: {},
// };

// export default async function handler(req, res) {
//   await NextCors(req, res, {
//     // Options
//     methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
//     origin: "*",
//     optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
//   });

//   axios(config)
//     .then(function (response) {
//       console.log(JSON.stringify(response.data));
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// }

export default async function PlaceSearcher({ center }) {


  const config = {
    method: "get",
    url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${center.lat}%2C${center.lng}&radius=1500&type=supermarket&keyword=whole&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS}`,
    headers: {
      'Access-Control-Allow-Origin': "*"
    },
  };


  axios(config)
  .then((response) => {
    console.log(JSON.stringify(response.data.results))
  })
  .catch((err) => {
    console.log(err)
  })

}
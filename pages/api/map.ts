import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // These are the lat/lng values of the user determined center
  let { searchValue, lat, lng } = req.query;

  // console.log(req.query);
  // console.log('SEARCH VALUE')
  // console.log(searchValue)

  searchValue = searchValue === 'null' ? 'grocery' : searchValue;
  // console.log(searchValue)

  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat}%2C${lng}&radius=500&type=store&keyword=${searchValue}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS}`

  const response = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();

  const stores = data.results;

  // console.log(stores)
  res.status(200).json({ stores });
}

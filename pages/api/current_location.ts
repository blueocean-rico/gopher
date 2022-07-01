import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // This will be the address of the location. We will assume it's perfect so I can just plug it into the geocode API to get lat/lng
  const { address } = req.query;

  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS}`


  const response = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();

  const location = data.results[0].geometry.location;

  // Awesome, so this is actually pretty sweet. Based off off pretty general information, we can find the specific location
  // Even typing in 'space needle' worked.
  res.status(200).json(location);
}

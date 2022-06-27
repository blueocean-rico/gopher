import type { NextPage } from "next";

const Map: NextPage = () => {
  return (
    <div>{process.env.NEXT_PUBLIC_GOOGLE_MAPS}</div>
  )
}

export default Map;
import {useUser} from '@auth0/nextjs-auth0';
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from 'next/link'

const Home = () => {

  const {user, error, isLoading} = useUser();
  console.log(user);
  // console.log(user);
  if (isLoading) {
    return
    <div>
      ...loading
    </div>
  };
  if (error) {
    return <div>
      {error.message}
    </div>
  }
  if (user) {
    return (
    <>
    <h1>Welcome {user?.nickname}!</h1>
    <Image src={user?.picture} width={50}
      height={50} alt='picture'/>
    <Link href='/api/auth/logout'>
      <a >Logout</a>
    </Link>

    </>
    )
  }
  return(
  <>
  <Link href='/api/auth/login'>
   <a >Login</a>
 </Link>
 </>
  )
};
export default Home;
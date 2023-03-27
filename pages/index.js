import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

import { useRouter } from "next/router";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('')

  const router = useRouter();

  function handleLogin(e) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("logged In");
        router.push("/dashboard");
      })
      .catch((error) => {
        console.log(error);
        setError('email or password not correct')
        // ..
      });
  }

  return (
    <div className="w-1/3 mx-auto">
      <h2 className="text-center font-mono font-extrabold mt-32 text-2xl">
        Firebase 9 authentication <br /> LogIn Page
      </h2>

      <form onSubmit={handleLogin}>
      {error && <p className="text-center text-xs mt-3 text-red-400">{error}</p>}
        <div className="my-2 flex flex-col">
          <label className="text-teal-800 font-bold text-lg tracking-wide">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="E-mail"
            className="bg-none border-4 border-teal-900 p-1 focus:outline-none rounded-xl font-bold text-teal-800"
          />
        </div>
        <div className="my-2 flex flex-col">
          <label className="text-teal-800 font-bold text-lg tracking-wide">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
            className="bg-none border-4 border-teal-900 p-1 focus:outline-none rounded-xl font-bold text-teal-800"
          />
        </div>
        <input
          type="submit"
          className="bg-teal-800 w-full mt-2 tracking-wide p-1 focus:outline-none rounded-xl font-bold text-teal-50 text-center"
        />
        <p className="text-center text-xs mt-4">
          {"Don't have an account "}
          <Link href="/signup">
            <a className="text-blue-700">sign Up</a>
          </Link>
        </p>
        <p className="text-center text-xs mt-1">
          Forgotten password?{" "}
          <Link href="/password">
            <a className="text-blue-700">Reset Here</a>
          </Link>
        </p>
      </form>
    </div>
  );
}


// import Head from 'next/head'
// import styles from '../styles/Evernote.module.scss'
// import NoteOperations from './components/NoteOperations';
// import NoteDetails from './components/NoteDetails';
// import { useState } from 'react';
// export default function Home() {
//   const [ID, setID] = useState(null);
//   const getSingleNote = (id) => {
//     setID(id)
//   }
//   return (
//     <div className={styles.container}>
//       <Head>
//         <title>Evernote Clone</title>
//         <meta name="description" content="This is an Evernote Clone" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <main>
//         <div className={styles.container}>
//           <div className={styles.left}>
//             <NoteOperations getSingleNote={getSingleNote} />
//           </div>
//           <div className={styles.right}>
//             <NoteDetails ID={ID} />
//           </div>
//         </div>
//       </main>
//     </div>
//   )
// }

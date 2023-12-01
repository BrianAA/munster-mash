import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { cheeseStates } from '@/lib/cheese-states'
const inter = Inter({ subsets: ['latin'] })

import React, { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';

const Cheese = ({ offsetX }) => {
  const size = 150;
  const thisCheese = useRef();
  const [_animState, setAnimState] = useState(cheeseStates.dance)
  useEffect(() => {
    thisCheese.current.addEventListener("mousedown", (e) => {
      setAnimState(cheeseStates.yanked)
    })
    thisCheese.current.addEventListener("mouseup", () => {
      setAnimState(cheeseStates.dance)
    })
  }, []);
  function handleDrag(e) {
    console.log(e)
    thisCheese.current.style.zIndex = 9999
  }
  function handleStop(e) {
    console.log(e)
    thisCheese.current.style.zIndex = (e.clientY)
  }

  return (
    <Draggable
      onDrag={handleDrag}
      onStop={handleStop}
      handle='.cheese'>
      <Image
        style={{ position: "absolute", left: offsetX }}
        draggable="false"
        className='cheese'
        ref={thisCheese}
        width={150}
        height={150}
        alt='Dancing-Cheese'
        src={_animState.anim}
      />
    </Draggable>

  )
}

export default function Home() {

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <Cheese offsetX={0} />
        <Cheese offsetX={"100px"} />
      </main >
    </>
  )
}

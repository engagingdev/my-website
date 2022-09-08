import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * @note use minLength & maxLength to limit the quote length
 * @default_URL : https://api.quotable.io/random?minLength=100&maxLength=140
 */
const getData = async arg_state => {
  fetch("https://api.quotable.io/random?minLength=200")
    .then(response => response.json())
    .then(data => {
      console.log(data);
      arg_state(data.content.split("")); // ? this will set the state as an array of characters
    })
    .catch(err => console.error(err));
};

export default function Home() {
  const [myText, setMyText] = React.useState(null); // ? this will be an array of characters for now
  const [move, setMove] = useState(false);
  const elemRef = useRef<HTMLSpanElement>(null);
  const [elemWidth, setElemWidth] = useState(0);
  const [elemP, setElemP] = useState("");
  const [selected, setSelected] = useState(false);
  const [moveCursor, setMoveCursor] = useState(false);
  useEffect(() => {
    // getData(setMyText); // setMyText is the callback function
  }, []);
  useEffect(() => {
    if (!(elemP.length > 0)) {
      // checking if the state is empty meaning not set yet
      console.log("getting Text..");
      setElemP("P");
    } else {
      console.log("getting size per each character..");
      
    }
  }, [elemP]);
  const handleSelect = (status:boolean) => {
    setSelected(status);
  }
  const handleMove = (status:boolean) => {
    setMoveCursor(status);
    setElemWidth(elemRef?.current?.offsetWidth - 2);
  }
  console.log("page re-rendered...");
  return (
    <div className="bg-AAprimary h-screen w-full flex items-center">
      <main className="w-full 2xl:px-96 xl:px-80 lg:px-64 md:px-28 px-12 flex flex-col space-y-12">
        <span className="text-gray-600 lg:text-3xl md:text-xl sm:text-xl flex flex-row">
          {/* {myText?.map((char, index) => {
            return(
              <span key={index} className="bg-red-800 text-white">{char}</span>
            )
          })|| <></>} */}
          <span ref={elemRef} className="relative">
            {selected ? <motion.div
              initial={{ opacity: 0, x: -2 }}
              animate={{ opacity: [1, 0], x: elemWidth }}
              transition={{
                opacity: { duration: 0.8, repeat: Infinity },
              }}
              className="absolute w-[3px] h-full rounded bg-AAsecondary "
            ></motion.div>:""}
            P
          </span>
          <span className="">e</span>
        </span>
        {/**
         * @textInput
         */}
        <div className="w-full flex justify-center flex-col">
          <button onClick={()=>handleSelect(true)} className="w-24 border-2 px-8 py-1 rounded text-sm text-white">
            Test 1
          </button>
          <button onClick={()=>handleMove(true)} className="w-24 border-2 px-8 py-1 rounded text-sm text-white">
            Test 2
          </button>
          <button className="w-24 border-2 px-8 py-1 rounded text-sm text-white">
            Test 3
          </button>
          <input
            type="text"
            className="w-52 bg-AAprimary text-xl text-center text-gray-600 border-b-2 border-b-gray-600 
              py-2 px-4 focus:outline-none "
            placeholder=""
          />
        </div>
      </main>
    </div>
  );
}
"use client";
// Import React and useState
import React, { useState } from "react";
// Import your custom styles
import styles from "../../style";
// Import Navbar and Footer components
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import RingLoader from "react-spinners/RingLoader";

// InputOutput component
const InputOutput = () => {
  // State for input text
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // State for output text
  const [outputText, setOutputText] = useState("");
  // Handle input change
  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleButtonClick = async () => {

    try{
      setOutputText("");
      setIsLoading(true);
      const response = await fetch(`http://127.0.0.1:5000/getqestions/${inputText}`);

      const res = JSON.parse(await response.json());

      let ans = "";
      let q = 1;
      for(let item in res) {
        ans += `Q${q++}: ${item}\nAns: ${res[item]}\n\n`
      }
      setOutputText(ans);
      setIsLoading(false);
    }
    catch(e) {
      setInputText("");
      setIsLoading(false);
    }

  };

  const handleClearButtonClick = () => {
    setOutputText("");
  };

  return (
    <div className="bg-primary w-full overflow-hidden">

      {
        isLoading && <div className="h-screen w-full flex justify-center items-center absolute bg-primary opacity-70">
        <RingLoader
        color={'#36d7b7'}
        loading={isLoading}
        size={150}
          />
        </div>
      }

      <main>
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            {/* Render Navbar component */}
            <Navbar />
            <div className="text-center text-white my-4">
              {/* Heading for the page */}
              <h2 className="text-3xl font-bold">
                XamQgen: Question Generator
              </h2>
            </div>
          </div>
        </div>
        <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
          {/* Box containing input and output sections */}
          <div className={`${styles.boxWidth} flex justify-between space-x-4`}>
            {/* Input Section */}
            <div className="flex-1 p-4 bg-gray-100 rounded-md">
              <label className="block mb-2">
                Passage:
                <textarea
                  value={inputText}
                  onChange={handleInputChange}
                  className="w-full h-96 border border-gray-300 p-2 rounded-md"
                />
              </label>
              <div className="border-t border-gray-300 my-2" />
              {/* Button to generate questions */}
              <button
                onClick={handleButtonClick}
                className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
              >
                Generate Questions
              </button>
            </div>
            {/* Output Section */}
            <div className="flex-1 p-4 bg-gray-100 rounded-md">
              <label className="block mb-2">
                Generated Questions:
                <textarea
                  value={outputText}
                  readOnly
                  className="w-full h-96 border border-gray-300 p-2 rounded-md"
                />
              </label>
              {/* Button to clear output */}
              <button
                onClick={handleClearButtonClick}
                className="mt-4 bg-gray-500 text-white p-2 rounded-md hover:bg-gray-700"
              >
                Clear Output
              </button>
            </div>
          </div>
        </div>
        <div className="pt-20">
          {/* Render Footer component */}
          <Footer />
        </div>
      </main>
    </div>
  );
};

// Export the component
export default InputOutput;

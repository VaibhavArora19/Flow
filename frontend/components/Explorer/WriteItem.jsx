import React, { useEffect, useRef, useState } from 'react';
import { BsArrowDownShort, BsArrowRightShort } from 'react-icons/bs';
import { useRouter } from 'next/router';
import WriteInput from './WriteInput';
import { getWriteTransactionScript } from '@/utils/OpenAIHelpers';
import { Mutate } from '@/query';

const WriteItem = ({ functionName, i, inputs, contractName }) => {
  const [showWriteData, setShowWriteDate] = useState(false);
  const [inputArray, setInputArray] = useState(inputs);
  const router = useRouter();
  const address = router.query.address;

  const writeHandler = async () => {
    try {
      const script = await getWriteTransactionScript(
        contractName,
        address,
        functionName,
        inputs
      );
      console.log(script);
      let result;
      if (inputs.length === 0) {
        result = await Mutate(script, []);
      } else {
        result = await Mutate(script, inputArray);
      }
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(inputArray);

  const inputHandler = (index, inputData) => {
    const previousInput = inputArray;
    previousInput[index].value = inputData;

    setInputArray(previousInput);
  };

  return (
    <div className="bg-[#121212] rounded-md mt-4 select-none overflow-hidden cursor-pointer">
      {/* function Name */}

      <div
        onClick={() => {
          setShowWriteDate(!showWriteData);
        }}
        className="flex justify-between w-full items-center"
      >
        <p className="text-white py-3 px-4 flex items-center gap-2  font-light">
          <span>{i + 1}.</span>
          {functionName}
        </p>

        {showWriteData ? (
          <BsArrowDownShort color="white" size={25} className="mr-5" />
        ) : (
          <BsArrowRightShort color="white" size={25} className="mr-5" />
        )}
      </div>

      {showWriteData && (
        <div className="flex flex-col gap-4 px-6 transition-all bg-[#222222] py-4 ease-in-out delay-150">
          <div className="flex flex-col">
            {inputs?.map((input, i) => (
              <WriteInput inputHandler={inputHandler} input={input} i={i} />
            ))}

            <button
              type="submit"
              className="w-[100px] bg-[#111111] hover:bg-black py-2 mt-4 rounded-md text-gray-400"
              onClick={writeHandler}
            >
              Write
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WriteItem;

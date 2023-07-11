import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { BsSearch } from 'react-icons/bs';

const Explorer = () => {
  const [address, setAddress] = useState('');

  const router = useRouter();

  const addressChangeHandler = event => {
    setAddress(event.target.value);
  };

  const searchAddressHandler = event => {
    if (event.key === 'Enter') {
      router.push({
        pathname: `/explorer/${address}`,
      });
    }
  };

  return (
    <div className="bg-[black]  flex items-center justify-start px-40 h-screen">
      {/* <div className="flex gap-3 items-center">
        <input
          onChange={addressChangeHandler}
          value={address}
          className="bg-gray-600 py-4 px-3 outline-none text-gray-400 w-[600px]  rounded-md"
        />
        <button
          onClick={searchAddressHandler}
          className="text-white bg-blue p-4 bg-blue-500 rounded-md hover:bg-blue-600"
        >
          <BsSearch size={22} />
        </button>
      </div> */}

      <div>
        <div className="flex items-center gap-5 mb-3">
          <input
            onChange={addressChangeHandler}
            onKeyDown={searchAddressHandler}
            className="py-4 text-5xl bg-[#2a2929] rounded-3xl transition-all delay-100 ease-in-out focus:w-[700px]  hover:w-[700px] w-[120px] px-3 text-gray-500 font-Poppins outline-none"
          />
          <h2 className="text-[#343434] text-9xl font-medium font-Poppins uppercase">
            Search
          </h2>
        </div>
        <h2 className="text-8xl text-white font-Poppins font-medium">
          on Flowweb
        </h2>
      </div>
    </div>
  );
};

export default Explorer;

import React from "react";

const ScanResume = () => {
  return (
    <>
      <div className="bg-white py-8 flex flex-col justify-center items-start">
        <div className="m-auto my-4 items-center text-center">
          <h2 className="text-xl md:text-xl leading-tight font-semibold md:leading-snug">
            Scanning Resume
          </h2>
        </div>

        <div className="flex flex-col   md:flex-row">
          <div className=" bg-primary-500 rounded-md p-5  flex flex-row w-5/6 h-[300px] md:h-[300px] m-auto">
            <div className="flex flex-col items-center m-auto">
              <div class="flex flex-col items-center">
                <div class="rounded-full border-2 border-white bg-transparent w-20 h-20 flex flex-col items-center justify-center ">
                  <span class="text-white text-sm font-bold">0%</span>
                  <span class="text-white mt-2 text-xs">Completed</span>
                </div>
              </div>
              <div className="mt-3 text-center flex flex-col gap-4">
                <p className="text-secondary-600 font-bold">Personal Details</p>
                <p className="text-white text-sm">
                  Stand out by completing your Profile and applying with it...
                </p>
              </div>
            </div>
            <div className=" rounded-full border-2 border-white bg-transparent w-24 h-24 flex flex-col  ">
              <img
                className="w-[50px] h-[50px] mr-5"
                src="data:image/jpeg;base64,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"
                alt=""
              />
            </div>
          </div>
        </div>

        {/* <DropFileInput onFileChange={(files) => onFileChange(files)} /> */}
      </div>
      <div className=" w-full mt-12 flex justify-end">
        <button
          //   onClick={handleSubmit}
          type="submit"
          className="bg-primary-500 rounded-md py-3 px-14 text-white self-end"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default ScanResume;
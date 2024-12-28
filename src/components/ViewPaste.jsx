import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/slices/pasteSlice";
import { MdContentCopy } from "react-icons/md";


const ViewPaste = (props) => {

  const { id } = useParams();
  console.log(id);

  const pastes = useSelector((state) => (state.paste.pastes));


  const index = pastes.findIndex((item) => item._id === id);


  return (

    <div className="flex flex-col gap-5 max-w-[1200px] mx-auto mt-5 ">

      <div className="flex gap-10 max-w-[1200px]">
        <input type="text" placeholder="Enter title here" value={pastes[index].title} name="title" onChange={(e) => {
          setTitle(e.target.value);
          // console.log(title);
        }} className="p-2 px-5 text-lg w-[80%] border rounded-md cursor-not-allowed" required />



      </div>

      <div className="flex flex-col border rounded-md">
        <div className="flex justify-between px-5 border-b py-2">
          <div className="flex items-center  gap-1">
            <div className="w-4 h-4 rounded-full bg-[#ff5f57]"></div>
            <div className="w-4 h-4 rounded-full bg-[#febc2e]"></div>
            <div className="w-4 h-4 rounded-full bg-[#2dc842]"></div>
          </div>
          <button>
            <MdContentCopy />

          </button>
        </div>
        <textarea disabled placeholder="Enter your content here..." value={pastes[index].content} name="content" onChange={(e) => setContent(e.target.value)} className="px-5 py-2 max-w-[1280px]  focus-visible:ring-0 cursor-not-allowed" rows={20} required></textarea>
      </div>

    </div>

  )
};

export default ViewPaste;

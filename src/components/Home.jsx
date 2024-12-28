import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/slices/pasteSlice";
import { MdContentCopy } from "react-icons/md";


const Home = (props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [searchParams, updateSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const pastes = useSelector((state) => (state.paste.pastes));



  useEffect(() => {
    const index = pastes.findIndex((item) => item._id === pasteId);
    if (index >= 0) {
      setTitle(pastes[index].title);
      setContent(pastes[index].content);
    }
  }, [pasteId])

  const dispatch = useDispatch();
  function createPaste() {
    const paste = {
      title: title,
      content: content,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toDateString(),
    }

    if (pasteId) {
      //update paste
      dispatch(updateToPastes(paste));
    }
    else {
      // create paste
      dispatch(addToPastes(paste));

    }
    setTitle("");
    setContent("");
    updateSearchParams({});



  }

  return (
    <div className="flex flex-col gap-5 max-w-[1200px] mx-auto mt-5 ">

      <div className="flex gap-10 max-w-[1200px]">
        <input type="text" placeholder="Title" value={title} name="title" onChange={(e) => {
          setTitle(e.target.value);
          // console.log(title);
        }} className="p-2 px-5 text-lg w-[80%] border rounded-md" required />

        <button className="  text-white rounded-md w-[20%] bg-[#1d4ed8] font-semibold" onClick={createPaste}>
          {pasteId ? "update my paste" : "create my paste"}
        </button>

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
        <textarea placeholder="Enter your content here..." value={content} name="content" onChange={(e) => setContent(e.target.value)} className="px-5 py-2 max-w-[1200px]  focus-visible:ring-0" rows={20} required></textarea>
      </div>

    </div>
  )
};

export default Home;

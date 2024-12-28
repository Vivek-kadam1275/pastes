import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes, resetAllPastes } from "../redux/slices/pasteSlice";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { RWebShare } from "react-web-share";
import { LuPencilLine } from "react-icons/lu";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdContentCopy } from "react-icons/md";
import { FiShare } from "react-icons/fi";
import { MdOutlineRemoveRedEye } from "react-icons/md";




const Pastes = (props) => {
  const pastesData = useSelector((state) => state.paste.pastes);
  // console.log(pastes);
  const [searchItem, setSearchItem] = useState("");

  // filtering data based on searchItem
  const filteredData = pastesData.filter((item) => (item.title.toLowerCase().includes(searchItem.toLowerCase())));
  // console.log(filteredData);

  const dispatch = useDispatch();


  function deleteHandler(id) {
    // console.log(id);
    // using removeFromPaste function from slice to remove paste
    dispatch(removeFromPastes(id));
  }






  return (
    <div className="max-w-[1200px] mx-auto mt-20  flex flex-col gap-5">

      <input type="search" value={searchItem} name="searchItem" placeholder="search paste here..." className="px-5 py-2 w-full border rounded-md" onChange={(e) => setSearchItem(e.target.value)} />

      <div className="border rounded-md">
        <div className="border-b rounded-md" >
          <h1 className="text-4xl font-bold px-5 py-2">All Pastes</h1>
        </div>
        <div className=" py-4 px-5">
          {filteredData.length > 0 ? <div className="flex flex-col gap-4">
            {filteredData.map((item) => {
              return (
                <div key={item._id} className="border rounded-md px-5 py-4 flex justify-between">
                  <div className="flex flex-col gap-5 w-[50%]">
                    <div className="text-3xl font-semibold">{item.title} </div>
                    <div className="text-[#707070] line-clamp-3 text-balance"> {item.content} </div>
                  </div>
                  <div className="flex flex-col gap-5">
                    <div className="flex gap-2">
                      <button >
                        <NavLink to={`/?pasteId=${item._id}`}>
                          <LuPencilLine className="text-3xl border p-1 "/>
                        </NavLink>
                      </button>
                      <button>
                        <NavLink to={`/pastes/${item._id}`}> 
                        <MdOutlineRemoveRedEye className="text-3xl border p-1 "/>
                        </NavLink>
                      </button>
                      <button onClick={() => { deleteHandler(item._id) }}>
                        <RiDeleteBin5Line className="text-3xl border p-1 "/>
                      </button>
                      <button onClick={() => {
                        navigator.clipboard.writeText(item.content);
                        toast.success("Copied successfully")
                      }}>
                        <MdContentCopy  className="text-3xl border p-1 "/>

                      </button>
                      <RWebShare
                        data={{
                          text: "Web Share - vk",
                          url: `${window.location.origin}/pastes/pastes/${item._id}`,
                          title: "paste link",
                        }}
                        onClick={() => {
                          console.log("shared successfully!")
                        }
                        }
                      >
                        <button  className="">
                          <FiShare className="text-3xl border p-1 "/>

                        </button>
                      </RWebShare>
                    </div>
                    <div>{item.createdAt}</div>
                  </div>
                </div>
              )
            })
            }
          </div> :
            <div className="text-2xl text-center w-full text-chileanFire-500">
              No data found
            </div>
          }
        </div>
      </div>

    </div>
  )
};

export default Pastes;

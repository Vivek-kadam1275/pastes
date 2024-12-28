import { createSlice } from '@reduxjs/toolkit'
import toast from "react-hot-toast";

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : []
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state, actions) => {
      const paste = actions.payload;

      // if same title exist then don't insert it into array and local storage
      const index = state.pastes.findIndex((item) => item.title === paste.title);
      console.log(index);
      if (index >= 0) {
        toast.error("paste already exist");
        return;
      }

      // add paste to array.
      state.pastes.push(paste);

      // add array to local storage at key "pastes"
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      // console.log(state.pastes);

      toast.success("created successfully...")

    },
    updateToPastes: (state, actions) => {

      const paste = actions.payload;
      const index = state.pastes.findIndex((item) => item._id === paste._id);
      if (index => 0) {
        state.pastes[index] = paste;
        localStorage.setItem("pastes",JSON.stringify( state.pastes));
        toast.success("updated successfully");

      }

    },
    resetAllPastes: (state, actions) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
      toast.success("Paste updated")

    },
    removeFromPastes: (state, actions) => {
      const pasteId = actions.payload;
      console.log(pasteId)
      const index = state.pastes.findIndex((item) => item._id === pasteId)

      if (index >= 0) {
        // If the course is found in the Pastes, remove it
        state.pastes.splice(index, 1)
        // Update to localstorage
        localStorage.setItem("pastes", JSON.stringify(state.pastes))
        // show toast
        toast.success("Paste deleted")
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } = pasteSlice.actions

export default pasteSlice.reducer
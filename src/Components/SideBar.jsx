import React, { useContext, useState } from "react";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import Modal from "./Modal";
import { createPortal } from "react-dom";
import { TrackerCreatContext } from "../Context/TrackerContext";

function SideBar() {
  const [InputValue, setInputValue] = useState("");
  const { amount, setamount, open, setopen } = useContext(TrackerCreatContext);
  function handleAmount() {
    if (!InputValue == "") {
      localStorage.setItem("Amount", JSON.stringify(InputValue));

      setamount(InputValue);
      setInputValue("");
    }
  }
  function handleModal() {
    setopen(true);
  }
  return (
    <div className="h-[88.6vh] w-67 bg-[#441752] text-white p-5">
      <div className="space-y-4">
        <div className="input_field flex p-2 justify-center items-center rounded-lg bg-white">
          <input
            type="number"
            className="px-1 text-black outline-none bg-transparent"
            placeholder="Enter Amount"
            value={InputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            onClick={handleAmount}
            className="ml-[-35px] bg-[#441752] rounded-full py-1 text-white px-3"
          >
            Click
          </button>
        </div>
        <h2 className="block px-4 py-2 text-lg cursor-default">
          Task to Implement
        </h2>
        <button
          onClick={handleModal}
          disabled={amount == 0}
          className="flex gap-3 px-4 py-2 w-[100%] text-lg hover:bg-[#1B1833] cursor-pointer  duration-300 rounded-md"
        >
          <MdOutlineAccountBalanceWallet color="white" size={24} /> Add Balance
        </button>
        {open &&
          createPortal(
            <Modal onClose={() => setopen(false)} />,
            document.getElementById("portal")
          )}
      </div>
    </div>
  );
}

export default SideBar;

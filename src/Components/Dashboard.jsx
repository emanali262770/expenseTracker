import React, { useContext, useState } from "react";
import SideBar from "./SideBar";
import TableContent from "./TableContent";
import { useEffect } from "react";
import { TrackerCreatContext } from "../Context/TrackerContext";

function Dashboard() {
  const { amount, setamount } = useContext(TrackerCreatContext);

  useEffect(() => {
    const storedValue = JSON.parse(localStorage.getItem("Amount")) || 0;
    setamount(storedValue);
  }, []);

  return (
    <div className=" bg-gray-100">
      <div className="flex">
        <SideBar />
        <div className="flex-1 p-8 bg-white rounded-lg shadow-md m-4">
          <h1 className="text-center text-4xl font-extrabold text-gray-800 mb-4">
            Expense Tracker
          </h1>

          <div className="mb-8 text-center">
            <h2 className="text-2xl font-semibold text-[#AB4459]">
              Total Balance:{" "}
              <span className="text-xl font-medium text-[#F29F58]">
                {amount} PKR
              </span>
            </h2>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
            <TableContent />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

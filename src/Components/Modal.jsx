import React, { useContext } from "react";
import { TrackerCreatContext } from "../Context/TrackerContext";
import axios from "axios";
import { toast } from "react-toastify";

const Modal = ({ onClose }) => {
  const {
    itemName,
    setItemName,
    setamount,
    amount,
    itemPrice,
    setItemPrice,
    setRows,
    rows,
    editId,
    seteditId,
  } = useContext(TrackerCreatContext);

  async function handleModalData(e) {
    e.preventDefault();
    if (editId) {
      const { data } = await axios.put(
        `http://localhost:8000/items/${editId}`,
        {
          itemName,
          itemPrice,
          Date: new Date().toLocaleDateString(),
        }
      );

      setRows((prev) => prev.map((row) => (row.id === editId ? data : row)));
      const oldPrice = rows.find((row) => row.id == editId);
      const diffrenceamount = itemPrice - oldPrice.itemPrice;
      const updatePrice = amount - diffrenceamount;
      setamount(updatePrice);
      localStorage.setItem("Amount", updatePrice);

      seteditId(null);
      onClose();
      setItemName("");
      setItemPrice("");
    } else {
      try {
        if (Number(itemPrice) > amount) {
          toast.error("Amount is Huge");
          return;
        }

        const { data } = await axios.post("http://localhost:8000/items", {
          itemName,
          itemPrice,
          Date: new Date().toLocaleDateString(),
        });

        setRows((prevRows) => [...prevRows, data]);

        const updatedAmount = amount - Number(itemPrice);
        setamount(updatedAmount);
        localStorage.setItem("Amount", updatedAmount);

        setItemName("");
        setItemPrice("");
        onClose();
        toast.success("Item Added sucessfully");
      } catch (error) {
        console.error("Error adding item:", error);
      }
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="p-8 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-xl w-full max-w-md">
        <p
          onClick={onClose}
          className="text-right cursor-pointer text-white font-bold"
        >
          X
        </p>
        <h1 className="text-2xl font-bold text-white text-center mb-6">
          {editId ? "Edit Item" : "Add Items"}
        </h1>
        <form className="space-y-4" onSubmit={handleModalData}>
          <div>
            <label className="block text-sm font-medium text-gray-200">
              {editId ? "Edit Item" : " Add Item Name"}
            </label>
            <input
              type="text"
              placeholder="Enter your Item name"
              className="mt-1 w-full px-4 py-2 border outline-none border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200">
              {editId ? "Edit Price" : "Add Price"}
            </label>
            <input
              type="number"
              placeholder="Enter Price"
              className="mt-1 w-full px-4 py-2 border border-gray-300 outline-none rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
              value={itemPrice}
              onChange={(e) => setItemPrice(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {editId ? "Update" : "Add"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;

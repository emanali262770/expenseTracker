import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const TrackerCreatContext = createContext();

const TrackerContext = ({ children }) => {
   const [open, setopen] = useState(false);
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [editId, seteditId] = useState(null);
  const [rows, setRows] = useState([]);
const [amount, setamount] = useState(0);
  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get("http://localhost:8000/items");
      setRows(data);
    }
    fetchData();
  }, []); 
  
  async function deleteData(id) {
    try {
      
      await axios.delete(`http://localhost:8000/items/${id}`);
      const updatedRows = rows.filter((row) => row.id !== id);
      setRows(updatedRows);
      const finddata=rows.find((item)=>item.id==id)
      
      
      let updatedPrice=amount+Number(finddata.itemPrice)
      setamount(updatedPrice)
     localStorage.setItem('Amount',updatedPrice)
      toast.warn('Item is Deleted')
      
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  }

  return (
    <TrackerCreatContext.Provider
      value={{ itemName, setItemName, seteditId,editId,setopen,open, itemPrice, setItemPrice, rows,amount,setamount, setRows, deleteData }}
    >
      {children}
    </TrackerCreatContext.Provider>
  );
};

export default TrackerContext;

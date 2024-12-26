import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { MdEditNote, MdDelete } from "react-icons/md";
import { TrackerCreatContext } from "../Context/TrackerContext";

const TableContent = () => {
  const { rows, setrows,seteditId,setItemPrice, setItemName, deleteData, setopen } =
    React.useContext(TrackerCreatContext);

  const handleEdit = (id) => {
    const item = rows.find((item) => item.id == id);
    setItemName(item.itemName);
    setItemPrice(item.itemPrice);
    seteditId(id)
    setopen(true);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 1000 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Items</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows && rows.length > 0 ? (
            rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.itemName}
                </TableCell>
                <TableCell align="right">{row.itemPrice}</TableCell>
                <TableCell align="right">{row.Date}</TableCell>
                <TableCell align="right">
                  <div className="flex justify-end">
                    <MdEditNote
                      onClick={() => handleEdit(row.id)}
                      className="cursor-pointer text-blue-500"
                      title="Edit"
                      size={24}
                    />
                    <MdDelete
                      onClick={() => deleteData(row.id)}
                      className="cursor-pointer text-red-500"
                      title="Delete"
                      size={24}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center">
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableContent;

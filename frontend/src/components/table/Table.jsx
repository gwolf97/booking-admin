import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useFetch from "../../hooks/useFetch";
import moment from "moment"
import { useEffect, useState } from "react";

const List = () => {
  const {data:bookings} = useFetch("/bookings")



const readableDates = (dates) => {
  const firstDate = new Date(dates[0]).toLocaleDateString()
  const secondDate = new Date(dates[dates.length - 1]).toLocaleDateString()

  return `${firstDate}-${secondDate}`
}

  const rows = [
  ];
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Booking ID</TableCell>
            <TableCell className="tableCell">User</TableCell>
            <TableCell className="tableCell">Hotel Name</TableCell>
            <TableCell className="tableCell">Hotel ID</TableCell>
            <TableCell className="tableCell">Dates</TableCell>
            <TableCell className="tableCell">Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking._id}>
              <TableCell className="tableCell">{booking._id}</TableCell>
              <TableCell className="tableCell">{booking.user}</TableCell>
              <TableCell className="tableCell">{booking.hotel.name}</TableCell>
              <TableCell className="tableCell">{booking.hotel.id}</TableCell>
              <TableCell className="tableCell">{readableDates(booking.dates)}</TableCell>
              <TableCell className="tableCell">{moment(booking.createdAt).format("MMMM Do YY, h:mm:ssa")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;

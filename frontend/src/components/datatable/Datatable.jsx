import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Datatable = ({columns}) => {

  const location = useLocation()
  const path = location.pathname.split("/")[1]
  const [list, setList] = useState([])
  const {data, loading, error} = useFetch(`/${path}`)
  const [rowId, setRowId] = useState("")

  useEffect(() => {
    setList(data)
  },[data])

  const navigate = useNavigate()

  const handleRowClick = (row) => {
    if(path === "users"){
      navigate(`/users/${row.id}`)
    }else{
      return
    }
  }
  
  return (
    <div className="datatable">
      <div className="datatableTitle">
         {path}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={row => row._id}
        onRowClick={(row) => handleRowClick(row)}
      />
    </div>
  );
};

export default Datatable;

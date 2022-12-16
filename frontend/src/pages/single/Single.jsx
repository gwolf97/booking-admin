import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useState } from "react";
import axios from "axios"

const Single = () => {

  const [edit, setEdit] = useState(false)

  const params = useParams()
  const navigate = useNavigate()

  const {data} = useFetch(`/users/${params.userId}`)

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/users/${id}`)
      navigate("/users")
      alert("User and users bookings deleted")
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div onClick={() => setEdit(!edit)} className="editButton">{edit ? "Back" : "Edit"}</div>
            {edit && <div onClick={() => handleDelete(params.userId)} className="deleteButton">Delete</div>}
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={data.img}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{data.username}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{data.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{data.phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">City:</span>
                  <span className="itemValue">
                    {data.city}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">{data.country}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
        <h1 className="title">Last Transactions</h1>
          <List username={data.username}/>
        </div>
      </div>
    </div>
  );
};

export default Single;

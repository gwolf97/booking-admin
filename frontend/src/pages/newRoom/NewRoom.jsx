import "./newRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const NewRoom = ({ inputs, title }) => {
  const [info, setInfo] = useState({})
  const [hotelId, setHotelId] = useState(undefined)
  const [rooms, setRooms] = useState([])

  const {data, loading, error } = useFetch("/hotels")

  const handleChange = (e) => {
    setInfo(prev=>({...prev,[e.target.id]: e.target.value}))
  }

  const handleClick = async (e) => {
    e.preventDefault()
    const roomNumbers = rooms.split(",").map(room => ({number:room}))
    try {
      await axios.post(`/rooms/${hotelId}`, {...info, roomNumbers})

      alert("Room created successfully")
    } catch (error) {
      console.log(error)
    }
    
  }


  return (
    <div className="new"> 
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input onChange={(e) => handleChange(e)} id={input.id} type={input.type} placeholder={input.placeholder} />
                </div>
              ))}
                <div className="formInput" >
                  <label>Choose a hotel</label>
                  <select id="hotelId" onChange={(e) => setHotelId(e.target.value)}>
                    <option value={null}>none</option>
                    {loading ? "loading" : data && data.map(hotel=>(
                      <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
                    ))}
                  </select>
                </div>
                <div className="formInput">
                  <label>Rooms</label>
                  <textarea onChange={(e) => setRooms(e.target.value)} placeholder="Seperate room numbers by a comma ',' "/>
                </div>
              <button onClick={(e) => handleClick(e)}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;

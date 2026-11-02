import "./ListedEquiments.css";
import ListedEquipmentCard from "./ListedEquipmentCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { USER_REQUESTED_URL } from "../../../urls.js";
import tractor from "../../../assets/john-deere-wallpaper-19-642x462 (1).jpg";
import { useDispatch } from "react-redux";
import AddEquipment from "./AddEquipment.js";
import jscookie from "js-cookie"
function ListedEquipments(props) {
  const [dataEquipment,setDataEquipment]=useState([]);
  var getEquipments=()=>{
    const userEmail=jscookie.get("userEmail");
    axios.post(USER_REQUESTED_URL + "/getEquipment",{userEmail}).then((equipments)=>{
    setDataEquipment(equipments.data.result)
    console.log("dataEquipment",dataEquipment);
    }).catch(err=>console.log("error",err));
  }

  useEffect(getEquipments,[])
  console.log(dataEquipment);
  
  
  

  return (
    <>
      <div className="row m-2 p-0" id="ListedEquipmentBox">
        <div className="col-12  d-flex justify-content-between p-3">
          <h1 className="darkgreen wght-600 text-center">
            <i className="fa-solid fa-tractor"></i>&nbsp;Equipments
          </h1>
         <AddEquipment getEquipments={getEquipments}/>
        </div>
        {dataEquipment.map((Equipment,index)=>{
          return(<ListedEquipmentCard key={index} Equipment={Equipment} index={index} getEquipments={getEquipments}/>)
        })}
        {/* {dataEquipment.map((Equipment,index)=>{
          return(<ListedEquipmentCard key={index} Equipment={Equipment} index={index} getEquipments={getEquipments} />)
        })} */}
        
        {/* {/* <ListedEquipmentCard /> */}
        {/* <ListedEquipmentCard /> */}
        {/* <ListedEquipmentCard />
        <ListedEquipmentCard />
        <ListedEquipmentCard />
        <ListedEquipmentCard />  */}
         {/* <ListedEquipmentCard />  */}
      </div>
    </>
  );
}

export default ListedEquipments;

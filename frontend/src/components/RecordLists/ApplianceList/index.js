import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { fetchAllRecords } from "../../../store/records"
import RecordCard from "../RecordCard"
import NameSection from "../zNameSection" 
import AddRecord from "../zAddRecord"
import "../index.css";





const ApplianceList = () => {

    const dispatch = useDispatch();
    const { partsHouseId } = useParams();
    const numpartsHouseId = parseInt(partsHouseId);

    const partsHouses = useSelector(state => state.partsHouses);

    const [appliances, setAppliances] = useState([]);
    const [ph, setPh] = useState([]);

    const selectedPartsHouse = partsHouses.find(ph => ph.id === numpartsHouseId);

    useEffect(() => {
        dispatch(fetchAllRecords(numpartsHouseId))
        if (partsHouses.length === 0) {
            return
        };

        if (selectedPartsHouse) {
        

            // const records = selectedPartsHouse.Records
            // const applianceTypes = records.filter(rec => rec.type === "Appliance")
            setPh(selectedPartsHouse)
            // setAppliances(applianceTypes)
        }

    }, [partsHouses, partsHouseId, numpartsHouseId, selectedPartsHouse]);

    // useEffect(() => {
    //     if (partsHouses.length === 0) {
    //         return
    //     }

    // }, [partsHouses, partsHouseId, numpartsHouseId, selectedPartsHouse]);



    // {appliances.map(appliance => {
    //     return <NavLink to={`/records/${appliance.id}`} key={appliance.id} >
    //         <RecordCard record={appliance} />
    //     </NavLink>
    // })}

    return (
        <div id="user-main-page">
            <NameSection ph={ph}/>

            <div id="record-navbar">
                <NavLink to={`/parts-house/${partsHouseId}/appliances`} >
                    Appliances
                </NavLink>
                <NavLink to={`/parts-house/${partsHouseId}/electronics`}>
                    Electronics
                </NavLink>
                <NavLink to={`/parts-house/${partsHouseId}/other`}>
                    Other
                </NavLink>
            </div>

            <AddRecord partsHouseId={partsHouseId}/>

            <div id="display-box">
                <img src="https://i.ibb.co/1J6XgXY/Appliance-Icon.png" alt="Appliance-Icon" border="0" width="100px"></img>
                <div>

                </div>
            </div>

            <div id="mascot">
                <img src="https://i.ibb.co/Sx3THPm/vector-creator-1500-1by1.png" alt="vector-creator-1500-1by1" border="0" height="100px" />
            </div>
        </div>
    );
};

export default ApplianceList;
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import "./index.css";


// const Part = () => {
//     return (
//         <div>
//             <p>THIS IS HITTING</p>
//             <h1></h1>
//         </div>
//     );
// };



const PartPage = () => {

    const dispatch = useDispatch();
    const history = useHistory()

    const { partId } = useParams();
    const numpartId = parseInt(partId);

    const parts = useSelector(state => state.parts)
    const part = parts.find(part => part.id === numpartId)


    useEffect(() => {
        if (parts.length === 0) {
            return
        };
    }, [part])

    const deleteHandler = (e) => {
        e.preventDefault();
        // dispatch(deletePart(numpartId));
        history.go(-1);
    };

    return (
        <div id="user-main-page">

            <div id="display-box">
                <div id="part-container">
                    <div id="record-name">{part.name}</div>
                    <div id="record-make">{part.make}</div>
                    <h2>Info</h2>
                    <p>Model - {part.model}</p>
                    <p>Serial - {part.serial}</p>
                    <p>Initial Purchase Cost - ${part.cost}</p>
                </div>

                <div id="delete-record">
                    <p>Delete this Part and all its info</p>
                    <button onClick={deleteHandler}>delete</button>
                </div>

            </div>

        </div>
    );
};

export default PartPage;
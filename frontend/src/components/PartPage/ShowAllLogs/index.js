import React, { useState } from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns"
import "./index.css"

const Log = ({ log }) => {

    const handleDelete = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <div id="single-log" key={log.id}>
                <p className="plr">{format(new Date(log.date), "PP")}</p>
                <p className="note mr">{`${log.note}`}</p>
                <button className="small-buttons mr" onClick={handleDelete}>delete</button>
            </div>
            <div id="button-section">
            </div>
        </>
    );
};

const ShowAllLogs = ({ setHidden }) => {

    const logs = useSelector(state => state.logs)
    const reversedLogs = []

    if (logs) {
        logs.map(log => reversedLogs.unshift(log))
    }


    const handleHidden = (e) => {
        e.preventDefault();
        setHidden(true)
    };


    return (
        <>
            <div id="all-logs">
                <div id="all-top">
                    <button onClick={handleHidden} className="small-buttons">Hide Logs</button>
                </div>
                <div id="logs-section">
                    {reversedLogs && reversedLogs.map(log => {
                        return <Log log={log} />
                    })}
                </div>
            </div>
        </>
    );
};

export default ShowAllLogs
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import BackButton from "../../Utilities/BackButton";
import { updateRecord, deleteRecord } from "../../../store/records";
import "./index.css"
import Calendar from "../../Calendar";

const UpdateRecordPage = () => {


    const dispatch = useDispatch();
    const history = useHistory();
    const { recordId } = useParams();

    const numRecordId = parseInt(recordId);

    const records = useSelector(state => state.record);
    const record = records.find(rec => rec.id === numRecordId);


    const [type, setType] = useState(record.type);
    const [name, setName] = useState(record.name);
    const [make, setMake] = useState(record.make);
    const [cost, setCost] = useState(record.cost);
    const [model, setModel] = useState(record.model);
    const [serial, setSerial] = useState(record.serial);
    const [date, setDate] = useState(new Date());
    const [purchaseUrl, setPurchaseUrl] = useState(record.purchaseUrl);
    const [descript, setDescript] = useState(record.description);
    const [errors, setErrors] = useState([]);
    const [hidden, setHidden] = useState(true);


    const options = [
        "SELECT",
        "Appliance",
        "Electronic",
        "Other"
    ];

    useEffect(() => {
        const errors = [];
        if (!name.length) {
            errors.push("Name is required");
        };
        if (!make.length) {
            errors.push("Make is required");
        };
        if (cost < 0) {
            errors.push("Initial Cost cannot be less than 0");
        };
        if (type === "" || type === "SELECT") {
            errors.push("Choose a type");
        };
        setErrors(errors)
    }, [name, make, cost, type])


    const onSubmit = async e => {
        e.preventDefault();
        const formData = {
            type,
            name,
            cost,
            make,
            model,
            serial,
            purchaseUrl,
            description: descript,
        };

        dispatch(updateRecord(formData, numRecordId))

        // history.go(-1)  
    };

    const hiddenFalse = (e) => {
        e.preventDefault();
        setHidden(false);
    };

    const hiddenTrue = (e) => {
        e.preventDefault();
        setHidden(true);
    };

    const deleteHandler = (e) => {
        dispatch(deleteRecord(recordId));
        history.go(-2);
    };

    return (

        <div id="user-main-page">
            
            <form id="new-record-form" onSubmit={onSubmit}>
                <h2>Update {record.name}</h2>

                <ul className="red-error">
                    {errors.map(error => (
                        <li key={error}>{error}</li>
                    ))}
                </ul>

                {!hidden && <button className="form-button" onClick={hiddenTrue}>Show Simple Form</button>}
                {hidden && <button className="form-button" onClick={hiddenFalse}>Show More Fields</button>}

                <label>
                    Select a Type:
                    <select value={type}
                        onChange={e => setType(e.target.value)} >

                        {options.map(type => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </label>


                <label>
                    Name:
                <input type="text" name="name" value={name}
                        placeholder="ex: Refrigerator, TV, .."
                        onChange={e => setName(e.target.value)} />
                </label>

                <label>
                    Make:
                <input type="text" name="make" value={make}
                        placeholder="ex: LG, Sony...  "
                        onChange={e => setMake(e.target.value)} />
                </label>

                <label>
                    Total Initial Cost:
                <input type="number" name="cost" value={cost}
                        onChange={e => setCost(e.target.value)} />
                </label>

                <label hidden={hidden}>
                    Model #
                <input type="text" name="model" value={model} hidden={hidden}
                        onChange={e => setModel(e.target.value)} />
                </label>

                <label hidden={hidden}>
                    Serial #
                <input type="text" name="serial" value={serial} hidden={hidden}
                        onChange={e => setSerial(e.target.value)} />
                </label>

                <label >
                    Date of Purchase:
                    <Calendar value={date} onChange={setDate} />
                </label>


                <label hidden={hidden}>
                    Purchase URL Link:
                <input type="text" name="purchaseUrl" value={purchaseUrl} hidden={hidden}
                        onChange={e => setPurchaseUrl(e.target.value)} />
                </label>

                <label hidden={hidden}>
                    Short Description:
                <textarea type="text" name="description" value={descript} hidden={hidden}
                        onChange={e => setDescript(e.target.value)} />
                </label>

                <div id="button-section">
                    <button className="form-button" type="submit">Update</button>
                    <BackButton />
                </div>

            </form>

            <div id="delete-record-section">
                <p>!Delete this Record!</p>
                <button onClick={deleteHandler}>Delete</button>
            </div>

        </div>

    );
};

export default UpdateRecordPage
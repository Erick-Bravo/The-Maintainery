import { fetch } from "./csrf";

const GET_ALL_PARTS = "get/All_Parts";
const ADD_PART = "add/parts";
const DELETE_PART = "delete/Part";

const setAllRecPartsAC = (payload) => ({
    type: GET_ALL_PARTS,
    payload
});

export const fetchAllRecParts = (recordId) => {
    return async (dispatch) => {
        const response = await fetch(`/api/records/${recordId}/parts`);

        dispatch(setAllRecPartsAC(response.data.parts));
    };
};

const addPartAC = (payload) => ({
    type: ADD_PART,
    payload
});

export const addPart = (formData) => {
    return async (dispatch) => {
        const response = await fetch(`/api/parts/create`, {
            method: "POST",
            body: JSON.stringify({formData})
        })
        dispatch(addPartAC(response.data.part))
    };
};


const deletePartAC = (payload) => ({
    type: DELETE_PART,
    payload
});


export const deletePart = (partId) => {
    return async (dispatch) => {
        const response = await fetch(`/api/parts/${partId}/delete`, {
            method: "DELETE",
            body: JSON.stringify({ partId }),
        });
        
        dispatch(deletePartAC(response.data.part));
    };
};




const reducer = (state = [], action) => {
    let newState;

    switch (action.type) {

        case GET_ALL_PARTS:
            newState = action.payload
            return newState
        
        case ADD_PART:
            newState = [...state, action.payload]
            return newState

        case DELETE_PART:
            newState = state.filter((part) => {
                const ret = part.id !== Number(action.payload.id)
                return ret
            });
            
            return newState

        default:
            return state
    };
};

export default reducer
import { createSlice } from "@reduxjs/toolkit";

export const employeeSlice = createSlice({
    name: "employee",
    initialState: {
        employee: [],
        currEditObj: {}
    },
    reducers: {
        setEmployee: (state, action) => {
            state.employee.push(action.payload)
        },
        updateEmployee: (state, action) => {
            let updateTarget = state.employee.map((item) => {
                if (item.id === action.payload.id) {
                    item = action.payload
                }
                return item
            })
            state.employee = updateTarget
        },
        deleteEmployee: (state, action) => {
            state.employee = state.employee.filter((item) => {
                return item.id !== action.payload
            })
        },
        setCurrEditObj: (state, action) => {
            state.currEditObj = state.employee.find((item) => {
                return item.id === action.payload
            })
        }
    }
})
export const { setEmployee, updateEmployee, deleteEmployee, setCurrEditObj } = employeeSlice.actions
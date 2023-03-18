import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { employeeSlice } from "./reducer/userSlices";

export default configureStore({
    reducer: {
        employee: employeeSlice.reducer
    }
})
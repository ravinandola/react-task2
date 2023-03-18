import { BrowserRouter, Route, Routes } from "react-router-dom"
import User from "./page/userList"

const AppRoute = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/*" element={<User />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default AppRoute
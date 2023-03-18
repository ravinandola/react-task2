import { Route, Routes } from "react-router-dom"
import UserForm from "./userForm"
import UserList from "./userList"

const User = () => {

    return (
        <>
            <Routes>
                <Route path="/" element={<UserList />} />
                <Route path="add" element={<UserForm />} />
                <Route path="edit/:id" element={<UserForm />} />
            </Routes>
        </>
    )
}
export default User
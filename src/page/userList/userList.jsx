import { useCallback, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { FaTrashAlt, FaPen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { deleteEmployee, setCurrEditObj } from "../../redux/reducer/userSlices";

const UserList = () => {
    const dispatch = useDispatch()
    const { employee } = useSelector((state) => state.employee);
    const [emp, setEmp] = useState(employee);
    const navigate = useNavigate();


    useEffect(() => {
        setEmp(employee)
    }, [employee, setEmp]);
    const onSearchEmployee = useCallback((e) => {
        let target = employee.filter((item) => {
            return item.first_name.toLowerCase().search(e.target.value.toLowerCase()) > -1
        })
        setEmp(target)
    }, [setEmp, employee])

    const handleDelete = useCallback((id) => {
        if (!id) {
            return;
        };
        alert("are you sure want to delete this record");
        dispatch(deleteEmployee(id));
    }, [dispatch])
    return (
        <>
            <div className="mx-2">
                <div className="d-flex align-items-center justify-content-between mx-2 my-3 ">
                    <div className="w-25 mx-2">
                        <input type={"text"} className="form-control" placeholder="Search employee..." onChange={(e) => {
                            onSearchEmployee(e)
                        }} />
                    </div>
                    <div>
                        <Button onClick={() => {
                            navigate('/add')
                        }}>Add +</Button>
                    </div>
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email Address</th>
                            <th>Dob</th>
                            <th>Mobile no</th>
                            <th>Action</th>
                        </tr >
                    </thead>
                    <tbody>
                        {
                            emp.length === 0 ? (
                                <div className="text-ceneter">
                                    <h4>Data Not Found</h4>
                                </div>
                            )
                                :
                                <>

                                    {
                                        emp.map((item) => {
                                            return <tr>
                                                <td>{item.first_name}</td>
                                                <td>{item.last_name}</td>
                                                <td>{item.email}</td>
                                                <td>{item.dob}</td>
                                                <td>{item.mobile_no}</td>
                                                <td>
                                                    <span className="mx-2"><span onClick={() => {
                                                        handleDelete(item.id)
                                                    }}>
                                                        <FaTrashAlt className="text-danger" style={{ cursor: 'pointer' }} />
                                                    </span><span className="mx-3"><FaPen style={{ cursor: 'pointer' }} className="text-info"
                                                        onClick={() => {
                                                            navigate('edit/' + item.id);
                                                            dispatch(setCurrEditObj(item.id))
                                                        }}

                                                    /></span></span>
                                                </td>
                                            </tr>
                                        })
                                    }
                                </>
                        }

                    </tbody>

                </Table>
            </div >
        </>
    )
}
export default UserList
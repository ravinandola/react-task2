import { useCallback } from "react";
import { Button, Card } from "react-bootstrap";
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setEmployee, updateEmployee } from "../../redux/reducer/userSlices";

const initValue = {
    id: Math.floor(Math.random() * 101),
    first_name: '',
    last_name: '',
    dob: '',
    mobile_no: '',
    gender: '',
    email: '',
    address: '',
};
const genderList = [{
    value: "male", lable: "Male"
},
{
    value: "female", lable: "Female"
},
]
const UserForm = () => {
    const { employee, currEditObj } = useSelector((state) => state.employee);
    const naviagte = useNavigate();
    let params = useParams();
    const dispatch = useDispatch();

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: !!params.id ? currEditObj : initValue
    });

    const onSubmit = useCallback((data) => {
        if (!data) {
            return;
        }
        if (!params.id) {
            if (employee.map((item) => { return item.email }).includes(data.email)) {
                alert("already email exists");
                return;
            };
            dispatch(setEmployee(data));
        } else {
            dispatch(updateEmployee(data))
        };
        naviagte("/");
    }, [params, dispatch, naviagte])

    return (
        <>
            <div>
                <form action="post" onSubmit={handleSubmit(onSubmit)}>
                    <div className="w-50 m-auto mt-5">
                        <Card className="p-2">
                            <h2 className="text-center">{!params.id ? 'Add New Employee' : 'Edit Employee'}</h2>
                            <div className="row">
                                <div className="col-6">
                                    <label htmlFor="" className="mt-2 mx-1">First Name</label>
                                    <input type={'text'} className="form-control" {...register("first_name", {
                                        required: true
                                    })} />
                                    {errors.first_name && (
                                        <p className="text-danger my-1">First name is required</p>
                                    )}
                                </div>

                                <div className="col-6">
                                    <label htmlFor="" className="mt-2 mx-1">Last Name</label>
                                    <input type={'text'} className="form-control"  {...register("last_name", {
                                        required: true
                                    })} />
                                    {errors.last_name && (
                                        <p className="text-danger my-1">Last name is required</p>
                                    )}
                                </div>

                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <label htmlFor="" className="mt-2 mx-1">Dob</label>
                                    <input type={'date'} className="form-control"  {...register("dob", {
                                        required: true
                                    })} />
                                    {errors.dob && (
                                        <p className="text-danger my-1">Dob is required</p>
                                    )}
                                </div>

                                <div className="col-6">
                                    <label htmlFor="" className="mt-2 mx-1">Gender</label>
                                    <select className="form-control" placeholder="select gender" {...register("gender", {
                                        required: true
                                    })}>
                                        {
                                            genderList.map((item) => {
                                                return (
                                                    <>
                                                        <option> {item.lable}</option>
                                                    </>
                                                )
                                            })
                                        }
                                    </select>
                                    {errors.gender && (
                                        <p className="text-danger my-1">Gender is required</p>
                                    )}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <label htmlFor="" className="mt-2 mx-1">Email</label>
                                    <input type={'text'} className="form-control"   {...register("email", {
                                        required: true,
                                        pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/
                                    })} />
                                    {errors.email && errors.email.type === "required" && (
                                        <p className="text-danger my-2" >Email is required.</p>
                                    )}
                                    {errors.email && errors.email.type === "pattern" && (
                                        <p className="text-danger my-2">Email is not valid.</p>
                                    )}

                                </div>
                                <div className="col-6">
                                    <label htmlFor="" className="mt-2 mx-1">Mobile Number</label>
                                    <input type={'number'} className="form-control" {...register("mobile_no", {
                                        required: true,
                                        minLength: 10,
                                        maxLength: 10
                                    })} />
                                    {errors.mobile_no && errors.mobile_no.type === "required" && (
                                        <p className="text-danger my-1">Mobile number is required</p>
                                    )}
                                    {errors.mobile_no && (errors.mobile_no.type === "minLength" || errors.mobile_no.type === "maxLength") && (
                                        <p className="text-danger my-2">Enetr valid number</p>
                                    )}
                                </div>
                            </div>
                            <div className="row">
                                <div>
                                    <label htmlFor="" className="mt-2 mx-1">Address</label>
                                    <textarea className="form-control"    {...register("address", {
                                        required: true,
                                        minLength: 100,
                                    })}></textarea>
                                    {errors.address && errors.address.type === "required" && (
                                        <p className="text-danger my-1">Address is required</p>
                                    )}
                                    {errors.address && errors.address.type === "minLength" && (
                                        <p className="text-danger my-1">minimum 100 chartecher is required</p>
                                    )}
                                </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-end">
                                <div className="mx-2 my-2" >
                                    <Button variant="danger" type="button" onClick={() => {
                                        naviagte("/")
                                    }}>Back</Button>
                                </div>
                                <div className="mx-2 my-2" >
                                    <Button type="submit">Submit</Button>
                                </div>
                            </div>
                        </Card>
                    </div>
                </form>
            </div>
        </>
    )
}
export default UserForm
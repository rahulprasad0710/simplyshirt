import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { getAllUserAction } from "../../redux/action/adminAction/adminAction";
import Loading from "../Laoding";
import ErrorMsg from "../ErrorMsg";
const AdminUser = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.userLogin);
    const { loading, allUsers, error } = useSelector((state) => state.admin);
    useEffect(() => {
        if (!userInfo && userInfo.isAdmin) {
            history.push("/");
        } else {
            dispatch(getAllUserAction());
        }
    }, [dispatch, history, userInfo]);

    return (
        <div className="div">
            <h4 className="bg-warning text-primary px-2 py-1 rounded-top">
                Users
            </h4>
            {loading && <Loading />}
            {error && <ErrorMsg error={error} />}
            {allUsers && (
                <div className="div">
                    <Table
                        striped
                        bordered
                        hover
                        responsive
                        className="table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>FIRST NAME</th>
                                <th>LAST NAME</th>
                                <th>MOBILE</th>
                                <th>EMAIL</th>
                                <th>ADMIN</th>
                                <th>EDIT</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allUsers.map((u) => (
                                <tr key={u._id}>
                                    <td>{u._id}</td>
                                    <td>{u.firstName}</td>
                                    <td>{u.lastName}</td>
                                    <td>{u.mobileNumber}</td>
                                    <td>
                                        <a href={`mailto:${u.email}`}>
                                            {u.email}{" "}
                                        </a>
                                    </td>
                                    <td className="text-center">
                                        {u.isAdmin ? (
                                            <i className="text-success fas fa-check"></i>
                                        ) : (
                                            <i className="text-danger fas fa-times"></i>
                                        )}
                                    </td>
                                    <td>
                                        <span>
                                            <i className="px-1 mr-1  far fa-edit text-info mousep "></i>
                                        </span>
                                        <span>
                                            <i className="px-1 ml-1 far fa-trash-alt text-danger mousep "></i>
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )}
        </div>
    );
};

export default AdminUser;

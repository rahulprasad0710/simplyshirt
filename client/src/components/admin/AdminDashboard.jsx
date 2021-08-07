import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { getAllUserAction } from "../../redux/action/adminAction/adminAction";
import Loading from "../Laoding";
import ErrorMsg from "../ErrorMsg";
const AdminDashboard = () => {
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
                Dashboard
            </h4>
            {loading && <Loading />}
            {error && <ErrorMsg error={error} />}
        </div>
    );
};

export default AdminDashboard;

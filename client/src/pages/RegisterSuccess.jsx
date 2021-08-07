import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
export const RegisterSuccessPage = () => {
    const history = useHistory();
    const { message, status } = useSelector((state) => state.newUser);
    const { userInfo } = useSelector((state) => state.userLogin);

    useEffect(() => {
        if (userInfo) {
            history.push("/");
        }

        if (status !== 201) {
            history.push("/");
        }
    }, [history, userInfo, status]);

    return (
        <div className="container">
            <div class="d-flex flex-column text-center text-success bg-light p-3">
                <h2>Well done!</h2>
                <p>{message}</p>
                <Link className="text-dark" to="/login">
                    <button type="button" class="btn btn-success btn-lg">
                        Login Here
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default RegisterSuccessPage;

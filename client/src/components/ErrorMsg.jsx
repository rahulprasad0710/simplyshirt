import React from "react";
import { Alert } from "react-bootstrap";

const ErrorMsg = ({ error }) => {
    return (
        <Alert className="bg-warning text-primary">
            <h4 className="text-center">{error}</h4>
        </Alert>
    );
};

export default ErrorMsg;

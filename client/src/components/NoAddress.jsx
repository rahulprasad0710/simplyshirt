import React from "react";

const NoAddress = ({ editAddressModel, message }) => {
    const openAddressModel = () => {
        editAddressModel();
    };
    return (
        <button onClick={openAddressModel} className="btn btn-secondary mb-3 ">
            Add New Address
        </button>
    );
};

export default NoAddress;

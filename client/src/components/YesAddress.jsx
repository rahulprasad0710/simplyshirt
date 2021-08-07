import React from "react";
import { Col } from "react-bootstrap";
const YesAddress = ({ address }) => {
    return (
        <div
            key={address._id}
            className=" profile-card yes-address bg-light p-2 ">
            <h5 className="uppercase card-title">
                Contact Name:{address.contactName}
            </h5>
            <p className="mb-1">Phone Number : {address.phoneNumber}</p>
            <p className="mb-1">
                <span className="font-weight-light">Address Details:</span>
                {address.addressName}
            </p>
            <div className="row">
                <Col xs={6} md={6}>
                    <p className="mb-1">
                        <span>Tole :{address.tole}</span>
                    </p>
                </Col>
                <Col>
                    <p className="mb-1">
                        <span>Ward :{address.ward}</span>
                    </p>
                </Col>
            </div>
            <div className="row">
                <Col xs={6} md={6}>
                    <p className="mb-1">
                        <span>City :{address.city}</span>
                    </p>
                </Col>
                <Col>
                    {" "}
                    <p className="mb-1">
                        <span>District :{address.district}</span>
                    </p>
                </Col>
            </div>
        </div>
    );
};

export default YesAddress;

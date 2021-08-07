import React, { useState } from "react";
import { Col } from "react-bootstrap";
import AddressModel from "../AddressModel";
import NoAddress from "../NoAddress";
import YesAddress from "../YesAddress";
import { useSelector } from "react-redux";
const MyAddress = () => {
    const [showAddressModel, setShowAddressModel] = useState(false);

    const editAddressModel = () => {
        setShowAddressModel(true);
    };
    const { userAddresses } = useSelector((state) => state.profileInfo);
    return (
        <div>
            <AddressModel
                showModel={showAddressModel}
                setshowModel={setShowAddressModel}
            />
            <div className="row">
                <Col xs={12} md={4}>
                    <h3>Address: </h3>
                    <NoAddress
                        message={
                            userAddresses.length === 0
                                ? "No Address Saved"
                                : "Add new Address"
                        }
                        editAddressModel={editAddressModel}
                    />
                </Col>
                {userAddresses && userAddresses.length > 0 && (
                    <div className="row">
                        {userAddresses.map((address) => (
                            <Col xs={12} md={4}>
                                <YesAddress address={address} />
                            </Col>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyAddress;

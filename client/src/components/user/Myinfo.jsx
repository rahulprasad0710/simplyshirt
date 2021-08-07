import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import ProfileModel from "../ProfileModel";

const Myinfo = () => {
    const { userDetails } = useSelector((state) => state.profileInfo);
    const [showProfileModel, setShowProfileModel] = useState(false);
    const editProfileModel = () => {
        setShowProfileModel(true);
    };
    return (
        <div>
            {userDetails && (
                <ProfileModel
                    user={userDetails}
                    showModel={showProfileModel}
                    setshowModel={setShowProfileModel}
                />
            )}
            <div className="row">
                <Col xs={12} md={4}>
                    <h3 className="text-center">Profile Details</h3>
                    {userDetails && (
                        <div className="bg-light p-3 profile-card rounded-2 clearfix">
                            <h5 className="uppercase">
                                <span>Name: </span>{" "}
                                <span className="uppercase  text-info">
                                    {userDetails.firstName}{" "}
                                    {userDetails.lastName}
                                </span>
                            </h5>
                            <h5 className="uppercase">
                                <span>Mobile Number: </span>{" "}
                                <span className="uppercase  text-info">
                                    {userDetails.mobileNumber}
                                </span>
                            </h5>
                            <h5 className="">
                                <span>Email: </span>{" "}
                                <span className=" text-info">
                                    {userDetails.email}
                                </span>
                            </h5>

                            <button
                                onClick={editProfileModel}
                                className="btn btn-primary float-end">
                                <i className="px-1 mx-1 far fa-edit text-white "></i>
                                Edit Info
                            </button>
                        </div>
                    )}
                </Col>
            </div>
        </div>
    );
};

export default Myinfo;

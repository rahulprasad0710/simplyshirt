import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";

import {
    getAllProductsAction,
    deleteProductAction,
} from "../../redux/action/adminAction/adminProductAction";
import Loading from "../Laoding";
import ErrorMsg from "../ErrorMsg";
import AdminAddProduct from "./AdminAddProduct";
const AdminProduct = () => {
    const [productModel, setProductModel] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.userLogin);
    const { loading, allProducts, error } = useSelector((state) => state.admin);
    useEffect(() => {
        if (!userInfo && userInfo.isAdmin) {
            history.push("/");
        } else {
            dispatch(getAllProductsAction());
        }
    }, [dispatch, history, userInfo]);

    const addProductHandler = () => {
        setProductModel(true);
    };
    const deleteProduct = (id) => {
        dispatch(deleteProductAction(id));
    };
    return (
        <div className="div">
            <AdminAddProduct
                showModel={productModel}
                setshowModel={setProductModel}
            />
            <div className="heading bg-warning px-2 d-flex justify-content-between py-1 align-items-sm-center rounded-top mb-3 ">
                <h4 className=" text-primary  flex-grow-1 ">Product</h4>
                <button
                    onClick={addProductHandler}
                    className="btn btn-primary ">
                    Add New Product
                </button>
            </div>
            {loading && <Loading />}
            {error && <ErrorMsg error={error} />}
            {allProducts && (
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
                                <th>PRODUCT NAME</th>
                                <th>BRAND</th>
                                <th>CATEGORY</th>
                                <th>PRICE</th>
                                <th>TOTAL STOCK</th>
                                <th>USER ID</th>
                                <th>EDIT</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allProducts.map((u) => (
                                <tr key={u._id}>
                                    <td>
                                        <Link to={`/product/${u._id}`}>
                                            {u._id}
                                        </Link>
                                    </td>
                                    <td>{u.name}</td>
                                    <td>{u.brand}</td>
                                    <td>{u.category}</td>
                                    <td>{u.price}</td>
                                    <td>{u.totalStock}</td>
                                    <td>
                                        <Link to={`/user/${u.user}`}>
                                            {u.user}
                                        </Link>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-outline-secondary"
                                            onClick={() =>
                                                deleteProduct(u._id)
                                            }>
                                            <i className="px-1 ml-1 far fa-trash-alt text-danger mousep "></i>
                                        </button>
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

export default AdminProduct;

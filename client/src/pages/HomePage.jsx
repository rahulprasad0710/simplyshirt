import React, { useEffect, useState } from "react";
import Product from "../components/Product";
import { Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { allProductAction } from "../redux/action/productAction";
import Laoding from "../components/Laoding";
import ErrorMsg from "../components/ErrorMsg";

const HomePage = () => {
    const { products, loading, error } = useSelector(
        (state) => state.allProducts
    );

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(allProductAction());
    }, [dispatch]);

    return (
        <div>
            <h3>Latest Products</h3>
            {loading && <Laoding />}
            {error && <ErrorMsg error={error} />}

            <Row>
                {products &&
                    products.map((product) => (
                        <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    ))}
            </Row>
        </div>
    );
};

export default HomePage;

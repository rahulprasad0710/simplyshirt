import React, { useState } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Loading from "../Laoding";
import axios from "axios";
import { addProductAction } from "../../redux/action/adminAction/adminProductAction";
const AdminAddProduct = ({ showModel, setshowModel }) => {
    const handleClose = () => setshowModel(false);
    const dispatch = useDispatch();

    const [previewSource, setPreviewSource] = useState(null);
    const [productName, setproductName] = useState("");
    const [brandName, setbrandName] = useState("");
    const [productDescription, setproductDescription] = useState("");
    const [price, setprice] = useState(0);
    const [catg, setCatg] = useState("");
    const [totalStock, settotalStock] = useState(1);

    const handleChangeImg = (e) => {
        const imageFile = e.target.files[0];
        previewFile(imageFile);
    };

    const previewFile = (imageFile) => {
        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };

    const handleEditProfile = async (e) => {
        const productDetails = {
            name: productName,
            brand: brandName,
            description: productDescription,
            price: price,
            totalStock: totalStock,
            category: catg,
            image: previewSource,
        };
        dispatch(addProductAction(productDetails));
        handleClose();
    };

    return (
        <Col xs={12} md={10}>
            <Modal show={showModel} onHide={handleClose}>
                <Modal.Header className="m-sm-0">
                    <Modal.Title>
                        <h5 className="text-center text-info ">
                            <span>
                                <i className="fas fa-user-edit"></i>
                            </span>{" "}
                            Product
                        </h5>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <div className="row">
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Product Name</Form.Label>
                                    <Form.Control
                                        onChange={(e) =>
                                            setproductName(e.target.value)
                                        }
                                        type="text"
                                        value={productName}
                                        placeholder="Product Name"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Brand Name</Form.Label>
                                    <Form.Control
                                        value={brandName}
                                        type="text"
                                        placeholder="Brand Name"
                                        onChange={(e) =>
                                            setbrandName(e.target.value)
                                        }
                                    />
                                </Form.Group>
                            </Col>
                        </div>
                        <Form.Group className="mb-2">
                            <Form.Label>Product Description</Form.Label>
                            <Form.Control
                                value={productDescription}
                                onChange={(e) =>
                                    setproductDescription(e.target.value)
                                }
                                as="textarea"
                                rows={3}
                            />
                        </Form.Group>
                        <div className="row">
                            <Col md={5}>
                                <Form.Group className="mb-2">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control
                                        value={catg}
                                        onChange={(e) =>
                                            setCatg(e.target.value)
                                        }
                                        type="text"
                                        placeholder="Price"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-2">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                        value={price}
                                        onChange={(e) =>
                                            setprice(e.target.value)
                                        }
                                        type="number"
                                        placeholder="Price"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group className="mb-2">
                                    <Form.Label>Total Stock</Form.Label>
                                    <Form.Control
                                        value={totalStock}
                                        onChange={(e) =>
                                            settotalStock(e.target.value)
                                        }
                                        type="number"
                                        placeholder="Available Stock"
                                    />
                                </Form.Group>
                            </Col>
                        </div>
                        <Form.Group className="mb-2">
                            <Form.Label>Product Image</Form.Label>
                            <Form.File
                                onChange={handleChangeImg}
                                id="image-file"
                                custom></Form.File>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleEditProfile}>
                        Add Product
                    </Button>
                </Modal.Footer>
            </Modal>
        </Col>
    );
};

export default AdminAddProduct;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { API_SERVICES } from "../constant/environment";
import { useNavigate } from "react-router-dom";
const ProductTable = () => {
  const handleView = (productId) => {
    window.location.href = `/product/${productId}`;
  };
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const url = `${API_SERVICES}api/get-form-data`;
      const response = await axios.get(url);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-product/${id}`)
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`${API_SERVICES}api/delete-product/${productId}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <>
      <div className="container">
        <div class="row justify-content-between" style={{ margin: 10 }}>
          <h1 class="col-4">Product Table</h1>
          <Link to="/add-product" className="btn btn-success col-1">
            Add Product
          </Link>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Images</th>
              <th>Category</th>
              <th>Subcategory</th>
              <th>Brand</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.product_name}</td>
                <td>
                  <ul className="list-unstyled">
                    {product.product_images.map((image, index) => (
                      <li key={index}>
                        <img
                          src={image}
                          alt={`Image ${index + 1}`}
                          className="img-thumbnail"
                          style={{
                            width: "60px",
                            height: "60px",
                            margin: "5px",
                          }}
                        />
                      </li>
                    ))}
                  </ul>
                </td>
                <td>{product.product_category}</td>
                <td>{product.product_subcategory}</td>
                <td>{product.product_brand}</td>
                <td>
                  <Link
                    to={`/product/${product._id}`}
                    className="btn btn-primary"
                  >
                    View
                  </Link>

                  <button
                    className="btn btn-secondary"
                    style={{ margin: "10px" }}
                    onClick={() => handleEdit(product._id)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductTable;

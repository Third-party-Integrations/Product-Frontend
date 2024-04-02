import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { API_SERVICES } from "../constant/environment";

const ProductDescription = () => {
  const { productId } = useParams(); 
  console.log(productId, "productId"); 

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const url = `${API_SERVICES}api/product/${productId}`;

        const response = await axios.get(url);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          {product.product_images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Product Image ${index + 1}`}
              className="img-fluid mb-3"
              style={{ height: "20%" }}
            />
          ))}
        </div>
        <div className="col-md-6">
          <h2 className="fw-bold">{product.product_name}</h2>
          <p>{product.product_description}</p>
          <ul className="list-unstyled">
            <li>
              <strong>Category:</strong> {product.product_category}
            </li>
            <li>
              <strong>Subcategory:</strong> {product.product_subcategory}
            </li>
            <li>
              <strong>Brand:</strong> {product.product_brand}
            </li>
            <li>
              <strong>Publish Date:</strong>{" "}
              {new Date(product.product_publish_date).toLocaleDateString()}
            </li>
          </ul>
          <h4 className="fw-bold">Product Features</h4>
          <ul>
            {product.product_features.split(",").map((feature, index) => (
              <li key={index}>{feature.trim()}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;

import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  categories,
  subcategoriesByCategory,
  API_SERVICES,
} from "../constant/environment";
import { useNavigate, useParams } from "react-router-dom";

const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    product_name: "",
    product_features: "",
    product_description: "",
    product_images: [],
    product_category: "",
    product_subcategory: "",
    product_brand: "",
    product_publish_date: "",
  });

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setFormData({
      ...formData,
      product_category: category,
      product_subcategory: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  useEffect(() => {
    if (id) {
      getProductDetails(id);
    }
  }, [id]);
  const getProductDetails = async (id) => {
    try {
      const url = `${API_SERVICES}api/product/${id}`;
      const res = await axios.get(url);
      const data = res.data;
      setFormData({
        product_name: data.product_name,
        product_features: data.product_features,
        product_description: data.product_description,
        product_images: data.product_images,
        product_category: data.product_category,
        product_subcategory: data.product_subcategory,
        product_brand: data.product_brand,
        product_publish_date: data.product_publish_date,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        const url = `${API_SERVICES}api/update-product/${id}`;
        await axios.put(url, formData);
        console.log("Form submitted successfully!");
        setFormData({
          product_name: "",
          product_features: "",
          product_description: "",
          product_images: [],
          product_category: "",
          product_subcategory: "",
          product_brand: "",
          product_publish_date: "",
        });
        navigate("/");
      } else {
        console.log(formData);
        const url = `${API_SERVICES}api/submit-form`;
        await axios.post(url, formData);
        console.log("Form submitted successfully!");
        setFormData({
          product_name: "",
          product_features: "",
          product_description: "",
          product_images: [],
          product_category: "",
          product_subcategory: "",
          product_brand: "",
          product_publish_date: "",
        });
        navigate("/");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="container" style={{ width: "50%" }}>
      {id ? (
        <h1 className="mt-5 mb-4">Update Product</h1>
      ) : (
        <h1 className="mt-5 mb-4">Add Product</h1>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Product Name:</label>
          <input
            type="text"
            className="form-control"
            name="product_name"
            value={formData.product_name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Product Features:</label>
          <input
            type="text"
            className="form-control"
            name="product_features"
            value={formData.product_features}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Product Description:</label>
          <textarea
            className="form-control"
            name="product_description"
            value={formData.product_description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Product Images:</label>
          <input
            type="file"
            className="form-control"
            multiple
            onChange={(e) => {
              const urls = Array.from(e.target.files).map((file) =>
                URL.createObjectURL(file)
              );
              setFormData({ ...formData, product_images: urls });
            }}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Product Category:</label>
          <select
            className="form-select"
            name="product_category"
            value={formData.product_category}
            onChange={handleCategoryChange}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Product Subcategory:</label>
          <select
            className="form-select"
            name="product_subcategory"
            value={formData.product_subcategory}
            onChange={handleInputChange}
            disabled={!formData.product_category}
          >
            <option value="">Select Subcategory</option>
            {formData.product_category &&
              subcategoriesByCategory[formData.product_category]?.map(
                (subcategory) => (
                  <option key={subcategory.value} value={subcategory.value}>
                    {subcategory.label}
                  </option>
                )
              )}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Product Brand:</label>
          <input
            type="text"
            className="form-control"
            name="product_brand"
            value={formData.product_brand}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Product Publish Date:</label>
          <input
            type="datetime-local"
            className="form-control"
            name="product_publish_date"
            value={formData.product_publish_date}
            onChange={handleInputChange}
          />
        </div>
        {id ? (
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        ) : (
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        )}
      </form>
    </div>
  );
};

export default ProductForm;

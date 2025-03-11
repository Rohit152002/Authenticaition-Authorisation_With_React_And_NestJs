import { useEffect, useState } from "react";
import { getAllProducts } from "../../services/product";
import { useNavigate } from "react-router";
import BackButton from "../ui/BackButton";

const ProductComponent = () => {
  interface Product {
    id: number;
    name: string;
    description: string;
    image: string;
    price: string;
    createdAt: string;
  }
  const [products, setProducts] = useState<Product[] | null>([]);

  async function fetchProduct() {
    try {
      const res = await getAllProducts();
      console.log(res);
      console.log(res.data);
      setProducts(res.data);
    } catch (err) {
      console.log(err);
      return;
    }
  }

  const handleEdit = (id: number) => {
    console.log(`Edit product with id: ${id}`);
  };

  const handleDelete = (id: number) => {
    console.log(`Delete product with id: ${id}`);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4">
      <BackButton />
      {products && products.length > 0 ? (
        products.map((product) => (
          <div key={product.id} className="border p-4 mb-4 rounded shadow-md">
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p className="text-gray-700">{product.description}</p>
            <img
              className="w-28 aspect-square h-auto mt-2"
              src={`http://localhost:3000/uploads/${product.image}`}
              alt={product.name}
            />
            <p className="text-green-500 font-semibold mt-2">{product.price}</p>
            <p className="text-gray-500 text-sm">{product.createdAt}</p>
            <div className="flex space-x-4 mt-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => handleEdit(product.id)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => handleDelete(product.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
};

export default ProductComponent;

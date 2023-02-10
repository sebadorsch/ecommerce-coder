import './styles.scss';
import {useEffect, useState} from "react";
import {Constants} from "../../constants";
import axios from 'axios';
import ProductCard from "../ProductCard/ProductCard";
import {useParams} from "react-router-dom";

export const Products = () => {
  const { apiUrl } = Constants
  const { cid } = useParams();

  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    if(cid){
      const productList = []
      const res = await axios.get(`${apiUrl}/carts/${cid}/products`);
      const productsFromCart = (res.data)
      for (const element of productsFromCart) {
        const res = await axios.get(`${apiUrl}/products/${element._id}`);
        productList.push(res.data)
      }
      setProducts(productList)
    }
    else{
      const res = await axios.get(`${apiUrl}/products`);
      setProducts(res.data.payload);
    }
  };

  useEffect(() => {
    getProducts()
  }, []);

  return (
  <>
    <div className='container container-products'>
      <div className="row">
        {
          cid
            ? <h1>Cart:</h1>
            : <h1>Products:</h1>
        }

      </div>
      <div className='row justify-content-center'>
        {products?.map((e) =>
          <div className='col-sm-4 col-product' key={e._id}>
            <ProductCard
              product={e}
              showButton={!cid}
            />
          </div>
        )}
      </div>
    </div>
  </>
  );
}

export default Products
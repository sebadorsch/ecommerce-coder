import './styles.scss';
import {useEffect, useState} from "react";
import {Constants} from "../../constants";
import axios from 'axios';
import ProductCard from "../ProductCard/ProductCard";
import {useLocation, useParams} from "react-router-dom";

export const Products = () => {
  const { apiUrl, appUrl } = Constants

  const location = useLocation();

  const {pathname, search} = location

  const { cid } = useParams();

  const [prevPageSearch, setPrevPageSearch] = useState('');
  const [nextPageSearch, setNextPageSearch] = useState('');

  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);

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
      const res = await axios.get(`${apiUrl}/products${search}`);

      setHasPrevPage(res.data.hasPrevPage)
      setHasNextPage(res.data.hasNextPage)

      setPrevPageSearch(search.replace(/(page=)[0-9]/, `page=${res.data.prevPage}`))
      setNextPageSearch(search.replace(/(page=)[0-9]/, `page=${res.data.nextPage}`))

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
        <div className="title">
        {
          cid
            ? <h1>Cart:</h1>
            : <h1>Products:</h1>
        }
        </div>
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
      <div className='row pages justify-content-center'>
        {
          hasPrevPage
            ? <a href={`${appUrl}${pathname}${prevPageSearch}`}>Prev</a>
            : <span>Prev</span>
        }
          <span> / </span>
        {
          hasNextPage
            ? <a href={`${appUrl}${pathname}${nextPageSearch}`}>Next</a>
            : <span>Next</span>
        }

      </div>
    </div>
  </>
  );
}

export default Products
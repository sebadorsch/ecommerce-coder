import './styles.scss';
import defaultImage from './img/logo512.png'

export const ProductCard = (data) => {
  const {product, showButton} = data


  const addToCart = async (pid) => {
    console.log(pid)
  }

  return (
    <div className="card-deck">
      <div className="card">
        <div className="card-title-product">
          <h4>{product.title}</h4>
        </div>
        <img className="card-img-top" src={defaultImage} alt="Card cap" />
        <div className="card-body">
          <p className="card-text"><span>Category:</span> <a href='http://localhost:8080'>{product.category}</a></p>
          <p className="card-text"><span>Code: </span>{product.code}</p>
          <p className="card-text"><span>Stock: </span>{product.stock}</p>
          <p className="card-text price">${product.price}</p>
        </div>
        {
          showButton &&
          <div className="card-footer row justify-content-end">
            <button
              type="button"
              className="btn btn-success"
              onClick={() => addToCart(product._id)}
            >
              Add to Cart
            </button>
          </div>
        }

      </div>
    </div>
  )
}

export default ProductCard
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container text-center">
      <h1>Welcome in our The Everyday E-Shop !</h1>
      <p>Find the best products and add them to your cart.</p>
      <Link to="/products" className="btn btn-primary">
        View Products
      </Link>

      <div className="mt-5">
        <h2>Why Choose Us?</h2>
        <ul className="list-unstyled">
          <li>Wide selection of products</li>
          <li> Attractive prices</li>
          <li> Fast delivery</li>
          <li> Satisfaction guarantee</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;

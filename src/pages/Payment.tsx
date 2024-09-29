const Payment = () => {
  return (
    <div className="container">
      <h2>Payment & Shipping</h2>

      <div className="row">
        {/* Select Payment Method */}
        <div className="col-md-3 col-sm-6 mb-3">
          <h6>Select Payment Method</h6>
          <select className="form-select">
            <option value="credit-card">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="blik">Blik</option>
          </select>
        </div>
      </div>

      <div className="row mt-3">
        {/* Select Shipping Method */}
        <div className="col-md-3 col-sm-6 mb-3">
          <h6>Select Shipping Method</h6>
          <select className="form-select">
            <option value="standard">InPost Parcel Locker - $3</option>
            <option value="express">Standard Courier - $5</option>
          </select>
        </div>
      </div>

      <button className="btn btn-add mt-4">Proceed to Payment</button>
    </div>
  );
};

export default Payment;

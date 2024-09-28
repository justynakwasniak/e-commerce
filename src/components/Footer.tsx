const Footer = () => {
  return (
    <footer className="text-center text-lg-start">
      <div className="container p-4">
        <div className="row d-flex justify-content-between">
          <div className="col-lg-6 col-md-12 mb-4 mb-md-0 text-start">
            <h5 className="footer-text text-uppercase">About us</h5>
            <p className=" footer-text footer-text">
              "This is a sample application for managing products. <br /> Thank
              you for visiting our site!"
            </p>
          </div>

          <div className="col-lg-6 col-md-12 mb-4 mb-md-0 text-end footer-text">
            <h5 className="text-uppercase footer-text">Contact</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <a className="link-mail footer-text" href="#!">
                  Email: kontakt@myshop.pl
                </a>
              </li>
              <li>
                <a className="link-tel footer-text" href="#!">
                  Telefon: 123-456-789
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center p-3 footer-text">
        <span className="footer-text">
          © {new Date().getFullYear()} The Everyday E-Shop{" "}
        </span>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";

const Footer = () => {
  return (
    <footer className="bg-light text-center text-lg-start">
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
            <h5 className="text-uppercase">About us</h5>
            <p>
              "This is a sample application for managing products. <br /> Thank
              you for visiting our site!"
            </p>
          </div>

          <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
            <h5 className="text-uppercase">Contact</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <a href="#!" className="text-dark">
                  Email: kontakt@myshop.pl
                </a>
              </li>
              <li>
                <a href="#!" className="text-dark">
                  Telefon: 123-456-789
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center p-3">
        <span className="text-muted">
          © {new Date().getFullYear()} The Everyday E-Shop{" "}
        </span>
      </div>
    </footer>
  );
};

export default Footer;

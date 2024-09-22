import React from "react";

const Footer = () => {
  return (
    <footer className="bg-light text-center text-lg-start">
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
            <h5 className="text-uppercase">O nas</h5>
            <p>
              To jest przykładowa aplikacja do zarządzania produktami.
              Dziękujemy za odwiedzenie naszej strony!
            </p>
          </div>

          <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
            <h5 className="text-uppercase">Kontakt</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <a href="#!" className="text-dark">
                  Email: kontakt@przyklad.pl
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
          © {new Date().getFullYear()} Moja Aplikacja
        </span>
      </div>
    </footer>
  );
};

export default Footer;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="text-center text-lg-start">
      <div className="container p-4">
        <div className="row">
          {/* About Us Section */}
          <div className="col-12 col-md-6 mb-4 text-center text-md-start">
            <h5 className="footer-text text-uppercase">About us</h5>
            <p className="footer-text">
              This is a sample application for managing products. <br /> Thank
              you for visiting my site!
            </p>
          </div>

          {/* Contact Section */}
          <div className="col-12 col-md-6 mb-4 text-center text-md-end footer-text">
            <h5 className="text-uppercase footer-text">Contact</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <a className="link-mail footer-text" href="#!">
                  Email: contact@myshop.pl
                </a>
              </li>
              <li>
                <a className="link-tel footer-text" href="#!">
                  Telefon: 123-456-789
                </a>
              </li>
              {/* Social Media Icons */}
              <li className="mt-2">
                <a
                  className="footer-icon"
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon
                    icon={faInstagram}
                    size="2x"
                    className="me-3"
                  />
                </a>
                <a
                  className="footer-icon"
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faFacebook} size="2x" />
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

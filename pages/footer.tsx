const Footer = ()=>{
  return(
    <>
    <style jsx>
    
      {`
      a{
        text-decoration:none;
      }
      `}
    </style>
          <footer>
              <div className="footer-content">
                  <div className="footer-section contact">
                      <h2>Contact Us</h2>
                      <p><i className="fas fa-map-marker-alt"></i> 123 Main Street, City, Country</p>
                      <p><i className="fas fa-envelope"></i> contact@mystore.com</p>
                      <p><i className="fas fa-phone"></i> +1 123-456-7890</p>
                  </div>
                  <div className="footer-section links">
                      <h2>Quick Links</h2>
                      <ul>
                          <li><a href="#">Home</a></li>
                          <li><a href="#">Shop</a></li>
                          <li><a href="#">Products</a></li>
                          <li><a href="#">Contact</a></li>
                      </ul>
                  </div>
                  <div className="footer-section social">
                      <h2>Follow Us</h2>
                      <a href="#" className="social-icon"><i className="fab fa-facebook">Facebook</i></a>
                      <a href="#" className="social-icon"><i className="fab fa-twitter">Twitter</i></a>
                      <a href="#" className="social-icon"><i className="fab fa-instagram">Instagram</i></a>
                  </div>
              </div>
              <div className="footer-bottom">
                  &copy; 2023 My Store. All rights reserved.
              </div>
          </footer>
     
    
    </>
  )
}



export default Footer;
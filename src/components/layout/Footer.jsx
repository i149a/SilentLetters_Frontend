import "../../styling/Layout/FooterStyle.css"

const Footer = () => {
  return (
    <footer className="footer-simple">
      &copy; {new Date().getFullYear()} Silent Letters. All rights reserved.
    </footer>
  )
}

export default Footer
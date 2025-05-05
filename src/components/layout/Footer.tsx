
import React from "react";
import { Link } from "react-router-dom";
import { FaXTwitter, FaFacebookF, FaTiktok } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-white border-t py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Plateau Scholarship</h3>
            <p className="text-sm text-muted-foreground">
              Supporting the educational aspirations of students from Plateau State, Nigeria.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/quiz" className="text-sm hover:text-primary">
                  Eligibility Quiz
                </Link>
              </li>
              <li>
                <Link to="/#about" className="text-sm hover:text-primary">
                  About
                </Link>
              </li>
              <li>
                <Link to="/#contact" className="text-sm hover:text-primary">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-sm hover:text-primary">
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <address className="not-italic text-sm text-muted-foreground">
              <p>Plateau State Scholarship Board</p>
              <p>Jos, Plateau State</p>
              <p>Nigeria</p>
              <p className="mt-2">Email: info@plateauscholarship.gov.ng</p>
              <p>Phone: +234 123 456 7890</p>
            </address>
            <div className="flex items-center gap-4 mt-4 text-black">
            <FaXTwitter  className="text-3xl"/>
            <FaFacebookF className="text-3xl" />
            <FaTiktok  className="text-3xl"/>
            </div>
          </div>
        </div>
        <div className="border-t mt-8 pt-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Plateau Scholarship Board. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

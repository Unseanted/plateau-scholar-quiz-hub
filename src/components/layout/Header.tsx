
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PlateauLogo from "../PlateauLogo";

const Header = () => {
  return (
    <header className="border-b bg-white/90 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <PlateauLogo />
          <span className="font-bold text-lg">Plateau Scholarship</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-primary">
            Home
          </Link>
          <Link to="/quiz" className="text-sm font-medium hover:text-primary">
            Eligibility Quiz
          </Link>
          <Link to="/about" className="text-sm font-medium hover:text-primary">
            About
          </Link>
          {/* <Link to="/contact" className="text-sm font-medium hover:text-primary">
            Contact
          </Link> */}
        </nav>
        <div className="flex items-center gap-4">
          <Link to="/quiz">
            <Button variant="default" size="sm">
              Apply Now
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

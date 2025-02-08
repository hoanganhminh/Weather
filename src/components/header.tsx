import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-2
    supports-[backdrop-filter]:bg-background/60">
      <div>
        <Link to={"/"}>
          <img src="/logo.webp" alt="Weather Logo" className="h-14" />
        </Link>
        <div>
          {/* search */}
          {/* theme toggle */}
        </div>
      </div>
    </header>
  );
};

export default Header;

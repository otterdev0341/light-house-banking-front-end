import { NavLink } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import { useState, useEffect, useRef } from "react";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const profileDropdownRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const toggleProfileDropdown = () => {
        setIsProfileDropdownOpen(!isProfileDropdownOpen);
    };

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false);
            }
            if (
                profileDropdownRef.current &&
                !profileDropdownRef.current.contains(event.target as Node)
            ) {
                setIsProfileDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <nav className="bg-gray-300 w-full">
            <div className="container mx-auto flex justify-between items-center px-4 py-3">
                {/* Left Section */}
                <div className="flex items-center gap-2">
                    <button
                        className="md:hidden text-blue-500 focus:outline-none"
                        onClick={toggleMenu}
                    >
                        <MenuIcon />
                    </button>
                    <div className="hidden md:flex gap-2">
                        <NavLink
                            to="/"
                            end
                            className="rounded-md px-3 py-2 bg-blue-300 hover:bg-blue-400"
                        >
                            Dashboard
                        </NavLink>
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={toggleDropdown}
                                className="rounded-md px-3 py-2 bg-blue-300 hover:bg-blue-400"
                            >
                                Record
                            </button>
                            {isDropdownOpen && (
                                <div
                                    className="absolute left-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50"
                                >
                                    <NavLink
                                        to="/income"
                                        className={`block px-4 py-2 ${
                                            hoveredLink === "Income"
                                                ? "bg-gray-100"
                                                : "text-gray-700"
                                        } hover:bg-gray-100`}
                                        onMouseEnter={() => setHoveredLink("Income")}
                                        onMouseLeave={() => setHoveredLink(null)}
                                    >
                                        Income
                                    </NavLink>
                                    <NavLink
                                        to="/payment"
                                        className={`block px-4 py-2 ${
                                            hoveredLink === "Payment"
                                                ? "bg-gray-100"
                                                : "text-gray-700"
                                        } hover:bg-gray-100`}
                                        onMouseEnter={() => setHoveredLink("Payment")}
                                        onMouseLeave={() => setHoveredLink(null)}
                                    >
                                        Payment
                                    </NavLink>
                                    <NavLink
                                        to="/transfer"
                                        className={`block px-4 py-2 ${
                                            hoveredLink === "Transfer"
                                                ? "bg-gray-100"
                                                : "text-gray-700"
                                        } hover:bg-gray-100`}
                                        onMouseEnter={() => setHoveredLink("Transfer")}
                                        onMouseLeave={() => setHoveredLink(null)}
                                    >
                                        Transfer
                                    </NavLink>
                                </div>
                            )}
                        </div>
                        <NavLink
                            to="/contact"
                            className="rounded-md px-3 py-2 bg-blue-300 hover:bg-blue-400"
                        >
                            Contact
                        </NavLink>
                        <NavLink
                            to="/asset"
                            className="rounded-md px-3 py-2 bg-blue-300 hover:bg-blue-400"
                        >
                            Asset
                        </NavLink>
                        <NavLink
                            to="/expense"
                            className="rounded-md px-3 py-2 bg-blue-300 hover:bg-blue-400"
                        >
                            Expense
                        </NavLink>
                        <NavLink
                            to="/current-sheet"
                            className="rounded-md px-3 py-2 bg-blue-300 hover:bg-blue-400"
                        >
                            Current Sheet
                        </NavLink>
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex items-center relative" ref={profileDropdownRef}>
                    <button
                        onClick={toggleProfileDropdown}
                        className="px-3 py-2 bg-blue-300 rounded-md flex items-center hover:bg-blue-400 focus:outline-none"
                    >
                        <PersonIcon />
                    </button>
                    {isProfileDropdownOpen && (
                        <div className="absolute top-full right-0 mt-1 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                            <NavLink
                                to="/profile"
                                className={`block px-4 py-2 ${
                                    hoveredLink === "Profile"
                                        ? "bg-gray-100"
                                        : "text-gray-700"
                                } hover:bg-gray-100`}
                                onMouseEnter={() => setHoveredLink("Profile")}
                                onMouseLeave={() => setHoveredLink(null)}
                            >
                                Profile
                            </NavLink>
                            <NavLink
                                to="/mcp-token"
                                className={`block px-4 py-2 ${
                                    hoveredLink === "Mcp Token"
                                        ? "bg-gray-100"
                                        : "text-gray-700"
                                } hover:bg-gray-100`}
                                onMouseEnter={() => setHoveredLink("Mcp Token")}
                                onMouseLeave={() => setHoveredLink(null)}
                            >
                                Mcp Token
                            </NavLink>
                            <NavLink
                                to="/logout"
                                className={`block px-4 py-2 ${
                                    hoveredLink === "Log-out"
                                        ? "bg-gray-100"
                                        : "text-gray-700"
                                } hover:bg-gray-100`}
                                onMouseEnter={() => setHoveredLink("Log-out")}
                                onMouseLeave={() => setHoveredLink(null)}
                            >
                                Log-out
                            </NavLink>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-gray-300 px-4 py-2">
                    <NavLink
                        to="/"
                        end
                        className="block rounded-md px-3 py-2 bg-blue-300 hover:bg-blue-400 mb-2"
                        onClick={toggleMenu}
                    >
                        Dashboard
                    </NavLink>
                    <button
                        onClick={toggleDropdown}
                        className="block w-full text-left rounded-md px-3 py-2 bg-blue-300 hover:bg-blue-400 mb-2"
                    >
                        Record
                    </button>
                    {isDropdownOpen && (
                        <div className="bg-white border border-gray-200 rounded-md shadow-lg">
                            <NavLink
                                to="/income"
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                onClick={toggleMenu}
                            >
                                Income
                            </NavLink>
                            <NavLink
                                to="/payment"
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                onClick={toggleMenu}
                            >
                                Payment
                            </NavLink>
                            <NavLink
                                to="/transfer"
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                onClick={toggleMenu}
                            >
                                Transfer
                            </NavLink>
                        </div>
                    )}
                    <NavLink
                        to="/contact"
                        className="block rounded-md px-3 py-2 bg-blue-300 hover:bg-blue-400 mb-2"
                        onClick={toggleMenu}
                    >
                        Contact
                    </NavLink>
                    <NavLink
                        to="/asset"
                        className="block rounded-md px-3 py-2 bg-blue-300 hover:bg-blue-400 mb-2"
                        onClick={toggleMenu}
                    >
                        Asset
                    </NavLink>
                    <NavLink
                        to="/expense"
                        className="block rounded-md px-3 py-2 bg-blue-300 hover:bg-blue-400 mb-2"
                        onClick={toggleMenu}
                    >
                        Expense
                    </NavLink>
                    <NavLink
                        to="/current-sheet"
                        className="block rounded-md px-3 py-2 bg-blue-300 hover:bg-blue-400"
                        onClick={toggleMenu}
                    >
                        Current Sheet
                    </NavLink>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
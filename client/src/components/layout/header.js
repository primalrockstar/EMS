import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
const Header = () => {
    const handleImageError = (e) => {
        e.currentTarget.style.display = "none";
        const fallbackText = e.currentTarget.nextElementSibling;
        if (fallbackText) {
            fallbackText.style.display = "inline";
        }
    };
    return (_jsx("header", { className: "top-nav flex items-center gap-4 p-2 bg-white shadow", children: _jsxs(Link, { to: "/", className: "flex items-center", children: [_jsx("img", { src: "/client/public/emslogo.png", alt: "ProMedix EMS Logo", height: 40, style: { marginRight: 16 }, onError: handleImageError }), _jsx("span", { style: {
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: '#dc2626',
                        display: 'none'
                    }, children: "ProMedix EMS" })] }) }));
};
export default Header;

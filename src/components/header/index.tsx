import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
export function Header() {
  return (
    <div>
      {" "}
      <header
        className=" h-20 bg-blue-300 flex justify-between items-center p-2 md:p-5"
        style={{
          background: "linear-gradient(to bottom, #3498db, #ffffff)",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <section className="flex md:gap-5 md:text-lg font-medium text-sm gap-2">
          <Link to="/" className=" hover:border-b-2 hover:border-cyan-950">
            {" "}
            Home
          </Link>
          <Link to="/View" className=" hover:border-b-2 hover:border-cyan-950">
            {" "}
            Solicitações
          </Link>
          <Link
            to="/Estoque"
            className=" hover:border-b-2 hover:border-cyan-950"
          >
            {" "}
            Estoque
          </Link>
        </section>
        <img src={Logo} className="md:w-22 md:h-12 w-15 h-8 " />
      </header>
    </div>
  );
}

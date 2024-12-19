import React, { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import Dropdown from "react-bootstrap/Dropdown";
import { LuPencil } from "react-icons/lu";
import { RiBarChartFill } from "react-icons/ri";
import { AiFillHome } from "react-icons/ai";
import { IoPerson } from "react-icons/io5";
import { MdGroups } from "react-icons/md";

const TeamsPage = () => {
  const navigate = useNavigate();

  const [activePage, setActivePage] = useState("teams");

  const [filterOption, setFilterOption] = useState("District");

  const handleActivePage = (page) => {
    setActivePage(page);

    if (page === "profile") {
      navigate("/admin-profile");
    } else if (page === "dashboard") {
      navigate("/dashboard");
    } else if (page === "analytics") {
      navigate("/analytics");
    } else {
      navigate("/teams");
    }
  };

  const Teams = [
    { name: "Evelyn Smith", role: "Sales Team Lead" },
    { name: "oliver wilson", role: "Sales Team Manager" },
    { name: "Evelyn Attickson", role: "Sales Executive" },
    { name: "Charlie willam", role: "Sales Team Manager" },
  ];

  return (
    <div className="teams-page">
      <div className="top d-flex  header w-100 justify-content-between">
        <span className="left-0 " onClick={() => navigate("/dashboard")}>
          <IoMdArrowBack size={22} />
        </span>

        <h5 className="text-center">Teams</h5>

        <button onClick={()=>navigate('/admin-profile')} className="btn btn-dark rounded-circle p-1 d-flex align-items-center">
          <FaPlus size={22} />
        </button>
      </div>

      <div className="content p-2">
        <div className="d-flex align-items-center justify-content-between border rounded mt-2 px-2 py-1">
          <div className="w-25 border-end me-1">
            <Dropdown>
              <Dropdown.Toggle
                variant="light"
                id="dropdown-basic"
                className="w-100 d-flex align-items-center justify-content-between p-1"
              >
                {filterOption}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setFilterOption("District")}>
                  District
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setFilterOption("State")}>
                  State
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="d-flex align-items-center justify-content-between w-75">
            <input
              placeholder="Search"
              className="border-0 bg-transparent w-100 ps-2"
            ></input>
            <span>
              {" "}
              <IoSearchOutline />
            </span>
          </div>
        </div>

        <div>
          <ul style={{ listStyle: "none", padding: "0" }} className="mt-2">
            {Teams.map((data, index) => (
              <li
                key={index}
                className="d-flex p-2 mt-2 align-items-center justify-content-between border rounded"
              >
                <div>
                  <img></img>

                  <div>
                    <h5 className="fw-bold">{data.name}</h5>
                    <h6>{data.role}</h6>
                  </div>
                </div>

                <div className="border rounded-circle border-black p-2 d-flex">
                  <LuPencil />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer d-flex justify-content-around">
        <button
          onClick={() => handleActivePage("dashboard")}
          className="border border-0 bg-transparent p-1 w-25"
          style={{ color: activePage === "dashboard" ? "black" : "#ACB5BB" }}
        >
          <AiFillHome />
        </button>

        <button
          onClick={() => handleActivePage("teams")}
          className="border border-0 bg-transparent p-1 w-25"
          style={{ color: activePage === "teams" ? "black" : "#ACB5BB" }}
        >
          {" "}
          <MdGroups />
        </button>

        <button
          onClick={() => handleActivePage("analytics")}
          className="border border-0 bg-transparent p-1 w-25"
          style={{ color: activePage === "analytics" ? "black" : "#ACB5BB" }}
        >
          <RiBarChartFill />
        </button>

        <button
          onClick={() => handleActivePage("profile")}
          className="border border-0 bg-transparent p-1 w-25"
          style={{ color: activePage === "profile" ? "black" : "#ACB5BB" }}
        >
          <IoPerson />
        </button>
      </div>
    </div>
  );
};

export default TeamsPage;

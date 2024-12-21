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
    { 
      name: "Evelyn Smith", 
      firstName:'Evelyn',
      lastName:' Smith',
      role: "Sales Team Lead",
      email: "evelyn.smith@example.com",
      phone: "+1-123-456-7890",
      password: "evelyn123",
      city: "New York",
      birthday: "1990-05-12",
      nationality: "American",
      totalDoctorsVisited: 45,
      totalChemistsVisited: 30,
      totalPob: 1500,
      monthlyPrimarySales: 5000,
      closingStockValue: 12000,
      avgWeeklyVisits: [3, 5, 4, 6, 7],
      avgDrCalls: [10, 12, 8, 15, 9],
    },
    {
      name: "Oliver Wilson", 
      firstName:'Oliver',
      lastName:'Wilson',
      role: "Sales Team Manager",
      email: "oliver.wilson@example.com",
      phone: "+1-987-654-3210",
      password: "oliver123",
      city: "Los Angeles",
      birthday: "1985-09-25",
      nationality: "Canadian",
      totalDoctorsVisited: 60,
      totalChemistsVisited: 40,
      totalPob: 2000,
      monthlyPrimarySales: 6000,
      closingStockValue: 14000,
      avgWeeklyVisits: [4, 6, 7, 8, 9],
      avgDrCalls: [15, 14, 12, 10, 8],
    },
    {
      name: "Evelyn Attickson", 
      firstName:'Evelyn',
      lastName:' Attickson',
      role: "Sales Executive",
      email: "evelyn.attickson@example.com",
      phone: "+1-555-123-4567",
      password: "attickson123",
      city: "Chicago",
      birthday: "1992-11-08",
      nationality: "British",
      totalDoctorsVisited: 60,
      totalChemistsVisited: 40,
      totalPob: 2000,
      monthlyPrimarySales: 6000,
      closingStockValue: 14000,
      avgWeeklyVisits: [4, 6, 7, 8, 9],
      avgDrCalls: [15, 14, 12, 10, 8],
    }
    ,
    { name: "Charlie willam",
      firstName:'Charlie',
      lastName:' Willam',
      role: "Sales Team Manager", 
      email: "evelyn.smith@example.com",
      phone: "+1-123-456-7890",
      password: "evelyn123",
      city: "New York",
      birthday: "1990-05-12",
      nationality: "American",
      totalDoctorsVisited: 45,
      totalChemistsVisited: 30,
      totalPob: 1500,
      monthlyPrimarySales: 5000,
      closingStockValue: 12000,
      avgWeeklyVisits: [3, 5, 4, 6, 7],
      avgDrCalls: [10, 12, 8, 15, 9],
    },
  ];

  return (
    <div className="teams-page">
      <div className="top d-flex  header w-100 justify-content-between">
        {/* <span className="left-0 " onClick={() => navigate(-1)}>
          <IoMdArrowBack size={22} />
        </span> */}

        <h5 className="text-center">Teams</h5>

        <button
          onClick={() => navigate("/editTeamDetail")}
          style={{ height: "1.8rem", width: "1.8rem" }}
          className="btn btn-dark rounded-circle p-1 d-flex align-items-center"
        >
          <FaPlus size={20} />
        </button>
      </div>

      <div className="content">
        <div className="d-flex align-items-center justify-content-between border rounded mt-2 mx-3">
          <div className="border-end me-1 col-4">
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
          <div className="d-flex align-items-center justify-content-between col-8 pe-2">
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

        <div className="p-3">
          <ul style={{ listStyle: "none", padding: "0" }} className="mt-2">
            {Teams.map((data, index) => (
              <li
                key={index}
                className="d-flex p-2 mt-2 align-items-center justify-content-between border rounded"
                onClick={() => navigate("/team-details", { state: data })}
              >
                <div>
                  <img></img>

                  <div>
                    <h5  className="fw-bold fs-6">{data.name}</h5>
                    <h6>{data.role}</h6>
                  </div>
                </div>

                <div
                  className="border rounded-circle border-black p-2 d-flex"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the card's onClick from firing
                    navigate("/editTeamDetail", { state: data });
                  }}
                >
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
          <MdGroups size={22} />
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

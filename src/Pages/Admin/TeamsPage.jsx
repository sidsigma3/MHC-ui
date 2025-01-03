import React, { useState ,useEffect } from "react";
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
import { getUsers } from "../../Services/Api";
import CircularProgress from '@mui/material/CircularProgress';

const TeamsPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const [activePage, setActivePage] = useState("teams");
 
  const [filterOption, setFilterOption] = useState("Name");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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

  useEffect(() => {
    const filtered = users.filter((user) => {
        if (filterOption === "City") {
            return user.city?.toLowerCase().includes(searchQuery.toLowerCase());
        } else {
            const fullName = `${user.first_name || ''} ${user.last_name || ''}`.trim();
            return fullName.toLowerCase().includes(searchQuery.toLowerCase());
        }
    });

    // Sort alphabetically by name
    const sorted = filtered.sort((a, b) => {
        const nameA = `${a.first_name || ''} ${a.last_name || ''}`.trim().toLowerCase();
        const nameB = `${b.first_name || ''} ${b.last_name || ''}`.trim().toLowerCase();

        return nameA.localeCompare(nameB); // Compare names alphabetically
    });

    setFilteredUsers(sorted);
}, [searchQuery, filterOption, users]);


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

      {loading ? (
       
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <CircularProgress />
        </div>
      ) : (

        <>

        <div className="d-flex align-items-center justify-content-between border rounded mt-2 mx-3 p-1">
          {/* <div className="border-end me-1 col-4">
            <Dropdown>
              <Dropdown.Toggle
                variant="light"
                id="dropdown-basic"
                className="w-100 d-flex align-items-center justify-content-between p-1"
              >
                {filterOption}
              </Dropdown.Toggle>

              <Dropdown.Menu>
               
          
                <Dropdown.Item onClick={() => setFilterOption("Name")}>
                   Name
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div> */}
          <div className="d-flex align-items-center justify-content-between col-12 pe-2">
            <input
              placeholder="Search by name"
              className="border-0 bg-transparent w-100 ps-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            ></input>
            <span>
              {" "}
              <IoSearchOutline />
            </span>
          </div>
        </div>

        <div className="p-3">
          <ul style={{ listStyle: "none", padding: "0" }} className="mt-2">
            {filteredUsers.map((data, index) => (
              <li
                key={index}
                className="d-flex p-2 mt-2 align-items-center justify-content-between border rounded"
                onClick={() => navigate("/team-details", { state: data.userId })}
              >
                <div>
                  <img></img>

                  <div>
                    <h5  className="fw-bold fs-6">{data.first_name} {data.last_name}</h5>
                    <h6>{data.jobProfile}</h6>
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
        </>)}
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

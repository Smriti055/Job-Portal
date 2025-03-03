import { Search } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browser");
  };

  return (
    <div className="text-center py-16 bg-gradient-to-b from-blue-50 to-white">
      {/* Badge */}
      <span className="px-4 py-2 rounded-full bg-red-100 text-red-600 font-medium text-sm tracking-wide shadow-md">
        🚀 No. 1 Job Hunt Website
      </span>

      {/* Title */}
      <h2 className="mt-6 text-5xl font-extrabold leading-tight text-gray-800">
        Search, Apply & <br />
        Get Your <span className="text-purple-600">Dream Job</span>
      </h2>

      {/* Subtitle */}
      <p className="mt-4 text-gray-600 text-lg">
        <span className="text-red-600 font-semibold">Job Junction:</span> Bridging Aspirations and Opportunities!
      </p>

      {/* Search Bar */}
      <div className="flex w-full max-w-lg shadow-lg border mt-6 border-gray-300 py-2 px-4 rounded-full items-center gap-4 mx-auto bg-white">
        <input
          type="text"
          placeholder="Find your dream job..."
          onChange={(e) => setQuery(e.target.value)}
          className="outline-none border-none w-full text-gray-700 text-lg placeholder-gray-400"
        />
        <Button onClick={searchJobHandler} className="rounded-full bg-purple-600 hover:bg-purple-700 transition-all duration-200">
          <Search className="h-6 w-6 text-white" />
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;

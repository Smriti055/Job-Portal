import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2, Menu } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import axios from "axios";

export default function Navbar() {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed!");
    }
  };

  return (
    <nav className="bg-gradient-to-r from-[#6A38C2] to-[#F83002] shadow-lg">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-6 md:px-20">
        {/* Logo */}
        <div>
          <h1 className="text-2xl font-bold text-white">
            Job<span className="text-[#FFD700]">Junction</span>
          </h1>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-12">
          <ul className="flex font-medium items-center gap-6 text-white">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link
                    to="/admin/companies"
                    className="hover:text-[#FFD700] transition-all"
                  >
                    Companies
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/jobs"
                    className="hover:text-[#FFD700] transition-all"
                  >
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/" className="hover:text-[#FFD700] transition-all">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/jobs"
                    className="hover:text-[#FFD700] transition-all"
                  >
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/browser"
                    className="hover:text-[#FFD700] transition-all"
                  >
                    Browse
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Authentication Buttons */}
          {!user ? (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="outline" className="border-white text-black">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#FFD700] hover:bg-[#ffcc00] text-[#6A38C2] transition-all">
                  Sign Up
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer border-2 border-white">
                  <AvatarImage src={user?.profile?.profilePhoto} />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-72 p-4 bg-white bg-opacity-80 backdrop-blur-lg rounded-lg shadow-xl border border-gray-200">
                {/* User Info */}
                <div className="flex gap-4 items-center border-b pb-3">
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={user?.profile?.profilePhoto} />
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {user?.fullname}
                    </h4>
                    <p className="text-sm text-gray-500">{user?.profile?.bio}</p>
                  </div>
                </div>

                {/* Profile & Logout */}
                <div className="flex flex-col mt-3 text-gray-600 space-y-3">
                  {user && user.role === "student" && (
                    <div className="flex items-center gap-2 hover:text-[#6A38C2] cursor-pointer transition-all">
                      <User2 />
                      <Button variant="link">
                        <Link to="/profile">View Profile</Link>
                      </Button>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-red-600 hover:text-red-700 cursor-pointer transition-all">
                    <LogOut />
                    <Button onClick={logoutHandler} variant="link">
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden text-white">
          <Menu className="h-8 w-8 cursor-pointer" />
        </div>
      </div>
    </nav>
  );
}

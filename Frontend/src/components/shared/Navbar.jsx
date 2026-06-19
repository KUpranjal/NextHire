import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import { motion } from "framer-motion";

const Navbar = () => {
  const MotionH1 = motion.h1;
  const MotionLi = motion.li;
  const MotionDiv = motion.div;
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
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Logout failed"
      );
    }
  };

  const navLinks =
    user?.role === "recruiter"
      ? [
          { to: "/admin/companies", label: "Companies" },
          { to: "/admin/jobs", label: "Jobs" },
        ]
      : [
          { to: "/", label: "Home" },
          { to: "/jobs", label: "Jobs" },
          { to: "/browse", label: "Browse" },
        ];

  return (
    <div className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-md shadow-[0_6px_20px_rgba(15,23,42,0.06)]">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        {/* Logo */}
        <Link to="/">
          <MotionH1
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
            className="text-2xl font-black tracking-tight text-slate-900"
          >
            Job<span className="text-[#F83002]">Portal</span>
          </MotionH1>
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-8 md:gap-12">
          {/* Links */}
          <ul className="hidden md:flex font-medium items-center gap-5">
            {navLinks.map((item, idx) => (
              <MotionLi
                key={item.to}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 * idx, duration: 0.25 }}
              >
                <Link
                  to={item.to}
                  className="relative text-slate-700 hover:text-slate-900 transition-colors after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-orange-500 after:transition-all hover:after:w-full"
                >
                  {item.label}
                </Link>
              </MotionLi>
            ))}
          </ul>

          {/* Auth Buttons / Profile */}
          {!user ? (
            <MotionDiv
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35 }}
              className="flex items-center gap-2"
            >
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#F97316] hover:bg-[#EA580C] text-white">
                  Signup
                </Button>
              </Link>
            </MotionDiv>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <MotionDiv
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25 }}
                >
                <Avatar className="cursor-pointer ring-2 ring-transparent hover:ring-orange-300 transition-all">
                  <AvatarImage
                    src={
                      user?.profile?.profilePhoto ||
                      "https://github.com/shadcn.png"
                    }
                    alt="profile"
                  />
                  <AvatarFallback>
                    {user?.fullname?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                </MotionDiv>
              </PopoverTrigger>

              <PopoverContent className="w-80">
                <div>
                  {/* Profile Info */}
                  <div className="flex gap-3 items-center mb-3">
                    <Avatar>
                      <AvatarImage
                        src={
                          user?.profile?.profilePhoto ||
                          "https://github.com/shadcn.png"
                        }
                      />
                      <AvatarFallback>
                        {user?.fullname?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <h4 className="font-medium">
                        {user?.fullname}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {user?.profile?.bio || "No bio available"}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 text-gray-600">
                    <span className="inline-flex w-fit px-2 py-1 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700">
                      {user?.role === "recruiter" ? "Admin" : "User"}
                    </span>
                    {user?.role === "student" && (
                      <Link
                        to="/profile"
                        className="flex items-center gap-2 hover:text-black"
                      >
                        <User2 size={18} />
                        View Profile
                      </Link>
                    )}

                    <button
                      onClick={logoutHandler}
                      className="flex items-center gap-2 hover:text-red-600"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

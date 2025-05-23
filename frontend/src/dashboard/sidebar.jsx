import { NavLink, } from "react-router-dom";
import { useSelector } from "react-redux";
import { LogoutModal } from "../components/logoutmodal";
import { useState } from "react";
import { FiCode } from 'react-icons/fi';
import { 
   MdAccountCircle, MdLogout, MdClose 
} from "react-icons/md";
import { TbAward } from "react-icons/tb";
import { 
  HiOutlineCube 
} from "react-icons/hi";
const Sidebar = ({ isSidebarOpen, setSidebarOpen }) => {
  const [open, setOpen] = useState(false);
  const darkmode = useSelector((state) => state.darkMode);
  
  const closeSidebar = () => setSidebarOpen(false);
  


  return (
    <div className="relative h-full ">
      <aside
        id="separator-sidebar"
        className={`fixed font-grotesk top-0 left-0 z-40 w-64 lg:w-[20%] h-screen transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 flex flex-col`}
      >
        <div className={`h-full flex flex-col ${darkmode ? 'bg-[#111313] border-neutral-800' : 'bg-neutral-50 border-slate-200'}`}>

          <div className={`p-4  lg:p pt-7 border-b ${darkmode ? 'border-neutral-800' : 'border-slate-200'}`}>
          <div className="flex items-center justify-between relative top-[-5px] px-2">
  <NavLink to="#" className="flex items-center">
    <HiOutlineCube  className={`text-2xl mr-2 ${darkmode ? 'text-blue-400' : 'text-blue-600'}`} />
    <span className={`lg:text-xl text-md font-bold text-grotesk ${darkmode ? 'text-blue-400' : 'text-blue-600'}`}>
      Code &lt;30&gt;
    </span>
  </NavLink>
  
  <button
    onClick={closeSidebar}
    className={`lg:hidden ml-2 text-2xl ${
      darkmode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-blue-600'
    }`}
    aria-label="Close sidebar"
  >
    <MdClose />
  </button>
</div>

          </div>


          <div className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-2 font-medium px-4">
              <li className="text-sm mb-2" style={{ color: darkmode ? '#bfdbfe' : '#1e3a8a' }}>
                Menu
              </li>
              
              <li onClick={closeSidebar}>
                <NavLink
                  to="/submitproject"
                  className={({ isActive }) => 
                    `flex items-center p-3 rounded-lg transition-colors ${
                      isActive 
                        ? darkmode 
                          ? 'bg-blue-900/30 text-blue-400' 
                          : 'bg-blue-100 text-blue-800'
                        : darkmode 
                          ? 'text-white hover:bg-gray-700' 
                          : 'hover:bg-gray-100'
                    }`
                  }
                >
                  <FiCode  className="mr-3" />
                  <span>Project Submit</span>
                </NavLink>
              </li>

              <li onClick={closeSidebar}>
                <NavLink
                  to="/leaderboard"
                  className={({ isActive }) => 
                    `flex items-center p-3 rounded-lg transition-colors ${
                      isActive 
                        ? darkmode 
                          ? 'bg-blue-900/30 text-blue-400' 
                          : 'bg-blue-100 text-blue-800'
                        : darkmode 
                          ? 'text-white hover:bg-gray-700' 
                          : 'hover:bg-gray-100'
                    }`
                  }
                >
                  <TbAward className="mr-3" />
                  <span>Leaderboard</span>
                </NavLink>
              </li>
            </ul>

            <ul className="space-y-2 font-medium px-4 mt-6">
              <li className="text-sm mb-2" style={{ color: darkmode ? '#bfdbfe' : '#1e3a8a' }}>
                Profile
              </li>
              <li onClick={closeSidebar}>
                <NavLink
                  to="/profile"
                  className={({ isActive }) => 
                    `flex items-center p-3 rounded-lg transition-colors ${
                      isActive 
                        ? darkmode 
                          ? 'bg-blue-900/30 text-blue-400' 
                          : 'bg-blue-100 text-blue-800'
                        : darkmode 
                          ? 'text-white hover:bg-gray-700' 
                          : 'hover:bg-gray-100'
                    }`
                  }
                >
                  <MdAccountCircle className="mr-3 " />
                  <span>Profile</span>
                </NavLink>
              </li>
            </ul>
          </div>

    
          <div className={`mt-auto relative lg:top-0 md:top-0 top-[-50px]  p-4 border-t ${darkmode ? 'border-neutral-800' : 'border-slate-200'}`}>
            <ul className="space-y-2 font-medium">
              <li className="text-sm mb-2" style={{ color: darkmode ? '#bfdbfe' : '#1e3a8a' }}>
                Account
              </li>
              <li onClick={() => { closeSidebar(); setOpen(true); }}>
                <button
                  className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                    darkmode 
                      ? 'text-red-400 hover:bg-gray-700' 
                      : 'text-red-600 hover:bg-gray-100'
                  }`}
                >
                  <MdLogout className="mr-3" />
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </aside>

      <LogoutModal
        open={open}
        onClose={() => setOpen(false)}
        
      />
    </div>
  );
};

export default Sidebar;
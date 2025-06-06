/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

import { FaCalendarCheck, FaMoon, FaSun, FaBullhorn, FaBug, FaTimes } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";
import { setMode } from "../../action";
import BugReportsModal from "./modal";
import AddAnnouncementModal from "./moda";
import { authFetch } from "../../utils/auth";
// import { BugModal } from "./bugmodal";

const AdminNavMenu = ({ currentPage, setSidebarOpen, isSidebarOpen }) => {
    const [showBugModal, setShowBugModal] = useState(false);
    const [bugReports, setBugReports] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
    const [announcements, setAnnouncements] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  


  

      useEffect(() => {
        const fetchBugReports = async () => {
          setIsLoading(true);
          setError(null);
          try {
            const response = await authFetch('https://xen4-backend.vercel.app/bugs');
            if (!response.ok) throw new Error('Failed to fetch bugs');
            const data = await response.json();
            console.log("bugs", data)
            // Match backend response structure
            setBugReports(data.bugs || []);
            
            // Calculate unread reports
            const unread = (data.bugs || []).filter(report => !report.status || report.status === 'new').length;
            setUnreadCount(unread);
          } catch (error) {
            console.error("Failed to fetch bug reports:", error);
            setError(error.message);
          } finally {
            setIsLoading(false);
          }
        };
    
        if (showBugModal) {
          fetchBugReports();
        }
      }, [showBugModal]);
   
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const formatDate = () => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    const formattedDate = new Date().toLocaleDateString(undefined, options);
    return formattedDate;
  };

  const formattedDate = formatDate();
  const dispatch = useDispatch();
  const darkmode = useSelector((state) => state.darkMode);

  const toggledark = () => {
    dispatch(setMode(!darkmode));
  };

 


  return (
    <>
      <section className={`fixed top-0 inset-x-0 z-10 w-full border-b px-4 py-2 lg:py-4 ${darkmode ? 'bg-[#111313] border-neutral-800' : 'bg-neutral-50 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className={`text-base px-60 font-semibold ${darkmode ? 'text-neutral-100' : 'text-blue-900'} md:text-xl hidden lg:block`}>
            {currentPage}
          </span>

          <button
            onClick={toggleSidebar}
            aria-controls="separator-sidebar"
            type="button"
            className={`inline-flex items-center p-2 mt-2 ms-3 text-sm ${darkmode ? 'text-white':'text-gray-500'} rounded-lg lg:hidden md:block `}
          >
            <span className="sr-only">Open sidebar</span>
            <CiMenuFries className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-3 sm:gap-6">
         
            <button 
            onClick={() => setShowAnnouncementModal(true)}
  className={`p-2 rounded-full relative ${darkmode ? 'text-neutral-100 hover:bg-neutral-800' : 'text-blue-900 hover:bg-blue-100'}`}
>
  <FaBullhorn size={20} />
  <span className="sr-only">Announcements</span>
  
</button>

        
            <button 
              onClick={() => setShowBugModal(true)}
              className={`p-2 rounded-full ${darkmode ? 'text-neutral-100 hover:bg-neutral-800' : 'text-blue-900 hover:bg-blue-100'}`}
            >
              <FaBug size={20} />
              <span className="sr-only">Report a Bug</span>
            </button>

            <div className={`hidden items-center gap-3 ${darkmode ? 'text-neutral-100' : 'text-zinc-800'} md:flex`}>
              <FaCalendarCheck className={`${darkmode ? 'text-blue-400':'text-blue-900'}`} size={20} />
              <span className={`text-sm font-medium ${darkmode ? 'text-neutral-100' : 'text-zinc-800'}`}>
                {formattedDate}
              </span>
            </div>

            <div className="hidden md:flex">
              <label className="inline-flex items-center relative cursor-pointer">
                <input
                  className="peer hidden"
                  id="toggle"
                  type="checkbox"
                  onChange={toggledark}
                />
                <div className={`relative w-[100px] h-[40px] rounded-full transition-colors duration-300 ${darkmode ? 'bg-zinc-500' : 'bg-gray-200'}`}>
                  <div className={`absolute w-[40px] h-[30px] rounded-full top-[5px] left-[5px] transition-all duration-300 ${darkmode ? '' : 'bg-gradient-to-r from-blue-500 to-blue-400 peer-checked:left-[55px]'}`}></div>
                </div>
                <FaSun className={`${darkmode ? "fill-gray-400": "fill-white"} absolute w-6 h-6 left-[13px] transition-opacity duration-300`}/>
                <FaMoon className="fill-gray-400 z-10 opacity-60 absolute w-6 h-6 right-[13px] transition-opacity duration-300" />
                <div className={`absolute w-[40px] h-[30px] left-[55px] ${darkmode ? 'bg-gradient-to-r from-gray-900 to-gray-600  peer-checked:left-[55px]' : ''} rounded-full top-[5px] left-[5px] transition-all duration-300 `}></div>
              </label>
            </div>

            <div className="md:hidden">
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full border ${darkmode ? 'border-neutral-700 text-neutral-100' : 'border-zinc-300 text-blue-900'} md:h-10 md:w-10 cursor-pointer`}
                onClick={toggledark}
              >
                {darkmode ? <FaSun size='20' /> : <FaMoon size='20' />}
              </span>
            </div>
          </div>
        </div>
      </section>

     
      {showBugModal && (
        <BugReportsModal
          showBugModal={showBugModal}
          setShowBugModal={setShowBugModal}
          bugReports={bugReports}
          darkmode={darkmode}
        />
      )}

     {showAnnouncementModal && (
  <AddAnnouncementModal
    showModal={showAnnouncementModal}
    setShowModal={setShowAnnouncementModal}
    darkmode={darkmode}
    
  />
)}
    </>
  );
};

export default AdminNavMenu;
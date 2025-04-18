/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from 'react';

import { FiGithub, FiExternalLink, FiChevronRight, FiChevronLeft,} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import img from '../assets/test.jpg'


const UserProjects = () => {
  const darkmode = useSelector((state) => state.darkMode);
  const [projects, setProjects] = useState([]);
 
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 1;

  const pageCount = Math.ceil(projects.length / rowsPerPage);
  const paginatedprojects = projects.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (page) => setCurrentPage(page);

  useEffect(() => {
  
    setProjects([
      {
        id: 1,
        title: "E-commerce Dashboard",
        day: "Day 3 of 30",
        description: "Built with React and Node.js",
        githubUrl: "#",
        liveUrl: "#",
        image: img,
      },
      {
        id: 2,
        title: "E-commerce Dashboard",
        day: "Day 4 of 30",
        description: "Built with React and Node.js",
        githubUrl: "#",
        liveUrl: "#",
        image: img,
      },
      {
        id: 3,
        title: "E-commerce Dashboard",
        day: "Day 5 of 30",
        description: "Built with React and Node.js",
        githubUrl: "#",
        liveUrl: "#",
        image: img,
      },
    
    ]);


  }, []);


 

  return (
    <div className={`w-full max-w-4xl mx-auto p-4 ${darkmode ? 'bg-[#111313]' : 'bg-white'} rounded-[14px] font-grotesk`}>  
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className={`text-lg font-semibold ${darkmode ? "text-white":''}`}>Recent Projects</h2>
      
        </div>
        
        <div className="space-y-4">
          {paginatedprojects.map((project) => (
            <motion.div
              key={project.id}
              whileHover={{ y: -2 }}
              className={`p-4 rounded-lg border ${darkmode ? 'border-neutral-800 bg-neutral-900' : 'border-gray-200 bg-white'}`}
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-32 h-32 bg-gray-200 rounded-lg overflow-hidden">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className={`font-medium text-lg mb-1 ${darkmode ? "text-neutral-100":''}`}>{project.title}</h3>
                  <p className={`text-sm mb-3 ${darkmode ? 'text-neutral-400' : 'text-gray-600'}`}>
                    {project.day}
                  </p>
                  <p className={`b-4 ${darkmode ?"text-white":''}`}>{project.description}</p>
                  <div className="flex space-x-3">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={`flex items-center text-sm ${darkmode ? "text-white":''}`} >
                        <FiGithub className={`mr-1 ${darkmode ?"text-white":''}`}  /> Code
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={`flex items-center text-sm ${darkmode ? "text-white":''}`}>
                        <FiExternalLink className={`mr-1 ${darkmode ?"text-white":''}`}  /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
         <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-4">
               <div className={`text-sm ${darkmode ? 'text-gray-400' : 'text-gray-600'}`}>
                 Showing {(currentPage - 1) * rowsPerPage + 1} to {Math.min(currentPage * rowsPerPage, projects.length)} of {projects.length} entries
               </div>
       
               <div className="flex items-center gap-1">
                 <button
                   onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                   disabled={currentPage === 1}
                   className={`p-2 rounded-md ${darkmode ? 'text-gray-300 hover:bg-gray-800 disabled:text-gray-600' : 'text-gray-700 hover:bg-gray-100 disabled:text-gray-400'}`}
                 >
                   <FiChevronLeft />
                 </button>
       
                 {Array.from({ length: pageCount }, (_, i) => (
                   <button
                     key={i}
                     onClick={() => handlePageChange(i + 1)}
                     className={`w-8 h-8 rounded-md ${currentPage === i + 1 ? (darkmode ? 'bg-red-800 text-white' : 'bg-blue-600 text-white') : (darkmode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100')}`}
                   >
                     {i + 1}
                   </button>
                 ))}
       
                 <button
                   onClick={() => handlePageChange(Math.min(pageCount, currentPage + 1))}
                   disabled={currentPage === pageCount}
                   className={`p-2 rounded-md ${darkmode ? 'text-gray-300 hover:bg-gray-800 disabled:text-gray-600' : 'text-gray-700 hover:bg-gray-100 disabled:text-gray-400'}`}
                 >
                   <FiChevronRight />
                 </button>
               </div>
             </div> 
      </div>
    </div>
  );
};

export default UserProjects;
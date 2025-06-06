import { useSelector } from "react-redux";

import { FadeDown, FadeLeft, FadeRight, FadeUp } from "../../components/framer";

import { WelcomeAdmin } from "./welcome";
import { TodayStats } from "./stats";
import { Top } from "./top";
import VersionDetails from "./details";



   
const Layout = () => {
    const darkmode = useSelector((state)=> state.darkMode)
  return (
   <section className={`flex min-h-screen  flex-wrap content-start gap-3 pt-23 px-4 py-4 ${darkmode ? "border-neutral-800": ''} ${darkmode? "bg-neutral-950":'bg-gray-100'} overflow-hidden`}>
        <div className="h-min w-full lg:w-[calc(35%_-_10px)] ">
         <FadeLeft>
         <WelcomeAdmin  />
         </FadeLeft>
         
         </div>
   
         <div className="h-min w-full flex-grow lg:w-[calc(20%_-_10px)] ">
          <FadeUp>
        <Top/>
          </FadeUp>
         </div>
         
         <div className="h-min w-full flex-grow lg:w-[calc(40%_-_10px)] ">
          <FadeRight>
          <TodayStats />
          </FadeRight>
         
         </div>
   
         <div
           className="h-min w-full lg:w-[calc(100%_-_10px)] "
         >
           <FadeUp>
          <VersionDetails />
           </FadeUp>
         </div>
   
      
   
       
     </section>
  );
};

export default Layout;

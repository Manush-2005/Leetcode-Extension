import React from 'react'
import { BarChart } from 'lucide-react';
import { Button } from './ui/Button';



function AnalysisButton() {

    const [isActive, setIsActive] = useState(false);

  const handleeventdispatch = async()=>{
    console.log("Button is clicked");
    window.dispatchEvent(new CustomEvent("AnalysisButtonClicked"));
  };




  return (
    <>
     <div className="flexlayout__tabset_tab_divider"></div>
         <div style={{ position: 'relative', zIndex: 1000 }}>
     <div
       className="flexlayout__tab_button flexlayout__tab_button_top flexlayout__tab_button--selected"
       onClick={handleeventdispatch}
       style={{
         display: 'flex',
         alignItems: 'center',
         gap: '8px',
         cursor: 'pointer',
         padding: '5px 2px', 
         borderRadius: '4px',
         backgroundColor: '#333333',
         transition: 'background-color 0.2s',
         marginBottom: '10px',
       }}
       onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#444444')}
       onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#333333')}
     >
       <div
         className="relative text-[14px] leading-[normal] p-[2px] before:block before:h-3.5 before:w-3.5 text-sd-blue-500"
         style={{
           position: 'relative',
           fontSize: '14px',
           color: '#007bff',
           display: 'flex',
           alignItems: 'center', 
         }}
       >
        <BarChart size={16} /> 
       </div>
       <div className="relative" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
         <div className="medium whitespace-nowrap font-medium" style={{ lineHeight: '1.2' }}>
           Analysis View
         </div>
         <div className="normal absolute left-0 top-0 whitespace-nowrap font-normal" style={{ lineHeight: '1.2' }}>
           Analysis View
         </div>
       </div>
     </div>
   </div>
    
    </>
  )
}

export default AnalysisButton
import { useState,useEffect } from 'react';
import reactLogo from '@/assets/react.svg';
import wxtLogo from '/wxt.svg';
import "../entrypoints/popup/App.css";
import { storage } from '@wxt-dev/storage';
import { LeetCode } from "leetcode-query";



// This will be used to add tags to 

 function TagDisplay(probelmId : string) {

  const id = probelmId.probelmId;




   const [tags, setTags] = useState<string[]>(() => {
      const savedTags = localStorage.getItem(id);
      return savedTags ? JSON.parse(savedTags) : [];
    });

  

    

   

    

  useEffect(()=>{
    window.addEventListener("Tagsupdated",()=>{
      const savedTags = localStorage.getItem(id);
      setTags(savedTags ? JSON.parse(savedTags) : []);
    });
    
  },[id]);




  

  return (
    <>
  <div className="app-container">
      {tags && tags.length > 0 && (
        <div className="flex gap-1.5">
          {tags.map((tag, index) => (

           <div className="relative inline-flex items-center justify-center text-caption px-2 py-1 gap-1 rounded-full bg-fill-secondary cursor-pointer transition-colors hover:bg-fill-primary hover:text-text-primary text-sd-secondary-foreground hover:opacity-80">

            <span>{tag}</span>
            </div>
          ))}
        </div>
      )}
    </div>
   


     
    
    </>
  );
}

export default TagDisplay;

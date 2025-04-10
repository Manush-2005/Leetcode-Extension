// 


import "./popup/App.css";

import ReactDOM from 'react-dom/client';
import App from './popup/App';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'
import Addtag from "../components/Addtag";
import axios from "axios";
import Graph from "../components/Graph";
import TagDisplay from "../components/Tagsdisplay";
import AddFriend from "../components/AddFriend";
import Chatcomponet from "../components/Chatcomponet";
import YoutubeVideosDisplay from "@/components/YoutubeVideosDisplay";
import Analysis from "@/components/Analysis";
import StreakCard from "@/components/StreakComponet";



export default defineContentScript({
  matches: ['<all_urls>'],
  // 2. Set cssInjectionMode
  cssInjectionMode: 'ui',

  async main(ctx) {
    // 3. Define your UI
    const ui = await createShadowRootUi(ctx, {
      name: 'example-ui',
      position: "inline",
      anchor: "body",
      onMount:  (container) => {

        

        const xpath = "/html/body/div[1]/div[2]/div/div/div[4]/div/div/div[4]/div/div[1]/div[2]";
        const targetdiv = document.evaluate(xpath,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
        const titlexpath = "/html/body/div[1]/div[2]/div/div/div[4]/div/div/div[4]/div/div[1]/div[1]/div";

        const titlediv = document.evaluate(titlexpath,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);

        const titlediv1 = titlediv.singleNodeValue as HTMLElement;
        
        const problemId = window.location.href;

        
        // For graph on user profile
        const graphdivxpath = "/html/body/div[1]/div[1]/div[4]/div/div[2]";
        const graphdiv = document.evaluate(graphdivxpath,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
        const graphdiv1 = graphdiv.singleNodeValue as HTMLElement;

        console.log("This is the graph div", graphdiv1);
      
        

        const usernamedivpath = "/html/body/div[1]/div[1]/div[4]/div/div[1]/div/div[1]/div[1]/div[2]/div[2]/div";
        const usernamediv = document.evaluate(usernamedivpath,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
        const userelement = usernamediv.singleNodeValue as HTMLElement;
    
      
        

        const chatdivselectpath = "/html/body/div[1]/div[2]/div/div/div[4]/div/div/div[9]/div/div[2]";
        const chatdivselect = document.evaluate(chatdivselectpath,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
        const chatelement = chatdivselect.singleNodeValue as HTMLElement;

        // For youtube videos
        const youtubedivselectpath = "/html/body/div[1]/div[2]/div/div/div[4]/div/div/div[1]/div[1]/div[1]/div";
        const youtubedivselect = document.evaluate(youtubedivselectpath,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
        const youtubedivelement = youtubedivselect.singleNodeValue as HTMLElement;

        // Analysis componet
        const analysispath = "/html/body/div[1]/div[2]/div/div/div[4]/div/div/div[1]/div[1]/div[1]/div";
        const analysisselect = document.evaluate(analysispath,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
        const analysiselement = analysisselect.singleNodeValue as HTMLElement;


        const problemdescriptionpath = "/html/body/div[1]/div[2]/div/div/div[4]/div/div/div[4]/div/div[1]/div[3]";
        const problemdescription = document.evaluate(problemdescriptionpath,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
        const problemdescriptionelement = problemdescription.singleNodeValue as HTMLElement;

        // diffculty level 
        const diffcultypath = "/html/body/div[1]/div[2]/div/div/div[4]/div/div/div[4]/div/div[1]/div[2]/div[1]";
        const diffcultydiv = document.evaluate(diffcultypath,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
        const diffcultyelement = diffcultydiv.singleNodeValue as HTMLElement;

        

        // problem description and testcases
        const problemdespath = "/html/body/div[1]/div[2]/div/div/div[4]/div/div/div[4]/div/div[1]/div[3]/div";
        const problemdes = document.evaluate(problemdespath,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
        const problemdeselement = problemdes.singleNodeValue as HTMLElement;


        

        let currentView: "description" | "analysis" | "youtube" = "description";
        let savedProblemdescriptionHTML: string | null = null;
       


       


      
        const targetdiv1 = targetdiv.singleNodeValue as HTMLElement;

        if(targetdiv1 ) {
          window.addEventListener("YoutubeVideoButtonClicked", () => {
            if (currentView !== "youtube") {
              // Save the original description HTML if not already saved
              if (!savedProblemdescriptionHTML) {
                savedProblemdescriptionHTML = problemdescriptionelement.innerHTML;
              }
          
              // Clear the content and render the YouTube view
              problemdescriptionelement.innerHTML = "";
              const youtubevideosdiv = document.createElement("div");
              problemdescriptionelement.append(youtubevideosdiv);
              const problemdescriptionroot = ReactDOM.createRoot(youtubevideosdiv);
              problemdescriptionroot.render(
                <YoutubeVideosDisplay
                  que={problemName.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
                />
              );
          
              currentView = "youtube"; // Update the current view
            } else {
              // Restore the original description content
              problemdescriptionelement.innerHTML = savedProblemdescriptionHTML!;
              savedProblemdescriptionHTML = null;
              currentView = "description"; // Update the current view
            }
          });
          window.addEventListener("AnalysisButtonClicked", () => {
            if (currentView !== "analysis") {
              // Save the original description HTML if not already saved
              if (!savedProblemdescriptionHTML) {
                savedProblemdescriptionHTML = problemdescriptionelement.innerHTML;
              }
          
              // Clear the content and render the Analysis view
              problemdescriptionelement.innerHTML = "";
              const analysisdiv = document.createElement("div");
              problemdescriptionelement.append(analysisdiv);
              const analysisroot = ReactDOM.createRoot(analysisdiv);
              const descriptionText = problemdeselement.textContent ?? "";
              const difficultyText = diffcultyelement.textContent ?? "";
              analysisroot.render(
                <Analysis
                  que={problemName.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
                  description={descriptionText}
                  diffculty={difficultyText}
                />
              );
          
              currentView = "analysis"; // Update the current view
            } else {
              // Restore the original description content
              problemdescriptionelement.innerHTML = savedProblemdescriptionHTML!;
              savedProblemdescriptionHTML = null;
              currentView = "description"; // Update the current view
            }
          });


        
          
          
          const app2 = document.createElement('div');
          targetdiv1.appendChild(app2);

          const root2 = ReactDOM.createRoot(app2);
          root2.render(<TagDisplay probelmId= {problemId}/>);
          // const app2 = document.createElement("h1");
          // app2.textContent = "Add tag to this probelm";
          // titlediv1.append(app2);

          // const root = ReactDOM.createRoot(app);
          // root.render(<App />);
          // return root;
          const url = window.location.href;
          const parts = url.split('/');
          const problemName = parts[4].replace(/-/g, ' ');
        console.log(problemName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '));
         
          // document.body.append(chatdiv);
         // Wrong problem name coming
          // const chatroot = ReactDOM.createRoot(chatdiv);
          // chatroot.render(<Chatcomponet/>);


          const youtubediv = document.createElement("div");
          youtubediv.id = "youtubediv"
          youtubedivelement.append(youtubediv);
          const youtuberoot = ReactDOM.createRoot(youtubediv);
          youtuberoot.render(<YoutubeVideos />);

          const analysisdiv = document.createElement("div");
          
          analysiselement.append(analysisdiv);
          const analysisroot= ReactDOM.createRoot(analysisdiv);
          analysisroot.render(<AnalysisButton />);






          const app = document.createElement('div');
          titlediv1.appendChild(app);

          const root = ReactDOM.createRoot(app);
          root.render(<Addtag problemId={problemId}/>);
          return {root,root2,youtuberoot};

        }

        if(graphdiv1){
          
          console.log("This is the graph div", graphdiv1);
          const app3 = document.createElement('div');
          

          app3.id = 'graph-container';
        
          
          

          const root3 = ReactDOM.createRoot(app3);
          console.log(userelement.textContent);
          root3.render(<Graph username={userelement.textContent} />);
            
          
            graphdiv1.prepend(app3); 
          
         
         

          return {root3};
        }
        

       
        else{
          console.error("Target div not found");
        }


       

        



      
        
      },
      onRemove: (root) => {
        
        if (root) {
          root.unmount();
        }

      },
    });

    
    ui.mount();
  },
});
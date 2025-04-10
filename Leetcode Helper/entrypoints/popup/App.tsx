import { useState,useEffect } from 'react';
import reactLogo from '@/assets/react.svg';
import wxtLogo from '/wxt.svg';
import './App.css';
import { storage } from '@wxt-dev/storage';
import { LeetCode } from "leetcode-query";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../components/ui/Card';
import {Button} from '../../components/ui/Button';
import { ExternalLink, Tag, BarChart, Youtube, Brain } from 'lucide-react';
import "./App.css";



// This will be used to add tags to 

 function App() {

  

  

  return (
    <>
  
      <Card className="card flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <CardHeader className="bg-gradient-to-r from-[#FFA116] to-[#FF7A00] text-white p-6">
          <CardTitle className="text-2xl font-bold text-center">LeetCode Helper</CardTitle>
          <p className="text-sm text-center mt-2">Your ultimate companion for mastering LeetCode problems</p>
        </CardHeader>

        {/* Features */}
        <CardContent className="p-6 space-y-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Features</h2>
            <div className="flex items-start space-x-3">
              <Tag className="w-5 h-5 text-blue-500" />
              <p className="text-sm text-gray-600">
                <span className="font-medium">Tag Problems:</span> Organize problems with your own custom tags.
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <Brain className="w-5 h-5 text-green-500" />
              <p className="text-sm text-gray-600">
                <span className="font-medium">AI-Powered Analysis:</span> Break down complex problems into smaller, manageable chunks.
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <BarChart className="w-5 h-5 text-purple-500" />
              <p className="text-sm text-gray-600">
                <span className="font-medium">Graphical Insights:</span> View your last 30 days of active submissions in a graph.
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <Youtube className="w-5 h-5 text-red-500" />
              <p className="text-sm text-gray-600">
                <span className="font-medium">YouTube Recommendations:</span> Get video tutorials tailored to the problem you're solving.
              </p>
            </div>
          </div>
        </CardContent>

        {/* Footer */}
        <CardFooter className="p-6 bg-gray-50">
          <Button className="w-full flex items-center justify-center space-x-2 bg-[#FFA116] hover:bg-[#FF7A00] text-white">
            <ExternalLink className="w-4 h-4" />
            <span>Open LeetCode</span>
          </Button>
        </CardFooter>
      </Card>
    
  
   


     
    
    </>
  );
}

export default App;

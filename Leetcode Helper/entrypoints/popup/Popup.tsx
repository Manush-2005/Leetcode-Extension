import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../components/ui/Card';
import {Button} from '../../components/ui/Button';
import {ExternalLink, Settings} from "lucide-react";
import "./App.css";




const Popup = () => {
  return (

    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
    <Card className="w-[400px] h-[400px] overflow-hidden shadow-lg rounded-lg">
      <CardHeader className="bg-[#FFA116] text-white p-4">
        <CardTitle className="text-lg font-bold">LeetCode Companion</CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="space-y-2">
          <h2 className="text-sm font-semibold">Your Progress</h2>
          <div className="flex justify-between text-xs">
            <span>Problems Solved: 75/1000</span>
            <span>7.5%</span>
          </div>
          {/* <Progress value={7.5} className="h-2" /> */}
        </div>
      </CardContent>
      <CardFooter className="p-4">
        <Button className="w-full flex items-center justify-center space-x-2">
          <ExternalLink className="w-4 h-4" />
          <span>Open LeetCode</span>
        </Button>
      </CardFooter>
    </Card>
  </div>
  
  
  )
}

export default Popup
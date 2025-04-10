import React from 'react'
import { LineChart, Line, CartesianGrid,XAxis,YAxis,Tooltip,Legend,ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';
import axios from 'axios';



function Graph({username} : {username : string}) {

  const [data, setData] = useState([]);
  

    const id = username;
    console.log("This is the username",id);


    useEffect(()=>{

      const fetchdata = async () =>{

        const res = await axios.get(`http://localhost:3001/${id}`);
        const submissionCalendar = res.data.submissionCalendar;
       
        const formattedData = Object.entries(submissionCalendar).splice(-30).map(([timestamp, value]) => {
          const date = new Date(timestamp * 1000); 
          const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
          return { date: formattedDate, value };
        });
        setData(formattedData);
      

      }
      fetchdata();

    },[]);
    console.log(data);


  return (
   <>
   
   <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Total Submissions in the Last 30 Active Days</h1>
   <ResponsiveContainer width="100%" height={300} >
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
        <XAxis stroke="#ccc"    />
        <YAxis domain={[0, 20]} tickCount={4} stroke="#ccc" dataKey="value" />
        <Tooltip
          content={({ payload, label }) => {
            if (payload && payload.length) {
              const { date, value } = payload[0].payload;
              return (
                <div style={{ backgroundColor: '#333', padding: '10px', borderRadius: '5px', color: '#fff' }}>
                  <p>Date: {date}</p>
                  <p>Submissions: {value}</p>
                </div>
              );
            }
            return null;
          }}
        />
        <Line type="monotone" dataKey="value" stroke="#ff7300" dot={{ r: 3 }} />
      </LineChart>
    </ResponsiveContainer>
    
   
   </>
  )
}

export default Graph
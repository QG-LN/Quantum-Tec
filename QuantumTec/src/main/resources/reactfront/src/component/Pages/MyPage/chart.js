import React from 'react';
import { BarChart, Bar, XAxis, YAxis } from 'recharts';

export default function Chart(props) {
  
console.log(props)
let data = []

  for (let i = 0; i < props.x.length; i++) {
    data.push({name: props.x[i], num: props.y[i]})
    }

  

  return(
    <BarChart width={350} height={200} data={data} className='right-8'>
        <Bar dataKey="num" fill="#8884d8" />
        <XAxis dataKey="name" />
        <YAxis />
    </BarChart>
  )
}
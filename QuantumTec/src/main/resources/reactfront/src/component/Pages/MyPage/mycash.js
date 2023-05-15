import React, { useState } from "react";
import { useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

export default function Mycash(){
    const [data, setData] = useState([]);
    const [isState, setState] = useState('isMonthly');
    
    //월일을 클릭 시
      useEffect(() => {
        if (isState === 'isMonthly') {
          setData([
            { year: 2022, month: 1, value: 100 },
            { year: 2022, month: 2, value: 200 },
            { year: 2022, month: 3, value: 300 },
            { year: 2023, month: 1, value: 400 },
            { year: 2023, month: 2, value: 500 },
            { year: 2023, month: 3, value: 600 },
          ]);
          //년일을 클릭 시
        } else if (isState === 'isYearly') {
          setData([
            { year: 2022, value: 100 },
            { year: 2023, value: 400 },
          ]);
        }
      }, [isState]);
    return (
        <div>
        <LineChart
          data={data}
          width={500}
          height={400}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line dataKey="value" />
        </LineChart>
        <button onClick={() => setState('isYearly')}>연도별로 보기</button>
      </div>
    );
};
    

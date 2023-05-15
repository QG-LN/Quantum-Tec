import { PureComponent } from 'react';
import { BarChart, LineChart, Bar, XAxis, YAxis, Line } from "recharts";
export default function MyMain(){

  //차트 데이터 셋
    const data = [
        {name: "부서 1",
          num: 5},
        {name: "부서 2",
          num: 3},
        {name: "부서 3",
          num: 1},
        {name: "부서 4",
          num: 2},
        {name: "부서 5",
            num: 4},
        {name: "부서 6",
          num: 2}
      ];
    return(
        <div class='mypagestyle'>
                    <h2 class='account_main_page_title'>마이페이지</h2>
                    <div class='flex' style={{marginLeft:'13%'}}>
                        <div class='chartstyle'>
                            <h3>최근 플레이 게임</h3>
                            <BarChart width={500} height={200} data={data}>
                                <Bar dataKey="num" fill="#8884d8" />
                                <XAxis dataKey="name" />
                                <YAxis />
                            </BarChart>
                        </div>
                    
                        <div class='chartstyle'>
                            <h3>플레이 시간</h3>
                            <LineChart width={500} height={200} data={data}>
                                <Bar dataKey="num" fill="#8884d8" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Line type="monotone" dataKey="num" stroke="#8884d8" />
                                <Line type="monotone" dataKey="name" stroke="#8884d8" />
                            </LineChart>
                        </div>
                    </div>
        </div>
    )
}
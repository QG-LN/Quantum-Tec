import { ProgressBar } from 'react-bootstrap';
export default function myProgressBar() {
  const gameName = ["배틀필드", "배틀그라운드" , "오버워치"];
  let gametime = ["1","5","3"];
  const gameColor = ["#FF2222", "#22FF22", "#2222FF"]
// Step 1: 게임 시간 값 받아오기
let gametimeNumbers = gametime.map(Number);
// Step 2: 가져온 값 다 합치기
let sum = gametimeNumbers.reduce((total, num) => total + num, 0);
// Step 3: 게임 시간 백분율 계산하기
let percentages = gametimeNumbers.map(num => (num / sum) * 100);

    return (
      <div className="flex flex-col relative h-[158px] rounded-2xl border bg-white box-border  pt-[30px] pr-[30px] pl-[30px] m-[1.5%] shadow-md">
        <div className="progressBar">
          <div className="progressBar">
            <ProgressBar>
            {gameName.map((game, index) => {
              return(
              <ProgressBar style={{backgroundColor:gameColor[index]}} now={percentages[index]} key={1} />
            )})}
            </ProgressBar>
          </div>
        </div>
        <ul className="text-black inline mt-[18px] text-left">
        
          {gameName.map((game, index) => {
            return(
            <li className="inline-flex mr-10" key={game}>
            <svg
              style={{ color: gameColor[index] }}
              aria-hidden="true"
              height="16"
              viewBox="0 0 16 16"
              version="1.1"
              width="16"
              data-view-component="true"
              class="octicon octicon-dot-fill mr-2 mt-1 fill-current"
            >
              <path d="M8 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z"></path>
            </svg>
            <span class="color-fg-default text-bold mr-1">{game}</span>
            <span>{parseInt(percentages[index])+'%'}</span>
            {console.log(game)}
          </li>
          )})} 
          </ul>
      </div>
    );
}
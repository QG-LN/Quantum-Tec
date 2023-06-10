export default function Buyplaybanner(props) {
  const gameBuy = () => {
    alert('구매가 완료되었습니다.');
  }
  const myWish =() => {
    alert('찜하기가 완료되었습니다.');
  }
  const gamePlay = () => { 
    alert('게임을 실행합니다.');
  }

    return(
      <div>
        {/* 구매전 */}
          {!props.buystate && 
            <div class='w-[1300px] h-[160px] bg-slate-200 table'>
              <div class='table-cell align-middle'>
                  <div class='flex'>
                    <h2 class='m-auto w-[30%] text-2xl border-none'>{props.gamename} 구매하기</h2>
                    <div class='m-auto w-[30%] border-none'>원화표시 : {props.gameprice}원(\)
                    </div>
                    <div class='m-auto w-[40%] border-none'>
                      <div>
                        <input type='button' class='mb-2 rounded-md bg-green-500 hover:bg-green-700 text-white font-bold w-[60%] h-[70px] text-2xl' value='구매' onClick={gameBuy}></input>
                      </div>
                      <div>
                        <input type ='button' onClick={myWish} value='위시리스트에 추가'></input>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          }
          {/* 구매후 */}
          {props.buystate && 
          <div>
          <h2 class='text-left ml-9'>게임 관련 개인 정보</h2>
          <hr/>
          <div class='w-[1300px] h-[100px] table'>
              <div class='table-cell align-middle'>
                  <div class='flex'>
                    <h2 class='m-auto w-[60%] text-2xl border-none'>{props.gamename} 최근 플레이 이력, 플레이타임</h2>
                    <div class='m-auto w-[40%] border-none'>
                      <div>
                        <input type='button' class='rounded-md bg-green-500 hover:bg-green-700 text-white font-bold w-[60%] h-[70px] text-2xl' value='플레이' onClick={gamePlay}></input>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          <hr/>
        </div>
        }
    </div>
    )
}
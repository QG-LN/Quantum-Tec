import Img from "./카테고리 선택.png";

function AvatarProfile(props) {
  props = {
    itemCategoryName: "배경",
    itemName: "빨간색 배경",
  };
  const itemCategoryName = props.itemCategoryName;
  const itemName = props.itemName;
  return (
    <div className="dashboard mt-24 fixed right-0 avatorBoardPageBody h-[54rem] overflow-y-scroll">
      <img src={Img} alt="Avatar Profile" width="100%" />
      {/* 실제 사용될 코드 */}
      {/* <div class="bg-white p-6">
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-3">
            <div
              class="rounded-lg border bg-card text-card-foreground shadow-sm w-full scale-75"
              data-v0-t="card"
            >
              <div class="flex flex-col space-y-1.5 p-6">
                <img
                  src={`${process.env.PUBLIC_URL}/image/${itemCategoryName}/${itemName}_shop.png`}
                  alt={`${itemName} Image`}
                  
                />
              </div>
            </div>
          </div>
          <div class="col-span-9 ">
          <h2 class=" text-3xl text-left font-semibold">아바타 정보</h2>
            <div class="flex space-x-4 rounded-lg border shadow-sm h-80">
              <div class="space-y-2">
                
                <div class="flex text-left">
                  <div class="grid grid-cols-2 gap-4 mx-5">
                    <div class="space-y-1 font-bold">
                      <div>아바타 이름</div>
                      <div>제작자</div>
                      <div>아바타 번호</div>
                      <div>카테고리</div>
                    </div>
                    <div class="space-y-1">
                      <div>{itemName}</div>
                      <div>남산타워</div>
                      <div>1</div>
                      <div>{itemCategoryName}</div>
                    </div>
                  </div>
                  <div class="grid grid-cols-2 gap-4 mx-5">
                    <div class="space-y-1 font-bold">
                      <div>가격</div>
                      <div>생성 일자</div>
                      <div>아바타 할인 기간 설정</div>
                      <div>아바타 저장위치</div>
                    </div>
                    <div class="space-y-1">
                      <div>10000원</div>
                      <div>2023/12/03</div>
                      <div>2023-03-12 ~ 2023-12-03</div>
                      <div>D://BringUp/avatar/backgr...</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class=' pl-4 mt-3'>
          <h2 class="text-3xl font-semibold mb-4 text-left">아바타 설명</h2>
          <p class='rounded-lg border shadow-sm h-12'></p>
        </div>
        <div class="mt-6 pl-4">
          <h2 class="text-3xl font-semibold mb-4 text-left">아바타 거래 내역</h2>
          <div class="overflow-x-auto rounded-lg border shadow-sm">
            <table class="min-w-full w-[100%]">
              <thead>
                <tr class="border-b">
                  <th class="p-2">번호</th>
                  <th class="p-2">거래명</th>
                  <th class="p-2">거래 금액</th>
                  <th class="p-2">거래 수단</th>
                  <th class="p-2">거래 상태</th>
                  <th class="p-2">거래 일자</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b">
                  <td class="p-2">1</td>
                  <td class="p-2">55545</td>
                  <td class="p-2">10000</td>
                  <td class="p-2">신용카드</td>
                  <td class="p-2">결제 완료</td>
                  <td class="p-2">2022-09-01</td>
                </tr>
                <tr class="border-b">
                  <td class="p-2">2</td>
                  <td class="p-2">avatar</td>
                  <td class="p-2">10000</td>
                  <td class="p-2">신용카드</td>
                  <td class="p-2">결제 완료</td>
                  <td class="p-2">2022-09-01</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="grid grid-cols-12 gap-4 mt-6 ">
          <div class="col-span-8 ">
            <h2 class="text-3xl text-left pl-4 font-semibold mb-4">아바타 구매 추이</h2>
            <div class='rounded-lg border shadow-sm'>
            <img
              src="/placeholder.svg"
              alt="Line Chart"
              class="h-48 w-full"
              width="400"
              height="200"
              style={{
                aspectRatio: "400/200",
                objectFit: "cover",
              }}
            />
            </div>
          </div>
          <div class="col-span-4">
            <h2 class="text-3xl font-semibold mb-4">아바타 사용량</h2>
            <div class='rounded-lg border shadow-sm'>
            <img
              src="/placeholder.svg"
              alt="Pie Chart"
              class="h-48 w-full"
              width="400"
              height="200"
              style={{
                aspectRatio: "400/200",
                objectFit: "cover",
              }}
            />
            </div>
          </div>
        </div>
      </div>*/}
    </div>
  );
}
export default AvatarProfile;

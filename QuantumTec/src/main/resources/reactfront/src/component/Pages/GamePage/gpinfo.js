export default function GameInfo(props) {
  return (
    <div class=" h-[535px]">
      <img
        className="w-[435px] h-[200px]"
        src={props.img}
        alt="게임배너이미지"
      />

      <div class="h-[100px] mt-2">
        <p class="text-center ml-2">{props.gameinfo}</p>
      </div>
      <table class="table-auto text-center w-[435px] h-[140px]">
        <tr class="columns-2">
          <td >평점:</td>
          <td>{props.gamegrade}</td>
        </tr>
        <tr>
          <td>출시일:</td>
          <td>{props.gamedate}</td>
        </tr>
        <tr>
          <td>개발자:</td>
          <td>{props.developer}</td>
        </tr>
        <tr>
          <td>장르 리스트:</td>
          <td>{props.categorylist}</td>
        </tr>
      </table>
    </div>
  );
}

import React, { useState }from "react";
import { useNavigate } from "react-router";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {axiosRequest} from "../../../../Utils/networkUtils";

function AccountManagement(props) {
  //modal
  const [modalState, setModalState] = useState(false);

  const navigate = useNavigate();

  const handleButtonAddClick = () => {
    console.log("게시글 추가");
    navigate("/board/3/write");
  };

  const handleButtonModifyClick = () => {
    console.log("게시글 수정");
    let boardNo = 0;
    switch (props.state.boardCategoryName) {
      case "자유게시판":
        boardNo = 1;
        break;
      case "튜터링":
        boardNo = 2;
        break;
      case "공지사항":
        boardNo = 3;
        break;
      default:
        boardNo = 3;
        break;
    }
    const data = {
      boardIndex : boardNo,
      title: props.state.postTitle,
      content: props.state.postContent,
      beforePath: `/dashboard/board/${props.state.postIndex}`,
      to: 'admin',
    };
    navigate(`/board/${boardNo}/post/${props.state.postIndex}/edit`, { state: data });
  };

  // 모달창 닫기 버튼 클릭 시
  const handleClose = () => {
    setModalState(false);
  }

  const handleShowModal = ()=>{
    setModalState(true);
    console.log(1111);
  }

  const handleButtonDeleteClick = () => {
    const path = "dashboard/postinfo/delete";
    const body = {
      postIndex: props.state.postIndex,
      userID: localStorage.getItem("userID"),
    };

    axiosRequest(path, body, "POST", "json")
      .then((response) => {
        console.log(response);
        if (response) {
          alert("글을 성공적으로 삭제하였습니다.");
          navigate(`/dashboard/board`);
        } else {
          alert("글 삭제에 실패하였습니다.");
        }
      }).catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="account-management d-flex justify-content-end">
      <Modal show={modalState} onHide={handleClose} centered={true}>
        <Modal.Header>
          <Modal.Title className="w-[100%]">
            게시글 삭제
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mx-3">
            <h6 class="card-text placeholder-glow">
              <strong>"{props.state.postTitle}" 게시글을 삭제하시겠습니까?</strong>
            </h6>
            <div class="ml-3 text-sm">삭제시 복구가 불가능합니다.</div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn_close"
            variant="danger"
            onClick={handleButtonDeleteClick}
          >
            삭제
          </Button>
          <Button
            className="btn_close"
            variant="secondary"
            onClick={handleClose}
          >
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
      <button className="btn btn-danger m-2" onClick={handleButtonAddClick}>
        게시글 추가
      </button>
      <button className="btn btn-danger m-2" onClick={handleButtonModifyClick}>
        게시글 수정
      </button>
      <button className="btn btn-danger m-2" onClick={handleShowModal}>
        게시글 삭제
      </button>
    </div>
  );
}

export default AccountManagement;

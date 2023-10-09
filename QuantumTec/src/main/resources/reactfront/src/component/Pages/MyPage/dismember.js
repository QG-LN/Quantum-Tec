import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function Dismember(){
    //modal
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        setPassword('');
        setCheckPassword(false);
    }
    const handleShow = () => setShow(true);
    const [password, setPassword] = useState(''); // 비밀번호
    const [checkPassword, setCheckPassword] = useState(false); // 비밀번호 오류 메시지 출력을 위한 변수
    //modal

    const etcContent = "기타 (상세 사유를 작성해주세요)";
    const [reason, setReason] = useState(''); // 선택된 탈퇴 사유
    const [reasonCheck, setReasonCheck] = useState(false);
    const [reasonDetail, setReasonDetail] = useState(''); // 상세 탈퇴 사유
    const [reasonDetailCheck, setReasonDetailCheck] = useState(false);
    const handleDetailChange = (event) => {
        setReasonCheck(false);
        setReasonDetail(event.target.value);
        if(event.target.value !== ""){
            setReasonDetailCheck(true);
        }
    }
    const [reasonList, setReasonList] = useState([
        ["서비스 사용 빈도가 낮음",1],
        ["다른 서비스를 사용하게 됨",2],
        ["개인 정보 보호에 대한 우려",3],
        ["이용 방법이 복잡함",4],
        ["필요한 기능이 없음",5],
        ["서비스의 안정성 문제",6],
        ["고객 서비스 만족도 문제",7],
        ["비용 문제",8],
    ]);
    const handleRadioChange = (event) => {
        setReasonCheck(false);
        setReason(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setCheckPassword(false);
        setPassword(event.target.value);
    }

    const handleCheckPassword = (event) => {
        if(password === "test1234"){
            setCheckPassword(false);
            handleClose();
        }
        else{
            setCheckPassword(true);
        }
    }

    // 탈퇴 사유 선택 여부 확인
    const handleRadioCheck = () => {
        setReasonCheck(true);
        if(reason === ""){
            return true;
        }
        else{
            if(reason === etcContent){
                if(reasonDetail === ""){
                    return true;
                }
                else{
                    handleShow();
                }
            }
            else{
                handleShow();
            }
        }
    }

    useState(() => {
        console.log(password)
    }, [password]);

    // 유효성 검사 컴포넌트
    const ComponentRadio = (props) => {
        return(
        <div class="alert alert-danger py-2 mt-3 d-flex align-items-center" role="alert">
            <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2 h-3" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </svg>
            <div>
                {props.message}
            </div>
        </div>
        );
    }


    return(
        <div>
            <Modal show={show} onHide={handleClose} centered={true} size='lg'>
                <Modal.Header>
                    <Modal.Title className='w-[100%]'>
                        <div className='text-center'>회원 탈퇴</div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='mx-[4%] mt-3'>
                        <h5 class="card-text placeholder-glow">
                            사용하고 계신 아이디 <div class="placeholder col-2"></div> 는 탈퇴할 경우 재사용 및 복구가 불가능합니다
                        </h5>
                        <span className='ms-4'>탈퇴한 아이디는 본인과 타인 모두 재사용 복구가 불가하오니 신중하게 선택하시길 바랍니다.</span><br/><br/><br/>
                        <h5>탈퇴 후 회원정보 및 개인형 서비스 이용기록은 모두 삭제됩니다.</h5>
                        <span className='ms-4'>회원정보 및 재화, 구매 기록등 서비스 이용기록은 모두 삭제되며, <br/>
                        삭제된 데이터는 복구되지 않습니다.</span><br/><br/><br/>

                        <div class="mb-3">
                            <label for="inputPassword" class="col-form-label">비밀번호를 입력하세요.</label>
                            <input type="password" class={`form-control ${checkPassword ? "is-invalid":""}`} id="inputPassword" value={password} onChange={handlePasswordChange}/>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {checkPassword ? 
                    <div class="alert alert-danger py-1 d-flex align-items-center" role="alert">
                        <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2 h-3" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                        </svg>
                        <div>
                            비밀번호를 다시 확인하세요!
                        </div>
                    </div>
                    : <div></div>
                    }
                    
                    <Button className="btn_close" variant="danger" onClick={handleCheckPassword}>
                        탈퇴
                    </Button>
                </Modal.Footer>
            </Modal>
            <h2 className='account_main_page_title '>회원 탈퇴</h2>
            <div className='mt-[20px] text-center'>
                <div className="text-start mx-[5%] bg-gray-200 px-[5%] py-[2%]">
                    회원 탈퇴를 결정하신 이유를 알려주실 수 있나요? <br/> 귀하의 익명의 피드백은 저희 서비스 개선에 큰 도움이 됩니다.<br />시간을 내주셔서 감사합니다.
                </div>
                <h5 className="mt-[20px] text-start ms-[10%]">
                    회원 탈퇴 사유
                </h5>
                <hr class="mx-[10%] mb-0 pb-0"/>
                <div className="mt-[20px] text-start mx-[10%] mt-0 pt-0">
                    <div className={`border border-3 rounded border-opacity-50 mt-3 ${reason === ""&&reasonCheck ? "border-danger" : "border-white"}`}>
                        <div className='m-0 px-4 pb-4'>
                            {reasonList.map((item) => (
                                <div className="form-check mt-3 ms-1" key={item[1]}>
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="reason"
                                        id={"id" + item[1]}
                                        value={item[0]}
                                        onChange={handleRadioChange}
                                        checked={reason === item[0]}
                                    />
                                    <label className="form-check-label" htmlFor={"id" + item[1]}>
                                        {item[0]}
                                    </label>
                                </div>
                            ))}

                            <div className="form-check mt-3 ms-1">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="reason"
                                    id={"id9"}
                                    value={etcContent}
                                    onChange={handleRadioChange}
                                    checked={reason === etcContent}
                                />
                                <label className="form-check-label w-[100%]" htmlFor="id9">
                                    기타 (상세 사유를 작성해주세요)
                                </label>
                                <input
                                    type="text"
                                    className={`form-control ${reasonCheck && reason === etcContent && reasonDetail === ""? "is-invalid" : ""}`}
                                    id="etcReason"
                                    onClick={() => setReason(etcContent)}
                                    onChange={handleDetailChange}
                                    value={reasonDetail}
                                />
                            </div>
                        </div>
                    </div>
                    {reasonCheck && (
                        (reason === "") ? <ComponentRadio message="회원 탈퇴 사유를 선택해주세요."/> :
                        (reason === etcContent && reasonDetail === "") ? <ComponentRadio message="기타 상세 사유를 작성해주세요."/> :
                        <div></div>
                    )}
                    <div class="my-3 ms-1">
                        <label for="exampleFormControlTextarea1" class="form-label">건의 사항 <span className='text-sm'>(선택)</span></label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="5"></textarea>
                    </div>
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <Button className="btn_close mb-[20px]" variant="danger" onClick={handleRadioCheck}>회원 탈퇴</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
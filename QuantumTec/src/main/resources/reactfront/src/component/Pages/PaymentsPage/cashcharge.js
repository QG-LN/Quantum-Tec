import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useRef, useState } from "react";
import { loadPaymentWidget } from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";

const selector = "#payment-widget";
const clientKey = process.env.REACT_APP_PAYMENTS_API_CLIENT_KEY;
const customerKey = localStorage.getItem("userID");

export default function CashCharge() {
    //modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const paymentWidgetRef = useRef(null);
    const paymentMethodsWidgetRef = useRef(null);
    const [price, setPrice] = useState(20_000);
    const [name, setName] = useState("20000 Cash");

    useEffect(() => {
        (async () => {
        const paymentWidget = await loadPaymentWidget(clientKey, customerKey);

        const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
            selector,
            { value: price }
        );

        paymentWidgetRef.current = paymentWidget;
        paymentMethodsWidgetRef.current = paymentMethodsWidget;
        })();
    }, [show]);


    useEffect(() => {
        const paymentMethodsWidget = paymentMethodsWidgetRef.current;

        if (paymentMethodsWidget == null) {
        return;
        }

        paymentMethodsWidget.updateAmount(
        price,
        paymentMethodsWidget.UPDATE_REASON.COUPON
        );
    }, [price]);

    const tempArray = [];

    useEffect(() => {
        if(localStorage.getItem("userNickname") == null){
            alert("로그인이 필요한 서비스입니다.");
            document.location.href = "/login";
        }
    }, []);

    for(let i = 1; i <= 10; i++) {
        tempArray.push({ id: i, name: `${2000 * i} Cash`, priceCash: 2_000 * i });
    }

    return (
        <div className='container h-[100%] w-[1200px] bg-gray-200 py-[7%]'>
            <Modal show={show} onHide={handleClose} centered={true}>
                <Modal.Body>
                    <h1>주문서</h1>
                    <span>{`${price}원`}</span>
                    <div id="payment-widget" />
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn_close" variant="success" onClick={async () => {
                        const paymentWidget = paymentWidgetRef.current;

                        try {
                            await paymentWidget?.requestPayment({
                                orderId: nanoid(),
                                orderName: name,
                                customerName: localStorage.getItem("userNickname"),
                                customerEmail: "customer123@gmail.com",
                                successUrl: `${window.location.origin}/success`,
                                failUrl: `${window.location.origin}/fail`
                            });
                        } catch (error) {
                            // handle error
                        }
                        }}
                    >
                        결제하기
                    </Button>
                    <Button className="btn_close" variant="secondary" onClick={handleClose}>
                        닫기
                    </Button>
                </Modal.Footer>
            </Modal>
            <h1>Payments Page</h1>
            <p>Welcome to the Payments Page!</p>
            <div className='d-flex flex-wrap align-items-center mt-[10%]'>
                {tempArray.map((item) => (
                    <div class="card w-[14%] ms-[5%] placeholder-glow mb-[8%]" style={{cursor:"pointer"}} 
                    onClick={() => {
                        setPrice(item.priceCash);
                        setName(item.name);
                        setShow(true);
                    }}>
                        <div class="placeholder ratio ratio-1x1 rounded-top"></div>
                        <div class="card-body">
                            <h5 class="card-title">{item.name}</h5>
                        </div>
                    </div>
                ))}
            </div>
            
        </div>
    );

}


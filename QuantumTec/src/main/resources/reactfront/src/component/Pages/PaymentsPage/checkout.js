import { useEffect, useRef, useState } from "react";
import { loadPaymentWidget } from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";

const selector = "#payment-widget";
const clientKey = process.env.REACT_PAYMENTS_API_CLIENT_KEY;
const customerKey = localStorage.getItem("userID");

export function CheckoutPage() {
    //modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const paymentWidgetRef = useRef(null);
    const paymentMethodsWidgetRef = useRef(null);
    const [price, setPrice] = useState(50_000);

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
    }, []);

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

    return (
        <div>
            <Modal show={show} onHide={handleClose} centered={true}>
                <Modal.Body>
                    <h1>주문서</h1>
                    <span>{`${price.toLocaleString()}원`}</span>
                    <div>
                        <label>
                        <input
                            type="checkbox"
                            onChange={(event) => {
                            setPrice(event.target.checked ? price - 5_000 : price + 5_000);
                            }}
                        />
                        5,000원 할인 쿠폰 적용
                        </label>
                    </div>
                    <div id="payment-widget" />
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn_close" variant="success" onClick={async () => {
                        const paymentWidget = paymentWidgetRef.current;

                        try {
                            await paymentWidget?.requestPayment({
                                orderId: nanoid(),
                                orderName: item.name,
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
        
        </div>
    );
}

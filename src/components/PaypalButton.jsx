import React, { useState, useEffect } from 'react';

const PaypalButton = ({ amount, onSuccess }) => {
    const [isSdkReady, setIsSdkReady] = useState(false);

    useEffect(() => {
        // Kiểm tra nếu PayPal SDK đã được tải
        const loadPaypalSdk = async () => {
            if (!window.paypal) {
                const script = document.createElement('script');
                script.src = `https://www.paypal.com/sdk/js?client-id=ATOlKozCojvTY6pNM7Keh91-zhOOSlkarwLqPxUT-wYzkkdtTpVbL_oPnZO8KRFvganoYVIuvqi4pq2e&currency=USD`;
                script.async = true;
                script.onload = () => {
                    setIsSdkReady(true);
                };
                document.body.appendChild(script);
            } else {
                setIsSdkReady(true);
            }
        };

        loadPaypalSdk();
    }, []);

    const renderPaypalButtons = () => {
        if (window.paypal && window.paypal.Buttons) {
            return window.paypal.Buttons({
                createOrder: (data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: amount,
                                },
                            },
                        ],
                    });
                },
                onApprove: (data, actions) => {
                    return actions.order.capture().then(details => {
                        onSuccess(details);
                    });
                },
            }).render('#paypal-button-container'); // Render button vào container
        }
    };

    useEffect(() => {
        if (isSdkReady) {
            renderPaypalButtons();
        }
    }, [isSdkReady]);

    return (
        <div>
            {!isSdkReady ? (
                <div>Loading...</div>
            ) : (
                <div id="paypal-button-container" />
            )}
        </div>
    );
};

export default PaypalButton;

import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// Define the shape of cart items (optional for clarity and type safety)
interface CartItem {
    id: string;
    quantity: string;
}


export interface PayPalButtonProps {
    className?: string;
  }
  

// Define the shape of order data for the response
interface OrderData {
    id?: string;
    details?: { issue: string; description: string }[];
    debug_id?: string;
    purchase_units?: {
        payments: {
            captures: { id: string; status: string }[];
        };
    }[];
}

// Message component to display errors or success messages.
function Message({ content }: { content: string }) {
    return <p>{content}</p>;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({
    className= ''
}) => {
    const initialOptions = {
        clientId: "AY9qto3I1cTBmm8Bfbxe-PNtfubantZfry_wcWbRJI2b9pPvHWy6l3V-1UmjVEzG336FpVqYsUAa77b6", // Changed to camelCase
        enableFunding: "venmo",
        disableFunding: "",
        buyerCountry: "IN",
        currency: "USD",
        dataPageType: "product-details",
        components: "buttons",
        dataSdkIntegrationSource: "developer-studio",
    };

    const [message, setMessage] = useState<string>("");

    const createOrder = async (): Promise<string> => {
        try {
            console.log('createorder ');
            const response = await fetch("/api/paypalcreateorder", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    cart: [
                      { id: 'product_1', quantity: 2, price: 25.0 },
                      { id: 'product_2', quantity: 1, price: 50.0 },
                    ],
                  }),
            });
    
            const data = await response.json();
            console.log("datadata ", data);
                if (response.ok) {
                    return data.id;
                } else {
                    throw new Error(data.message || 'Failed to create PayPal order');
                }
        } catch (error) {
            console.error('asaaas ', error);
            setMessage(`Could not initiate PayPal Checkout...${error}`);
            // Ensure that an error will throw if this block is reached.
            throw new Error("Order creation failed.");
        }
    };
    

    const onApprove = async (
        data: { orderID: string },
        actions: any
      ): Promise<void> => {
        try {
          const response = await fetch(`/api/orders/${data.orderID}/capture`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          const orderData: OrderData = await response.json();
      
          const errorDetail = orderData?.details?.[0];
      
          if (errorDetail?.issue === 'INSTRUMENT_DECLINED') {
            return actions.restart(); // Retry payment
          } else if (errorDetail) {
            throw new Error(
              `${errorDetail.description} (${orderData.debug_id})`
            );
          } else {
            const transaction =
              orderData.purchase_units?.[0].payments.captures[0];
            if (transaction) {
              setMessage(
                `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`
              );
              console.log(
                'Capture result',
                orderData,
                JSON.stringify(orderData, null, 2)
              );
            }
          }
        } catch (error) {
          console.error('Capture Error:', error);
          setMessage(`Sorry, your transaction could not be processed...${error}`);
        }
      };
      

    return (
        <div className={`${className}`}>
            <PayPalScriptProvider options={initialOptions}>
                <PayPalButtons
                    style={{
                        shape: "rect",
                        layout: "vertical",
                        color: "gold",
                        label: "paypal",
                    }}
                    createOrder={createOrder}
                    onApprove={onApprove}
                />
            </PayPalScriptProvider>
            <Message content={message} />
        </div>
    );
};

export default PayPalButton;

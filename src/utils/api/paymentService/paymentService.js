export const verifyPayment = async (paymentData) => {
  await new Promise((r) => setTimeout(r, 500));
  const authority = paymentData?.Authority || paymentData?.authority;
  const status = paymentData?.Status || paymentData?.status;

  if (status === "OK" || authority?.startsWith("ok_")) {
    return {
      status: "ok", code: 100, message: "پرداخت با موفقیت انجام شد",
      data: { order_id: "ORD-" + Date.now(), order_number: "ORD-" + Date.now(), tracking_code: "TRK-" + Date.now() },
    };
  }
  return { status: "nok", code: 101, message: "پرداخت ناموفق بود", data: null };
};

export const clearPendingOrder = async () => {
  return true;
};

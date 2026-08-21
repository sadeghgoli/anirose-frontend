export const submitBulkOrder = async (_formData) => {
  await new Promise((r) => setTimeout(r, 800));
  return { status: 'success', message: 'درخواست سفارش عمده با موفقیت ثبت شد' };
};

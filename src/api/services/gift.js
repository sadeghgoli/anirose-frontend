export const submitGiftRequest = async (_phone) => {
  await new Promise((r) => setTimeout(r, 800));
  return { status: 'success', message: 'درخواست کارت هدیه با موفقیت ثبت شد' };
};

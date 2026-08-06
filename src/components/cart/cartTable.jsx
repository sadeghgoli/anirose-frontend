"use client";
// // src/components/common/Checkout/CartTable.jsx
// import React, { useState } from 'react';
// import Link from 'next/link';
// import { Trash2, ShoppingBag } from 'react-feather';
//
// const CartTable = ({ items, updating, onUpdateQuantity, onRemoveItem, onLocalQuantityChange }) => {
//     const [localQuantities, setLocalQuantities] = useState({});
//     const [updatingId, setUpdatingId] = useState(null);
//
//     const handleQuantityChange = (cartItemId, newQuantity) => {
//         if (newQuantity < 1) return;
//         setLocalQuantities(prev => ({ ...prev, [cartItemId]: newQuantity }));
//         onLocalQuantityChange(cartItemId, newQuantity);
//     };
//
//     const handleBlur = (cartItemId, quantity) => {
//         setUpdatingId(cartItemId);
//         onUpdateQuantity(cartItemId, quantity).finally(() => {
//             setUpdatingId(null);
//             setLocalQuantities(prev => {
//                 const newState = { ...prev };
//                 delete newState[cartItemId];
//                 return newState;
//             });
//         });
//     };
//
//     const handleRemove = async (cartItemId) => {
//         if (window.confirm('آیا از حذف این محصول اطمینان دارید؟')) {
//             await onRemoveItem(cartItemId);
//         }
//     };
//
//     const getDisplayQuantity = (item) => {
//         return localQuantities[item.cart_item_id] !== undefined
//             ? localQuantities[item.cart_item_id]
//             : item.quantity;
//     };
//
//     const formatPrice = (price) => {
//         return price.toLocaleString() + ' تومان';
//     };
//
//     if (!items || items.length === 0) {
//         return (
//             <div className="bg-white rounded-2xl shadow-md p-12 text-center">
//                 <div className="text-6xl mb-4">🛒</div>
//                 <h3 className="text-xl font-semibold text-gray-800 mb-2">سبد خرید شما خالی است</h3>
//                 <p className="text-gray-500 mb-6">برای مشاهده محصولات به فروشگاه مراجعه کنید</p>
//                 <Link to="/shop" className="inline-block bg-[#64a39a] text-white px-6 py-3 rounded-lg hover:bg-[#4a7d73] transition-colors">
//                     مشاهده فروشگاه
//                 </Link>
//             </div>
//         );
//     }
//
//     return (
//         <div className="bg-white rounded-2xl shadow-md overflow-hidden">
//             {/* دسکتاپ - نمای جدولی */}
//             <div className="hidden md:block overflow-x-auto">
//                 <table className="w-full">
//                     <thead className="bg-gray-50 border-b border-gray-200">
//                     <tr>
//                         <th className="p-4 text-right w-16">حذف</th>
//                         <th className="p-4 text-right w-24">تصویر</th>
//                         <th className="p-4 text-right">محصول</th>
//                         <th className="p-4 text-right w-32">قیمت</th>
//                         <th className="p-4 text-right w-32">تعداد</th>
//                         <th className="p-4 text-right w-40">جمع جزء</th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                     {items.map((item) => (
//                         <tr key={item.cart_item_id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
//                             <td className="p-4 text-center">
//                                 <button
//                                     onClick={() => handleRemove(item.cart_item_id)}
//                                     disabled={updating && updatingId === item.cart_item_id}
//                                     className="text-gray-400 hover:text-red-500 transition-colors"
//                                 >
//                                     <Trash2 size={18} />
//                                 </button>
//                             </td>
//                             <td className="p-4">
//                                 <img
//                                     src={item.image || '/images/test/placeholder.jpg'}
//                                     alt={item.name}
//                                     className="w-16 h-16 object-cover rounded-lg"
//                                 />
//                             </td>
//                             <td className="p-4">
//                                 <Link to={`/product/${item.product_id}`} className="text-gray-700 hover:text-[#64a39a] transition-colors font-medium">
//                                     {item.name}
//                                 </Link>
//                             </td>
//                             <td className="p-4">
//                                 <span className="text-gray-600">{formatPrice(item.price)}</span>
//                             </td>
//                             <td className="p-4">
//                                 <input
//                                     type="number"
//                                     min="1"
//                                     value={getDisplayQuantity(item)}
//                                     onChange={(e) => handleQuantityChange(item.cart_item_id, parseInt(e.target.value))}
//                                     onBlur={(e) => handleBlur(item.cart_item_id, parseInt(e.target.value))}
//                                     disabled={updating && updatingId === item.cart_item_id}
//                                     className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-[#64a39a]/20 focus:border-[#64a39a] disabled:bg-gray-100"
//                                 />
//                                 {updating && updatingId === item.cart_item_id && (
//                                     <div className="inline-block ml-2">
//                                         <div className="w-4 h-4 border-2 border-[#64a39a] border-t-transparent rounded-full animate-spin" />
//                                     </div>
//                                 )}
//                             </td>
//                             <td className="p-4">
//                                 <span className="font-semibold text-gray-800">{formatPrice(item.subtotal)}</span>
//                             </td>
//                         </tr>
//                     ))}
//                     </tbody>
//                 </table>
//             </div>
//
//             {/* موبایل - نمای ستونی عمودی */}
//             <div className="block md:hidden divide-y divide-gray-100">
//                 {items.map((item) => (
//                     <div key={item.cart_item_id} className="p-4 space-y-3">
//                         {/* دکمه حذف */}
//                         <div className="flex justify-end">
//                             <button
//                                 onClick={() => handleRemove(item.cart_item_id)}
//                                 disabled={updating && updatingId === item.cart_item_id}
//                                 className="text-gray-400 hover:text-red-500 transition-colors"
//                             >
//                                 <Trash2 size={18} />
//                             </button>
//                         </div>
//
//                         {/* تصویر + نام محصول */}
//                         <div className="flex items-center gap-3">
//                             <img
//                                 src={item.image || '/images/test/placeholder.jpg'}
//                                 alt={item.name}
//                                 className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
//                             />
//                             <Link to={`/product/${item.product_id}`} className="text-gray-700 hover:text-[#64a39a] transition-colors font-medium flex-1">
//                                 {item.name}
//                             </Link>
//                         </div>
//
//                         {/* قیمت */}
//                         <div className="flex justify-between items-center pr-2">
//                             <span className="text-gray-500 text-sm">قیمت:</span>
//                             <span className="text-gray-600">{formatPrice(item.price)}</span>
//                         </div>
//
//                         {/* تعداد */}
//                         <div className="flex justify-between items-center pr-2">
//                             <span className="text-gray-500 text-sm">تعداد:</span>
//                             <div className="flex items-center gap-2">
//                                 <input
//                                     type="number"
//                                     min="1"
//                                     value={getDisplayQuantity(item)}
//                                     onChange={(e) => handleQuantityChange(item.cart_item_id, parseInt(e.target.value))}
//                                     onBlur={(e) => handleBlur(item.cart_item_id, parseInt(e.target.value))}
//                                     disabled={updating && updatingId === item.cart_item_id}
//                                     className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-[#64a39a]/20 focus:border-[#64a39a] disabled:bg-gray-100"
//                                 />
//                                 {updating && updatingId === item.cart_item_id && (
//                                     <div className="w-4 h-4 border-2 border-[#64a39a] border-t-transparent rounded-full animate-spin" />
//                                 )}
//                             </div>
//                         </div>
//
//                         {/* جمع جزء */}
//                         <div className="flex justify-between items-center pr-2 pt-2 border-t border-dashed border-gray-100">
//                             <span className="font-medium text-gray-700">جمع جزء:</span>
//                             <span className="font-bold text-gray-800 text-lg">{formatPrice(item.subtotal)}</span>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };
//
// export default CartTable;

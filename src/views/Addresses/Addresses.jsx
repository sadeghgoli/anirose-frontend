'use client'
import React, { useState, useEffect } from "react";
import { fetchAddresses, createAddress, updateAddress, deleteAddress, setDefaultAddress } from "../../api/services/addresses.js";
import { fetchProvinces, fetchCities } from "../../api/services/provinces.js";
import UserPanelLayout from "../../components/common/UserPanelLayout.jsx";
import { toast } from "react-toastify";
import { MapPin, Plus, Edit3, Trash2, CheckCircle, X } from "react-feather";

const inputClass = "w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0c5505]/30 focus:border-[#0c5505] transition-all bg-gray-50 focus:bg-white text-sm";

const emptyForm = {
  first_name: "",
  last_name: "",
  province_id: "",
  city_id: "",
  city_name: "",
  full_address: "",
  postal_code: "",
  mobile: "",
  is_default: false,
};

const unwrapList = (res) => {
  if (Array.isArray(res?.data?.data)) return res.data.data;
  if (Array.isArray(res?.data?.cities)) return res.data.cities;
  if (Array.isArray(res?.data)) return res.data;
  if (Array.isArray(res?.cities)) return res.cities;
  return [];
};

const Addresses = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const loadAddresses = async () => {
    const res = await fetchAddresses();
    setAddresses(Array.isArray(res?.data) ? res.data : unwrapList(res));
  };

  const loadCities = async (provinceId) => {
    if (!provinceId) {
      setCities([]);
      return;
    }

    setLoadingCities(true);
    try {
      const nested = provinces.find((p) => Number(p.id) === Number(provinceId))?.cities;
      if (Array.isArray(nested) && nested.length > 0) {
        setCities(nested);
        return;
      }

      const res = await fetchCities(provinceId);
      setCities(Array.isArray(res?.data) ? res.data : unwrapList(res));
    } catch (e) {
      console.error("Error loading cities:", e);
      setCities([]);
      toast.error("بارگذاری شهرها ناموفق بود");
    } finally {
      setLoadingCities(false);
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        const [addrRes, provRes] = await Promise.all([fetchAddresses(), fetchProvinces()]);
        setAddresses(Array.isArray(addrRes?.data) ? addrRes.data : unwrapList(addrRes));
        setProvinces(Array.isArray(provRes?.data) ? provRes.data : unwrapList(provRes));
      } catch (e) {
        console.error("Error loading addresses:", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setCities([]);
    setEditingId(null);
    setShowForm(false);
  };

  const handleProvinceChange = (provinceId) => {
    setForm((prev) => ({ ...prev, province_id: provinceId, city_id: "", city_name: "" }));
    loadCities(provinceId);
  };

  const handleCityChange = (cityId) => {
    const city = cities.find((c) => Number(c.id) === Number(cityId));
    setForm((prev) => ({
      ...prev,
      city_id: cityId,
      city_name: city?.name || "",
    }));
  };

  const handleEdit = async (addr) => {
    setForm({
      first_name: addr.first_name || "",
      last_name: addr.last_name || "",
      province_id: addr.province_id || "",
      city_id: addr.city_id || "",
      city_name: addr.city_name || "",
      full_address: addr.full_address || addr.address || "",
      postal_code: addr.postal_code || "",
      mobile: addr.mobile || "",
      is_default: addr.is_default || false,
    });
    setEditingId(addr.id);
    setShowForm(true);
    await loadCities(addr.province_id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.province_id) {
      toast.error("لطفاً استان را انتخاب کنید");
      return;
    }
    if (!form.city_id) {
      toast.error("لطفاً شهر را انتخاب کنید");
      return;
    }

    setSaving(true);
    const selectedProvince = provinces.find((p) => Number(p.id) === Number(form.province_id));
    const selectedCity = cities.find((c) => Number(c.id) === Number(form.city_id));

    const payload = {
      first_name: form.first_name,
      last_name: form.last_name,
      province_id: Number(form.province_id),
      province_name: selectedProvince?.name || "",
      city_id: Number(form.city_id),
      city_name: selectedCity?.name || form.city_name,
      full_address: form.full_address,
      postal_code: form.postal_code,
      mobile: form.mobile,
      is_default: !!form.is_default,
    };

    try {
      if (editingId) {
        await updateAddress(editingId, payload);
        toast.success("آدرس با موفقیت به‌روزرسانی شد");
      } else {
        await createAddress(payload);
        toast.success("آدرس با موفقیت اضافه شد");
      }
      await loadAddresses();
      resetForm();
    } catch (err) {
      const errors = err?.response?.data?.errors;
      const firstError = errors ? Object.values(errors).flat()[0] : null;
      toast.error(firstError || err?.response?.data?.message || "خطا در ذخیره آدرس");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("آیا از حذف این آدرس اطمینان دارید؟")) return;
    try {
      await deleteAddress(id);
      toast.success("آدرس با موفقیت حذف شد");
      await loadAddresses();
    } catch {
      toast.error("خطا در حذف آدرس");
    }
  };

  const handleSetDefault = async (id) => {
    try {
      await setDefaultAddress(id);
      toast.success("آدرس پیش‌فرض تنظیم شد");
      await loadAddresses();
    } catch {
      toast.error("خطا در تنظیم آدرس پیش‌فرض");
    }
  };

  return (
    <UserPanelLayout title="آدرس‌های من">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2">
          <MapPin size={22} className="text-[#0c5505]" />
          آدرس‌های من
        </h1>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#0c5505] text-white rounded-xl hover:bg-[#0a4304] transition-colors text-sm font-medium"
        >
          <Plus size={16} />
          آدرس جدید
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16 text-gray-500">در حال بارگذاری...</div>
      ) : (
        <>
          {showForm && (
            <div className="bg-[#F4F7F5] rounded-2xl p-6 mb-6 border border-[#0c5505]/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-gray-800">
                  {editingId ? "ویرایش آدرس" : "آدرس جدید"}
                </h3>
                <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="address-first-name" className="block mb-1.5 text-sm font-medium text-gray-700">نام</label>
                    <input id="address-first-name" type="text" value={form.first_name} onChange={(e) => setForm({ ...form, first_name: e.target.value })} className={inputClass} required />
                  </div>
                  <div>
                    <label htmlFor="address-last-name" className="block mb-1.5 text-sm font-medium text-gray-700">نام خانوادگی</label>
                    <input id="address-last-name" type="text" value={form.last_name} onChange={(e) => setForm({ ...form, last_name: e.target.value })} className={inputClass} required />
                  </div>
                  <div>
                    <label htmlFor="address-province" className="block mb-1.5 text-sm font-medium text-gray-700">استان</label>
                    <select
                      id="address-province"
                      value={form.province_id}
                      onChange={(e) => handleProvinceChange(e.target.value)}
                      className={inputClass}
                      required
                    >
                      <option value="">انتخاب استان</option>
                      {provinces.map((p) => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="address-city" className="block mb-1.5 text-sm font-medium text-gray-700">شهر</label>
                    <select
                      id="address-city"
                      value={form.city_id}
                      onChange={(e) => handleCityChange(e.target.value)}
                      className={inputClass}
                      required
                      disabled={!form.province_id || loadingCities}
                    >
                      <option value="">
                        {!form.province_id ? "ابتدا استان را انتخاب کنید" : loadingCities ? "در حال بارگذاری..." : "انتخاب شهر"}
                      </option>
                      {cities.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="address-full" className="block mb-1.5 text-sm font-medium text-gray-700">آدرس کامل</label>
                    <textarea id="address-full" value={form.full_address} onChange={(e) => setForm({ ...form, full_address: e.target.value })} className={inputClass} rows="2" required />
                  </div>
                  <div>
                    <label htmlFor="address-postal" className="block mb-1.5 text-sm font-medium text-gray-700">کد پستی</label>
                    <input id="address-postal" type="text" value={form.postal_code} onChange={(e) => setForm({ ...form, postal_code: e.target.value })} className={inputClass} required />
                  </div>
                  <div>
                    <label htmlFor="address-mobile" className="block mb-1.5 text-sm font-medium text-gray-700">شماره موبایل</label>
                    <input id="address-mobile" type="text" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} className={inputClass} required />
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-5">
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="checkbox" checked={form.is_default} onChange={(e) => setForm({ ...form, is_default: e.target.checked })} className="w-4 h-4 accent-[#0c5505]" />
                    آدرس پیش‌فرض
                  </label>
                </div>
                <div className="flex gap-3">
                  <button type="submit" disabled={saving}
                    className="flex items-center gap-2 px-6 py-2.5 bg-[#0c5505] text-white rounded-xl hover:bg-[#0a4304] transition-colors disabled:opacity-70 text-sm font-medium">
                    {saving ? "در حال ذخیره..." : "ذخیره"}
                  </button>
                  <button type="button" onClick={resetForm}
                    className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors text-sm font-medium">
                    انصراف
                  </button>
                </div>
              </form>
            </div>
          )}

          {addresses.length === 0 && !showForm ? (
            <div className="bg-[#F4F7F5] rounded-2xl p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#0c5505]/10 text-[#0c5505] flex items-center justify-center">
                <MapPin size={28} />
              </div>
              <p className="text-gray-600 font-medium">هنوز آدرسی ثبت نکرده‌اید</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {addresses.map((addr) => (
                <div key={addr.id} className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <p className="font-bold text-gray-800">{addr.full_name || `${addr.first_name} ${addr.last_name}`}</p>
                        {addr.is_default && (
                          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full flex items-center gap-1">
                            <CheckCircle size={12} /> پیش‌فرض
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-1 leading-6">{addr.full_address || addr.address}</p>
                      <p className="text-gray-500 text-sm mb-1">{addr.city_name} - {addr.province_name}</p>
                      <p className="text-gray-500 text-sm mb-1">کد پستی: <span dir="ltr">{addr.postal_code}</span></p>
                      <p className="text-gray-500 text-sm">تلفن: <span dir="ltr">{addr.mobile}</span></p>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100">
                    <button onClick={() => handleEdit(addr)} className="flex items-center gap-1 text-sm text-[#0c5505] hover:underline">
                      <Edit3 size={14} /> ویرایش
                    </button>
                    <button onClick={() => handleDelete(addr.id)} className="flex items-center gap-1 text-sm text-red-500 hover:underline">
                      <Trash2 size={14} /> حذف
                    </button>
                    {!addr.is_default && (
                      <button onClick={() => handleSetDefault(addr.id)} className="flex items-center gap-1 text-sm text-gray-500 hover:underline">
                        <CheckCircle size={14} /> پیش‌فرض
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </UserPanelLayout>
  );
};

export default Addresses;
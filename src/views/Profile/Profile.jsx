'use client'
import React, { useState, useEffect } from "react";
import { fetchProfile, updateProfile } from "../../api/services/auth.js";
import UserPanelLayout from "../../components/common/UserPanelLayout.jsx";
import { toast } from "react-toastify";
import { User, Mail, Smartphone, Save, CheckCircle } from "react-feather";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const result = await fetchProfile();
        if (result?.data) {
          setProfile(result.data);
          setName(result.data.name || "");
          setEmail(result.data.email || "");
        }
      } catch (e) {
        console.error("Error loading profile:", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const result = await updateProfile({ name, email });
      toast.success(result?.message || "پروفایل با موفقیت بروزرسانی شد");
      const refetch = await fetchProfile();
      if (refetch?.data) setProfile(refetch.data);
    } catch (err) {
      const msg = err?.response?.data?.message || "خطا در بروزرسانی پروفایل";
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <UserPanelLayout title="حساب کاربری">
        <div className="flex items-center justify-center py-16 text-gray-500">در حال بارگذاری...</div>
      </UserPanelLayout>
    );
  }

  return (
    <UserPanelLayout title="حساب کاربری">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2">
          <User size={22} className="text-[#0c5505]" />
          حساب کاربری
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-[#F4F7F5] rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#0c5505]/10 text-[#0c5505] flex items-center justify-center flex-shrink-0">
            <Smartphone size={18} />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-gray-500">شماره موبایل</p>
            <p dir="ltr" className="font-bold text-gray-800 text-sm text-left">{profile?.mobile || "—"}</p>
          </div>
        </div>
        <div className="bg-[#F4F7F5] rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#0c5505]/10 text-[#0c5505] flex items-center justify-center flex-shrink-0">
            <CheckCircle size={18} />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-gray-500">وضعیت حساب</p>
            <p className="font-bold text-gray-800 text-sm">{profile?.is_active ? "فعال" : "غیرفعال"}</p>
          </div>
        </div>
        <div className="bg-[#F4F7F5] rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#0c5505]/10 text-[#0c5505] flex items-center justify-center flex-shrink-0">
            <Mail size={18} />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-gray-500">ایمیل</p>
            <p dir="ltr" className="font-bold text-gray-800 text-sm truncate text-left">{email || "—"}</p>
          </div>
        </div>
      </div>

      <h2 className="font-bold text-gray-800 mb-4">ویرایش اطلاعات</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="profile-name" className="block mb-2 font-semibold text-gray-700 text-sm">نام و نام خانوادگی</label>
          <input
            id="profile-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="نام خود را وارد کنید"
            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0c5505]/30 focus:border-[#0c5505] transition-all bg-gray-50 focus:bg-white"
          />
        </div>

        <div>
          <label htmlFor="profile-email" className="block mt-3 mb-2 font-semibold text-gray-700 text-sm">ایمیل</label>
          <input
            id="profile-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            dir="ltr"
            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0c5505]/30 focus:border-[#0c5505] transition-all bg-gray-50 focus:bg-white text-left"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full sm:w-auto mt-3 flex items-center justify-center gap-2 bg-[#0c5505] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#0a4304] transition-colors disabled:opacity-70"
        >
          <Save size={18} />
          {saving ? "در حال ذخیره..." : "ذخیره تغییرات"}
        </button>
      </form>
    </UserPanelLayout>
  );
};

export default Profile;

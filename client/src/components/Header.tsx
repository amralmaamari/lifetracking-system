"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { ChallangeMenu } from "./navbar/ChallangeMenu";
import { AlertMenu } from "./navbar/AlertMenu";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="p-4 flex flex-col gap-2 lg:flex-row lg:gap-0 justify-between items-center  shadow-sm bg-white">
      <h1 className="text-xl font-extrabold tracking-tight">
        NEWLIFE <span className="text-sm font-mono tracking-wide">Tracker</span>
      </h1>

      <nav className="flex flex-wrap justify-center gap-2 items-center space-x-2">
        <Link href="/">
          <Button variant="ghost">Home</Button>
        </Link>
        <Link href="/article">
          <Button variant="ghost">Articles</Button>
        </Link>
          <Link href="/task">
          <Button variant="ghost">Tasks</Button>
        </Link>

    
        
        <AlertMenu />
        <ChallangeMenu />

        {user ? (
  <div className="relative group inline-block text-right">
    {/* الزر الرئيسي */}
    <div className="bg-amber-300 px-4 py-2 rounded-lg shadow-md cursor-pointer hover:bg-amber-400 transition" dir="rtl">
      <span className="text-sm font-semibold text-gray-800">👋 {user.fullName}</span>
    </div>

    {/* القائمة المنسدلة */}
    <div
      className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-20 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200"
      dir="rtl"
    >
      <div className="px-4 py-3 text-sm text-gray-700">مرحباً، {user.fullName}</div>
      <div className="border-t border-gray-100" />
      <div className="px-4 py-2">
        <button
          onClick={logout}
          className="w-full bg-red-500 hover:bg-red-600 text-white text-sm py-1 px-3 rounded transition"
        >
          تسجيل الخروج
        </button>
      </div>
    </div>
  </div>
)

 : (
          <Link href="/login">
            <Button variant="outline">Login</Button>
          </Link>
        )}
      </nav>
    </header>
  );
}

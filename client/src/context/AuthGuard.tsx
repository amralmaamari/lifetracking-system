'use client';

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/auth-context";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!isLoggedIn && pathname !== "/login") {
      router.push("/login");
    } else {
      setChecked(true);
    }
  }, [isLoggedIn, pathname]);

  // ✅ Allow showing login page
  if (!isLoggedIn && pathname === "/login") {
    return children; // السماح بعرض صفحة تسجيل الدخول
  }

  // ✅ Prevent flash of children when redirecting
  if (!checked) {
    return <p className="text-center p-8 text-gray-500">جاري التحقق...</p>;
  }

  return <>{children}</>;
}

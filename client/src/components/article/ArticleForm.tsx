"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Tiptap from "./Tiptap";
import useFetch from "@/hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";

interface CreateArticleFormProps {
  articleId?: string;
}

export default function CreateArticleForm({ articleId }: CreateArticleFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { data, error, loading } = useFetch({ url: `/Article/${articleId}` });
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // ✅ تعبئة البيانات إذا كان تعديل
  useEffect(() => {
    if (data) {
      setTitle(data.title || "");
      setContent(data.description || "");
    }
  }, [data]);

  const handleSubmit = async () => {
    // ✅ التحقق من الحقول المطلوبة
    if (!title.trim() || !content.trim()) {
      toast.error("❌ الرجاء تعبئة كل الحقول.");
      return;
    }

    try {
      let response;

      const payload = {
        title: title.trim(),
        description: content.trim(),
      };

      if (articleId) {
        // ✅ تحديث المقال
        response = await axios.put(`${apiUrl}/Article/${articleId}`, {
          articleId,
          ...payload
        });
        toast.success("✅ تم تحديث المقالة!");
      } else {
        // ✅ إنشاء مقال جديد
        response = await axios.post(`${apiUrl}/Article`, {
          ...payload,
          userID: 1, // يمكنك استبداله بـ userId ديناميكي
        });
        toast.success("✅ تم إنشاء المقالة!");
        router.push(`/article/edit?id=${response.data.data.articleID}`);
      }

    } catch (error: any) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message || error.message
        : "حدث خطأ غير متوقع.";

      toast.error(`❌ فشل العملية: ${message}`);
    }
  };

  return (
    <form className="space-y-4 bg-white p-6 rounded-xl shadow" onSubmit={(e) => e.preventDefault()}>
      <h1 className="text-xl font-bold" dir="rtl">
        {articleId ? "تعديل المقالة" : "إنشاء مقالة جديدة"}
      </h1>

      <Input
        dir="rtl"
        placeholder="عنوان المقالة"
        className="my-3"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Tiptap value={content} onChange={setContent} />

      <Button type="submit" onClick={handleSubmit}>
        {articleId ? "تحديث" : "إنشاء"}
      </Button>
    </form>
  );
}

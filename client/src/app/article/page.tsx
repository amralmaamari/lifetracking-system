"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ArticleCard from "@/components/article/ArticleCard";
import useFetch from "@/hooks/useFetch";
import Loading from "@/components/Loading";

export default function Page() {

    const {
      data: articles,        // مختصر وواضح
      error: articlesError,  // لتحديد نوع الخطأ
      loading: isLoadingArticles // أفضل توصيف للبوول
    } = useFetch({ url: `/Article` });

    
     if (isLoadingArticles || !articles) {
        return (
         <Loading message="جاري تحميل المهمة..." />
        );
      }
  return (
    <>
      <main className="p-8 bg-gray-50 min-h-screen">
    {!isLoadingArticles && articlesError && <h2>{articlesError}</h2>}
    {!articlesError && articles &&
    articles.map((article) => (
      
      <ArticleCard
            key={article.articleId}
            id={article.articleId}
            title={article.title}
            content={article.description}
          />
      
        ))
      }
        
      </main>

      <div className="fixed bottom-6 right-6 z-50 ">
        <Link href="article/new">
          <Button
            variant="default"
            size="icon"
            className="rounded-full w-14 h-14 shadow-lg  text-white"
          >
            <Plus className="w-6 h-6" />
          </Button>
        </Link>
      </div>
    </>
  );
}

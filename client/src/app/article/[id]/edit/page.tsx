'use client';
import { useParams } from 'next/navigation';
import CreateArticleForm from '@/components/article/ArticleForm';

export default function Page() {
  const params = useParams();
  const idParam = params.id;

  // نحاول تحويله إلى string واحد فقط
  const articleId = Array.isArray(idParam) ? idParam[0] : idParam;

  return (
    <div className="mt-3">
      <CreateArticleForm articleId={articleId} />
    </div>
  );
}

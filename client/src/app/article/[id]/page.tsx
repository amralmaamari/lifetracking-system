"use client"
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/useFetch";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams();
  const { data, error, loading } = useFetch({ url: `/Article/${id}` });
  
  
  if (loading || !data) {
    return (
     <Loading message="جاري تحميل المقالة..." />
    );
  }
  return (
    <>
      {loading && <h2>Loading...</h2>}
      {!loading && error && <h2>{error}</h2>}
      {!error && data && (
        <div className="max-w-3xl mx-auto p-6" dir="rtl">
          <div className="flex justify-between">
          <h1 className="text-2xl font-bold">{data.title}</h1>

            <Link href={`/challenge/new`}>
              <Button>انشاء مهام</Button>
            </Link>
          </div>

          <div
             className="text-gray-800 leading-relaxed "
            dir="rtl"
              dangerouslySetInnerHTML={{ __html: data.description }}
            />
         
        </div>
      )}
    </>
  );
}

'use client';

import { useRouter } from 'next/navigation';
import useFetch from '@/hooks/useFetch';
import ShowChallengeCard from '@/components/challenge/ShowChallengeCard';
import { Button } from '@/components/ui/button';

const ChallengeListPage = () => {
  const router = useRouter();
  const { data, error, loading } = useFetch({ url: `/Challenge` });

  const challenges = data || [];

  return (
    <div className="p-6 space-y-4 max-w-6xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-700">🏆 All Challenges</h1>
        <Button variant="outline" onClick={() => router.push(`/challenge/new`)}>
          ➕ New Challenge
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading && (
          <p className="text-gray-500 animate-pulse bg-gray-100 rounded p-4 col-span-full text-center">
            Loading challenges...
          </p>
        )}

        {challenges &&
          challenges.map((challenge: any) => (
            <ShowChallengeCard
              key={challenge.challengeId}
              articleId={challenge.articleId}
              challengeId={challenge.challengeId}
              userId={challenge.userId} 
              title={challenge.title}
              description={challenge.description.slice(0, 15) + '...'}
              startDate={challenge.startDate}
              endDate={challenge.endDate}
              createdAt={challenge.createdAt}
              updatedAt={challenge.updatedAt}
            />
          ))}
      </div>
    </div>
  );
};

export default ChallengeListPage;

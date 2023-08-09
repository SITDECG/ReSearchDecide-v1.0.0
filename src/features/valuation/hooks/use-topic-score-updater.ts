import { useState } from 'react';
import { updateTopicScoreByTopic } from '../../../api/topicsScore';

export const useTopicScoreUpdater = () => {
  const [isUpdating, setIsUpdating] = useState(false);

  const updateTopicScore = async (title: string, newScore: number) => {
    setIsUpdating(true);
    try {
      await updateTopicScoreByTopic(title, newScore);
    } catch (error) {
      console.log('Error updating topic score:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return { updateTopicScore };
};


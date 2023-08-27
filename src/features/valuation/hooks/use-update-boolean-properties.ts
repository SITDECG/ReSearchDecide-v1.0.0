import { useState } from 'react';
import { updateBooleanProperties } from '../../../api/topicsScore'
import { TopicScore } from '../../../model/TopicScore';

export const useUpdateBooleanProperties = () => {
  const [isLoading, setIsLoading] = useState(false);

  const updateProperties = async (title: string, propertiesToUpdate: Partial<TopicScore>) => {
    setIsLoading(true);
    try {
      await updateBooleanProperties(title, propertiesToUpdate);
    } catch (error) {
      console.error('Error updating properties:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return { updateProperties };
};

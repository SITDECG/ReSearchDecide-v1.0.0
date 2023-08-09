import { useState, useEffect } from 'react';
import { getTopicsScore} from '../../../api/topicsScore';
import { TopicScore } from '../../../model/TopicScore';


export const useTopicsScore = () => {
  const [topics, setTopics] = useState<TopicScore[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const topics = await getTopicsScore();
        setTopics(topics);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);
  return { topics };
};


import { useState, useEffect } from 'react';
import { getTopics, updateTopicOrder } from '../../../api/topics';
import { Topic } from '../../../model/Topic';


export const useTopics = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const topics = await getTopics();
        setTopics(topics);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  // const updateTopic = async (newOrder: string[]) => {
  //   try {
  //     await updateTopicOrder(newOrder);
  //   } catch (error) {
  //     console.log('Error updating topic order:', error);
  //   }
  // };
  return { topics };
};


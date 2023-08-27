import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { TopicScore } from '../model/TopicScore';

  export const getTopic = async (topicId: string): Promise<any> => {
    try {
      const doc = await firebase.firestore().collection('topics').doc(topicId).get();
      if (doc.exists) {
        return doc.data();
      } else {
        console.log('Topic not found');
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  export const getTopicsScore = async (): Promise<TopicScore[]> => {
    try {
      const auxTopics: TopicScore[] = [];
      const snapshot = await firebase.firestore().collection('topicsScore').orderBy("score","asc").get();
      const topics = snapshot.docs.map((doc) => doc.data());
      topics.forEach((topic) => {
        const auxTopic: TopicScore = {
          id: topic.id,
          topic: topic.topic,
          score: topic.score,
          attractive: topic.attractive,
          novel: topic.novel,
          trend: topic.trend,
          obsolete: topic.obsolete,
          unfamiliar: topic.unfamiliar,
        };
        auxTopics.push(auxTopic);
      });
      return auxTopics;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  export const getTopicsScoreRealTime = async (): Promise<TopicScore[]> => {
    try {
      const auxTopics: TopicScore[] = [];
      const snapshot = await firebase.firestore().collection('topicsScore').orderBy("score","asc").onSnapshot((querySnapshot) => {
        const topics = querySnapshot.docs.map((doc) => doc.data());
        topics.forEach((topic) => {
          const auxTopic: TopicScore = {
            id: topic.id,
            topic: topic.topic,
            score: topic.score,
            attractive: topic.attractive,
            novel: topic.novel,
            used: topic.used,
            modest: topic.modest,
          };
          auxTopics.push(auxTopic);
        });
      });
      return auxTopics;
    } catch (error) {
      console.log(error);

      return [];
    }
  };
  


  export const updateTopicScoreById = async (topicId: string, score: number): Promise<void> => {
    try {
      await firebase.firestore().collection('topicsScore').doc(topicId).update({
        score: score,
      });
    } catch (error) {
      console.log(error);
    }
  }

  export const updateTopicScoreByTopic = async (title: string, newScore: number): Promise<void> => {
    try {
      const topicRef = firebase.firestore().collection('topicsScore');
      const querySnapshot = await topicRef.where('topic', '==', title).get();
  
      if (!querySnapshot.empty) {
        const topicDoc = querySnapshot.docs[0];
        const currentScore = topicDoc.data().score || 0;
        const updatedScore = currentScore + newScore;
        await topicDoc.ref.update({ score: updatedScore });
      }
    } catch (error) {
      console.log('Error updating topic score:', error);
    }
  };

  export const updateBooleanProperties = async (title: string, propertiesToUpdate: Partial<TopicScore>): Promise<void> => {
    try {
      const topicRef = firebase.firestore().collection('topicsScore');
      const querySnapshot = await topicRef.where('topic', '==', title).get();
  
      if (!querySnapshot.empty) {
        const topicDoc = querySnapshot.docs[0];
        await topicDoc.ref.update(propertiesToUpdate);
      }
    } catch (error) {
      console.log('Error updating boolean properties:', error);
    }
  };
  

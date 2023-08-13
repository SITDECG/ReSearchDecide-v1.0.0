import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { getCurrentUser, getDBUserByUid } from './user';
import { Group } from "../model/Group";
import { Member } from "../model/Member";
import { onSnapshot } from 'firebase/firestore';
import { TopicScore } from '../model/TopicScore';
const db = firebase.firestore();
const colTopicScore = db.collection("topicsScore");

export const getTopicsScoreRealTime = (updateCallback: (data: TopicScore[]) => void) => {
    const unsubscribe = onSnapshot(colTopicScore, (querySnapshot) => {
      const topics: TopicScore[] = [];
      querySnapshot.forEach((doc) => {
        topics.push(doc.data() as TopicScore);
      });
  
      // Encuentra el TopicScore con el mayor score
      let maxScoreTopic: TopicScore | null = null;
      let minScoreTopic: TopicScore | null = null;
  
      topics.forEach((topic) => {
        if (!maxScoreTopic || topic.score > maxScoreTopic.score) {
          maxScoreTopic = topic;
        }
  
        if (!minScoreTopic || topic.score < minScoreTopic.score) {
          minScoreTopic = topic;
        }
      });
  
      // Agrega los TopicScore con el mayor y menor score a topicsAux
      const topicsAux: TopicScore[] = [];
      if (maxScoreTopic) {
        topicsAux.push(maxScoreTopic);
      }
      if (minScoreTopic) {
        topicsAux.push(minScoreTopic);
      }
  
      updateCallback(topicsAux);
    });
  
    return unsubscribe;
  };
  
  





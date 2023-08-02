import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { Topic } from './topicInterface';

// export const getTopics = async (): Promise<any> => {
//     try {
//       const snapshot = await firebase.firestore().collection('topics').get();
//       const topics = snapshot.docs.map((doc) => doc.data());
//       return topics;
//     } catch (error) {
//       console.log(error);
//       return [];
//     }
//   };

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

  // export const getTopics = async (): Promise<Topic[]> => {
  //   const topics: Topic[] = [];
  //   try {
  //     const snapshot = await firebase.firestore().collection('topics').get();
  //     snapshot.forEach((doc) => {
  //       const topicData = doc.data();
  //       const topic: Topic = {
  //         id: topicData.id,
  //         topics: topicData.topics,};
  //       topics.push(topic);});
  //     console.log(topics);
  //     return topics;
  //   } catch (error) {
  //     console.log(error);
  //     return [];
  //   }
  // };

  export const getTopics = async (): Promise<Topic[]> => {
    try {
      const auxTopics: Topic[] = [];
      const snapshot = await firebase.firestore().collection('topics').get();
      const topics = snapshot.docs.map((doc) => doc.data());
      topics.forEach((topic) => {
        const auxTopic: Topic = {
          id: topic.id,
          topic: topic.topic,
        };
        auxTopics.push(auxTopic);
      });
      return auxTopics;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  export const updateTopicOrder = async (newOrder: string[]): Promise<void> => {
    try {
      await firebase.firestore().collection('topics').doc('ORDER').set({ order: newOrder });
    } catch (error) {
      console.log(error);
    }
  };
  
  // Función para actualizar la lista de strings en Firebase
  export const updateTopics = async (topics: string[]): Promise<void> => {
    try {
      const batch = firebase.firestore().batch();
      const collectionRef = firebase.firestore().collection('topics');
      
      // Obtener todas las referencias de documentos en la colección 'topics'
      const snapshot = await collectionRef.get();
      snapshot.forEach((doc) => {
        const docRef = collectionRef.doc(doc.id);
        batch.delete(docRef);
      });
  
      // Crear nuevos documentos con los strings actualizados
      topics.forEach((topic) => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, { title: topic });
      });
  
      // Ejecutar la operación batch para eliminar los documentos anteriores y agregar los nuevos
      await batch.commit();
    } catch (error) {
      console.log(error);
    }
  };
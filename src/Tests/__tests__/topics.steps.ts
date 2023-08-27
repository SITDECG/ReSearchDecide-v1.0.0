// import { defineFeature, loadFeature } from 'jest-cucumber';
// import { expect } from 'chai';
// import { getTopics } from '../../api/topics';
// import { getTopicsScore, updateBooleanProperties, updateTopicScoreByTopic, } from '../../api/topicsScore';
// import sinon from 'sinon';
// import { TopicScore } from '../../model/TopicScore';
// import { Linking } from 'react-native';

// const feature = loadFeature('../../../../../SITDECG/ReSearchDecide-v1.0.0/src/Tests/__features__/topics.feature');

// defineFeature(feature, (test) => {
//   // let getCollectionStub: sinon.SinonStub;
//   let orderByStub: sinon.SinonStub;
//   let getStub: sinon.SinonStub;
//   let whereStub: sinon.SinonStub;
//   let updateStub: sinon.SinonStub;
//   let openURLStub: sinon.SinonStub;
//   let reorderStub: sinon.SinonStub;
//   beforeEach(() => {
//     // getCollectionStub = sinon.stub().returns({
//     //   get: sinon.stub(),
//     // });
//     // sinon.stub(require('firebase/compat/app'), 'firestore').returns({
//     //   collection: getCollectionStub,
//     // });
//   });

//   afterEach(() => {
//     // sinon.restore();
//   });

//   test('Getting topics when topics are available', ({ given, when, then }) => {
//     // let getStub: sinon.SinonStub;

//     given('there are topics available', () => {
//       // getStub = sinon.stub().resolves({
//       //   docs: [
//       //     { data: () => ({ id: 'topic1', topic: 'Topic 1' }) },
//       //     { data: () => ({ id: 'topic2', topic: 'Topic 2' }) },
//       //   ],
//       // });
//       // getCollectionStub.returns({
//       //   get: getStub,
//       // });
//     });

//     when('the function getTopics is called', async () => {
//       // await getTopics();
//     });

//     then('it should return a list of topics', () => {
//       // expect(getStub.calledOnce).to.be.true;
//     });
//   });

//   beforeEach(() => {
//     getStub = sinon.stub().resolves({
//       docs: [
//         { data: () => ({ id: 'topic1', topic: 'Topic 1', score: 10 }) },
//         { data: () => ({ id: 'topic2', topic: 'Topic 2', score: 5 }) },
//       ],
//     });
//     orderByStub = sinon.stub().returns({
//       get: getStub,
//     });
//     getCollectionStub = sinon.stub().returns({
//       orderBy: orderByStub,
//     });
//     sinon.stub(require('firebase/compat/app'), 'firestore').returns({
//       collection: getCollectionStub,
//     });
//   });

//   afterEach(() => {
//     sinon.restore();
//   });

//   test('Getting a list of topic scores ordered by score ascending', ({ given, when, then }) => {
//     given('there are topic scores available', () => {
//     });

//     when('the function getTopicsScore is called', async () => {
//       await getTopicsScore();
//     });

//     then('it should return a list of topic scores ordered by score ascending', () => {
//       expect(orderByStub.calledOnceWith('score', 'asc')).to.be.true;
//     });
//   });

//   beforeEach(() => {
//     updateStub = sinon.stub().resolves();
//     getStub = sinon.stub().resolves({
//       docs: [{ data: () => ({ id: 'topic1', topic: 'Topic 1', score: 10 }) }],
//     });
//     whereStub = sinon.stub().returns({
//       get: getStub,
//     });
//     getCollectionStub = sinon.stub().returns({
//       where: whereStub,
//     });
//     sinon.stub(require('firebase/compat/app'), 'firestore').returns({
//       collection: getCollectionStub,
//     });
//   });

//   afterEach(() => {
//     sinon.restore();
//   });

//   test('Updating the score of an existing topic', ({ given, when, then }) => {
//     let currentScore: number;

//     given('there is a topic with title "Topic 1" and score 10', () => {
//       currentScore = 10;
//     });

//     when('the function updateTopicScoreByTopic is called with title "Topic 1" and new score 5', async () => {
//       await updateTopicScoreByTopic('Topic 1', 5);
//     });

//     then('the score of the topic "Topic 1" should be updated to 15', async () => {
//       expect(whereStub.calledOnceWith('topic', '==', 'Topic 1')).to.be.true;
//       expect(updateStub.calledOnceWith({ score: currentScore + 5 })).to.be.true;
//     });
//   });

//   beforeEach(() => {
//     updateStub = sinon.stub().resolves();
//     getStub = sinon.stub().resolves({
//       docs: [{ data: () => ({ id: 'topic1', topic: 'Topic 1', attractive: true, novel: false }) }],
//     });
//     whereStub = sinon.stub().returns({
//       get: getStub,
//     });
//     getCollectionStub = sinon.stub().returns({
//       where: whereStub,
//     });
//     sinon.stub(require('firebase/compat/app'), 'firestore').returns({
//       collection: getCollectionStub,
//     });
//   });

//   afterEach(() => {
//     sinon.restore();
//   });

//   test('Updating boolean properties of an existing topic', ({ given, when, then }) => {
//     let initialProperties: Partial<TopicScore>;

//     given('there is a topic with title "Topic 1" and properties attractive=true, novel=false', () => {
//       initialProperties = { attractive: true, novel: false };
//     });

//     when('the function updateBooleanProperties is called with title "Topic 1" and properties to update attractive=false, trend=true', async () => {
//       await updateBooleanProperties('Topic 1', { attractive: false, trend: true });
//     });

//     then('the properties attractive and novel of the topic "Topic 1" should be updated to false and true, respectively', async () => {
//       expect(whereStub.calledOnceWith('topic', '==', 'Topic 1')).to.be.true;
//       expect(updateStub.calledOnceWith({ attractive: false, trend: true })).to.be.true;
//     });
//   });
//   beforeEach(() => {
//     openURLStub = sinon.stub(Linking, 'openURL');
//   });

//   afterEach(() => {
//     sinon.restore();
//   });

//   test('Clicking on a research topic should redirect to Google Scholar', ({ given, when, then }) => {
//     let researchTopic: string;

//     given('a user is viewing a research topic "Topic 1"', () => {
//       researchTopic = 'Topic 1';
//     });

//     when('the user clicks on the research topic', () => {
//       handleTitlePress(researchTopic);
//     });

//     then('the user should be redirected to Google Scholar with the search query "Topic 1"', () => {
//       expect(openURLStub.calledOnceWith('https://scholar.google.com/scholar?q=Topic%201')).to.be.true;
//     });
//   });

//   test('Clicking on multiple research topics should redirect to Google Scholar', ({ given, when, then }) => {
//     let selectedTopics: string[];

//     given('a user is viewing the research topics "Topic 1", "Topic 2", and "Topic 3"', () => {
//       selectedTopics = ['Topic 1', 'Topic 2', 'Topic 3'];
//     });

//     when('the user selects the research topics "Topic 1" and "Topic 3"', () => {
//       selectedTopics = ['Topic 1', 'Topic 3'];
//     });

//     when('the user clicks on the selected research topics', () => {
//       selectedTopics.forEach((topic) => {
//         handleTitlePress(topic);
//       });
//     });

//     then('the user should be redirected to Google Scholar with the search queries "Topic 1" and "Topic 3"', () => {
//       selectedTopics.forEach((topic) => {
//         expect(openURLStub.calledWith(`https://scholar.google.com/scholar?q=${encodeURIComponent(topic)}`)).to.be.true;
//       });
//     });
//   });

//   function handleTitlePress(topic: string) {
//     throw new Error('Function not implemented.');
//   }

//   beforeEach(() => {
//     reorderStub = sinon.stub(reorderResearchTopics);
//   });

//   afterEach(() => {
//     sinon.restore();
//   });

//   test('User can reorder research topics using drag and drop', ({ given, when, and, then }) => {
//     given('a user is on the research topics ranking page', () => {
//       // Nada que hacer aquí, es la configuración inicial del escenario
//     });

//     when('the user arranges the research topics in the desired order', () => {
//       // Simular el proceso de arrastrar y soltar los tópicos en el orden deseado
//     });

//     and('the user saves the new order', () => {
//       // Simular el proceso de guardar el nuevo orden de prioridad
//       reorderStub.returns(true); // Simular éxito al reordenar
//     });

//     then('the research topics should be reordered as per user\'s preference', () => {
//       expect(reorderStub.calledOnce).to.be.true;
//     });
//   });
// });
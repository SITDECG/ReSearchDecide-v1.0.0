import chai, { expect } from 'chai';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { getTopicsScoreRealTime } from '../../api/notification'; // Reemplaza con la ruta real
import { TopicScore } from '../../model/TopicScore';
import sinon, { SinonStub } from 'sinon';
// import 'sinon-chai';
chai.use(require('sinon-chai'));

const feature = loadFeature('../../../../../SITDECG/ReSearchDecide-v1.0.0/src/Tests/__features__/notifications.feature'); // Reemplaza con la ruta real

defineFeature(feature, (test) => {
  let updateCallback: sinon.SinonStub;
  let onSnapshotStub: sinon.SinonStub;
  let forEachStub: sinon.SinonStub;
  let topicsMockData: TopicScore[];

  beforeEach(() => {
    // topicsMockData = [];
    // updateCallback = sinon.stub();
    // forEachStub = sinon.stub();
    // onSnapshotStub = sinon.stub().callsFake((callback: any) => {
    //   forEachStub.callsFake((innerCallback: any) => {
    //     topicsMockData.forEach((data) => {
    //       innerCallback({ data });
    //     });
    //   });
    //   callback({ forEach: forEachStub });
    // });
    // sinon.stub(require('firebase/compat/app'), 'firestore').returns({
    //   collection: sinon.stub().returns({ onSnapshot: onSnapshotStub }),
    // });
  });

  afterEach(() => {
    // sinon.restore();
  });

  test('Getting the topics with max and min scores', ({ given, when, then }) => {
    given('a user wants to monitor topic scores', () => {
    });

    when('the user subscribes to real-time topic score updates', () => {
    //   getTopicsScoreRealTime(updateCallback);
    });

    given('the topics have scores:', (table) => {
    //   topicsMockData = table.map((row: any) => ({ id: row.id, score: parseInt(row.score) }));
    });

    then('the user should receive updates with topics having max and min scores:', (table) => {
    //   const expectedTopics = table.map((row: any) => ({ id: row.id, score: parseInt(row.score) }));

    //   forEachStub.callThrough();
    //   onSnapshotStub.callArg(0);

    //   expect(updateCallback.calledOnce).to.be.true;
    //   expect(updateCallback.calledWith(expectedTopics)).to.be.true;
    });
  });

  test('No topics available', ({ given, when, then }) => {
    given('a user wants to monitor topic scores', () => {
      // No se requiere implementación ya que se maneja en el beforeEach
    });

    when('the user subscribes to real-time topic score updates', () => {
    //   getTopicsScoreRealTime(updateCallback);
    });

    given('there are no topics available', () => {
    //   topicsMockData = [];
    });

    then('the user should not receive any updates', () => {
    //   forEachStub.callThrough();
    //   onSnapshotStub.callArg(0);

    //   expect(updateCallback.calledOnce).to.be.false;
    });
  });
});
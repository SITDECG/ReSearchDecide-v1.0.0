// import { defineFeature, loadFeature } from 'jest-cucumber';
// import { expect } from 'chai';
// import { Member } from '../../model/Member';
// import { getMemberByUserId, updateMemberVote } from '../../api/user';
// import sinon from 'sinon';
// const feature = loadFeature('../../../../../SITDECG/ReSearchDecide-v1.0.0/src/Tests/__features__/members.feature');
// chai.use(require('sinon-chai'));

// defineFeature(feature, (test) => {
//   let result: Member | null;
//   let memberRefStub: sinon.SinonStub;

//   test('Getting a member with valid userId and id', ({ given, when, then }) => {
//     given('a member with userId "validUserId" and id "validId"', () => {
//     });

//     when('the function getMemberByUserId is called', async () => {
//       // result = await getMemberByUserId("validUserId", "validId");
//     });

//     then('the result should be a Member object', () => {
//       // expect(result).toBeInstanceOf(Member);
//     });
//   });

//   test('Getting a member with invalid userId', ({ given, when, then }) => {
//     given('a member with userId "invalidUserId" and id "validId"', () => {
//     });

//     when('the function getMemberByUserId is called', async () => {
//       // result = await getMemberByUserId("invalidUserId", "validId");
//     });

//     then('the result should be null', () => {
//       // expect(result).toBeNull();
//     });
//   });

//   test('Getting a member with invalid id', ({ given, when, then }) => {
//     given('a member with userId "validUserId" and id "invalidId"', () => {
//     });

//     when('the function getMemberByUserId is called', async () => {
//       // result = await getMemberByUserId("validUserId", "invalidId");
//     });

//     then('the result should be null', () => {
//       // expect(result).toBeNull();
//     });
//   });

//   beforeEach(() => {
//     memberRefStub = sinon.stub().returns({
//       where: sinon.stub().returnsThis(),
//       get: sinon.stub(),
//     });
//     sinon.stub(require('firebase/compat/app'), 'firestore').returns({
//       collection: sinon.stub().returns(memberRefStub),
//     });
//   });

//   afterEach(() => {
//     sinon.restore();
//   });

//   test('Updating member\'s vote with valid uid and id', ({ given, when, then }) => {
//     let querySnapshotStub: sinon.SinonStub;
//     let updateStub: sinon.SinonStub;

//     given('a member with uid "validUid" and id "validId"', () => {
//       // querySnapshotStub = sinon.stub().returns({
//       //   empty: false,
//       //   docs: [{
//       //     ref: { update: updateStub },
//       //   }],
//       // });
//       // memberRefStub.where.returnsThis();
//       // memberRefStub.get.returns(querySnapshotStub);
//     });

//     when('the function updateMemberVote is called with new vote true', async () => {
//       // updateStub = sinon.stub();
//       // await updateMemberVote('validUid', true, 'validId');
//     });

//     then('the member\'s vote should be updated to true', () => {
//       // expect(updateStub.calledOnceWith({ vote: true })).to.be.true;
//     });
//   });
// });


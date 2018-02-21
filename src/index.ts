import * as fileHelpers from './fileHelpers';
import * as faceHelpers from './FaceHelpers';

const personGroupId = 'myfriends';

// Step 1: create personGroup here
// faceHelpers.createPersonGroup(personGroupId).then(result => {
//     if (result === personGroupId) {
//         console.log('person group created');
//         const friends = fileHelpers.getFriends('Data');
//         friends.forEach(friend => {
//             faceHelpers.createPerson(personGroupId, friend).then(result => {
//                 const personId = result;
//                 console.log(`Created personId: ${result} for person: ${friend}`)
//                 const friendPictures = fileHelpers.getFriendPictures(friend);
//                 friendPictures.forEach(friendPicture => {
//                     const friendFaceFileName = __dirname + '/Data/' + friend + '/' + friendPicture;
//                     faceHelpers.addPersonFace(
//                         friendFaceFileName,
//                         personId,
//                         personGroupId
//                     ).then(result => {
//                         console.log(`For personId: ${result} person: ${friend} added face: ${friendPicture} got persistedFaceId: ${result}`);
//                     });
//                 });
//             });
//         });
//     }
// });

// Step 2: Train person group
// faceHelpers.trainPersonGroup(personGroupId).then(result => {
//     if (result) console.log('personGroup trained');
// });

// Step 3: Detecting and identifying a person
// faceHelpers.detectFace('./input.jpg').then(faceId => {
//     faceHelpers.identifyPerson(personGroupId, faceId).then(result => {
//         console.log('Input recognized as: ' + result);
//     });
// });

// Step 4: Delete the group
// faceHelpers.deletePersonGroup(personGroupId).then(result => {
//     if (result) console.log('person group deleted');
//     else console.log('error deleting theg group');
// });

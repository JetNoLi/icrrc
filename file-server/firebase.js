const admin = require("firebase-admin");
const serviceAccount = require("./icrrc-15ea4-firebase-adminsdk-gautl-01e0d7dca5.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const folderCollection = db.collection('folders');
const fileCollection = db.collection('files');

module.exports = {
    db,
    folderCollection,
    fileCollection
}
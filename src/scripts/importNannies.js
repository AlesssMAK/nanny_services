import admin from 'firebase-admin';
import fs from 'fs';

const serviceAccount = JSON.parse(
  fs.readFileSync('./scripts/serviceAccountKey.json', 'utf8')
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const nannies = JSON.parse(
  fs.readFileSync('./src/data/babysitters.json', 'utf8')
);

async function importData() {
  const batch = db.batch();

  nannies.forEach(nanny => {
    const ref = db.collection('nannies').doc();
    batch.set(ref, {
      ...nanny,
      createdAt: Date.now(),
    });
  });

  await batch.commit();
  console.log('Nannies imported:', nannies.length);
}

importData();

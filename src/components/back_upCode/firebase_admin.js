import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

export const Register = functions.auth.user().onCreate(async (user) => {
  const customClaims = {
    "https://hasura.io/jwt/claims": {
      "x-hasura-default-role": "user",
      "x-hasura-allowed-roles": ["user", "admin"],
      "x-hasura-user-id": user.uid,
      "x-hasura-org-id": "456",
      "x-hasura-custom": "custom-value"
    }
  };

  try {
    await admin.auth().setCustomUserClaims(user.uid, customClaims);
    console.log(`Custom claims set for user: ${user.uid}`);
  } catch (error) {
    console.error(`Error setting custom claims: ${error}`);
  }
});
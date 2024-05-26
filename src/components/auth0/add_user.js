// adduser.js
import { useMutation } from '@vue/apollo-composable'
import { gql } from '@apollo/client/core';

const ADD_USER = gql`
  mutation addUser($id: String!, $email: String!, $password: String!) {
    insert_user(objects: { id: $id, email: $email, password: $password }) {
      affected_rows
    }
  }
`;

export function useAddUser() {
  const { mutate: addUser, onDone, onError } = useMutation(ADD_USER);

  const signUpUser = async (userId, email, password) => {
    console.log('Sign up start');
    try {
      await addUser({ variables: { id: userId, email, password } });
      console.log('User added to Hasura successfully');
    } catch (error) {
      console.error('Error occurred while signing up:', error);
    }
  };

  return { signUpUser, onDone, onError };
}
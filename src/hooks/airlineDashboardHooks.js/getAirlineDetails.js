import { useQuery, gql } from "@apollo/client";

// 1. Store Graphql query "schema" in a variable // NOTE: the convention is writing variable in snake case
// 2. Create a custom hook that returns Query data, error and loading paramswith the gql quey variable as argument

const GET_AIRLINE_DETAILS = gql`
    query GetUserDetails($id: ID!) {
        airline(id: $id) {
            name
            id
            image
            episode {
                name
                episode
            }
        }
    }
`;

export const useGetCharacter = (id) => {
    const { data, error, loading } = useQuery(GET_AIRLINE_DETAILS, {
        variables: {
            id,
        },
    });

    return {
        data,
        error,
        loading,
    };
};

import gql from 'graphql-tag';

const listRecipes = gql`
	query {
		listRecipes {
			items {
				id
				name
				directions
				ingredients
			}
		}
	}
`;

const createRecipe = gql`
	mutation createRecipe($name: String!, $ingredients: [String!]!, $directions: [String!]!) {
		createRecipe(input: { name: $name, ingredients: $ingredients, directions: $directions }) {
			name
			ingredients
			directions
		}
	}
`;

const onCreateRecipe = gql`
	subscription onCreateRecipe {
		onCreateRecipe {
			id
			name
			ingredients
			directions
		}
	}
`;

export { listRecipes, createRecipe, onCreateRecipe };

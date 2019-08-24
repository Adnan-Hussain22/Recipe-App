import React, { useState, useEffect } from 'react';
import './App.css';
import { graphql, compose } from 'react-apollo';
import { buildSubscription } from 'aws-appsync';
import { listRecipes, createRecipe, onCreateRecipe } from './graphql';
const App = (props) => {
	const [ name, setName ] = useState('');
	const [ ingredient, setIngredient ] = useState('');
	const [ direction, setDirection ] = useState('');
	const [ ingredients, setIngredients ] = useState([]);
	const [ directions, setDirections ] = useState([]);

	useEffect(() => {
		props.subscribeOnCreateRecipe(buildSubscription(onCreateRecipe, listRecipes));
	}, []);

	const handleAddRecipe = () => {
		if (!(name && ingredients.length && directions.length)) return;
		const obj = {
			name,
			ingredients,
			directions
		};
		props.addRecipe(obj);
		setName('');
		setDirection('');
		setIngredient('');
		setDirections([]);
		setIngredients([]);
	};

	return (
		<div className="App" style={styles.container}>
			<h1>Recipes</h1>
			<ul>
				{props.recipes.map((value, index) => (
					<li key={index}>
						<p>{value.name}</p>
					</li>
				))}
			</ul>
			<input
				value={name}
				style={styles.input}
				placeholder="Recipe Name"
				onChange={(e) => {
					setName(e.target.value);
				}}
			/>
			<input
				value={ingredient}
				style={styles.input}
				placeholder="Ingredient"
				onChange={(e) => {
					setIngredient(e.target.value);
				}}
			/>
			<button
				style={styles.button}
				onClick={() => {
					if (!ingredient) return;
					setIngredients(ingredients.concat(ingredient));
					setIngredient('');
				}}
			>
				Add Ingredient
			</button>
			<input
				value={direction}
				style={styles.input}
				placeholder="Direction"
				onChange={(e) => {
					setDirection(e.target.value);
				}}
			/>
			<button
				style={styles.button}
				onClick={() => {
					if (!directions) return;
					setDirections(directions.concat(direction));
					setDirection('');
				}}
			>
				Add Direction
			</button>
			<button style={styles.button} onClick={handleAddRecipe}>
				Add Recipe
			</button>
		</div>
	);
};

const styles = {
	container: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	input: {
		border: 'none',
		fontSize: 22,
		height: 50,
		width: 300,
		borderBottom: '2px solid blue',
		margin: 10,
		outline: 'none'
	},
	button: {
		height: 50,
		width: 450
	}
};

export default compose(
	graphql(listRecipes, {
		options: {
			fetchPolicy: 'cache-and-network'
		},
		props: (props) => ({
			recipes: props.data.listRecipes ? props.data.listRecipes.items : [],
			subscribeOnCreateRecipe: props.data.subscribeToMore
		})
	}),
	graphql(createRecipe, {
		props: (props) => ({
			addRecipe: (recipe) =>
				props.mutate({
					variables: recipe
				})
		})
	})
)(App);

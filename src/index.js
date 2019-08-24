import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AWSAppSyncClient from 'aws-appsync';
import { Rehydrated } from 'aws-appsync-react';
import { ApolloProvider as Provider } from 'react-apollo';
import config from './aws-exports';

const client = new AWSAppSyncClient({
	url: config.aws_appsync_graphqlEndpoint,
	region: config.aws_appsync_region,
	auth: {
		type: config.aws_appsync_authenticationType,
		apiKey: config.aws_appsync_apiKey
	}
});
const WithProvider = () => (
	<Provider client={client}>
		<Rehydrated>
			<App />
		</Rehydrated>
	</Provider>
);

ReactDOM.render(<WithProvider />, document.getElementById('root'));

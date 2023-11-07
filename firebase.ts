import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyDsWkmXqVypk3V5jN8kAXczlMXkTXnHmw0',
	authDomain: 'link-sharing-app-a3954.firebaseapp.com',
	databaseURL: 'https://link-sharing-app-a3954-default-rtdb.firebaseio.com',
	projectId: 'link-sharing-app-a3954',
	storageBucket: 'link-sharing-app-a3954.appspot.com',
	messagingSenderId: '1078015776458',
	appId: '1:1078015776458:web:1aa200954fa44eb8874633',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

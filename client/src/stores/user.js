import axios from "axios";
import { defineStore } from "pinia";

const API_URL = import.meta.env.VITE_API_BASE_URL;
const api = axios.create({
	baseURL: API_URL
});

export const useUserStore = defineStore("user", {
	state: () => {
		const user = localStorage.getItem('user');
		const userData = user ? JSON.parse(user) : null;
		return {
			userId: userData ? userData.userId : null,
			userName: userData ? userData.userName : null,
			token: userData ? userData.token : null,
		};
	},
	actions: {
		async signup(userName) {
			const response = await api.post('/user/auth/', { name: userName });
			const { data } = response.data;
			this.token = data.token;
			this.userId = data.user._id;
			this.userName = data.user.name;

			localStorage.setItem('user', JSON.stringify({
				userId: this.userId,
				userName: this.userName,
				token: this.token
			}));
		},
		async logout() {
			this.userId = null;
			this.userName = null;
			this.token = null;
			localStorage.removeItem('user');
		},
	},
});
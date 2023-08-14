import React, { createContext, useEffect, useState } from "react";
import { cache } from "swr";
import api from "apis/api";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isLoading, setLoading] = useState(true);
	const [isLoggingIn, setLoggingIn] = useState(false);
	const [loginError, setLoginError] = useState(null);

	useEffect(() => {
		cache.clear();
		const initialUser = JSON.parse(window.localStorage.getItem("user"));
		setUser(initialUser);
		setLoading(false);
	}, []);

	const login = async (credentials) => {
		try {
			cache.clear();
			setLoggingIn(true);
			const { data: user } = await api.open.post("/partners/authenticate", credentials);

			window.localStorage.setItem("user", JSON.stringify(user));
			setUser(user);
			setLoggingIn(false);
		} catch (e) {
			setLoggingIn(false);
			setLoginError(e);
			throw e;
		}
	};

	const logout = () => {
		window.localStorage.removeItem("user");
		cache.clear();
		setUser(null);
	};

	return (
		<AuthContext.Provider
			value={{
				user: user && {
					...user
				},
				isLoggingIn: isLoggingIn,
				isLoading,
				login,
				logout,
				loginError,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

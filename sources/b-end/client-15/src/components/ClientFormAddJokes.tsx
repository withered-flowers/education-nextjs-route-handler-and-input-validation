// ?? Step 6 - Membuat Form Add Joke (Client Component) (1)
// Membuat component ClientFormAddJokes
"use client";

import { useRouter } from "next/navigation";
// ? Karena pada component ini kita akan menggunakan tipe data dari React
// ? Maka kita perlu import React, tapi hanya sebagai type saja
import type React from "react";
import { useState } from "react";

const ClientFormAddJokes = () => {
	const navigation = useRouter();

	const initialFormValue = {
		setup: "",
		delivery: "",
	};

	const [formValue, setFormValue] = useState({ ...initialFormValue });

	const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFormValue({
			...formValue,
			[event.target.id]: event.target.value,
		});
	};

	const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const response = await fetch("http://localhost:3001/jokes", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formValue),
		});

		const responseJson = await response.json();
		console.log(responseJson);

		setFormValue({ ...initialFormValue });
		navigation.refresh();
	};

	return (
		<>
			<section className="mt-4 bg-gray-200 p-4 rounded md:max-w-[25vw]">
				<p className="font-semibold mb-4">Form Add Jokes - Client Component</p>
				{/* // ! Sebenarnya di sini kita mulai bisa menggunakan React 19 component baru */}
				{/* // ! bernama <Form>, tapi di sini kita belum menggunakannya yah ! */}
				<form className="flex flex-col gap-2" onSubmit={onSubmitHandler}>
					<input
						className="py-2 px-4"
						type="text"
						id="setup"
						placeholder="Setup"
						value={formValue.setup}
						onChange={onChangeHandler}
					/>
					<input
						className="py-2 px-4"
						type="text"
						id="delivery"
						placeholder="Delivery"
						value={formValue.delivery}
						onChange={onChangeHandler}
					/>
					<button
						className="bg-emerald-300 hover:bg-emerald-500 hover:text-white/90 rounded py-2 px-4 transition-colors duration-300"
						type="submit"
					>
						Add Joke
					</button>
				</form>
			</section>
		</>
	);
};

export default ClientFormAddJokes;

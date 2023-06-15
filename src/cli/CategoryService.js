import chalk from "chalk";

function handleErrors(err) {
	switch (err) {
		case "ECONNREFUSED":
			return chalk.redBright(
				"O link informado se encontra offline. Tente novamente mais tarde."
			);
		case "ENOTFOUND":
			return chalk.redBright("O link informado não existe. Refaça a operação.");
		default:
			return chalk.redBright(
				`Não foi possível completar a operação. Código do erro: ${err}`
			);
	}
}
export default class CategoryService {
	static async findCategories() {
		try {
			const response = await fetch("http://localhost:3000/categories");
			console.log(chalk.bgGreen(`response status: ${response.status}`));
			return response.json();
		} catch (error) {
			return handleErrors(error.cause.code);
		}
	}
}

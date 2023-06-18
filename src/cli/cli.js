import CategoryService from "./CategoryService.js";
import chalk from "chalk";
import fs from "fs";

const cliArgs = process.argv;

async function verifyValidFile(filePath) {
	try {
		const newCategory = await fs.promises.readFile(filePath, "utf-8");
		return JSON.parse(newCategory);
	} catch (error) {
		if (error.code === "ENOENT") {
			throw new Error(
				chalk.redBright(
					"O arquivo passado como parâmetro adicional não existe."
				)
			);
		} else if (error.code === "EISDIR") {
			throw new Error(
				chalk.redBright(
					"O caminho passado, na verdade, é referente a um diretório. Refaça a operação passando o caminho de um arquivo válido."
				)
			);
		}
		return;
	}
}

async function processarComando(args) {
	const flag = args[2];
	const additionalParameter = args[3];

	switch (flag) {
		case "--listarCategorias":
			const categoriesList = await CategoryService.findCategories();
			return console.log(categoriesList);

		case "--recuperarCategoriaPorId":
			const category = await CategoryService.findCategoryById(
				additionalParameter
			);

			if (!additionalParameter)
				return console.log(
					chalk.redBright(
						"Você precisa passar, como parâmetro adicional, o id da Categoria. Refaça a operação."
					)
				);

			if (!Object.hasOwn(category, "id"))
				return console.log(
					chalk.redBright(
						"Não há categoria com o id informado. Verifique o id passado e tente novamente."
					)
				);

			return console.log(category);

		case "--inserirCategoria":
			if (!additionalParameter)
				throw new Error(
					chalk.redBright(
						"Você precisa passar, como parâmetro adicional, o caminho do arquivo no qual há a nova categoria. Refaça a operação."
					)
				);
			const newCategory = await verifyValidFile(additionalParameter);

			const insertedCategory = await CategoryService.createCategory(newCategory);
			return console.log(insertedCategory);

		default:
			console.error(
				chalk.black.bgBlackBright(
					"Comando inválido, refaça a operação.\n\nComandos válidos:\n--listarCategorias: Lista as categorias existentes;\n--recuperarCategoriaPorId: Retorna uma categoria específica. Requer parâmetro adicional (id da categoria)\n--inserirCategoria: Insere uma nova categoria. Requer parâmetro adicional (arquivo json da nova categoria)"
				)
			);
	}
}

processarComando(cliArgs);

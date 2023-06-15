import CategoryService from "./CategoryService.js";
import chalk from "chalk";

const cliArgs = process.argv;

async function processarComando(args) {
	const flag = args[2];
	const categoryId = args[3];

	switch (flag) {
		case "--listarCategorias":
			const categoriesList = await CategoryService.findCategories();
			return console.log(categoriesList);

		case "--recuperarCategoriaPorId":
			const category = await CategoryService.findCategoryById(categoryId);
			if (Object.keys(category).length === 0)
				return console.log(
					chalk.redBright(
						"Não há categoria com o id informado. Verifique o id passado e tente novamente."
					)
				);
			return console.log(category);
		default:
			console.error(
				chalk.black.bgBlackBright(
					"Comando inválido, refaça a operação.\n\nComandos válidos:\n--listarCategorias: Lista as categorias existentes;\n--recuperarCategoriaPorId: Retorna uma categoria específica. Requer parâmetro adicional (id da categoria)"
				)
			);
	}
}

processarComando(cliArgs);

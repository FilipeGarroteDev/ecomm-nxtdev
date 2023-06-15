import CategoryService from "./CategoryService.js";
import chalk from "chalk";

const cliArgs = process.argv;

async function processarComando(args) {
	const flag = args[2];

	switch (flag) {
		case "--listarCategorias":
			const categoriesList = await CategoryService.findCategories();
			console.log(categoriesList);
			return;
		default:
			console.error(
				chalk.black.bgBlackBright(
					"Comando não reconhecido, refaça a operação.\n\nComandos válidos:\n--listarCategorias: Lista as categorias existentes;"
				)
			);
	}
}

processarComando(cliArgs);

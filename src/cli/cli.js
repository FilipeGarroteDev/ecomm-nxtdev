import CategoryService from "./CategoryService.js";

const cliArgs = process.argv

async function processarComando(args) {

	switch (args[2]) {
		case "--listarCategorias":
			const categoriesList = await CategoryService.findCategories();
			console.log(categoriesList);
			return;
		default:
			console.error("Comando não reconhecido, refaça a operação.");
	}
}

processarComando(cliArgs);

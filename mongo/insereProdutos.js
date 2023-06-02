use("ecomm");

const insertedProducts = db.products.insertMany([
	{
		nome: "Notebook Samsung",
		descricao:
			'Samsung Book Core i5-1135G7, 8G, 256GB SSD, Iris Xe, 15.6"FHD, W11 Cinza',
		slug: "notebook-samsung",
		precoUnitario: NumberDecimal("3523"),
		quantidadeEmEstoque: 1,
		categoria: "INFORMÁTICA",
	},
	{
		nome: "Sofá 3 lugares",
		descricao:
			"Sofá 3 Lugares Retrátil e Reclinável Cama Inbox Compact 1,80m Velusoft Cinza",
		slug: "sofa-3-lugares",
		precoUnitario: NumberDecimal("2500"),
		quantidadeEmEstoque: 1,
		categoria: "MÓVEIS",
	},
	{
		nome: "Clean Architecture",
		descricao:
			"Arquitetura limpa: O guia do artesão para estrutura e design de software por Robert C. Martin (Uncle Bob)",
		slug: "livro-clean-architecture",
		precoUnitario: NumberDecimal("102.9"),
		quantidadeEmEstoque: 2,
		categoria: "LIVROS",
	},
	{
		nome: "Mesa de jantar 6 lugares",
		descricao: "Mesa de Jantar 6 Lugares Lótus Oppa Design - Caramel",
		slug: "mesa-de-jantar-6-lugares",
		precoUnitario: NumberDecimal("3678.98"),
		quantidadeEmEstoque: 1,
		categoria: "MÓVEIS",
	},
	{
		nome: "iPhone 13 Pro",
		descricao: "Apple iPhone 13 Pro (256 GB) - Verde-alpino",
		slug: "iphone-13-pro",
		precoUnitario: NumberDecimal("9176"),
		quantidadeEmEstoque: 6,
		categoria: "CELULARES",
	},
	{
		nome: "Monitor Dell 27",
		descricao: 'Monitor Dell de 27" P2722H, Preto',
		slug: "monitor-dell-27",
		precoUnitario: NumberDecimal("1889"),
		quantidadeEmEstoque: 3,
		categoria: "INFORMÁTICA",
	},
	{
		nome: "Implementing Domain-Driven Design",
		descricao: "Implementando Domain-Driven Design por Vaughn Vernon",
		slug: "livro-implementing-ddd",
		precoUnitario: NumberDecimal("144.07"),
		quantidadeEmEstoque: 3,
		categoria: "LIVROS",
	},
	{
		nome: "Jogo de pneus",
		descricao: "Pneu Barum by Continental Aro 13 Bravuris 5hm 175/70r13 82t",
		slug: "jogo-de-pneus-continental-13",
		precoUnitario: NumberDecimal("1276.79"),
		quantidadeEmEstoque: 1,
		categoria: "AUTOMOTIVA",
	},
	{
		nome: "Clean Code",
		descricao:
			"Código limpo: Habilidades práticas do Agile Software por Robert C. Martin (Uncle Bob)",
		slug: "livro-clean",
		precoUnitario: NumberDecimal("95.17"),
		quantidadeEmEstoque: 1,
		categoria: "LIVROS",
	},
	{
		nome: "Galaxy S22 Ultra",
		descricao:
			"Smartphone Samsung Galaxy S22 Ultra 256GB 5G com caneta S PEN - Preto, Câmera Tripla 108MP + Selfie 40MP, RAM 12GB, Tela 6.8",
		slug: "celular-galaxy-22-ultra",
		precoUnitario: NumberDecimal("8549.1"),
		quantidadeEmEstoque: 5,
		categoria: "CELULARES",
	},
	{
		nome: "Macbook Pro 16",
		descricao:
			"Notebook Apple MacBook Pro de 13 polegadas: Chip M2 da Apple com CPU de oito núcleos e GPU de dez núcleos, de 512 GB SSD - Prateado",
		slug: "notebook-macbook-pro-16",
		precoUnitario: NumberDecimal("31752"),
		quantidadeEmEstoque: 1,
		categoria: "INFORMÁTICA",
	},
	{
		nome: "Refactoring Improving the Design of Existing Code",
		descricao:
			"Refatoração: Aperfeiçoando o Design de Códigos Existentes por Martin Fowler",
		slug: "livro-refactoring",
		precoUnitario: NumberDecimal("173.9"),
		quantidadeEmEstoque: 1,
		categoria: "LIVROS",
	},
	{
		nome: "Cama queen size",
		descricao: "Cama Queen Size Dener Oppa Design - Mel",
		slug: "cama-queen-size-dener",
		precoUnitario: NumberDecimal("3100"),
		quantidadeEmEstoque: 2,
		categoria: "MÓVEIS",
	},
	{
		nome: "Central multimidia",
		descricao:
			"Kit Combo Central Multimídia 9 Polegadas Mp5 Automotivo Aparelho 2 Din Som Pra Carro Sistema Operacional Android 12 Bluetooth Usb Gps Integrado Conexão Wifi Função Speedplay que Simula Carplay e Android Auto Mais Aplicativos Como Spotify Waze Youtube WhatsApp, Tela Resistiva, Microfone Externo Função Multi Tela 2gb Ram e 32gb de Memória interna, Entradas para Encostos de Cabeça, Comando de Volante e Para Câmera Frontal ou Traseira + Moldura Painel Kia Sorento 2013 a 2014 Cor Preta + Câmera de ré",
		slug: "central-multimidia-automotiva",
		precoUnitario: NumberDecimal("711.18"),
		quantidadeEmEstoque: 1,
		categoria: "AUTOMOTIVA",
	},
	{
		nome: "Building Microservices",
		descricao: "Building Microservices (English Edition) por Sam Newman",
		slug: "livro-building-microservices",
		precoUnitario: NumberDecimal("300.28"),
		quantidadeEmEstoque: 2,
		categoria: "LIVROS",
	},
	{
		nome: "Galaxy Tab S8",
		descricao: "Tablet Samsung Galaxy S8 5G SM-X706B 256gb Grafite 8gb Ram",
		slug: "tablet-galaxy-tab-s8",
		precoUnitario: NumberDecimal("5939.1"),
		quantidadeEmEstoque: 4,
		categoria: "INFORMÁTICA",
	},
]);

console.log(insertedProducts);

export default class CategoryService {
	static async findCategories() {
		try {
			const response = await fetch("http://localhost:3000/categories");
			console.log(`response status: ${response.status}`);
			return response.json();
		} catch (error) {
			console.log("OIII");
		}
	}
}

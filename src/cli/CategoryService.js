import chalk from 'chalk';

function handleErrors(err) {
  switch (err) {
    case 'ECONNREFUSED':
      throw new Error(
        chalk.redBright(
          'O link informado se encontra offline. Tente novamente mais tarde.',
        ),
      );
    case 'ENOTFOUND':
      throw new Error(
        chalk.redBright('O link informado não existe. Refaça a operação.'),
      );
    default:
      throw new Error(
        chalk.redBright(
          `Não foi possível completar a operação. Código do erro: ${err}`,
        ),
      );
  }
}
export default class CategoryService {
  static async findCategories() {
    try {
      const response = await fetch('http://localhost:3000/categories');
      console.log(
        chalk.bgBlackBright.black(`response status: ${response.status}`),
      );
      return response.json();
    } catch (error) {
      return handleErrors(error.cause.code);
    }
  }

  static async findCategoryById(categoryId) {
    try {
      const response = await fetch(
        `http://localhost:3000/categories/${categoryId}`,
      );
      console.log(
        chalk.bgBlackBright.black(`response status: ${response.status}`),
      );
      return response.json();
    } catch (error) {
      return handleErrors(error.cause.code);
    }
  }

  static async createCategory(newCategory) {
    try {
      const response = await fetch('http://localhost:3000/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(newCategory),
      });
      console.log(
        chalk.bgBlackBright.black(`response status: ${response.status}`),
      );
      return response.json();
    } catch (error) {
      return handleErrors(error.cause.code);
    }
  }

  static async updateCategory(id, newCategory) {
    try {
      const response = await fetch(`http://localhost:3000/categories/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(newCategory),
      });
      console.log(
        chalk.bgBlackBright.black(`response status: ${response.status}`),
      );
      return response.json();
    } catch (error) {
      return handleErrors(error.cause.code);
    }
  }

  static async deleteCategory(id) {
    try {
      const response = await fetch(`http://localhost:3000/categories/${id}`, {
        method: 'DELETE',
      });
      console.log(
        chalk.bgBlackBright.black(`response status: ${response.status}`),
      );
      return response.json();
    } catch (error) {
      return handleErrors(error.cause.code);
    }
  }
}

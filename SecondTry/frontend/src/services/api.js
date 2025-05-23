// Tenta conectar primeiro localmente, se não funcionar usa a URL do EC2
const LOCAL_URL = 'http://localhost:5000';
const EC2_URL = 'http://ec2-3-145-111-106.us-east-2.compute.amazonaws.com:5000';

const checkApiAvailability = async (url) => {
  try {
    const response = await fetch(`${url}/items`);
    return response.ok;
  } catch (error) {
    return false;
  }
};

const API_URL = await checkApiAvailability(LOCAL_URL) ? LOCAL_URL : EC2_URL;
console.log(`Using API at: ${API_URL}`);

/**
 * Serviço que gerencia todas as chamadas à API do backend
 */
const ApiService = {
  /**
   * Busca todos os itens
   * @returns {Promise<Array>} Lista de itens
   */
  async getAllItems() {
    try {
      const response = await fetch(`${API_URL}/items`);
      
      if (!response.ok) {
        throw new Error(`Erro ao buscar itens: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erro na API:', error);
      throw error;
    }
  },

  /**
   * Busca um item específico pelo ID
   * @param {number} id ID do item
   * @returns {Promise<Object>} Item encontrado
   */
  async getItemById(id) {
    try {
      const response = await fetch(`${API_URL}/items/${id}`);
      
      if (!response.ok) {
        throw new Error(`Erro ao buscar item ${id}: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erro na API:', error);
      throw error;
    }
  },

  /**
   * Cria um novo item (Nota: precisaria adicionar esse endpoint no backend)
   * @param {Object} item Item a ser criado
   * @returns {Promise<Object>} Item criado
   */
  async createItem(item) {
    try {
      const response = await fetch(`${API_URL}/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });
      
      if (!response.ok) {
        throw new Error(`Erro ao criar item: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erro na API:', error);
      throw error;
    }
  },

  /**
   * Atualiza um item existente (Nota: precisaria adicionar esse endpoint no backend)
   * @param {number} id ID do item
   * @param {Object} item Dados atualizados do item
   * @returns {Promise<Object>} Item atualizado
   */
  async updateItem(id, item) {
    try {
      const response = await fetch(`${API_URL}/items/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });
      
      if (!response.ok) {
        throw new Error(`Erro ao atualizar item ${id}: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erro na API:', error);
      throw error;
    }
  },

  /**
   * Deleta um item (Nota: precisaria adicionar esse endpoint no backend)
   * @param {number} id ID do item a ser deletado
   * @returns {Promise<void>}
   */
  async deleteItem(id) {
    try {
      const response = await fetch(`${API_URL}/items/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`Erro ao deletar item ${id}: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erro na API:', error);
      throw error;
    }
  }
};

export default ApiService; 
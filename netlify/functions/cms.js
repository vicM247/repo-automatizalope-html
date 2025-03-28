const { GitContentSource } = require('@stackbit/cms-git');

exports.handler = async function(event, context) {
  // Verificar el método HTTP
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const body = JSON.parse(event.body);
    const { action, data } = body;

    // Aquí manejaremos diferentes acciones del CMS
    switch (action) {
      case 'create':
      case 'update':
      case 'delete':
        // Implementar lógica específica para cada acción
        return {
          statusCode: 200,
          body: JSON.stringify({ message: `Action ${action} successful` })
        };
      default:
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Invalid action' })
        };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
}; 
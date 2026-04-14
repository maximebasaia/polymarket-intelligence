exports.handler = async function(event) {
  const url = event.queryStringParameters?.url;

  if (!url || !url.includes('netlify/functions/polymarket.js')) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'URL invalide' })
    };
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: 'Erreur Polymarket: ' + response.status })
      };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(data)
    };

  } catch(err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};

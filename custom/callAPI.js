async function makeAPICall(url, token) {
    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': `${token}`
            }
        });
        const data = await response.json();
        return { result: data, error: null };
    } catch (error) {
        return { result: null, error: error.message || 'Something went wrong' };
    }
}

// Example usage inside an async function:
async function fetchData(apiUrl,apiToken) {

    try {
        const { result, error } = await makeAPICall(apiUrl, apiToken);
        if (error) {
            console.error('Error fetching data:', error);
        } else {
            console.log('API response:', result);
            // Do something with the result
        }
    } catch (err) {
        console.error('Error:', err);
    }
}


fetchData("https://tekmonks.mantishub.io/api/rest/issues?filter_id=assigned&page_size=40&page=1",message.content.token)
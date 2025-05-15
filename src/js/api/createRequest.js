const createRequest = async (options = {}) => {
    const {
        url,
        method = 'GET',
        headers = {},
        body = null,
    } = options;

    try {
        const fetchOptions = {
            method,
            headers: {
                'Content-Type': 'application/json', ...headers
            },
        }

        if (body) {
            fetchOptions.body = JSON.stringify(body);
        }

        const response = await fetch(url, fetchOptions);

        if(!response.ok) {
            const errorData = await response.json().catch(()=> ({}))
            throw new Error(`Ошибка: ${response.status} ${response.statusText} \n ${JSON.stringify(errorData)}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
        throw error;
    }

};

export default createRequest;

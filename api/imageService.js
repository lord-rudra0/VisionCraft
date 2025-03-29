const handleRequest = async (url, method = 'GET', data = null) => {
    try {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: data ? JSON.stringify(data) : null,
        };

        const response = await fetch(url, options);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API Request Failed:', error);
        throw error;
    }
};

export const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append('image', image);
    return handleRequest('/api/upload', 'POST', formData);
};

export const compressImage = async (filename, quality) => {
    return handleRequest('/api/compress', 'POST', { filename, quality });
};

export const resizeImage = async (filename, width, height) => {
    return handleRequest('/api/resize', 'POST', { filename: filename, width: width, height: height });
};

export const cropImage = async (filename, left, top, right, bottom) => {
    return handleRequest('/api/crop', 'POST', { filename: filename, left: left, top: top, right: right, bottom: bottom });
};

export const convertToJpg = async (filename) => {
    return handleRequest('/api/convert-to-jpg', 'POST', { filename: filename });
}; 
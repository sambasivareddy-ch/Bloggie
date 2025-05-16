import { API_KEY } from '@env';

const authPostRequestHandler = async (method, data) => {
    try {
        const response = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:${method}?key=${API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        );

        if (!response.ok) {
            console.error("error occurred while sending the request");
        }

        const result = await response.json();

        return {
            token: result.idToken,
            email: result.email,
            uid: result.localId,
        };
    } catch (err) {
        return err;
    }
};

export const createAccount = async (email, password) => {
    return authPostRequestHandler("signUp", {
        email,
        password,
        returnSecureToken: true,
    });
};

export const loginIntoAccount = async (email, password) => {
    return authPostRequestHandler("signInWithPassword", {
        email,
        password,
        returnSecureToken: true,
    });
};

export const postBlogToFirebase = async (document, access_token) => {
    try {
        const response = await fetch(
            `https://journal-41fed-default-rtdb.firebaseio.com/users/${document.userId}.json?auth=${access_token}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(document),
            }
        );

        if (!response.ok) {
            console.error("error occurred during posting to firebase");
        }

        const data = await response.json();

        return data.name;
    } catch (err) {
        return err;
    }
};

export const updateBlogToFirebase = async (document, access_token) => {
    try {
        const response = await fetch(
            `https://journal-41fed-default-rtdb.firebaseio.com/users/${document.userId}/${document.id}.json?auth=${access_token}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(document),
            }
        );

        if (!response.ok) {
            console.error("error occurred during posting to firebase");
        }

        const data = await response.json();

        return data.name;
    } catch (err) {
        return err;
    }
};

export const deleteBlogFromFirebase = async (userId, id, access_token) => {
    try {
        const response = await fetch(
            `https://journal-41fed-default-rtdb.firebaseio.com/users/${userId}/${id}.json?auth=${access_token}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            console.error("error occurred during posting to firebase");
        }

        const data = await response.json();

        return data.name;
    } catch (err) {
        return err;
    }
};

export const getBlogsFromFirebase = async (userId, access_token) => {
    try {
        const response = await fetch(
            `https://journal-41fed-default-rtdb.firebaseio.com/users/${userId}.json?auth=${access_token}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            console.error("error occurred during posting to firebase");
        }

        const data = await response.json();

        console.log(data)

        return data;
    } catch (err) {
        return err;
    }
};

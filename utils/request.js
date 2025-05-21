const authPostRequestHandler = async (method, data) => {
    try {
        const response = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:${method}?key=${process.env.EXPO_PUBLIC_API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        );

        if (!response.ok) {
            throw new Error("error occurred while sending the request");
        }

        const result = await response.json();

        if (method === 'delete') {
            return true;
        }

        return {
            token: result.idToken,
            email: result.email,
            uid: result.localId,
        };
    } catch (err) {
        throw new Error(err.message);
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

export const changeAccountPassword = async (password, token) => {
    return authPostRequestHandler("update", {
        password,
        idToken: token,
        returnSecureToken: true,
    })
}

export const changeAccountEmail = async (email, token) => {
    return authPostRequestHandler("update", {
        email,
        idToken: token,
        returnSecureToken: true,
    })
}

export const deleteAccount = async (token) => {
    return authPostRequestHandler("delete", {
        idToken: token,
    })
}

export const postBlogToFirebase = async (document, access_token) => {
    try {
        const response = await fetch(
            `https://${process.env.EXPO_PUBLIC_PROJECT_ID}-default-rtdb.firebaseio.com/users/${document.userId}.json?auth=${access_token}`,
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
            return
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
            `https://${process.env.EXPO_PUBLIC_PROJECT_ID}-default-rtdb.firebaseio.com/users/${document.userId}/${document.id}.json?auth=${access_token}`,
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
            `https://${process.env.EXPO_PUBLIC_PROJECT_ID}-default-rtdb.firebaseio.com/users/${userId}/${id}.json?auth=${access_token}`,
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
            `https://${process.env.EXPO_PUBLIC_PROJECT_ID}-default-rtdb.firebaseio.com/users/${userId}.json?auth=${access_token}`,
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

        return data;
    } catch (err) {
        return err;
    }
};

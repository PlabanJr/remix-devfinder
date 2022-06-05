export const getUser = async (username: string = 'plabanjr') => {
    const response = await fetch(`https://api.github.com/users/${username}`);

    return response.json();
}
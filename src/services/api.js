// src/services/api.js
export const fetchData = async () => {
    try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    return await res.json();
  } catch (err) {
    console.error(err);
  }
};

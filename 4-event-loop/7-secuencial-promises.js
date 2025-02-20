// Función para obtener un usuario de una API
function getUser(userId) {
  return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then(response => {
      if (!response.ok) throw new Error("Error al obtener el usuario");
      return response.json();
    });
}

// Función para obtener los posts de un usuario
function getPosts(userId) {
  let posts = [];
  return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    .then(response => {
      if (!response.ok) throw new Error("Error al obtener los posts");
      return response.json();
    });
}

// Función para obtener los comentarios del post
function getComments(postId) {
  return fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
    .then(response => {
      if (!response.ok) throw new Error("Error al obtener comentarios del post");
      return response.json();
    });
}

// Encadenando Promesas
console.log("Inicio");

getUser(1)
  .then((user) => getPosts(user.id))
  .then((posts) => {
    console.log("Posts del usuario:", posts);
    const commentsPromises = posts.map(post => getComments(post.id));
    return Promise.all(commentsPromises);
  })
  .then(comments => {
    const totalComments = comments.reduce((contador, actual) => contador.concat(actual), []);
    console.log("Comentarios de todos los posts del usuario:", totalComments);
    const combined = totalComments
      .map(comment => comment.body)
      .filter(comment => comment.length > 200)
      .reduce((a, b) => a + b, "");
    console.log("Comentarios concatenados:", combined);
    console.log("Fin");
  })
  .catch(error => console.error("Error:", error));

  


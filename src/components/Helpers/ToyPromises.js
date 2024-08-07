async function getErrorResponse(response){
        if (response.ok == false) {
            const error = await response.json();
            throw new Error(error.message); 
        }
       return response.json()
}

export const helpLogin = (email, password) => 
    fetch('http://localhost:3030/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ email, password }),
    })
    .then(getErrorResponse)
    .then((data) => ({email, accessToken: data.accessToken, userId: data._id, gender: data.gender}))



export  const helpRegister = (email, password, confirmPassword, gender) => 
    password !== confirmPassword ? Promise.reject("Paswords don't match!") : 
        fetch('http://localhost:3030/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, gender }),
        })
        .then(getErrorResponse)
        .then((data) => ({email, accessToken: data.accessToken, userId: data._id, gender}))

// const fetchToy = (id) => {
//     return new Promise(resolve => {
//         fetch(`http://localhost:3030/data/toys/${id}`).then(response => {
//             response.json().then(newtoy => {
//                resolve(newtoy)
//             });
//         });
//     })
//}
export const fetchToy = (id) => 
    fetch(`http://localhost:3030/data/toys/${id}`)
        .then(getErrorResponse);

export const fetchPics = (category) => 
    fetch(`http://localhost:3030/data/toys?sortBy=_createdOn%20desc&where=category%3D%22${category}%22`)
        .then(getErrorResponse);


export const fetchSearchtoys = (name) =>
    fetch(`http://localhost:3030/data/toys?sortBy=_createdOn%20desc&where=name%20LIKE%20%22${name}%22`)
        .then(getErrorResponse);

export const createToy = (session, name, description, imageUrl, category) => 
    fetch('http://localhost:3030/data/toys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
        'X-Authorization': session.accessToken
        },
        body: JSON.stringify({ name, description, imageUrl, category }),
    }).then(getErrorResponse)
    ;

    export const editToy = (id, session, name, description, imageUrl, category) => 
        fetch(`http://localhost:3030/data/toys/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json',
            'X-Authorization': session.accessToken
            },
            body: JSON.stringify({ name, description, imageUrl, category }),
        }).then(getErrorResponse)

export const makePurchase = (donation, session) =>  
    session === null ? Promise.reject("You have to be logged in!") :
    fetch('http://localhost:3030/data/purchase', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
            'X-Authorization': session.accessToken
         },
            body: JSON.stringify(donation),
        })


export const fetchTotalPurchase = (id, userId) => 
            fetch(`http://localhost:3030/data/purchase?where=toyId%3D%22${id}%22%20and%20_ownerId%3D%22${userId}%22`)
             .then(getErrorResponse)
             .then(purchases => purchases.reduce((a, v) => a + v.amount, 0))

export const fetchTotalPurchaseCategory = (category, userId) => 
        fetch(`http://localhost:3030/data/purchase?where=category%3D%22${category}%22%20and%20_ownerId%3D%22${userId}%22`)
            .then(getErrorResponse)
            .then(purchases => purchases.reduce((a, v) => a + v.amount, 0))


export const fetchToysCount = (userId) => 
        fetch(`http://localhost:3030/data/toys?where=_ownerId%3D%22${userId}%22`)
            .then(getErrorResponse)
            
  
            
export const makeComment = (session, comment, id) => 
    session === null ? Promise.reject("You have to be logged in!") :
    fetch('http://localhost:3030/data/comments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
            'X-Authorization': session.accessToken
        },
                body: JSON.stringify({ comment, toyId: id }),
    }).then(getErrorResponse);
 
    
export const fetchComments = (id) => 
    fetch(`http://localhost:3030/data/comments?where=toyId%3D%22${id}%22`)
        .then(getErrorResponse)


export const deleteToy = (id, session) => 
    fetch(`http://localhost:3030/data/toys/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json',
            'X-Authorization': session.accessToken
         }
        });
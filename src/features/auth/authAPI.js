export function createUser(userData){
    return new Promise(async (resolve)=>{
        const response = await fetch('http://localhost:3000/users',{
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {'content-type': 'application/json'}
        });
        const data = await response.json()
        resolve(data);
    })
}


export function loginUser(loginInfo){
    return new Promise(async (resolve, reject)=>{
        const email = loginInfo.email;
        const password = loginInfo.password;

        const response = await fetch('http://localhost:3000/users?email='+email);
        const data = await response.json();

        if(data.length){
            if(password == data[0]?.password){
                resolve(data);
                // console.log("data from login api", data);
            }else{
                reject({message: "Wrong Credentials"});
            }
        }else{
            reject({message: "User Not Found"});
        }
    })
}

export function updateUser(update){
    return new Promise(async (resolve)=>{
        const response = await fetch('http://localhost:3000/users/'+update.id,{
            method: 'PATCH',
            body: JSON.stringify(update),
            headers: {'content-type': 'application/json'}
        });
        const data = await response.json()
        resolve(data);
    })
}
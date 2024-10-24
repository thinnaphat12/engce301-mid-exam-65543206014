import React from 'react';

const User = ({ name, location, email, picture, login, createUser }) => {

    async function createUser() {
/*
        gender,
        name_title ,
        name_first,
        name_last,
        country,
        email,
        username,
        password ,
        picture_large,
        picture_medium,
        picture_thumbnail
*/
        const token = '1234567890';
        const body = new FormData();
        body.set("name_first", name.first);
        body.set("name_last", name.last);
        body.set("email", email);
        body.set("username", login.username);
        body.set("password", login.password);
        body.set("picture_medium", picture.medium);

        const response = await fetch(`http://localhost:4000/api/user/insert`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`, // notice the Bearer before your token
            },
            body
          })
          alert("User list was inserted");
        //return await response.json();
    }


    return (
        <div className="random-user">
            <div className="user-image">
                <img src={picture.medium} alt={name.first} />
            </div>
            <div><strong>Country:</strong> {location.country}</div>
            <div><strong>Email:</strong> {email}</div>
            <div><strong>Login:</strong> {login.username}</div>
            <div><strong>Password:</strong> {login.password}</div>
            <div><strong>Name:</strong> {name.first} {name.last}</div>
            <button type="button" onClick= {(e) => createUser()} className="btn btn-danger">Create</button>
        </div>

    );
};

export default User;
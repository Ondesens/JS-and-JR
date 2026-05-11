import axios  from 'axios'
import {useEffect, useState} from "react";
import './PostInfo.css'

export const PostInfo = (props) => {
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);


    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/users")
            .then(function (response) {
                setUsers(response.data);
            });

        axios.get("https://jsonplaceholder.typicode.com/posts")
            .then(function (response) {
                setPosts(response.data);

            })

    },[])

    const getUserPost = () => {
        if (props.selectUser === '0') {
            return (
                posts
            )
        }
        else {
            return posts.filter(post => post.userId === Number(props.selectUser) )
        }
    };
    const filterPosts =  getUserPost();

    if (users.length === 0 || posts.length === 0) {
        return <div>Загрузка...</div>;
    }

    return (
        <div>
            {filterPosts.map (post => {
                const user = users.filter(user => user.id === post.userId)[0];

                return (
                    <div className='post' key = {post.id}>
                        <div className='author'>
                            <strong>
                                {user.name}
                            </strong>

                        </div>
                        <div className= "text">
                            <div className='title'>{post.title}</div>
                            <div className='body'>{post.body}</div>
                        </div>
                    </div>
                )
            })}
        </div>

    );
}
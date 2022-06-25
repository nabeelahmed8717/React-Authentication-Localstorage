import React, {useState} from 'react'


const Home = (props) => {

  const [username,setUsername]=useState('');



  const userData =async ()=>{

    const response = await fetch(
        "https://usersdata-56b3b-default-rtdb.firebaseio.com/Users.json"
      );
      const data = await response.json();

      setUsername(data[props.userId].username)

    }

if(props.userId !== null){
    userData();
}

  return (
    <div>
      <h2>{username}</h2>
    </div>
  )
}

export default Home
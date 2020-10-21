import React,{useEffect,useState} from 'react';
import '../Css/SidebarChat.css';
import {Avatar} from '@material-ui/core';
import db from '../firebase.js';
import {Link} from 'react-router-dom';

function SidebarChat({id,name,addNewChat}){
    const[seed,setSeed]=useState("");
    const[messages,setMessages]=useState("");
    useEffect(()=>{
        if(id){
            db.collection('rooms').doc(id).collection('messages').orderBy('timestamp','desc')
            .onSnapshot(snapshot=>(
                setMessages(snapshot.docs.map((doc)=>doc.data()))
            ));
        }
    },[]);
    useEffect(()=>{
        setSeed(Math.floor(Math.random()*5000));
    },[])
    const createChat=()=>{
        const roomName=prompt("Please enter name for chat room");
        if(roomName){
            db.collection('rooms').add({
                name:roomName,
            });
        }
    };
    return !addNewChat?(
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/avataaars/${seed}.svg`} />
                <div className="sidebarChat_info">
                    <h4>{name}</h4>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>
    ):(
        <div onClick={createChat} className="sidebarChat">
            <h4>Add new Chat</h4>
        </div>
    );
}
export default SidebarChat;
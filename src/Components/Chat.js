import React,{useState,useEffect} from 'react';
import '../Css/Chat.css';
import {Avatar,IconButton} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {InsertEmoticon, SearchOutlined} from '@material-ui/icons';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicNoneIcon from '@material-ui/icons/MicNone';
import SendIcon from '@material-ui/icons/Send';
import {useParams} from 'react-router-dom';
import db from "../firebase";
import firebase from "firebase";
import {useStateValue} from "../StateProvider";

function Chat(){
    const [seed,setSeed]=useState("");
    const [input,setInput]=useState("");
    const{roomId}=useParams();
    const [roomName,setRoomName]=useState("");
    const [messages,setMessages]=useState([]);
    const[{user},dispatch]=useStateValue();

    useEffect(()=>{
        if(roomId){
            db.collection('rooms').doc(roomId).onSnapshot(sn=>
                setRoomName(sn.data().name)
            );
            db.collection('rooms').doc(roomId).collection("messages").orderBy('timestamp','asc')
            .onSnapshot(snapshot=>(
                setMessages(snapshot.docs.map(doc=>doc.data()))
            ))
        }
    },[roomId]);

    useEffect(()=>{
        setSeed(Math.floor(Math.random()*5000));
    },[]);

    const sendMessage=(e)=>{
        e.preventDefault();
        console.log(input);
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        setInput("");
    }

    return(
        <div className="chat">
            <div className="chat_header">
                <Avatar src={`https://avatars.dicebear.com/api/avataaars/${Math.floor(Math.random()*5000)}.svg`}/>
                <div className="chat_headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last seen at ...</p>
                </div>

                <div className="chat_headerRight">
                    <IconButton><SearchOutlined/></IconButton>
                    <IconButton><AttachFileIcon/></IconButton>
                    <IconButton><MoreVertIcon/></IconButton>
                </div>
            </div>
            <div className="chat_body">
                {messages.map((message)=>(
                <p className={`chat_message ${message.name===user.displayName && 'chat_receiver'}`}>
                    <span className="chat_name">{message.name}</span>
                    {message.message} 
                    <span className="chat_timestamp">{new Date(message.timestamp
                    ?.toDate()).toUTCString()}</span>
                </p>
                ))}
            </div>
            <div className="chat_footer">
                <IconButton><InsertEmoticonIcon/></IconButton>
                <form>
                    <input value={input} onChange={e=>setInput(e.target.value)} type="text" placeholder="Type a message"/>
                    <button type="submit" style={{border:'none'}} onClick={sendMessage }>
                        <IconButton><SendIcon/></IconButton>
                    </button>
                </form>
                <IconButton><MicNoneIcon/></IconButton>
            </div>
        </div>
    );
}
export default Chat;
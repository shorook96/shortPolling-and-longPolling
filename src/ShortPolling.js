import { useEffect, useState} from 'react';
import axios from 'axios';

const URL = 'http://localhost:3000';
const ShortPolling = (props)=>{
const [message, setMessage] = useState('');
const [messages, setMessages] = useState([]);

const handleSubmit = (e) => {
    e.preventDefault();
    axios
    .post(`${URL}/messages`, [message])
    .then(()=> setMessage(''));
};

useEffect(()=>{
    setInterval(() => {
        axios.get(`${URL}/messages`).then((data)=> setMessages(data.data));
    }, 5000);
},[]);

if(messages){
    return(
    (<>
    {/* <h1>hello</h1> */}
    <div style={{backgroundColor: "lightblue"}}>
        <form id='form' className='validate' onSubmit={handleSubmit}>
            <div style={{color: "red"}}>
                <label>Message: </label>
                <input type="text"
                name="message"
                id = "message"
                placeholder="message"
                required
                value={message}
                onChange = {(e) => setMessage(e.target.value)}
                />
                
            </div>
        </form>
    </div>
    <section>
        <div>
            <h2>Stored Messages:</h2>
            <ul style={{backgroundColor: "rgba(0,10,40)"}}>
                {
                    messages.map((m,i)=><li style={{color: "white"}} key={i}>{m}</li>)
                }
            </ul>
        </div>
    </section>
    </>)
    );}
};
export default ShortPolling;
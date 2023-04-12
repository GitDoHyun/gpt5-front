import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Regi() {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [nickname, setNickname] = useState('');
  const [gender, setGender] = useState('M');
  const [name, setName] = useState('');
//   const [auth, setAuth] = useState(1);
  const [contact, setContact] = useState('');
  const [birth, setBirth] = useState(0);
//   const [coin, setCoin] = useState(0);
//   const [profile, setProfile] = useState(false);

  let history = useNavigate();

  const emailcheck = async() => {
    const resp = await axios.post("http://localhost:3000/emailcheck", null, { params:{ "email":email } });
    console.log(resp.data);
  }

  function account(){
    let member = { "email":email, "pwd":pwd, "nickname":nickname, "gender":gender, "name":name,"contact":contact, "birth":birth };
    axios.post("http://localhost:3000/addmember", null, { params:member })
    .then(function(resp){
        if(resp.data === "YES"){
            alert('정상적으로 가입되었습니다');
            history("/");  // 이동(link)
        }else{
            alert('가입되지 않았습니다');
        }
    })
    .catch(function(err){
        alert('err')
    })
  }

  return (
    <div>
    <form onSubmit={account}>       
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <button onClick={emailcheck}>중복확인</button><br/>
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={pwd}
          onChange={(event) => setPwd(event.target.value)}
          required
        />
      </div>
      <div>
        <label>Nickname</label>
        <input
          type="text"
          value={nickname}
          onChange={(event) => setNickname(event.target.value)}
          required
        />
      </div>
      <div>
        <label>Gender</label>
        <select value={gender} onChange={(event) => setGender(event.target.value)}>
          <option value="M">Male</option>
          <option value="F">Female</option>
          <option value="O">Other</option>
        </select>
      </div>
      <div>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div>
        <label>Contact</label>
        <input
          type="text"
          value={contact}
          onChange={(event) => setContact(event.target.value)}
        />
      </div>
      <div>
        <label>Birth</label>
        <input
          type="number"
          value={birth}
          onChange={(event) => setBirth(event.target.value)}
          required
        />
      </div>
      {/* <div>
        <label>Coin</label>
        <input
          type="number"
          value={coin}
          onChange={(event) => setCoin(event.target.value)}
          required
        />
      </div> */}

      {/* <div>
        <label>Profile</label>
        <input
          type="checkbox"
          checked={profile}
          onChange={(event) => setProfile(event.target.checked)}
        />
      </div> */}
      <button type="submit">Signup</button>
    </form>
    </div>
  );
}

export default Regi;
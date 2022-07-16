import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import QrScanner from 'qr-scanner';
import '../App.css';

function Scanner() {

  // const [first, setfirst] = useState("");
  // document.cookie = "username=John Doe; expires=Thu, 18 Dec 2013 12:00:00 UTC";
  // document.cookie="username=null"
  // function display() { 
  //   var now = new Date();
  //   var time = now.getTime();
  //   var expireTime = time + 1000*36000*100000;
  //   now.setTime(expireTime);
  //   document.cookie = 'cookie=ok;expires='+now.toUTCString()+expireTime+';path=/';
  //   //console.log(document.cookie);  // 'Wed, 31 Oct 2012 08:50:17 UTC'
  // }
  // display()
  const main=async()=>{

    let videoele = document.getElementById('video')
    const qrScanner = new QrScanner(videoele, result => {
      console.log(result)
      if(result){
          let a = result.split('-');
          if(a[0] != "asdhhakdoisauoaidgfiudgfiiau"){
            qrScanner.stop()
            window.alert("Invalid QR")
          }
          else{
            axios.post(`${process.env.REACT_APP_API_URL}/isAttended`,{email:a[1],eventId:a[2]}).then(res=>{
              window.alert(res.data)
            })


          }
      }
      
    });
    qrScanner.start();
  }
  
  return (
    <div className="App">
      <div ><button className='button' onClick={e=>main()}>
      start
      </button></div>
      <div className='video'><video id='video'></video></div>
    </div>
  );
}

export default Scanner;

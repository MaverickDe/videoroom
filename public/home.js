

(async ()=>{


    const main = document.querySelector(".main")
    
    const submain = document.querySelector(".sub-main")
    const submaindiv = submain.querySelectorAll(".sub-main1")

    const  options = document.querySelector(" .options")
    const  connected_users= document.querySelector(" .connected-users")
    const  comment_users = document.querySelector(" .comment_users")
    const room= document.querySelector(".room")


    const maindiv = [main,...submaindiv]
    let clientxx 
    let timeStampxx
    let clientyy


    
    document.addEventListener("touchstart",e=>{
      clientxx = e.changedTouches[0].clientX
      clientyy = e.changedTouches[0].clientY
timeStampxx=e.timeStamp
    //   comment_users.style.position= `absolute`
    
        
    
    })
    let clientmovexx 
   
    document.addEventListener("touchmove",e=>{
      clientmovexx = e.changedTouches[0].clientX

      


        
    })


    document.addEventListener("touchend",e=>{

       let  time =e.timeStamp-timeStampxx
       let y  =Math.sqrt((e.changedTouches[0].clientY-clientyy)**2)

       

        if( clientmovexx==undefined  || time>=300 || y>50 ){
         
            clientmovexx  =undefined
            clientxx = undefined
            
               return

        }
        
        if( clientxx >=window.innerWidth-100  ){
            if(Math.sign(clientmovexx-clientxx) == -1  ){

                comment_users.classList.add("comment_users_active")
                options.classList.remove("options_active")
            }else{
                comment_users.classList.remove("comment_users_active")
                
            }
            
        }
        if( clientxx <=50 ){
            if(Math.sign(clientmovexx-clientxx) == 1  ){
                
                comment_users.classList.remove("comment_users_active")
                options.classList.add("options_active")
            }else{
              options.classList.remove("options_active")

            }

        }
        clientmovexx  =undefined
        clientxx = undefined
       
    })
   
    
    function err(msg){
        let errdiv = document.querySelector(".notification")
    errdiv.style.display="flex"
    errdiv.style.color="red"
    // errdiv.style.backgroundColor="red"
    errdiv.innerHTML=msg
    setTimeout(e=>{
        
        errdiv.style.color=null
        errdiv.style.display="none"
        },2000)
        
    }
    function notification(msg){
        let notdiv = document.querySelector(".notification")
        notdiv.style.display="flex"
        notdiv.innerHTML=msg
        setTimeout(e=>{
            
            notdiv.style.display="none"
            },2000)
            
        
    
    }
    function   lilnotification(msg){
        let notdiv = document.querySelector(".lilnotification")
        notdiv.style.display="flex"
        notdiv.innerHTML=msg
        setTimeout(e=>{
            
            notdiv.style.display="none"
            },2000)
            
        
    
    }
    

   

    const online_indicator = document.querySelector(".online_indicator")
    const online_indicator_test = document.querySelector(".online_indicator_test")
    // document.querySelector(".online_indicator::after").style.content="offline"
    // console.log(window.getComputedStyle(online_indicator,":after"))

    
    const checkOnlineStatus = async () => {
     return   new Promise(async (res,rej)=>{
            try {
                const online = await fetch("https://kit.fontawesome.com/8c12befb35.js");
               
                res( online.status >= 200 && online.status < 300);
              } catch (err) {
                 
                res(false);
              }
        })
       
      };

  
     async function network(){
        let fg =  await checkOnlineStatus()
      
        if(!fg){
            notification(`<h2>Err</h2><p>Network Problem</p><p>your network might has being disconnected</p><p>try</p><ol><li>Refresh The Page</li><li>Check your network provider</li></ol>`)
            // console.log(checkOnlineStatus())
            return false
        }

        return true
      }
    

     
         let countt=0
  async  function  onlinestat(time){
      countt++
      if(countt>9){
          countt=0
      }
  
        let net =   await checkOnlineStatus()
      
        if(!net){
            online_indicator.style.backgroundColor="red"
            online_indicator_test.style.display="offline"
    
            if((countt== 3 || countt== 6 ||countt== 9) && insession){
               
               lilnotification("<p>network disconnected</p><p>try connecting your network or you will disconnected from the room</p>")
            }
            if (countt ==9){

                console.clear()
            }
          
            online_indicator.style.backgroundColor="red"
            online_indicator.classList.add("blink")
            online_indicator_test.innerText="offline"
            online_indicator_test.style.display="inline-block"
           
        }else{
            online_indicator.classList.remove("blink")
            online_indicator.style.backgroundColor="blue"
            online_indicator_test.style.display=null
            online_indicator_test.innerText="online"
            
        }
      

    }
    
    let change = true
  async  function checkonline()
    {
        change = false
     let bb =   await onlinestat()
change = true
       
    }


    setInterval(()=>{if(change){
       
        checkonline()
    }

    },3000)
    



    let   socket =io()
    let insession = false
    let eventtt = {};
    let localstream;
    let localstreamaudio  ;
    
    
    let typpe;
    let myname;
    let   myinformation ;
    let items=[]
    let recorder
    let recordstart=false
    let auddd={}
    
    // console.log(returnemptydiv())
    
    let peercon = []
    class rtcperr{
        constructor(){
            this.config= {
                iceservers:[
                    {"urls":[ 
                    "stun:stun.l.google.com:19302",
                    "stun:stun1.l.google.com:19302",
                    "stun:stun2.l.google.com:19302"
                ]
                    
                
                }
                ]
            }
            this.rtc=new RTCPeerConnection(this.config)
        }
    
        addstream(){
    
       
          
    
    
            this.streams = []
            for(const tracks of localstream.getTracks()){
                this.rtc.addTrack(tracks,localstream)
            }
           
    
    
            this.rtc.ontrack = e=>{
               
    
    
                console.log(e.streams,"streammmmmmmmmm")
    
              
                let stream  =this.streams.find(a => a.stream==e.streams[e.streams.length-1])
                if(stream){
                  
                    stream.stream=e.streams[e.streams.length-1]
    
    
                    stream.videotag.srcObject=e.streams[e.streams.length-1]
    
    
    
                  
                 
                    videoclick (stream.videotag)
                    if( returnumepmtydiv(localstreamaudio  ,stream.stream)!="" && this.type=="create_room"){
                    
    
                        returnumepmtydiv(localstreamaudio  ,stream.stream).forEach(e=>{
                           let vid =  e.querySelector("video")
                           
                            let user =  peercon.find(e=>e.streams[e.streams.length-1].stream==vid.srcObject)
                         
                            let answerid =user.id
                            
                          let offerid = this.id
                            send("negotiateoffer",{answerid,offerid,id:offerid})
                            send("negotiateanswer",{answerid,offerid,id:answerid})
                           
    
    
                        })
                    }
                   
                    this.audioanalysis()
    
                }else{
                    if(main.querySelector("video")&& main.querySelector("video").srcObject==localstreamaudio&& maindiv.filter(e=>e.querySelector("video")).length==1 && peercon.length<2){
                        let videoo = main.querySelector("video")
                        main.removeChild( videoo)
                        maindiv[1].appendChild( videoo)
                        audioanalysis(undefined,videoo)
    
                    }
               
                    let videotag= createelemnt()
                  let   div = returnemptydiv()
                  videotag.srcObject=e.streams[e.streams.length-1]
                  div.appendChild(videotag)
                  this.streams.push({
                      stream:e.streams[e.streams.length-1],
                      videotag,
                      div
                      
                    })
                    
                }
    
            
            }
    
               
    
        }
        audioanalysis(){
            audioanalysis(this)
    
        }
    
    
        setid(id){
            this.id=id
        }
    
        appendstream(stream){
            for(const tracks of stream.getTracks()){
                this.rtc.addTrack(tracks ,e,srcObject)
            }
    
    
        }
    
    
        
        addicecandidate(candidate){
            this.rtc.addIceCandidate(candidate)
    
        }
        createcandidate(ee){
    
            
            this.rtc.onicecandidate = e=>{
                if (e.candidate === null){
                  
                    return
                }
             
               send("iceCandidate",{icecandidate:e.candidate,id:ee})
            }
        }
    
        _createoffer(ee){
            this.id=ee
    
    
    
            this.rtc.createOffer(offer=>{
                this.rtc.setLocalDescription(offer)
                send("offer",{offer,id:ee})
    
    
            },(e)=>{console.log(e)
            })
        }
    
        setoffer(offer){
             
            this.rtc.setRemoteDescription(offer)
        }
    
        setanser(answer){
            this.rtc.setRemoteDescription(answer)
    
        }
    
        createans(ee){
     
            
            this.rtc.createAnswer(answer=>{
                send("answer",{answer,id:ee})
    
               this.rtc.setLocalDescription(answer)
    
            },(e)=>{console.log(e)})
        }
    }
    
            
    
    
    
                function loader(){
                   [ ...maindiv].forEach(e=>{
                        if(!e.querySelector("video")){
                    e.classList.add("loader")
                    return 
                }
                e.classList.remove("loader")
    
                    })
                }
    
                loader()
                function controll(){
                    maindiv.forEach(e=>{
    
               
                        const d =  e.querySelector(".user_controls")
                          e.addEventListener("mouseenter",e=>{
                              d.style.display='flex'
                             
                          })
                          e.addEventListener("mouseleave",e=>{
                              d.style.display="none"
                          })
                      })
    
                }
    
           
    // ondragstart
    
    // const  comment_users= document.querySelector(" .comment_users")
    

            
    
    let g = 0
            document.addEventListener("click",e=>{
                
    
               let time = e.timeStamp-g
             
               if(time<=300 && e.x <=50){
                    options.classList.toggle("options_active")
                    comment_users.classList.remove("comment_users_active")
                 
               }
               if(time<=300 && e.x >=(window.innerWidth-50)){
                comment_users.classList.toggle("comment_users_active")
                options.classList.remove("options_active")
                  
               }
               g = e.timeStamp
            })
    
    
    
    
    
    
           function audioanalysis(obj,vidd,type){
         
            
    let aud ={
        iniliaseaudiocontext:()=>{
            aud.AudioContext =new AudioContext()
            aud.videos = videos
            aud.src= aud.AudioContext.createMediaStreamSource(aud.src)
           },
           analise:()=>{
            aud.analyser=aud.AudioContext.createAnalyser()
            aud.src.connect(aud.analyser)
           if( obj ){
    
               aud.analyser.connect(aud.AudioContext.destination)
           }
    
           }
    
    ,
    
        fftdata:()=>{
            aud.analyser.fftSize=512
          let arra=  new Uint8Array(aud.analyser.frequencyBinCount );
    
            aud.analyser.getByteFrequencyData(arra)
          return   arra
           }
    
    }
            
     
     
                
     
                     
                    
                        
                        let videos;
                        let srcObject ;
                        if(obj){
    
                             videos  =obj.streams[0].videotag
                             srcObject=obj.streams[0].stream
                           
                        }else{
                            videos= vidd
                            srcObject=localstream
                        }
                        
                        aud.src=srcObject
                 
                    if(videos){
    
                      let  audd;
              
    
                        let a =`
                        <div class="speechanalysis"></div>
                        <div class="recordindicator"></div>
                        <div class="user_controls">
                            <button class="recorduser"><i class="fa-solid fa-record-vinyl "></i></button>
                            
                            <button class="pause-audio"><i class="fa-solid fa-microphone-slash "></i></button>
                            <button class="pause-video">    <i class="fa-solid fa-video-slash "></i></button>
                           
                        </div>`
                    
                    
                     aud.iniliaseaudiocontext()
                     aud.audioanalise ={}
                    let audd2;
                     if(obj){
                         if(obj.record){
                             if(
                                 obj.record.recorderstate){

                                     obj.record.download.recorder.stop()
                             
                             }
                             console.log("auddddddddddddddd",obj.record,"SSSSS")
                         }
                         obj.record = {}
                        audd2 = obj.record 

                         
                     }else{
                        
                        if(auddd.recorderstate){
                            auddd.download.recorder.stop()
                        }
                        auddd={};
                        audd2 =  auddd
                     }
                    // audd.srcstream()
                    
                    aud.analise()
                        let div = videos.parentElement
    
                        div.innerHTML=""
                        div.innerHTML=a;
    
                        // div.querySelector(".user_controls").style.zIndex = 2
                       div.appendChild(videos)
                       controll()
                       loader()
                     
                    const speechanalysis =  div.querySelector(".speechanalysis")
                    const pause_audio=  div.querySelector(".pause-audio")
                    const pause_video=  div.querySelector(".pause-video")
                    const recoreduser = div.querySelector(".recorduser")
                    const recordindicator = div.querySelector(".recordindicator")
                    let isvideo = true
                    let isaudio = true
                    function pauseaudio(e)
                        {
                            e.target.classList.toggle("svg")
                            isaudio = !isaudio
                            srcObject.getAudioTracks()[0].enabled=isaudio
                           
                    }
                    // pause_audio.removeEventListener("click",pauseaudio)
                    pause_audio.addEventListener("click",pauseaudio
                    )
                    
                
                     function pausevideo(e){
                        e.target.classList.toggle("svg")
                        isvideo= !isvideo
                     
                        srcObject.getVideoTracks()[0].enabled=isvideo
                    }
                    // pause_video.removeEventListener("click",pausevideo)
                    pause_video.addEventListener("click",pausevideo)
                  audd2.recorderstate = false
    
                  
    
    
     function recordd (e){
     
    e.target.classList.toggle("svg")
    audd2.recorderstate  = !audd2.recorderstate
    
    
      const recorder = new MediaRecorder(srcObject)
    //   audd2.recorder=recorder
    // console.log(recorderstate,"state")
    
    
    
    
    if(!audd2.recorderstate ){
    audd2.download.recorder.stop()

    
    
    }
    
    if(audd2.recorderstate  ){ 
        recordindicator.style.display="block"
    
    audd2.download={}
    audd2.download.recorder=recorder
    audd2.items =[]
    
    audd2.download.recorder.ondataavailable= e=>{
    audd2.items.push(e.data)
   
    if( audd2.download.recorder.state=="inactive" ){ 
    
    
    var blob2= new Blob(audd2.items, {type:"video/mp4"})
    let url =URL.createObjectURL(blob2)
    
    audd2.download.blob2=blob2
    audd2.download.url=url
    download(audd2.download.url,"lll")
    recordindicator.style.display="none"
    recorderstate=false
    }
    
    
    
    
    
    }
    
   
    audd2.download.recorder.start()
    
    
      
    }
    }
                    // recoreduser.removeEventListener("click",recordd)
                    recoreduser.addEventListener("click",recordd)
                    
    
    
         
    
    
    
          const canvas = document.createElement("canvas")
          canvas.style.width = `100%`
          canvas.style.height = `100%`
      
          canvas.style.backgroundColor="green"
          
          
          
          speechanalysis.innerHTML=""
          speechanalysis.appendChild(canvas
          )
    
          maindiv.forEach(e=>{
              if(!e.querySelector("video")){
                  
                  e.innerHTML=a
              }
          })
          
          audd2.canvas=canvas
          audd2.ctx = audd2.canvas.getContext("2d");
        _canvas(audd2)
    //  setInterval(()=>{_canvas(audd2)},2000)
    
                
             
               
                
    
                  
    
    
                   
       
        function _canvas(audd){
            
            
            audd.ctx.clearRect(0,0,audd.canvas.width,audd.canvas.height)
           
     
    
            const  arra = aud.fftdata()
            
       
    
       for(i=0;i<arra.length;i++){
       
           audd.ctx.fillStyle="red"
        audd.ctx.fillRect(i,audd.canvas.height-arra[i],10,arra[i])
        audd.ctx.fill()
       }
       
       
    requestAnimationFrame(()=>{_canvas(audd)})
    //  setInterval(,2000)
         
        }
    
    
             } 
            }
    
    
          
    
            const file = [new File(["hello"],`photo_${new Date()}.txt`,{type:"text/plain"})]
           let  blob = new Blob(["hello"],{type:"text/plain"})
    
           function download(url,l)
           {
    
          
           
          
    
            const a =document.createElement("a")
            a.href=url
            a.setAttribute("download","download_conf_video"+new Date())
            a.click()}
    
            function addclass(e,[...arg],){
               
    
                e.classList=["_createandjoin"]
                e.classList.add(...arg)
                   
                _createandjoinfun()
    
            }
    
          const  create_room=document.querySelector(".create-room")
          
    
    
          create_room.addEventListener("click",e=>{
    
              createandjoin.style.display="flex"
              addclass(createandjoin,["create-room","input-room-name"])
             
          })
         
          const  join_room=document.querySelector(".join-room")
          
          join_room.addEventListener("click",e=>{
         
              createandjoin.style.display="flex"
              
              addclass(createandjoin,["join-room","input-room-ID"])
          })
    
          const inputclose = document.querySelector(".inputclose")
    
          inputclose.addEventListener("click",e=>{
            createandjoin.style.display="none"
    
          })
          
    
           let createandjoinnamevalue =""
           let userid = ""
    
           const  createandjoinroomname = createandjoin.querySelector(".roomname")
           const  createandjoinname = createandjoin.querySelector(".name")
           const  createandjoindescription = createandjoin.querySelector(".description")
    
    
    createandjoin.addEventListener("click",e=>{
        options.classList.remove("options_active")
        comment_users.classList.remove("comment_users_active")
      
    })
    
            createandjoin.querySelector("button").addEventListener("click", async (e)=>{
                e.preventDefault()
                if(insession){
                    return
                }
                let dd = await network()
              
                if(!dd){
                    return
                   }
               
                if(createandjoindescription.value==""||createandjoinname.value=="" || createandjoinroomname.value==""){
                    notification("input all fields")
                    return
                }


                options.classList.remove("options_active")
                comment_users.classList.remove("comment_users_active")
              
    
                myname =createandjoinname.value
                createandjoinnamevalue =createandjoinname.value
                userid = new Date().getTime()
              await  initmedia(createandjoin.classList[1],{roomnameid:createandjoinroomname.value,name:createandjoinname.value,description:createandjoindescription.value })
          
                
               
    
                createandjoin.style.display='none'
               
             
                if(createandjoin.classList[1]=="create-room"){
                    
                    setcreatecall("create")
                    typpe ="host"
                   
                }
                if(createandjoin.classList[1]=="join-room"){
             
                   
    
                    
                    setcreatecall("join")
                    
    
                }
    
            })
    
    
         
    
    
            // async function fetch(type,message,method){
    
            // }  
             
            
            // setInterval(()=>{console.log(roomid)},1000)
    
        async function send(type,message){
                message.name=createandjoinnamevalue
                let fg =  await checkOnlineStatus()
      
                  if(!fg){
                      notification("your network is disconnected")
                     
                      return
                  }
              
                let msg = message
            
                if(  myinformation){
                   msg = {...message, senderid:myinformation.id,roomid:myinformation.roomid, name:myinformation.name,myinformation:myinformation}
                }
    
             
               
               
                socket.emit(type.toString(),JSON.stringify(msg))
    
    
            }      
            
            
            
          
    
    
    
            function documentunclick(a,b){
               
    
    
                function ee(e){
                    let targ =e.target!=a && e.target!=b
    
                  
                    if(targ){
                        document.removeEventListener("click",eventtt.ee)
                        console.log(e.target,a,b)
                        
                        a.style.display="none"
                        
                       
                        
                        document.removeEventListener("click",ee)
                    }
                }
                
                
                document.addEventListener("click",ee )
                eventtt = {ee:ee} 
                
            }
    
    
    
    
           
    const exit_room = document.querySelectorAll("._exitroom")
    const blockuser = document.querySelector(".connected-users").querySelectorAll("button")
    
    
    
    
    
    function setcreatecall(e)
    {
    if(e=="create"){
        exit_room.forEach(e=>{
            e.innerText="Close room"
            e.classList.add("closeroom")
        })
        create_room.style.display="none"
        return
    }
    if(e=="join"){
        create_room.style.display="none"
        join_room.style.display="none"
     
    
        return
    
    }
    
    join_room.style.display=null
    create_room.style.display=null
    document.querySelector(".des").innerText=""
  
    
    exit_room[0].innerHTML=`<i class="fa-solid fa-person-walking-arrow-right fa-xl">`
    exit_room[1].innerHTML="Exit room"
    }
    
    
    function initmedia(type,message){
        navigator.getUserMedia({video:{  frameRate:24,
            facingMode:"user",
            
            aspectRatio:1.3333
            
        },audio:true },(stream)=>{localstream=stream
           
            navigator.getUserMedia({video:{ facingMode:"user",width:1000, aspectRatio:1.3333}},e=>{
                localstreamaudio  = e
                let   videotag;
                
                 videotag= createelemnt()
                
                // let stream = medi
                
                videotag.srcObject=e
                main.appendChild(videotag)
               
    
                audioanalysis(undefined,videotag)
    
                send(type,message)
                insession= true
               
            },e=>{
                console.log(e)
    
            })
            
          
        },(err)=>{console.log(err)})
    }
    
    
    
    
    
    function  create(e){
    
        let id =  e.id
       
       
           const rtc = new rtcperr()
           rtc.type="create_room"
           rtc.addstream(id)
           rtc._createoffer(id)
           rtc. createcandidate(id)
        //    rtc.audioanalysis()
           
    
           peercon.push(rtc)
    
    
    
       
        }
    
    
    
    function returnuser(id){
     return peercon.find(user=>user.id.toString()==id.toString()
    
        )
    
    }
    
    
    
 
    function returnemptydiv(){
       
  
    
    return maindiv.find(e=>!e.querySelector("video"))
    
    
    
      
    }
    
    function returnumepmtydiv(a,b){
    
    
    
    
    
       return maindiv.filter(e=>{ if(e.querySelector("video") && e.querySelector("video").srcObject!=a && e.querySelector("video").srcObject!=b){
    
         
            
            return true
        }
        else{
            return false
        }
        
    
        })
   
            
    }
    
    
    
    
    console.log(returnemptydiv())
    console.log(!main.hasChildNodes("video"))
    
    
    
    
    
    
    function createelemnt(){
        let video =  document.createElement("video")
        video.setAttribute("autoplay","autoplay")
       
        return video
      }
    
    console.log(document.querySelector("._exitroom"))
    function reset (){
       
        
         insession = false

    
           
        
        if(recordstart){
            recorder.stop()
          
           
        }
        let b =`
        <div class="speechanalysis"></div>
        <div class="recordindicator"></div>
        <div class="user_controls">
            <button class="recorduser"><i class="fa-solid fa-record-vinyl "></i></button>
            
            <button class="pause-audio"><i class="fa-solid fa-microphone-slash "></i></button>
            <button class="pause-video">    <i class="fa-solid fa-video-slash "></i></button>
           
        </div>`
        if(peercon!=""){
            peercon.forEach(e=>{
                room.innerHTML=""
                if(e.rtc){
                    e.rtc.close()
                }
                
                
               maindiv.forEach(a=>{
                    if(a.querySelector("video")==e.streams[0].videotag){
                       
        
                        a.innerHTML=b
                    }
                    
                })
    
                
                
            })
        }
        if(submaindiv[0].querySelector("video")){
    
            
            submaindiv[0].innerHTML=b
        }
        if(main.querySelector("video")){
    
         
           main.innerHTML=b
        }
        controll()
     
        let gg  =     [localstream,localstreamaudio]
    
    gg.forEach(e=>{
        if(e){

            e.getTracks().forEach(e=>{
                if(e.readyState=="live"){
                    e.stop()
                }
            })
        }
           
    
        })
        document.querySelector(".link").innerText=""
      
        setcreatecall(null)
         localstream = undefined;
     localstreamaudio=undefined
    
    
     typpe = undefined
     myname =undefined
      myinformation = undefined
      loader()
      document.querySelector(".des").innerText="Create a video room"
      document.querySelector(".room").innerText="Video room"
    }
    document.querySelectorAll("._exitroom").forEach(e=>{e.addEventListener("click",e=>{
       if(!insession){
           return
       }
        if(e.target.classList.length==2){
            send("closeroom",{user:"close"})
        }else{
            
            send("userleft",{user:"left"})
        }
        reset()
       
        peercon=[]
        document.querySelector(".connected-users").innerHTML=" <h4>Connected Users</h4>"
        
        
        _message_.innerHTML=""
        insession = false
    
        // send("exitroom","exitroom")
    
    
    
    })})
    
    
    
    
    
    
  
    
    
    
    
    
    const  _message_ = document.querySelector("._message_")
 
    function sendmsg(e){
        let textarea = document.querySelector("textarea")
        if(peercon!=" " &&  textarea.value!= ""){
            send("message",{message:textarea.value})
    
         let fieldset =  document.createElement("fieldset")
  
         fieldset.innerHTML=
         `
            
            <legend class =`+`${myinformation.id}`+`>${(()=>{if(_message_.children.length!=0 && _message_.children[_message_.children.length-1].querySelector("legend").getAttribute("class")==myinformation.id){return""}return "Me"})()}</legend>
            <p>
          ${textarea.value}
    
            </p>
       
            `
            textarea.value=""
    let  p = fieldset.querySelector("p")
    p.style.borderBottomLeftRadius="10px";
    p.style.  backgroundColor="grey"
    p.style.borderTopLeftRadius= "20px";
    p.style.borderBottomRightRadius="0px";
    p.style.borderTopRightRadius= "0px";
    
    fieldset.style.alignItems="flex-end";
    
    _message_.appendChild(fieldset)
    
        }
    }
    document.querySelector(".send").addEventListener("click",sendmsg)
    document.querySelector("textarea").addEventListener("keypress",e=>{
        if(e.key=="Enter"){
            sendmsg()
        }
    })
    
    

    
    
    socket.on("allusernotification",e=>{
        let _e=JSON.parse(e)
        notification(_e.notification)
    
    })
    socket.on("notification",e=>{
        let _e=JSON.parse(e)
        notification(_e.notification)
    
    })
    
    socket.on("err",e=>{
        let _e=JSON.parse(e)
        err(_e.err)
        if(_e.type=="refresh"){
            reset()
        }
    
    })
    
    socket.on("message",e=>{
      
        let _e=JSON.parse(e)
       
        let fieldset =  document.createElement("fieldset")
     
        fieldset.innerHTML=
        `
           
           <legend class=${_e.myinformation.id}>${(()=>{if(_message_.children.length!=0 &&_message_.children[_message_.children.length-1].querySelector("legend").getAttribute("class")==_e.myinformation.id){return""}return _e.name})()}</legend>
           <p>
         ${_e.message}
    
           </p>
      
           `;
       
           _message_.appendChild(fieldset)
         

msnot(_e)


         
      
    })

    function msnot(msg){
        let body = document.querySelector(".body")
        let msnot = document.createElement("div")
        msnot.setAttribute("class","message_not")
        msnot.animate(
        [
        {right:`${Math.random() * 10}px`,
        opacity:1,
        top:"100%"
    
    
    },
        {right:`${Math.random() * 100}px`},
        {right:`${Math.random() * 200}px`},
        {right:`${Math.random() * 70}px`,opacity:0.5},
        {top:`20%`,opacity:0.2},
        {display:"none"},
        
        
    ],
    {
        duration:5000,
        fill:"forwards",
        easing:"linear",
        // iterationCount:"infinite"
    })
    msnot.innerHTML=`
    <img src="imgs/bag1.jpg" alt="john">
    <div ><span>${msg.name}</span></div>`
    body.appendChild(msnot)

    setTimeout(e=>{
        body.removeChild(msnot)

    },5000)
 

    }
    
  
    socket.on("name",e=>{
        let _e=JSON.parse(e)
       
        let div = document.createElement("div")
        let innerHTML=`
        
                        <img src="imgs/bag1.jpg">
                        <p >${_e.name}</p>
                        <h5 style="margin-right: 10px;">user</h5>
                        
    
                      
                        
    `;
    
    if(typpe){innerHTML+= ` <button class="block"> block user</button>
    `;
    

} ;
    
   
    div.setAttribute("class",_e.id)
    
    // setInterval(()=>{console.log(type)},1000)
                        div.innerHTML=innerHTML

                        if(div.querySelector(".block")){
                         
                            div.querySelector(".block").addEventListener("click",e=>{
                                send("block",{id:_e.id})
                            }) 
                        }
    
                    connected_users.appendChild(div)
    
    })

    socket.on("block",e=>{
        document.querySelector("._exitroom").click()
    })
    
    // videoclick ()
    function videoclick (e){
        videoclickk = 0
       
    
            e.addEventListener("click",e=>{
               let parent = e.target.parentElement
        
                let time = e.timeStamp - videoclickk
              
            
                if(time <= 300   && parent!= main && parent!=submaindiv[0]){
            
                  let rtc =  peercon.find(a=>a.streams[0].stream  == e.target.srcObject)
                  let mainrtc =  peercon.find(a=>{if(main.querySelector("video") && a.streams[0].stream  == main.querySelector("video").srcObject ){return true}return false})
            
          
            let rtcvideo 
            let mainvideo 
            let streams1 
          
            
           
            
            if(mainrtc){
    
                rtcvideo = rtc.streams[0].videotag
                mainvideo = mainrtc.streams[0].videotag
                streams1 = rtcvideo.srcObject
                let streams2 = mainvideo.srcObject
                mainrtc.streams[0].div =parent
                mainvideo.srcObject=streams1
                mainrtc.streams[0].videotag =rtcvideo
                
                rtcvideo.srcObject=streams2
                rtc.streams[0].videotag= mainvideo
                
                
                
               
            }
            else{
                rtc.streams[0].div.removeChild(rtc.streams[0].videotag)
                main.appendChild(rtc.streams[0].videotag)
                
            }
            rtc.streams[0].div= main
            
            
                  rtc.audioanalysis()
                  if(mainrtc){
    
                      mainrtc.audioanalysis()
                  }
                }
                videoclickk =e.timeStamp
            })
        
    }
    
    
    socket.on("closeroom",e=>{
        reset()
        peercon=[]
        document.querySelector(".connected-users").innerHTML=" <h4>Connected Users</h4>"
        
        
        _message_.innerHTML=""
         
        
    })
    
    
    socket.on("userleft",e=>{
        let _e=JSON.parse(e)
   
        peercon.forEach(e=>{
            if(e.id==_e.id){
              
    
                let connectedusers =  document.querySelector(".connected-users")
                connectedusers.querySelectorAll("div").forEach(e=>{
                    if(e.getAttribute("class")==_e.id){
                        connected_users.removeChild(e)
                    }
                })
    
              
                let div = e.streams[0]
     div.div.innerHTML=`
     <div class="speechanalysis"></div>
     <div class="recordindicator"></div>
     <div class="user_controls">
         <button class="recorduser"><i class="fa-solid fa-record-vinyl "></i></button>
         
         <button class="pause-audio"><i class="fa-solid fa-microphone-slash "></i></button>
         <button class="pause-video">    <i class="fa-solid fa-video-slash "></i></button>
        
     </div>
     `
    
    peercon.splice(peercon.indexOf(e),1)
    
    
            }
        })
        controll()
    
    })
    
    let mutevideo = true
    let muteaudio = true
    document.querySelector(".mute_video").addEventListener("click",e=>{
        if(localstreamaudio){
            mutevideo =!mutevideo
            localstreamaudio.getVideoTracks()[0].enabled=mutevideo
        }
    })
    document.querySelector(".mute_audio").addEventListener("click",e=>{
        if(localstreamaudio){
            muteaudio =!muteaudio
            localstreamaudio.getVideoTracks()[0].enabled=mutevideo
        }
    })
    
    
    
    document.querySelector(".recored").addEventListener("click",async e=>{
   
        if(localstreamaudio ){
            recordstart=!recordstart
    
            if(recordstart){
               
    
    
                let record =  await navigator.mediaDevices.getDisplayMedia({
                      audio: true, 
                      video: { mediaSource: "screen"}
                  });
             
                  if(record){
                    e.target.classList.add("svg")
                      
                       recorder = new MediaRecorder(record)
                      
                      
                       recorder.ondataavailable= e=>{
                           items.push(e.data)
                           if(recorder.state=="inactive" ){ 
                               
                               var blob2= new Blob(items, {type:"video/mp4"})
                             
                            let   blob=URL.createObjectURL(blob2)
                               download(blob)
                               // recorder=undefined
                               recordstart=undefined
                               document.querySelector(".recored").classList.remove("svg")
                               
                               recorder=undefined
                               items=[]
                              
                                
                               record.getTracks().forEach(e=>{
                                    if(e.readyState=="live"){
                                        e.stop()
                                    }
                                })
                        
                            
                             
                       }
                       
                       
                       
                    }
                    
                    recorder.start()
           
                       
           
                      
            }
            
        }
        if(!recordstart){
            recorder.stop()
           
    
    
        }
        if(!recorder){
            recorder.stop()
            document.querySelector(".recored").classList.remove("svg")
            recorder=undefined
            items=[]
        }
      
       
        }
    })



    document.querySelector(".copy-link").addEventListener("click",e=>{
        let link=document.querySelector(".link")
        if(link.innerText!=""){
            navigator.clipboard.writeText(link.innerText)
        }

    })
    
    socket.on("masterid",(e)=>{
        let _e=JSON.parse(e)
        let masterid=JSON.parse(e).masterid
  
        let div = document.createElement("div")
        // console.lof(e)
        div.innerHTML=`
        
                        <img src="imgs/bag1.jpg">
                        <p>${_e.name}</p>
                        <h5 style="margin-right: 10px;">host</h5>
    
    
                      
    
                    `;
    
                    connected_users.appendChild(div)
    
     
       let rtc = new rtcperr()
       rtc.setid(masterid)
       rtc.type="join_room"
       rtc.addstream()
       rtc.createcandidate(masterid)
       
        peercon.push(rtc)
    
    
    })
    
    
    
    socket.on("negotiateoffer",_e=>{
        let e=JSON.parse(_e)
        let id =  e.answerid
       
           const rtc = new rtcperr()
           rtc.type="join_room"
           rtc.addstream(id)
           rtc._createoffer(id)
           rtc. createcandidate(id)
           
    
           peercon.push(rtc)
    
    })
    socket.on("negotiateanswer",e=>{
        let _e=JSON.parse(e).offerid
       
        let rtc = new rtcperr()
        rtc.setid(_e)
        rtc.type="join_room"
        rtc.addstream()
        rtc.createcandidate(_e)
        
         peercon.push(rtc)
    
    })
    
    
    socket.on("incoming_user",(_e)=>{
        let e=JSON.parse(_e)
       
        create(e)
    
        
    })
    
    socket.on("iceCandidate",(e)=>{
    let _e=JSON.parse(e)
   
    // console.log(e)
      let user =  returnuser(_e.senderid)
    //   console.log(user)
      
      user.addicecandidate(_e.icecandidate)
        
        
    })
    socket.on("offer",(e)=>{
        let _e=JSON.parse(e)
      
        let user =  returnuser(_e.senderid)
        // console.log(user,_e.senderid)
      
      user.setoffer(_e.offer)
      user.createans(_e.senderid)
        
        
    })
    socket.on("answer",(e)=>{
        let _e=JSON.parse(e)
      
        let user =  returnuser(_e.senderid)
        // console.log(_e)
      
      user.setanser(_e.answer)
        
        
    })
    socket.on("myinformation",(e)=>{
        let _e=JSON.parse(e);
        
       myinformation = _e.myinformation
       document.querySelector(".link").innerText=myinformation.roomid
       document.querySelector(".room").innerText=myinformation.roomname

       document.querySelector(".des").innerText=myinformation.description
      
       
        
        
    })
    
    socket.on("insession",_e=>{
    //   send()
    if(myinformation){
        send("insession",{...myinformation})
        return
    }
    send("insession",{insession:false})
    
    
    })
    
    socket.on("df",e=>{console.log(e)})
    
    
          
    


})()


    
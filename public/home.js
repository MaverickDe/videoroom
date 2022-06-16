

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
    
        
    console.log(e.timeStamp)
    })
    let clientmovexx 
   
    document.addEventListener("touchmove",e=>{
      clientmovexx = e.changedTouches[0].clientX

      


        
    })


    document.addEventListener("touchend",e=>{

       let  time =e.timeStamp-timeStampxx
       let y  =Math.sqrt((e.changedTouches[0].clientY-clientyy)**2)

        console.log(y,"Yyyyyyyyyy")
console.log(clientmovexx)
        if( clientmovexx==undefined  || time>=300 || y>50 ){
         
            clientmovexx  =undefined
            clientxx = undefined
            console.log("eeeeeeeeeeeeeeeeeeeeeeeeee")
               return

        }
        console.log("hellllllllllllllllo")
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
        console.log(Math.sign(clientmovexx-clientxx) == 1,clientxx,window.innerWidth-700)
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
        notdiv.innerText=msg
        setTimeout(e=>{
            
            notdiv.style.display="none"
            },2000)
            
        
    
    }
    
    
    const checkOnlineStatus = async () => {
     return   new Promise(async (res,rej)=>{
            try {
                const online = await fetch("https://kit.fontawesome.com/8c12befb35.js")
                ;
      
                res( online.status >= 200 && online.status < 300); // either true or false
              } catch (err) {
                res(false); // definitely offline
              }
        })
       
      };
     
  let fg =  await checkOnlineStatus()
      console.log(checkOnlineStatus())
    //   if(!fg){
    //       notification("your network is disconnected")
    //       console.log(checkOnlineStatus())
    //       return
    //   }

      
    
    // return
         


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
    
    console.log(returnemptydiv())
    
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
    
        //     this.rtc.addStream(localstream)
        //     this.rtc.onaddstream = e=>{
        //         let vid =   createelemnt()
        //         console.log(e ,"streamsssss")
        //         vid.srcObject=e.stream
        //             returnemptydiv().appendChild(vid)
        //        }
               
          
    
    
            this.streams = []
            for(const tracks of localstream.getTracks()){
                this.rtc.addTrack(tracks,localstream)
            }
           
    
    
            this.rtc.ontrack = e=>{
                console.log(e)
    
                // console.log(e.streams,"streammmmmmmmmmarrrrr")
                // this.videotag.srcObject=e.streams[e.streams.length-1]
    
    
                // 
    
                console.log(e.streams,"streammmmmmmmmm")
    
              
                let stream  =this.streams.find(a => a.stream==e.streams[e.streams.length-1])
                if(stream){
                    console.log(stream,"addedstreammmmmmmmmm")
                    stream.stream=e.streams[e.streams.length-1]
    
    
                    stream.videotag.srcObject=e.streams[e.streams.length-1]
    
    
    
                    console.log(returnumepmtydiv(localstream,stream.stream))
                 
                    videoclick (stream.videotag)
                    if( returnumepmtydiv(localstreamaudio  ,stream.stream)!="" && this.type=="create_room"){
                        console.log(returnumepmtydiv(localstream,stream.stream))
    
                        returnumepmtydiv(localstreamaudio  ,stream.stream).forEach(e=>{
                           let vid =  e.querySelector("video")
                            // for(const tracks of vid.srcObject.getTracks()){
                            //     this.rtc.addTrack(tracks,localstream,vid.srcObject)
    
                            // }
                            let user =  peercon.find(e=>e.streams[e.streams.length-1].stream==vid.srcObject)
                            console.log(user)
                            let answerid =user.id
                            
                          let offerid = this.id
                            send("negotiateoffer",{answerid,offerid,id:offerid})
                            send("negotiateanswer",{answerid,offerid,id:answerid})
                            // for(const tracks of vid.srcObject.getTracks()){
                            //     this.rtc.addTrack(tracks,localstream,stream.stream)
    
                            //     peercon.find(e=>e.streams.stream==vid.srcObject).addTrack(tracks,stream.stream)
                            // }
    
    
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
                    console.log(e.streams[e.streams.length-1],"streammmmmmmmmm")
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
    
            //     // console.log(returnemptydiv(),"rrrrrr",maindiv.find(e=>e.querySelector("video")==undefined),maindiv)
            //     // returnemptydiv().appendChild(this.videotag)
            }
    
                // if(returnumepmtydiv()){
                //     returnumepmtydiv().forEach(e=>{
    
                //         for(const tracks of e.srcObject.getTracks()){
                //             this.rtc.addTrack(tracks ,e.srcObject)
                //         }
                        
                //     })
                // }
    
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
    
            console.log("I  C    E",ee)
            this.rtc.onicecandidate = e=>{
                if (e.candidate === null){
                    console.log("nullllllllllllllllll")
                    return
                }
                console.log("notnullllllllllllllllll")
               send("iceCandidate",{icecandidate:e.candidate,id:ee})
            }
        }
    
        _createoffer(ee){
            this.id=ee
    
    
    
            this.rtc.createOffer(offer=>{
                this.rtc.setLocalDescription(offer)
                send("offer",{offer,id:ee})
    
    
            },(e)=>{console.log(e)})
        }
    
        setoffer(offer){
             
            this.rtc.setRemoteDescription(offer)
        }
    
        setanser(answer){
            this.rtc.setRemoteDescription(answer)
    
        }
    
        createans(ee){
            console.log(ee,"Eeeeeeeeeeeeee")
            
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
    
    console.log(comment_users)
            
    
    let g = 0
            document.addEventListener("click",e=>{
                console.log(e.timeStamp)
    
               let time = e.timeStamp-g
               console.log(time,"time")
               if(time<=300 && e.x <=50){
                    options.classList.toggle("options_active")
                    comment_users.classList.remove("comment_users_active")
                    console.log("toggle")
               }
               if(time<=300 && e.x >=(window.innerWidth-50)){
                comment_users.classList.toggle("comment_users_active")
                options.classList.remove("options_active")
                    console.log("toggle")
               }
               g = e.timeStamp
            })
    
    
    
    
    
    
           function audioanalysis(obj,vidd,type){
            //    class aud {
            //        constructor(videos){
            //            this.AudioContext =new AudioContext()
            //            this.videos = videos
            //            this.src= this.AudioContext.createMediaStreamSource(this.videos)
            //        }
            //        analise(){
            //         this.analyser=this.AudioContext.createAnalyser()
            //       this.src.connect(this.analyser)
            //       this.analyser.connect(this.AudioContext.destination)
                   
    
            //        }
            //        fftdata(){
            //         this.analyser.fftSize=512
            //       let arra=  new Uint8Array(this.analyser.frequencyBinCount );
        
            //         this.analyser.getByteFrequencyData(arra)
            //       return   arra
            //        }
    
            //    }
            
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
            // if(obj){
    
            //     aud = obj
            //     aud.iniliaseaudiocontext=()=>{
            //      aud.AudioContext =new AudioContext()
            //      aud.videos = videos
            //      aud.src= this.AudioContext.createMediaStreamSource(aud.streams.videotag.srcObject)
            //     }
            //     aud.analise=()=>{
            //      aud.analyser=aud.AudioContext.createAnalyser()
            //      aud.src.connect(aud.analyser)
            //      aud.analyser.connect(aud.AudioContext.destination)
     
            //     }
     
     
     
            //   aud.fftdata=()=>{
            //      aud.analyser.fftSize=512
            //    let arra=  new Uint8Array(aud.analyser.frequencyBinCount );
     
            //      aud.analyser.getByteFrequencyData(arra)
            //    return   arra
            //     }
     
            //    let videoss =aud.streams.div
     
     
     
                
     
                     
                     // const videos  =e.querySelector("video")
                    // }
                    // else{
                        
                        // }
                        
                        let videos;
                        let srcObject ;
                        if(obj){
    
                             videos  =obj.streams[0].videotag
                             srcObject=obj.streams[0].stream
                            // if(obj.type=="create_room"){
                            //     srcObject=localstream
                            // }
                        }else{
                            videos= vidd
                            srcObject=localstream
                        }
                        
                        aud.src=srcObject
                    // if(type){
    
                    //     videos.srcObject.getAudioTracks()[0].enabled=false
                    // }
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
                         console.log("auddddddddddddddd",auddd)
                        if(auddd.recorderstate){
                            auddd.download.recorder.stop()
                        }
                        auddd={};
                        audd2 =  auddd
                     }
                    // audd.srcstream()
                    
                    aud.analise()
                        let div = videos.parentElement
    if(obj){
    
        console.log(videos,videos.parentElement,div,obj.streams[0].div,"obobobobobo11111")
        console.log(videos.parentElement == obj.streams[0].div,"obobobobobo11111")
        console.log(videos == obj.streams[0].videotag,"obobobobobo11111")
    }
                        div.innerHTML=""
                        div.innerHTML=a;
    
                        // div.querySelector(".user_controls").style.zIndex = 2
                       div.appendChild(videos)
                       controll()
                       loader()
                       if(obj){
    
                        console.log(videos.parentElement == obj.streams[0].div,"obobobobobo22222")
                        console.log(div == obj.streams[0].div,"obobobobobo22222")
                        console.log(videos == obj.streams[0].videotag,"obobobobobo2222")
                        console.log(videos == div.querySelector("video"),"obobobobobo2222")
                    }
                    // console.log("kkk",videos.src,"lll",videos.srcObject,"eeee",e)
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
                            console.log("hello")
                    }
                    // pause_audio.removeEventListener("click",pauseaudio)
                    pause_audio.addEventListener("click",pauseaudio
                    )
                    
                    console.log(pause_video)
                     function pausevideo(e){
                        e.target.classList.toggle("svg")
                        isvideo= !isvideo
                        console.log("hello")
                        srcObject.getVideoTracks()[0].enabled=isvideo
                    }
                    // pause_video.removeEventListener("click",pausevideo)
                    pause_video.addEventListener("click",pausevideo)
                  audd2.recorderstate = false
    
                  
    
    
     function recordd (e){
        console.log("recoding")
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
    console.log(e.data)
    if( audd2.download.recorder.state=="inactive" ){ 
    
        console.log(audd2.items,audd2.items[0])
    var blob2= new Blob(audd2.items, {type:"video/mp4"})
    let url =URL.createObjectURL(blob2)
    
    audd2.download.blob2=blob2
    audd2.download.url=url
    download(audd2.download.url,"lll")
    recordindicator.style.display="none"
    recorderstate=false
    }
    
    
    
    
    
    }
    
    console.log(audd2.recorderstate,"jjjjjjj")
    audd2.download.recorder.start()
    
    
      
    }
    }
                    // recoreduser.removeEventListener("click",recordd)
                    recoreduser.addEventListener("click",recordd)
                    
    
    
          console.log(speechanalysis)
    
    
    
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
    
                
             
               
                
    
                  
    
    
                    
                    // console.log(videos.srcObject.getAudioTrack()[0])
    
    
        //             let audioContext = new AudioContext()
    
        //             let microphone=audioContext.createMediaStreamSource(videos.srcObject.getAudioTracks()[0])
        //             // let microphone=audioContext.createMediaElementSource(videos.srcObject.getAudioTrack()[0])
        //           let analyser=audioContext.createAnalyser()
        //           analyser.connect(microphone)
        //           analyser.connect(audioContext.destination)
                   
        // arra = new Uint8Array(analyser.frequencyBinCount );
        
        // analyser.getByteFrequencyData(arra)
       
        function _canvas(audd){
            
            
            audd.ctx.clearRect(0,0,audd.canvas.width,audd.canvas.height)
            // console.log(audd)
     
    
            const  arra = aud.fftdata()
            
       
    
        // console.log(arra)
       for(i=0;i<arra.length;i++){
        //    console.log(audd.canvas)
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
    
            console.log(l)
           
          
    
            const a =document.createElement("a")
            a.href=url
            a.setAttribute("download","download_conf_video"+new Date())
            a.click()}
    
            function addclass(e,[...arg],){
                console.log(arguments[1])
    
                e.classList=["_createandjoin"]
                e.classList.add(...arg)
                    console.log(e.classList,arg)
                // for(i=0;i<arguments[1].length-1;i++){
                //     e.classList.remove(e.classList[i+1] )
                   
                //    console.log(e.classList[i+1])
    
                    
                    
                // }
                // for(i=0;i<arguments[1].length;i++){
                  
                //     e.classList.add( arguments[1][i])
                    
                    
                    
                    
                // }
                _createandjoinfun()
    
            }
    
          const  create_room=document.querySelector(".create-room")
          
    
    
          create_room.addEventListener("click",e=>{
            //   documentunclick(createandjoin,create_room)
              createandjoin.style.display="flex"
              addclass(createandjoin,["create-room","input-room-name"])
             
          })
         
          const  join_room=document.querySelector(".join-room")
          
          join_room.addEventListener("click",e=>{
            //   documentunclick(createandjoin,join_room)
              createandjoin.style.display="flex"
              
              addclass(createandjoin,["join-room","input-room-ID"])
          })
    
          const inputclose = document.querySelector(".inputclose")
    
          inputclose.addEventListener("click",e=>{
            createandjoin.style.display="none"
    
          })
            //     join-room
            //   exit-room
        //    console.log(navigator.mediaDevices.getUserMedia({audio:true}),navigator)
        //    navigator.mediaDevices.enumerateDevices().then(e=>{e.forEach(e=>{console.log(e.kind,e.label)})})
    
           let createandjoinnamevalue =""
           let userid = ""
    
           const  createandjoinroomname = createandjoin.querySelector(".roomname")
           const  createandjoinname = createandjoin.querySelector(".name")
           const  createandjoindescription = createandjoin.querySelector(".description")
    
    
    
    
            createandjoin.querySelector("button").addEventListener("click", async (e)=>{
                e.preventDefault()
               
                if(createandjoindescription.value==""||createandjoinname.value=="" || createandjoinroomname.value==""){
                    notification("input all fields")
                    return
                }
    //             let fg =  await checkOnlineStatus()
      
    //   if(!fg){
    //       notification("your network is disconnected")
         
    //       return
    //   }
                // fetch(`${createandjoin.classList[2]}`,createandjoininput.value,"post")
    
                console.log(socket)
                console.log(createandjoin.classList[1])
                // ioinit(socket)
                myname =createandjoinname.value
                createandjoinnamevalue =createandjoinname.value
                userid = new Date().getTime()
              await  initmedia(createandjoin.classList[1],{roomnameid:createandjoinroomname.value,name:createandjoinname.value,description:createandjoindescription.value })
            //   let body ={}
                
               
    
                createandjoin.style.display='none'
               
                // main.srcObject=localstream
                if(createandjoin.classList[1]=="create-room"){
                    
                    setcreatecall("create")
                    typpe ="host"
                    // initpeercon("create")
                }
                if(createandjoin.classList[1]=="join-room"){
                //    let joincall = new rtcperr()
                   
    
                    
                    setcreatecall("join")
                    // initpeercon("join")
    
                }
    
            })
    
    
         
    
    
            async function fetch(type,message,method){
    
            }  
             
            
            // setInterval(()=>{console.log(roomid)},1000)
    
         function send(type,message){
                message.name=createandjoinnamevalue
                console.log(myinformation)
                let msg = message
            
                if(  myinformation){
                   msg = {...message, senderid:myinformation.id,roomid:myinformation.roomid, name:myinformation.name,myinformation:myinformation}
                }
    
                console.log(msg)
               
               
                socket.emit(type.toString(),JSON.stringify(msg))
    
    
            }      
            
            
            
          
    
    
    
            function documentunclick(a,b){
                // console.log(eventtt)
                // if(event){
    
                //     let targ =event.e.target==a || event.e.target==b
                //    if(targ){
                //        document.removeEventListener("click",event.ee)
                //    }
                // }
    
    
                function ee(e){
                    let targ =e.target!=a && e.target!=b
    
                    // if(e.target)
                    if(targ){
                        document.removeEventListener("click",eventtt.ee)
                        console.log(e.target,a,b)
                        
                        a.style.display="none"
                        
                        // if(event){
                            
                        // }
                        
                        
                        document.removeEventListener("click",ee)
                    }
                }
                
                
                document.addEventListener("click",ee )
                eventtt = {ee:ee} 
                
            }
    
    
    
    
            // function ioinit(socket){
            //     socket =io("/")
    
            //     socket.on("message",resolve)
            // }
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
        // blockuser.forEach(e=>{
        //     e.style.display="none"
        // })
    
        return
    
    }
    // blockuser.forEach(e=>{
    //         e.style.display=null
    //     })
    join_room.style.display=null
    create_room.style.display=null
    document.querySelector(".des").innerText=""
    // exit_room.forEach(e=>{
    //     e.innerText="Exit room"
    //     e.classList="_exitroom"
    // })
    
    exit_room[0].innerHTML=`<i class="fa-solid fa-person-walking-arrow-right fa-xl">`
    exit_room[1].innerHTML="Exit room"
    }
    
    
    function initmedia(type,message){
        navigator.getUserMedia({video:{  frameRate:24,
            facingMode:"user",
            // width:{min:300,ideal:720,max :500},
            aspectRatio:1.3333
            
        },audio:true },(stream)=>{localstream=stream
           
            navigator.getUserMedia({video:{ facingMode:"user",width:1000, aspectRatio:1.3333}},e=>{
                localstreamaudio  = e
                let   videotag;
                console.log(localstream,"kkkkkkkkkkkkkkkkkkkkkkkkkk")
                 videotag= createelemnt()
                
                // let stream = medi
                
                videotag.srcObject=e
                main.appendChild(videotag)
               
    
                audioanalysis(undefined,videotag)
    
                send(type,message)
               
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
    
    
    
    console.log(maindiv)
    function returnemptydiv(){
       
    //     let node
    //     maindiv.forEach(e=>{
           
    //        if(!e.querySelector("video")){
    
    //             node =e
    //            return 
    //        }
    
    //     })
    
       
    // return node
    
    return maindiv.find(e=>!e.querySelector("video"))
    
    
    //   return maindiv.find( e => !e.hasChildNodes("video"))
    
      
    }
    
    function returnumepmtydiv(a,b){
    
    
    
    
    
       return maindiv.filter(e=>{ if(e.querySelector("video") && e.querySelector("video").srcObject!=a && e.querySelector("video").srcObject!=b){
    
            // g.push(e)
            
            return true
        }
        else{
            return false
        }
        
    
        })
    //     console.log(e,"eeeeemaindiv",maindiv)
    //     let node = []
    //     maindiv.forEach(e=>{
    //         console.log(e.childNodes.values)
    //        if(e.querySelector("video")){
    
    //            node .push(e)
               
    //        }
    //     })
    
    //    if(node = " "){
    //        return false
    //    }
    // return node
            
    }
    
    
    
    
    console.log(returnemptydiv())
    console.log(!main.hasChildNodes("video"))
    // maindiv.find(e=>{
    //     e.cont
    // })
    
    
    
    
    
    function createelemnt(){
        let video =  document.createElement("video")
        video.setAttribute("autoplay","autoplay")
        // video.setAttribute("controls","controls")
        return video
      }
    
    console.log(document.querySelector("._exitroom"))
    function reset (){
        console.log(auddd)
        
         

            
        
        //    if(auddd.recorderstate){
        //        auddd.recorder.stop()
        //    }
           
        
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
                // if(e.record){
                //     if(
                //         obj.record.recorderstate){

                //             obj.record.recorder.stop()
                    
                        
                //     }
                // }
                
               maindiv.forEach(a=>{
                    if(a.querySelector("video")==e.streams[0].videotag){
                        // a.removeChild(e.streams[0].videotag)
        
                        a.innerHTML=b
                    }
                    
                })
    
                
                
            })
        }
        if(submaindiv[0].querySelector("video")){
    
            // submaindiv[0].removeChild(submaindiv[0].querySelector("video"))
            submaindiv[0].innerHTML=b
        }
        if(main.querySelector("video")){
    
            // submaindiv[0].removeChild(submaindiv[0].querySelector("video"))
           main.innerHTML=b
        }
        controll()
        console.log(localstream,localstreamaudio)
        let gg  =     [localstream,localstreamaudio]
    
    gg.forEach(e=>{
        if(e){

            e.getTracks().forEach(e=>{
                if(e.readyState=="live"){
                    e.stop()
                }
            })
        }
            console.log(e)
    
        })
        document.querySelector(".link").innerText=""
        // exit_room.forEach(e=>{e.classList=["_exitroom"]})
        setcreatecall(null)
         localstream = undefined;
     localstreamaudio=undefined
    
    
     typpe = undefined
     myname =undefined
      myinformation = undefined
      loader()
    }
    document.querySelectorAll("._exitroom").forEach(e=>{e.addEventListener("click",e=>{
        console.log(peercon,"Ffff")
        console.log(e.target.classList)
        if(e.target.classList.length==2){
            send("closeroom",{user:"close"})
        }else{
            
            send("userleft",{user:"left"})
        }
        reset()
       
        peercon=[]
        document.querySelector(".connected-users").innerHTML=" <h4>Connected Users</h4>"
        
        
        _message_.innerHTML=""
    
        // send("exitroom","exitroom")
    
    
    
    })})
    
    
    
    
    
    
  
    
    
    
    
    
    const  _message_ = document.querySelector("._message_")
    console.log(_message_.children.length==0)
    function sendmsg(e){
        let textarea = document.querySelector("textarea")
        if(peercon!=" " &&  textarea.value!= ""){
            send("message",{message:textarea.value})
    
         let fieldset =  document.createElement("fieldset")
         console.log(fieldset)
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
    
    
    // console.log(_message_.children[1],"lastcild")
    
    
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
        console.log(e,"messssssssssssssssssssssssssssss")
        let _e=JSON.parse(e)
        console.log(e)
        let fieldset =  document.createElement("fieldset")
        console.log(fieldset)
        fieldset.innerHTML=
        `
           
           <legend class=${_e.myinformation.id}>${(()=>{if(_message_.children.length!=0 &&_message_.children[_message_.children.length-1].querySelector("legend").getAttribute("class")==_e.myinformation.id){return""}return _e.name})()}</legend>
           <p>
         ${_e.message}
    
           </p>
      
           `;
        //    console.log(_message_.children[_message_.children.length-1].querySelector("legend").getAttribute("class"))
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
    // 0%{
    //     top :100%;
    //     opacity:1;
    //     right: 10px
    // }
    // 20%{
    //     right:-20px
    // }
    // 40%{
    //     right:30px
    // }
    // 60%{
    //     opacity:0.5;
    //     right:-30px
    // }
    // 90%{
    //     top :20%;
    //     opacity:0.2;
    // }
    // 100%{
    //     display: none;
       
    //     opacity:0;
    // }

    }
    
    // socket.on("roomid",(e)=>{
    //     let _e=JSON.parse(e).roomid;
    //     roomid = _e
    //     let _sender=JSON.parse(e).myid
        
       
    //    myid =_sender
      
    //     document.querySelector(".link").innerText=_e
    
    
    // })
    
    socket.on("name",e=>{
        let _e=JSON.parse(e)
        console.log(e,JSON.parse(e),"EEEEEee")
    
        let div = document.createElement("div")
        let innerHTML=`
        
                        <img src="imgs/bag1.jpg">
                        <p >${_e.name}</p>
                        <h5 style="margin-right: 10px;">user</h5>
                        
    
                      
                        
    `;
    
    if(typpe){innerHTML+= ` <button class="block"> block user</button>
    `;
    

} ;
    
    console.log(typpe)
    div.setAttribute("class",_e.id)
    
    // setInterval(()=>{console.log(type)},1000)
                        div.innerHTML=innerHTML

                        if(div.querySelector(".block")){
                            console.log("blocccccccccccccccck")
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
                console.log(e.target,time,e.timeStamp,"videoclick",e.target.parentElement != main ,e.target.parentElement!=submaindiv[1])
                console.log()
            
                if(time <= 300   && parent!= main && parent!=submaindiv[0]){
            
                  let rtc =  peercon.find(a=>a.streams[0].stream  == e.target.srcObject)
                  let mainrtc =  peercon.find(a=>{if(main.querySelector("video") && a.streams[0].stream  == main.querySelector("video").srcObject ){return true}return false})
            
          
            let rtcvideo 
            let mainvideo 
            let streams1 
            // mainrtc.streams = streams2
            // rtc.streams = streams1
            // mainrtc.streams[0].videotag = rtcvideo
            // rtc.streams[0].videotag = mainvideo
            
           
            
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
                
                
                
                console.log("main",mainvideo  ,main.querySelector("video")==rtcvideo)
                console.log("rtc",rtcvideo,parent.querySelector("video")==mainvideo)
                
                console.log(parent,"parent")
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
    console.log(e,"ddddddddddddddddddddd")
        peercon.forEach(e=>{
            if(e.id==_e.id){
                console.log(e,e.streams[0])
    
                let connectedusers =  document.querySelector(".connected-users")
                connectedusers.querySelectorAll("div").forEach(e=>{
                    if(e.getAttribute("class")==_e.id){
                        connected_users.removeChild(e)
                    }
                })
    
                console.log(e,e.streams[0].div ,e.streams[0].videotag)
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
    console.log(peercon.indexOf(e),peercon)
    peercon.splice(peercon.indexOf(e),1)
    console.log(peercon)
    
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
    console.log(localstreamaudio)
        if(localstreamaudio ){
            recordstart=!recordstart
    
            if(recordstart){
                console.log("recordd")
    
    
                let record =  await navigator.mediaDevices.getDisplayMedia({
                      audio: true, 
                      video: { mediaSource: "screen"}
                  });
                  console.log(record)
                  if(record){
                    e.target.classList.add("svg")
                      console.log(record)
                       recorder = new MediaRecorder(record)
                      console.log(recorder)
                      
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
    console.log(_e,"masssssteeeeerrrrrr")
        let div = document.createElement("div")
        // console.lof(e)
        div.innerHTML=`
        
                        <img src="imgs/bag1.jpg">
                        <p>${_e.name}</p>
                        <h5 style="margin-right: 10px;">host</h5>
    
    
                      
    
                    `;
    
                    connected_users.appendChild(div)
    
       console.log(masterid,"masterrrr")
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
        console.log({...e})
        create(e)
    
        
    })
    
    socket.on("iceCandidate",(e)=>{
    let _e=JSON.parse(e)
    console.log("icecandidate_",e)
    // console.log(e)
      let user =  returnuser(_e.senderid)
    //   console.log(user)
      
      user.addicecandidate(_e.icecandidate)
        
        
    })
    socket.on("offer",(e)=>{
        let _e=JSON.parse(e)
        console.log("offer",_e)
        let user =  returnuser(_e.senderid)
        // console.log(user,_e.senderid)
      
      user.setoffer(_e.offer)
      user.createans(_e.senderid)
        
        
    })
    socket.on("answer",(e)=>{
        let _e=JSON.parse(e)
        console.log("answer",_e)
        let user =  returnuser(_e.senderid)
        // console.log(_e)
      
      user.setanser(_e.answer)
        
        
    })
    socket.on("myinformation",(e)=>{
        let _e=JSON.parse(e);
        console.log(_e,"information")
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


    
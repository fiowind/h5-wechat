import React from 'react';

const duihua=['你好','不好','你好吗','我不好','你好不好','我不好啊','好吧'];

class Home extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      num : 0,
      time: '10:23',
    };
  }
  rbf(){
   var audio = document.getElementById('music1'); 
   audio.currentTime = 0;
  }
  bf(){
   var audio = document.getElementById('music1'); 
   if(audio!==null){             
      //检测播放是否已暂停.audio.paused 在播放器播放时返回false.
       // alert(audio.paused);
    if(audio.paused)                     {                 
        audio.play();//audio.play();// 这个就是播放  
    }else{
     audio.pause();// 这个就是暂停
    }
   } 
  }
  componentWillMount(){
    var myDate = new Date();
    var strtime = myDate.getHours()+':'+myDate.getMinutes();
    console.log(strtime); 
    this.setState({time:strtime});
    var sh = setInterval(function(argument) {
      var num = this.state.num+1;
      this.bf();
      this.setState({num:num});
      // body...
    }.bind(this),1800);
    if(this.state.num>7){
      clearInterval(sh);
    }
  }


  render() {

    var dui1=this.state.num>0?<div className="dui dui1">
                                <img src="./images/4.pic.jpg" />
                                <div className="duihua dh_right">{duihua[0]}<span className="arrow-left"></span><span className="arrow-left2"></span></div>
                              </div>:'',
        dui2=this.state.num>1?<div className="dui dui2">
                                <div className="duihua dh_left">{duihua[1]}<span className="arrow-right"></span><span className="arrow-right2"></span></div>
                                <img src="./images/5.pic.jpg" />
                              </div>:'',
        dui3=this.state.num>2?<div className="dui dui3">
                                <img src="./images/4.pic.jpg" />
                                <div className="duihua dh_right">{duihua[2]}<span className="arrow-left"></span><span className="arrow-left2"></span></div>
                              </div>:'',
        dui4=this.state.num>3?<div className="dui dui4">
                                <div className="duihua dh_left">{duihua[3]}<span className="arrow-right"></span><span className="arrow-right2"></span></div>
                                <img src="./images/5.pic.jpg"/ >
                              </div>:'',
        dui5=this.state.num>4?<div className="dui dui5">
                                <img src="./images/4.pic.jpg" />
                                <div className="duihua dh_right">{duihua[4]}<span className="arrow-left"></span><span className="arrow-left2"></span></div>
                              </div>:'',
        dui6=this.state.num>5?<div className="dui dui6">
                                <div className="duihua dh_left">{duihua[5]}<span className="arrow-right"></span><span className="arrow-right2"></span></div>
                                <img src="./images/5.pic.jpg" />
                              </div>:'',
        dui7=this.state.num>6?<div className="dui dui7">
                                <img src="./images/4.pic.jpg" />
                                <div className="duihua dh_right">{duihua[6]}<span className="arrow-left"></span><span className="arrow-left2"></span></div>
                              </div>:'';
    return (
      <div>
      <audio src="http://www.w3school.com.cn/i/horse.ogg" id="music1">
      </audio>
        <div className="header">
          <img src='./images/12.pic.jpg' />
        </div>
        <div className="nowtime"><span>{this.state.time}</span></div>
        <div className="newtu">
          {dui1}
          {dui2}
          {dui3}
          {dui4}
          {dui5}
          {dui6}
          {dui7}
        </div>
        <div className="footer"><img src='./images/weixin.jpg' /></div>
      </div>
    );
  }
}

export default Home;
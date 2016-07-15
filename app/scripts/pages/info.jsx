import React from 'react';
import { Link } from 'react-router';
import Map from '../utils/map.js';


class Info extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      tishu: 12,
      wenti: ["您的年龄","您从事什么工作？","您的家庭负担","您的家庭置业状况","您的投资经验","投资知识","您最大可忍受的亏损？",
      "您投资的主要目的是什么?选择最符合您的描述","如果您10万元的投资亏损了2万，您会怎么做？","假设您的某项投资突然亏损15%以上，您会：",
      "过去投资成绩","您做一项很重要的投资决策需要多长时间？"],
      items : [["30岁以下","30-39岁","40-49岁","50-59岁","60岁以上"],
               ["公务员，企事业单位","私营或外企上班族","自由职业者","自营事业者","没工作，学生"],
               ["未婚","双薪无子女","双薪有子女","单薪有子女","单薪养三代"],
               ["投资不动产","有自住房无房贷","房贷<50%","房贷>50%","没有房子"],
               ["10年以上","6-10年","2-5年","1年以内","无"],
               ["有专业证照","财经科系毕业","自学投资有心得","懂一些","一片空白"],
               ["25%以上","10-20%","5-10%","5%以内","几乎不能承受亏损"],
               ["短期投资赚取价差","获得长期稳定收益","保证每年有一定的现金收益","能应对通货膨胀，资产不贬值就行","保本保息，收益低于通胀也可以"],
               ["加码摊平","继续持有，等待回升","卖掉一半","全卖掉停损","预设停损点"],
               ["学习经验","照常过日子","影响情绪小","影响情绪大","验以成眠"],
               ["只赚不赔","赚多赔少","损益两平","赚少赔多","只赔不赚"],
               ["很短，几乎不用考虑","几分钟","几个小时","几天","考虑更几星期甚至更长"]],
      d_scores:[10,8,6,4,2],
      xuanhao: [],
      scores: [],
      tihao: 0,
      xuanxiang: [],
      showtishi: false,
      zongfen1:0,
      zongfen2:0,
      fnum:6,
    };
  }
  calzf(scores){
    var he1=0,he2 = 0;
    var f1=-1,f2=-1;
    for(var i=0;i<scores.length;i++){
      if(i<6){
        he1 += scores[i];
      }else{
        he2 += scores[i];
      }
    }
    if(scores.length>11){
      if(he1<20) f1=0;
      else if(he1>19&he1<31)f1=1;
      else if(he1>30&he1<42) f1=2;
      else if(he1>41&he1<52) f1=3;
      else if(he1>51) f1=4;
      if(he2<20) f2=0;
      else if(he2>19&he2<31) f2=1;
      else if(he2>30&he2<42) f2=2;
      else if(he2>41&he2<52) f2=3;
      else if(he2>51) f2=4;
      console.log(he1,he2);
      console.log(f1,f2);
      this.setState({fnum:f1+f2+1});
    }
  }
  handleClick(index,i){
    console.log(this.state.tihao);
    var new_score = this.state.scores,
        new_xuanhao = this.state.xuanhao;
    new_xuanhao[i] = index;
    new_score[i] = this.state.d_scores[index];
    this.setState({scores:new_score,xuanhao:new_xuanhao});
    if(i>10){
      this.calzf(new_score);
      // console.log(this.state.fnum);
    }
    // console.log(this.state.scores);

  }
  shangyiti(i){

    var radiovar = document.getElementsByName("Fruit");
    if(i>0){
      // console.log(this.state.xuanhao[i-1]);
      radiovar[this.state.xuanhao[i-1]].checked = "checked";
      this.setState({tihao:i-1,showtishi:false})
    }
  }

  xiayiti(i){
    var m = new Map();
    for(var l=0;l<=this.state.xuanhao.length;l++){
      m.put(l,this.state.xuanhao[l]);
    }
    // console.log(m);
    try{
      window.dr('trackUnstructEvent', {
        schema: 'mvp_record_questions',
        data: m // key为问题序号， value为回答序号
      });
    }catch(e){
      console.log(e);
    }
    if(typeof(this.state.xuanhao[i]) == "undefined"){
      this.setState({showtishi:true});
      return
    }
    var radiovar = document.getElementsByName("Fruit");
    for(var j=0;j<radiovar.length;j++)
    {
      radiovar[j].checked = "";
    }
    if(i<11){
      this.setState({tihao:i+1,showtishi:false})
    }
  }

  render() {
    var fnum = 6,
        i =  this.state.tihao,
        xuanze = this.state.items[i].map((item,index) => 
                <div className="listli" key={index}>
                 <label key={index} onClick={this.handleClick.bind(this,index,i)}><input name="Fruit" type="radio" value="" className="radio" /><i></i>{item} </label></div>);

    return (
      <div>
        <div className="content">
          <h1 className="liaojie">让我们了解你</h1>
          <form action="" method="get" className="wenti">
           <p className="wentia">{this.state.wenti[i]}</p>
           { xuanze }
          </form>
        </div>
         <div className="jindutiao">
          <div className="tiaochang" style={{width: (this.state.tihao+1)*100/13+"%"}}></div>
         </div>
         {this.state.showtishi?<div className="tishi">请选择上面的选项之一</div>:''}
         <div className="footgoon">
           {i>0?<div onClick={this.shangyiti.bind(this,i)} className="zuo">上一题</div>:''}
           {i==this.state.tishu-1?<Link to={"result/"+this.state.fnum} fnum={this.state.fnum} className="you">完成</Link>:<div onClick={this.xiayiti.bind(this,i)} className="you">继续</div>}
         </div>
      </div>
    );
  }

}

export default Info;
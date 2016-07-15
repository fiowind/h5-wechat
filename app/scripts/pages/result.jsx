import React from 'react';
import Fengxianbiao from '../components/fengxianbiao.jsx';
import Loading from '../components/loading.jsx';
import { Link } from 'react-router';
import request from 'superagent';

class Resutl extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      fnum : props.params.fnum,
      loading: true,
    };
  }
  componentDidMount() {
  	console.log(this.state.fnum);
    try{
      window.dr('trackUnstructEvent', {
        schema: 'mvp_record_fengxianzhi',
        data: this.state.fnum // key为问题序号， value为回答序号
      });
    }catch(e){
      console.log(e);
    }

    request.post('api/mvp/fio/risk')
        .send({
            risk: this.state.fnum
        })
        .set('Accept', 'application/json')
        .end((err, res) => {
            if (err) {
                // console.log(err, res)
                window.console.log(err, res);
            }
        });
  	setTimeout(function() {
  	  this.setState({loading:false});
  	}.bind(this), 500);
  }

  render() {
  	var content = this.state.loading?<Loading />:
  								<div>
  								  <div className="result">
  								    <p className="title">根据你的测试，这里是您多元化的资产配置方案</p>
  								    <Link to="info" className="restart">&lt;重新测试</Link>
  								  </div>
								    <div className="ner">
  								    <p className="maydengji">您的风险承受等级</p>
  								    <Fengxianbiao fnum={this.props.params.fnum} result="1"/>
  								  </div>
  								</div>;
    return (
      <div>
      {content}
      </div>
    );
  }
}

export default Resutl;
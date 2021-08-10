import React, { PropTypes, Component } from 'react';
import TodoTextInput from './TodoTextInput';
import style from './Header.css';
export default class Header extends Component {

  static propTypes = {
    addTodo: PropTypes.func.isRequired,
    analytics:PropTypes.array.isRequired,
    analyticsActions:PropTypes.object.isRequired
  };
  constructor(){
    super()
    
  }
  
  componentDidMount() {
    
    // chrome.extension.getBackgroundPage().console.log(this.current_url)
  
     
   
    // chrome.extension.getBackgroundPage().console.log(this.props.analytics[0].avg_monthly_sales)
    // this.setState({})
    this.props.analyticsActions.updateAnalytics(this.props.analyticsActions.resolvedAnalytics)
  }

  // handleSave = (text) => {
  //   // chrome.extension.getBackgroundPage().console.log(this.props.analyticsActions)
  //   if (text.length !== 0) {
  //     this.props.addTodo(text);
  //   }
  // };

  render() {
    return (
      <header style={{position:"relative","float":"left","top":"0"}}>
       
        <div className={style.card}>
          <p>Avg. Monthly Sales</p>
          <h2 dangerouslySetInnerHTML={{__html: this.props.analytics[0].avg_monthly_sales}}></h2>
        </div>

        <div className={style.card}>
          <p>Avg. Sales Rank</p>
          <h2 dangerouslySetInnerHTML={{__html: this.props.analytics[0].avg_sales_rank}}></h2>
        </div>


        <div className={style.card}>
          <p>Avg. Price</p>
          <h2 dangerouslySetInnerHTML={{__html: this.props.analytics[0].avg_price}}></h2>
        </div>


        <div className={style.card}>
          <p>Avg. Reviews</p>
          <h2 dangerouslySetInnerHTML={{__html: this.props.analytics[0].avg_reviews}}></h2>
        </div>

        <div className={style.card+" "+style.cardBottom}>
          <p>Opportunity Score</p>
          <h2 >
         
            <span 
          dangerouslySetInnerHTML={{__html: this.props.analytics[0].opportunity_score}}>
            
          </span>
          &ensp;&ensp;&ensp;
          <span
          dangerouslySetInnerHTML={{__html: this.props.analytics[0].demand}}>
          </span>
         </h2>
        </div>
      </header>
    );
  }
}

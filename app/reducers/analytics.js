import * as ActionTypes from '../constants/ActionTypesAnalytics';

import axios from "axios"

const initialState = [{
  avg_monthly_sales:0,
  avg_sales_rank:0,
  avg_price:"0$",
  avg_reviews:0,
  opportunity_score:0,
  demand:"",
  id: 0
}];

const actionsMap = {
  [ActionTypes.UPDATE_ANALYTICS](state, action,dispatch) {
   
      chrome.extension.getBackgroundPage().console.log({state,action})
     
      chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        
        // use `url` here inside the callback because it's asynchronous!
        var listing_id=tabs[0].url.split("/")[4]
        var pattern = /^\d+$/;
        if(!pattern.test(listing_id)){
          window.close()
        }
      let request_data={
        url:"https://openapi.etsy.com/v2/listings/"+listing_id+"?api_key=azrag97kzocx8fy751nrq7ol",
      }
      const headers = { "Access-Control-Allow-Origin":"*",
      'Content-Type': 'application/json' };
    var _this=this;
      axios.get(request_data.url, {headers})      
      .then((response) => {
        var rank=response.data.results[0].featured_rank==null?1:response.data.results[0].featured_rank;
        
        chrome.extension.getBackgroundPage().console.log(response.data.results[0].featured_rank);

        var price=response.data.results[0].price;
            axios.get(tabs[0].url)
            .then((res)=> {
              const parser = new DOMParser();
              const doc = parser.parseFromString(res.data, 'text/html');
              const sales = doc.querySelector('#listing-page-cart .wt-text-caption').innerHTML;
              const reviews = doc.querySelector('#reviews .wt-display-flex-xs .wt-text-body-03').innerHTML;
              var sale=sales.replace("sales","").replace(",","")
              var review=reviews.replace("reviews","").replace("shop","").trim().split("\n").map(line => line.trim()).join("\n");
              chrome.extension.getBackgroundPage().console.log({sale,review});
              
              action.func([{
                id:0,
                avg_monthly_sales: parseFloat(sale),
                avg_sales_rank:parseFloat(sale)+parseFloat(rank)*parseFloat(price),
                avg_price:price+" "+response.data.results[0].currency_code,
                avg_reviews:review,
                opportunity_score:rank,
              }])
            }) 
            .catch((err) => {
              chrome.extension.getBackgroundPage().console.log("AXIOS ERROR: In fetching page"+err);
             
            })
    })
    .catch((error) => {
      chrome.extension.getBackgroundPage().console.log("AXIOS ERROR: ", error);
    })
  });
      // return state;
      return [{
        id:0,
        avg_monthly_sales: "<img src='https://svgshare.com/i/_2F.svg' width='50px'/>",
        avg_sales_rank:"<img src='https://svgshare.com/i/_2F.svg' width='50px'/>",
        avg_price:"<img src='https://svgshare.com/i/_2F.svg' width='50px'/>",
        avg_reviews:"<img src='https://svgshare.com/i/_2F.svg' width='50px'/>",
        demand:"<img src='https://svgshare.com/i/_2F.svg' width='50px'/>",
      }];
  },
  [ActionTypes.CLEAR_ANALYTICS](state, action) {
    return state;
  },[ActionTypes.RESOLVED_ANALYTICS_FETCH](state, action) {
    var demand="";  
    if(action.data[0].opportunity_score<=4){
      demand="Low In Demand"
    }else if(action.data[0].opportunity_score>=4 && action.data[0].opportunity_score<=8){
      demand="Moderaate In Demand"
    }
    else if(action.data[0].opportunity_score>=8 && action.data[0].opportunity_score<=10){
      demand="High In Demand"
    }
    return [{
      id:state.id,
      avg_monthly_sales: action.data[0].avg_monthly_sales,
      avg_sales_rank:action.data[0].avg_sales_rank,
      avg_price:action.data[0].avg_price,
      avg_reviews:action.data[0].avg_reviews,
      opportunity_score:action.data[0].opportunity_score,
      demand:demand
    }];
  }
  
};

export default function analytics(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}

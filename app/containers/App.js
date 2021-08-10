import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import * as TodoActions from '../actions/todos';
import * as analyticsActions from '../actions/analytics';
import style from './App.css';

@connect(
  state => ({
    todos: state.todos,
    analytics:state.analytics
  }),
  dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch),
    analyticsActions: bindActionCreators(analyticsActions, dispatch)
  })
)
export default class App extends Component {

  static propTypes = {
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    analytics:PropTypes.array.isRequired,
    analyticsActions:PropTypes.object.isRequired
  };
  constructor() {
    super();

  }

  render() {
    const { todos, actions, analytics,analyticsActions } = this.props;

    return (
      <div className={style.normal}>
        <Header addTodo={actions.addTodo} 
                analytics={analytics} 
                analyticsActions={analyticsActions}/>
                
        <MainSection todos={todos} actions={actions} />
      </div>
    );
  }
}

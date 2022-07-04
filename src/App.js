import './App.css';
import {Component} from 'react';

class Nav extends Component {
  state = {
    list:[]
  }
  componentDidMount(){  //오버라이딩
    fetch('list.json')  //public이 기준점
    // .then(function(result){
    //   return result.json();
    // })
    // .then((result)=>result.json())  //return을 의미함(return이 생략됨)
    .then(function(result){
      return result.json();
    })
    .then(function(json) {
      console.log(json);
      this.setState({list:json})
    }.bind(this));
  }
  render(){
    let listTag = [];
    for(let i=0; i<this.state.list.length; i++){
      let li = this.state.list[i]
      listTag.push(<li key={li.id}>
        <a href={li.id} data-id={li.id}
          onClick={function(e){
            e.preventDefault();
            this.props.onClick(e.target.dataset.id);
          }.bind(this)}
        >{li.title}</a></li>)
    }
    return(
      <nav>
        <ul>
          {listTag}
        </ul>
      </nav>
    );
  }
}

class Article extends Component {
  render(){
    return(
      <article>
        <h2>{this.props.title}</h2>
        {this.props.desc}
      </article>
    );
  }
}

class App extends Component {
  state = {
    article:{title:'Welcome', desc:'Hello, React & Ajax'}
  }
  render(){
    return (
      <div className="App">
        <h1>web</h1>
        <Nav onClick={function(id){
          fetch(id+'.json')
          .then(function(result){
            return result.json();
          })
          .then(function(json){
            this.setState({
              article:{title:json.title, desc:json.desc}
            })
          }.bind(this))
        }.bind(this)}></Nav>
        <Article 
          title={this.state.article.title}
          desc={this.state.article.desc}
        ></Article>
      </div>
    );
  }
}

export default App;
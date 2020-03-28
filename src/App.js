import React from "react";
import "./App.css";
import logo from './logo.svg';
class App extends React.Component {

  constructor(props) 
  {
    super(props);
    this.state = {      
      name: "",
      job: "",
      like:0,
      list: [],
      src:""
    };
  }
  

  DeleteItem(id)
  {
    const list =[...this.state.list];
    const newlist = list.filter(x=>x.id != id);
    this.setState({list:newlist});
  }

  AddItem(name,job,src)
  {     
    if(name)
    {
      const newitem = {
        id : new Date(),
        name: name,
        job:job || "not availabel",
        isActive: false,
        like:0,
        src:src       
      }
      const list = [...this.state.list];
      list.push(newitem);
      this.setState({
        name:"",
        job:"",
        list,
        like:0,
        src:""       
      });
    }     
  }
  
  SetItemName(name)
  {    
    this.setState({name:name});     
  };
  SetItemJob(job)
  {
    this.setState({job:job});    
  };
  Like(id)
  {
    const list =[...this.state.list];   
    var result= list.indexOf(list.find(x=>x.id==id));  
    list[result].like = list[result].like + 1;
    const newlist = list;
    this.setState({list:newlist});
  }

  DisLike(id)
  {
    const list =[...this.state.list];   
    var result= list.indexOf(list.find(x=>x.id==id));  
    list[result].like = list[result].like > 0 ? list[result].like - 1: list[result].like;
    const newlist = list;
    this.setState({list:newlist});

  }

  SetItemSrc(e)
  {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({       
        src: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  render() {
      return (   
        <div className="block">        
        <div className="form-style-2">
            <div className="form-style-2-heading">Provide your information</div>
               <label><span>Your Name <span className="required">*</span></span>
                  <input type="text" className="input-field" value={this.state.name} onChange={ e => this.SetItemName(e.target.value) } required />
               </label>
               <label><span>Job <span className="required"></span></span>
               <input type="text" className="input-field" value={this.state.job} onChange={ e => this.SetItemJob(e.target.value)}/>
               </label>
               <label><span>File upload <span className="required"></span></span>
               <input type="file" className="input-field" onChange={e => this.SetItemSrc(e)} />
               </label>
               <label><span></span><input type="button" value="Add" onClick={ () => { this.AddItem(this.state.name,this.state.job,this.state.src) } } disabled={!this.state.name.length} /></label>
       </div>
            {/* <label for="field4"><span>Regarding</span><select name="field4" class="select-field">
            <option value="General Question">General</option>
            <option value="Advertise">Advertisement</option>
            <option value="Partnership">Partnership</option>
            </select></label> */}
            {/* <label for="field5"><span>Message <span class="required">*</span></span><textarea name="field5" class="textarea-field"></textarea></label> */}
                
          {this.state.list.map(item => {
            return (
                  <div key={item.id} className="card">
                    <div className="image-block"><img src={item.src}  alt="Avatar" /></div>
                    <div className="container">
                      <h5><b>{item.name}</b></h5>
                      <h5><b>{item.job}</b></h5>     
                      <h5><b>{item.like}</b> Likes</h5>   
                      <div className="btn-group">
                      <label><span></span><input type="button" className="btn-like" value="Like" className="btn-like"  onClick={()=> this.Like(item.id)}  /></label>
                      <label><span></span><input type="button" className="btn-unlike" value="UnLike"  onClick={()=> this.DisLike(item.id)} /></label>
                      <label><span></span><input type="button" className="btn-delete" value="Delete"  onClick={()=> this.DeleteItem(item.id)} /></label>
                    </div>
                    </div>
                  </div>        
            );
          })}
        </div>
      );
  }
}
export default App;

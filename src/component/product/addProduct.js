import React, { Component } from 'react';
import {connect} from "react-redux";
import ReactDOM from 'react-dom';
import {addNewProduct,updateProducts} from '../../actions/index';
import {updateEdit} from '../../actions/edit/edit.index';


class AddProduct extends Component{
constructor(props){
    super(props)
    let id='',
    title = '',
    author = '',
    description=''
    let { edit } = props;
    
    if (edit) {
      id= edit.book_id;
      title = edit.title;
      author = edit.author;
      description= edit.description;
    }
     this.state = {
       id,
      title,
      author,
      description,
    };
};
onChangeForm(f, { target }) {
    this.setState({
      [f]: target.value
    });
};

onAdd(e) {
  e.preventDefault();
  let { id,title, author,description } = this.state,
    { edit } = this.props;
  if (!title || !author||! description) {
    alert('Product Name,author and description are required!');
  }
  if (edit) {
    this.props.updateProduct({
      id,title, author,description
    });
  
    
  } else {
    this.props.onAdd({
      title,
      author,
      description
    });
  }
  this.setState({
    id:'',
    title: '',
    author: '',
    description:''
  });
};

render(){
    let {id,title,author,description } = this.state,
    { edit } = this.props
    return(
        <form className='jumbotron bg-dark text-white'  
        onSubmit={this.onAdd.bind(this)}>
       <div  className={'form-group'}>
              <h1 className="shadow-lg p-3 mb-5 rounded card-tite p-1 col-md-6 badge-light text-white">Enter Book Details :</h1><br />
          <div
            className={'form-group col-md-12'}>
            <label>Book Name :</label>
            <input 
              ref={'name'}
              autoFocus
              value={title}
              onChange={this.onChangeForm.bind(this,'title')}
              className={'form-control text-white'}
              type={'text'}
              placeholder={'Product Name ..'}
            />
          </div>
          <div
            className={'form-group col-md-12'}>
            <label>Book Author : </label>
            <input
            ref={'author'}
            autoFocus
            value={author}
            onChange={this.onChangeForm.bind(this,'author')}
              className={'form-control text-white'}
              type={'text'}
              placeholder={'Book Author..'}
            />
          </div>

          <div
            className={'form-group col-md-12'}>
            <label>Book Description : </label>
            <input
            ref={'description'}
            autoFocus
            value={description}
            onChange={this.onChangeForm.bind(this,'description')}
              className={'form-control text-white'}
              type={'text'}
              placeholder={'Product description ..'}
            />
          </div>

          <div 
          
            className={'btn-group-toggle btn btn-lg'}>
            <button 
              className={'btn btn-primary btn-block'}
              type={'submit'}>
               {edit ? 'Update' : 'Add'}
            </button>
          </div>

       </div>
      </form>
    )
}
    
}
{
  
}
export default connect((state)=> {
  return {
    edit: state.editReducer
  };
},
{
  updateProduct:updateProducts,
  onAdd: addNewProduct,
  onEdit: updateEdit
}
)(AddProduct);


import React from 'react';
import {__} from 'i18n';

class Example extends React.Component {
  render(){
    return (
      <div className='container'>
        <div className='top'>
          <p>{this.props.text}</p>
          <p>{__('hello this is a translation')}</p>
        </div>
        <form>
          <input type='text' placeholder={__('this is a placeholder')}/>
        </form>
      </div>
    )
  }
}

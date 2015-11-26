import React from 'react';
import {__} from 'i18n';

function translate(string){
  return string;
}

translate('evening star')

class Example extends React.Component {
  render(){
    return (
      <div className='container'>
        <div className='top'>
          <p>{this.props.text}</p>
          <p></p>
          <p>{__('pegasus')}</p>
        </div>
        <form>
          <input type='text' placeholder={__('morning star')}/>
        </form>
      </div>
    )
  }
}

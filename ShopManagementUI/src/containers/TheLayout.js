import React from 'react'
import { Redirect } from 'react-router-dom';
import {
  TheContent,
  // TheSidebar,
  TheFooter,
  TheHeader
} from './index'
import * as keys from '../axios/keys';
import * as storage from '../axios/storage';

const TheLayout = () => {
  if (storage.loadState(keys.LOGGED_IN_USER) === undefined) {
    return <Redirect to='/login' />
  }

  return (
    <div className="c-app c-default-layout">
      {/* <TheSidebar/> */}
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          <TheContent />
        </div>
        <TheFooter />
      </div>
    </div>
  )
}

export default TheLayout

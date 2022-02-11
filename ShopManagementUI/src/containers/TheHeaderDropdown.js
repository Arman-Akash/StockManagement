import React from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as keys from '../axios/keys';
import * as storage from '../axios/storage';
import { useHistory } from 'react-router';
import * as axios from '../axios/axiosLib';
import { faKey, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TheHeaderDropdown = () => {
  const history = useHistory();
  var user = storage.loadState(keys.LOGGED_IN_USER);

  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar" style={{ width: "50px" }}>
          <CImg
            src={'/avatars/6.jpg'}
            className="c-avatar-img"
            alt="avatar"
          />
        </div>
      </CDropdownToggle>
      <span style={{ paddingLeft: "10px" }}>{user?.username}</span>

      <CDropdownMenu className="pt-0" placement="bottom-end">
        {/* <CDropdownItem to="/user/access-control">
          <CIcon name="cil-lock-locked" className="mfe-2" />
          Access-Control
        </CDropdownItem> */}

        <CDropdownItem to="/users/create-user"
        // className={{ display: (user.username.toLowerCase() == "dg" || user.username == "admin") ? "block" : "none" }}
        >
          <FontAwesomeIcon icon={faUsers} />
          <span style={{ paddingLeft: "10px" }}>Users </span>
        </CDropdownItem>
        <CDropdownItem divider />
        
        <CDropdownItem to="/user/change-password">
          <FontAwesomeIcon icon={faKey} />
          <span style={{ paddingLeft: "10px" }}>Change Password</span>
        </CDropdownItem>
        <CDropdownItem
          onClick={() => {
            axios.fetchLogout();
            history.push("/");
          }}
        >
          <CIcon name="cil-lock-locked" className="mfe-2" />
            Log out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown

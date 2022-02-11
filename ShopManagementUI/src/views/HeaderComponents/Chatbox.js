import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'
import {
    CButton, CInput, CRow, CCol, CLink, CTooltip
} from '@coreui/react';

//Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';

//Style
import './chatbox.css';


//For more info see: https://bootsnipp.com/snippets/exR5v

const MessagesContainer = (props) => {

    let [text, onChangeText] = useState('');
    const location = useLocation();
    console.log(location.pathname);

    return (
        <>
            <CRow>
                <CCol md="12" style={{ fontSize: '36px' }}>
                    <CTooltip content="Back">
                        <CLink to="/messages" className="float-right">
                            <FontAwesomeIcon
                                size="sm"
                                icon={faLongArrowAltLeft}
                            />
                        </CLink>
                    </CTooltip>
                </CCol>
                <CCol md="12">
                    <div id="frame" className="mb-3">
                        <div id="sidepanel">
                            <div id="profile">
                                <div className="wrap">
                                    <img id="profile-img" src="http://emilcarlsson.se/assets/mikeross.png" className="online" alt="" />
                                    <p>Mike Ross</p>
                                    <i className="fa fa-chevron-down expand-button" aria-hidden="true"></i>
                                    <div id="status-options">
                                        <ul>
                                            <li id="status-online" className="active"><span className="status-circle"></span> <p>Online</p></li>
                                            <li id="status-away"><span className="status-circle"></span> <p>Away</p></li>
                                            <li id="status-busy"><span className="status-circle"></span> <p>Busy</p></li>
                                            <li id="status-offline"><span className="status-circle"></span> <p>Offline</p></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div id="search">
                                {/* <label for=""><i className="fa fa-search" aria-hidden="true"></i></label>
                        <input type="text" placeholder="Search contacts..." /> */}
                            </div>
                            <div id="contacts">
                                <ul>
                                    <li className="contact">
                                        <div className="wrap">
                                            <span className="contact-status online"></span>
                                            <img src="http://emilcarlsson.se/assets/louislitt.png" alt="" />
                                            <div className="meta">
                                                <p className="name">Louis Litt</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="contact active">
                                        <div className="wrap">
                                            <span className="contact-status busy"></span>
                                            <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
                                            <div className="meta">
                                                <p className="name">Harvey Specter</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="contact">
                                        <div className="wrap">
                                            <span className="contact-status"></span>
                                            <img src="http://emilcarlsson.se/assets/haroldgunderson.png" alt="" />
                                            <div className="meta">
                                                <p className="name">Harold Gunderson</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="contact">
                                        <div className="wrap">
                                            <span className="contact-status"></span>
                                            <img src="http://emilcarlsson.se/assets/danielhardman.png" alt="" />
                                            <div className="meta">
                                                <p className="name">Daniel Hardman</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="contact">
                                        <div className="wrap">
                                            <span className="contact-status"></span>
                                            <img src="http://emilcarlsson.se/assets/charlesforstman.png" alt="" />
                                            <div className="meta">
                                                <p className="name">Charles Forstman</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="contact">
                                        <div className="wrap">
                                            <span className="contact-status"></span>
                                            <img src="http://emilcarlsson.se/assets/jonathansidwell.png" alt="" />
                                            <div className="meta">
                                                <p className="name">Jonathan Sidwell</p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="content">
                            <div className="contact-profile">
                                <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
                                <p>Harvey Specter</p>
                            </div>
                            <div className="messages">
                                <ul>
                                    <li className="sent">
                                        <img src="http://emilcarlsson.se/assets/mikeross.png" alt="" />
                                        <p>How the hell am I supposed to get a jury to believe you when I am not even sure that I do?!</p>
                                    </li>
                                    <li className="replies">
                                        <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
                                        <p>When you're backed against the wall, break the god damn thing down.</p>
                                    </li>
                                    <li className="replies">
                                        <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
                                        <p>Excuses don't win championships.</p>
                                    </li>
                                    <li className="sent">
                                        <img src="http://emilcarlsson.se/assets/mikeross.png" alt="" />
                                        <p>Oh yeah, did Michael Jordan tell you that?</p>
                                    </li>
                                    <li className="replies">
                                        <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
                                        <p>No, I told him that.</p>
                                    </li>
                                    <li className="replies">
                                        <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
                                        <p>What are your choices when someone puts a gun to your head?</p>
                                    </li>
                                    <li className="sent">
                                        <img src="http://emilcarlsson.se/assets/mikeross.png" alt="" />
                                        <p>What are you talking about? You do what they say or they shoot you.</p>
                                    </li>
                                    <li className="replies">
                                        <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
                                        <p>Wrong. You take the gun, or you pull out a bigger one. Or, you call their bluff. Or, you do any one of a hundred and forty six other things.</p>
                                    </li>
                                </ul>
                            </div>
                            {
                                location.pathname === '/messages-reply' ? (
                                    <div className="message-input">
                                        <div className="wrap">
                                            <CInput style={{
                                                maxHeight: '31px',
                                                borderRadius: '0px',
                                                marginTop: '1px',
                                                marginLeft: '5px',
                                                marginBottom: '5px'
                                            }} type="text" value={text} onChange={(e) => { onChangeText(e.target.value) }} placeholder="Write your message..." />
                                            <CButton type="submit" onClick={() => { }}><FontAwesomeIcon icon={faPaperPlane} /></CButton>
                                        </div>
                                    </div>
                                ) : null
                            }

                        </div>
                    </div>

                </CCol>
            </CRow>

        </>
    );
}

export default MessagesContainer;
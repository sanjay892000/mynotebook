import React from 'react'
import '../styles/about.css';
import { Link } from "react-router-dom";
function Footer() {
  return (
    <div>
      <footer>
                <div className="content">
                    <div className="top">
                        <div className="logo-details">
                            <span className="logo_name"><span style={{ color: "#9C27B0" }}>my</span>NoteBook</span>
                        </div>
                        <div className="media-icons">
                            <Link to="/"><i className="fab fa-facebook-f"></i></Link>
                            <Link to="/"><i className="fab fa-twitter"></i></Link>
                            <Link to="/"><i className="fab fa-instagram"></i></Link>
                            <Link to="/"><i className="fab fa-linkedin-in"></i></Link>
                            <Link to="/"><i className="fab fa-youtube"></i></Link>
                        </div>
                    </div>
                    <div className="link-boxes">
                        <ul className="box">
                            <li className="link_name">Company</li>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/AddNotes">New Notes</Link></li>
                            <li><Link to="/About">About us</Link></li>
                            <li><Link to="/">Get started</Link></li>
                        </ul>
                        <ul className="box">
                            <li className="link_name">Services</li>
                            <li><Link to="/">Your Notes</Link></li>
                            <li><Link to="/AddNotes">New Note</Link></li>
                        </ul>
                        <ul className="box">
                            <li className="link_name">Account</li>
                            <li><Link to="/login">Sign-in</Link></li>
                            <li><Link to="/register">Join Free</Link></li>
                        </ul>
                        <ul className="box">
                            <li className="link_name">Top Categories</li>
                            <li><Link to="/c/61554bfe801949ad7b9be4ff">Tent Notes</Link></li>
                            <li><Link to="/c/61554c2753bcf306407cb1bd">RV and Van Notes</Link></li>
                            <li><Link to="/c/61554c43d2a6b15f764aff36">Canoe Notes</Link></li>
                            <li><Link to="c/61554c63dfd6a37d71449b5c">Survivalist Notes</Link></li>
                        </ul>
                        <ul className="box input-box">
                            <li className="link_name">About iNotebook</li>
                            <li style={{color: "#F7FFFF"}}>
                            An online web platform where you can create, edit, upload, delete your notes/information privately and securely without any disturbancee
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="bottom-details">
                    <div className="bottom_text">
                        <span className="copyright_text">Copyright © 2021 <Link to="/">myNoteBook</Link>All rights reserved</span>
                        <span className="policy_terms">
                            <Link to="/">Privacy policy</Link>
                            <Link to="/">Terms & condition</Link>
                        </span>
                    </div>
                </div>
            </footer>

    </div>
  )
}

export default Footer

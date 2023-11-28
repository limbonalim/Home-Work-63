import React from 'react';
import Facebook from '../../assets/Social/Facebook.svg';
import Instagram from '../../assets/Social/Instagram.svg';
import Telegram from '../../assets/Social/Telegram.svg';
import Twitter from '../../assets/Social/X(Twitter).svg';
import './SocialLink.css';

const SocialLink = () => {
  return (
    <div className="d-flex gap-3 SocialLink">
      <a href="#"><img src={Facebook} alt="Facebook"/></a>
      <a href="#"><img src={Telegram} alt="Telegram"/></a>
      <a href="#"><img src={Instagram} alt="Instagram"/></a>
      <a href="#"><img src={Twitter} alt="Twitter"/></a>
    </div>
  );
};

export default SocialLink;
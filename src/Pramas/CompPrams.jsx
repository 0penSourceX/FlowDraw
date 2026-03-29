import React from 'react';
import styled from 'styled-components';
import "./CompPrams.css"
const CompPrams = ({onpassvalue}) => {
  return (
 
      <div className="input">
        <button className="value111" onClick={()=>onpassvalue("grid")}>
            <svg id="grid" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path fill="#7D8590" d="M0 0h6v6H0V0zm7 0h9v6H7V0zm0 7h6v9H7V7zm-7 7h6v-6H0v6zm7 0h9v-6H7v6z"/>
            </svg>
           Grid
        </button>
        <button className="value111">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M17.0408 10.6406L9.69083 3.29062L8.82083 2.42063C8.53083 2.13063 8.05083 2.13063 7.76083 2.42063C7.47083 2.71062 7.47083 3.19062 7.76083 3.48062L8.63083 4.35062L3.00083 9.98062C2.36083 10.6206 2.02083 11.2706 2.00083 11.9206C1.98083 12.6106 2.32083 13.3006 3.00083 13.9906L7.01083 18.0006C8.35083 19.3306 9.69083 19.3306 11.0208 18.0006L17.0408 11.9806C17.2408 11.7806 17.3308 11.5106 17.3108 11.2506C17.3008 11.0306 17.2008 10.8006 17.0408 10.6406Z" fill="#e6eaf0"></path> <path d="M16 22.75H3C2.59 22.75 2.25 22.41 2.25 22C2.25 21.59 2.59 21.25 3 21.25H16C16.41 21.25 16.75 21.59 16.75 22C16.75 22.41 16.41 22.75 16 22.75Z" fill="#e6eaf0"></path> <path d="M19.35 14.7803C19.09 14.5003 18.61 14.5003 18.35 14.7803C18.04 15.1203 16.5 16.8503 16.5 18.1703C16.5 19.4703 17.55 20.5203 18.85 20.5203C20.15 20.5203 21.2 19.4703 21.2 18.1703C21.2 16.8603 19.66 15.1203 19.35 14.7803Z" fill="#e6eaf0"></path> </g></svg>
          BackGroundColor
        </button>
        <button className="value111">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18.05 6.08C16.4776 4.51428 14.349 3.63523 12.13 3.63523C9.91101 3.63523 7.78239 4.51428 6.21 6.08L5 7.29V4.38C5 4.18109 4.92098 3.99033 4.78033 3.84967C4.63968 3.70902 4.44891 3.63 4.25 3.63C4.05109 3.63 3.86032 3.70902 3.71967 3.84967C3.57902 3.99033 3.5 4.18109 3.5 4.38V9.12C3.49998 9.31985 3.57868 9.51166 3.71905 9.6539C3.85942 9.79614 4.05017 9.87738 4.25 9.88H9C9.19891 9.88 9.38968 9.80099 9.53033 9.66033C9.67098 9.51968 9.75 9.32892 9.75 9.13C9.75 8.93109 9.67098 8.74033 9.53033 8.59967C9.38968 8.45902 9.19891 8.38 9 8.38H6L7.27 7.14C8.55985 5.85275 10.3077 5.12979 12.13 5.12979C13.9523 5.12979 15.7001 5.85275 16.99 7.14C23.18 13.83 13.99 23.05 7.27 16.86C7.12937 16.7196 6.93875 16.6407 6.74 16.6407C6.54125 16.6407 6.35063 16.7196 6.21 16.86C6.13924 16.929 6.08301 17.0114 6.04461 17.1024C6.00621 17.1934 5.98643 17.2912 5.98643 17.39C5.98643 17.4888 6.00621 17.5866 6.04461 17.6776C6.08301 17.7686 6.13924 17.8511 6.21 17.92C7.78008 19.4901 9.90957 20.3722 12.13 20.3722C14.3504 20.3722 16.4799 19.4901 18.05 17.92C19.6201 16.3499 20.5021 14.2204 20.5021 12C20.5021 9.77957 19.6201 7.65009 18.05 6.08Z" fill="#e6e6e6"></path> <path d="M12 7.75C11.8019 7.75259 11.6126 7.83244 11.4725 7.97253C11.3324 8.11263 11.2526 8.30189 11.25 8.5V12C11.2502 12.1988 11.3293 12.3895 11.47 12.53L14 15C14.0692 15.0701 14.1518 15.1257 14.2428 15.1635C14.3338 15.2012 14.4315 15.2205 14.53 15.22C14.6617 15.2008 14.7859 15.1469 14.8899 15.0639C14.9939 14.9809 15.0739 14.8716 15.1218 14.7474C15.1696 14.6233 15.1836 14.4886 15.1622 14.3572C15.1408 14.2259 15.0848 14.1026 15 14L12.72 11.72V8.5C12.7177 8.30691 12.642 8.12193 12.5083 7.98263C12.3746 7.84332 12.1928 7.76015 12 7.75Z" fill="#e6e6e6"></path> </g></svg>
          History
        </button>
        <button className="value111">
            <svg fill="#e8e8e8" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" stroke="#e8e8e8"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="m16 0c8.836556 0 16 7.163444 16 16s-7.163444 16-16 16-16-7.163444-16-16 7.163444-16 16-16zm0 2c-7.7319865 0-14 6.2680135-14 14s6.2680135 14 14 14 14-6.2680135 14-14-6.2680135-14-14-14zm1.3 18.5v2.6h-2.6v-2.6zm-1.3-11.5c2.209139 0 4 1.790861 4 4 0 1.8636009-1.2744465 3.4295388-2.9993376 3.873812l-.0006624 2.126188h-2v-4h1c1.1045695 0 2-.8954305 2-2s-.8954305-2-2-2c-1.0543618 0-1.9181651.8158778-1.9945143 1.8507377l-.0054857.1492623h-2c0-2.209139 1.790861-4 4-4z"></path></g></svg>
          Details
        </button>
        <button className="value111">
           <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8 3V0H6V3H8Z" fill="#e0dcdc"></path> <path d="M0.792893 2.20711L3.29289 4.70711L4.70711 3.29289L2.20711 0.792893L0.792893 2.20711Z" fill="#e0dcdc"></path> <path d="M6 5L5 6.00001L8 15H10L10.7172 12.1314L14.2929 15.7071L15.7071 14.2929L12.1314 10.7172L15 10V8L6 5Z" fill="#e0dcdc"></path> <path d="M0 6H3V8H0V6Z" fill="#e0dcdc"></path> </g></svg>
          Curosr
        </button>

        <button className="value111" onClick={()=>onpassvalue("HideNavbar")}>
         <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="2" width="16" height="2" fill="#e0dcdc"/>
        <path d="M4 8L8 12L12 8H4Z" fill="#e0dcdc"/>
        <rect x="0" y="12" width="16" height="2" fill="#e0dcdc"/>
        </svg>
         
          Hide Navbar
        </button>
      </div>
    
  );
}
 

export default CompPrams;

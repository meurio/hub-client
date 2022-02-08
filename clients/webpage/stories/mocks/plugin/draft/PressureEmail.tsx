/* eslint-disable */
import React from 'react';

export default ({ size }: { size?: string | number }) => (
  <svg
    width={size || '39'}
    height={size || '37'}
    viewBox="0 0 39 37"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <defs>
      <path
        d="M12,10 C16.95,10 21,14.05 21,19 C21,23.95 16.95,28 12,28 C7.05,28 3,23.95 3,19 C3,14.05 7.05,10 12,10 L12,10 Z M12,7 C5.4,7 0,12.4 0,19 C0,25.5999992 5.4,31 12,31 C18.6,31 24,25.5999992 24,19 C24,12.4 18.6,7 12,7 L12,7 L12,7 Z"
        id="path-1"
      />
      <filter
        x="-20.8%"
        y="-20.8%"
        width="158.3%"
        height="158.3%"
        filterUnits="objectBoundingBox"
        id="filter-2"
      >
        <feMorphology
          radius="1"
          operator="dilate"
          in="SourceAlpha"
          result="shadowSpreadOuter1"
        >
          <feOffset
            dx="2"
            dy="2"
            in="shadowSpreadOuter1"
            result="shadowOffsetOuter1"
          >
            <feGaussianBlur
              stdDeviation="1"
              in="shadowOffsetOuter1"
              result="shadowBlurOuter1"
            >
              <feColorMatrix
                values="0 0 0 0 0.183434311 0 0 0 0 0.183434311 0 0 0 0 0.183434311 0 0 0 0.17 0"
                in="shadowBlurOuter1"
              />
            </feGaussianBlur>
          </feOffset>
        </feMorphology>
      </filter>
      <path
        d="M12,16 C13.65,16 15,17.35 15,19 C15,20.65 13.65,22 12,22 C10.35,22 9,20.65 9,19 C9,17.35 10.35,16 12,16 L12,16 Z M12,13 C8.7,13 6,15.7 6,19 C6,22.3 8.7,25 12,25 C15.3,25 18,22.3 18,19 C18,15.7 15.3,13 12,13 L12,13 L12,13 Z"
        id="path-3"
      />
      <filter
        x="-41.7%"
        y="-41.7%"
        width="216.7%"
        height="216.7%"
        filterUnits="objectBoundingBox"
        id="filter-4"
      >
        <feMorphology
          radius="1"
          operator="dilate"
          in="SourceAlpha"
          result="shadowSpreadOuter1"
        >
          <feOffset
            dx="2"
            dy="2"
            in="shadowSpreadOuter1"
            result="shadowOffsetOuter1"
          >
            <feGaussianBlur
              stdDeviation="1"
              in="shadowOffsetOuter1"
              result="shadowBlurOuter1"
            >
              <feColorMatrix
                values="0 0 0 0 0.183434311 0 0 0 0 0.183434311 0 0 0 0 0.183434311 0 0 0 0.17 0"
                in="shadowBlurOuter1"
              />
            </feGaussianBlur>
          </feOffset>
        </feMorphology>
      </filter>
    </defs>
    <g id="Symbols" fill="none" fillRule="evenodd">
      <g id="Block-choose" transform="translate(-56 -285)">
        <g id="Group-2" transform="translate(58 285)">
          <path
            d="M36.666663,15.4165691 C36.666663,15.957322 36.5145588,16.4586255 36.2708971,16.8996872 L28.4826206,8.18572005 L36.1864569,1.44554959 C36.4861409,1.92112956 36.666663,2.47977716 36.666663,3.08346632 L36.666663,15.4165691 Z M24.3333569,9.76791945 L35.0529955,0.388496218 C34.6131031,0.147681433 34.1177475,0 33.5834,0 L15.0833138,0 C14.5483054,0 14.0527973,0.147681433 13.6146842,0.388496218 L24.3333569,9.76791945 Z M27.3219106,9.20047705 L24.8406083,11.3729447 C24.6954687,11.4993762 24.5147433,11.5625158 24.3333569,11.5625158 C24.1518689,11.5625158 23.9711434,11.4993762 23.8260038,11.3729447 L21.3441424,9.20037538 L13.4573438,18.0257263 C13.9300769,18.3223093 14.4840983,18.4999845 15.083263,18.4999845 L33.5834,18.4999845 C34.182463,18.4999845 34.7367386,18.3223093 35.2093192,18.0257263 L27.3219106,9.20047705 Z M12.4803078,1.44549875 C12.1806746,1.92107872 12,2.47972632 12,3.08346632 L12,15.4166199 C12,15.9573729 12.1513925,16.4586764 12.3959693,16.899738 L20.1833307,8.18424578 L12.4803078,1.44549875 Z"
            id="Shape"
            fill="#FFF"
            fillRule="nonzero"
          />
          <g id="Fill-1">
            <use fill="#000" filter="url(#filter-2)" xlinkHref="#path-1" />
            <use fill="#FFF" xlinkHref="#path-1" />
          </g>
          <g id="Fill-3">
            <use fill="#000" filter="url(#filter-4)" xlinkHref="#path-3" />
            <use fill="#FFF" xlinkHref="#path-3" />
          </g>
        </g>
      </g>
    </g>
  </svg>
);

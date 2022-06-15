import React from "react";

const Icon = ({ className }: any) => (
  <svg
    className={className + " fill"}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.0002 7.79396C16.0002 12.0985 12.4839 15.5879 8.14553 15.5879C6.76826 15.5879 5.47438 15.2359 4.34868 14.6181L0 16L1.4178 11.8183C0.702587 10.6439 0.29067 9.26649 0.29067 7.79396C0.29067 3.48942 3.80734 0 8.14553 0C12.4842 0 16.0002 3.48942 16.0002 7.79396ZM8.14553 1.24124C4.50388 1.24124 1.54171 4.1808 1.54171 7.79396C1.54171 9.22773 2.00909 10.5556 2.79968 11.6357L1.9746 14.0693L4.51241 13.2628C5.55509 13.9474 6.80418 14.3467 8.1457 14.3467C11.7868 14.3467 14.7495 11.4075 14.7495 7.79431C14.7495 4.18116 11.787 1.24124 8.14553 1.24124ZM12.112 9.58898C12.0634 9.50951 11.9353 9.46151 11.7429 9.36604C11.5502 9.27058 10.6033 8.80818 10.4273 8.74471C10.2508 8.68107 10.1221 8.64907 9.99391 8.84018C9.86573 9.03147 9.49665 9.46151 9.38412 9.58898C9.27176 9.7168 9.15958 9.7328 8.96687 9.63716C8.77451 9.54169 8.15424 9.33973 7.41876 8.68907C6.84649 8.18276 6.45999 7.55769 6.34764 7.36622C6.23546 7.17511 6.3359 7.07182 6.43208 6.97671C6.51884 6.89102 6.6248 6.7536 6.72097 6.64213C6.81751 6.53049 6.84951 6.45102 6.91333 6.32338C6.97787 6.19591 6.94569 6.08444 6.89733 5.98862C6.84933 5.89316 6.4639 4.95307 6.30355 4.57049C6.14319 4.18827 5.98301 4.25191 5.87047 4.25191C5.7583 4.25191 5.62976 4.23591 5.5014 4.23591C5.37305 4.23591 5.16433 4.28373 4.9878 4.47484C4.81144 4.66613 4.31419 5.12836 4.31419 6.06827C4.31419 7.00836 5.0038 7.91662 5.10033 8.04391C5.19651 8.1712 6.4319 10.163 8.38926 10.928C10.3468 11.6926 10.3468 11.4375 10.6999 11.4055C11.0526 11.3737 11.8387 10.9435 11.9998 10.4976C12.1598 10.051 12.1598 9.66862 12.112 9.58898Z"
      fill="black"
    />
  </svg>
);

Icon.displayName = "Icon.Eye";

export default Icon;

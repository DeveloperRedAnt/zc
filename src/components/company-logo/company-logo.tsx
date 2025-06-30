import React from 'react';

interface CompanyLogoProps {
  logoSrc: string;
  logoAlt?: string;
  companyName: string;
  productName: string;
  logoStyle?: React.CSSProperties;
  companyNameClassName?: string;
  productNameClassName?: string;
}

const defaultLogoStyle: React.CSSProperties = {
  display: 'inline-block',
  verticalAlign: 'middle',
  height: 28,
  marginRight: 8,
};

export const CompanyLogo: React.FC<CompanyLogoProps> = ({
  logoSrc,
  logoAlt = 'Company Logo',
  companyName,
  productName,
  logoStyle,
  companyNameClassName = 'font-normal text-base leading-[30px] align-middle',
  productNameClassName = 'font-light text-base leading-[30px] align-middle',
}) => (
  <span>
    <img src={logoSrc} alt={logoAlt} style={{ ...defaultLogoStyle, ...logoStyle }} />
    <span className={companyNameClassName}>{companyName}</span>
    &nbsp;
    <span className={productNameClassName}>{productName}</span>
  </span>
);

export default CompanyLogo;

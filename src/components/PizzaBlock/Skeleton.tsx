import React from "react"
import ContentLoader from "react-content-loader"

export const Skeleton: React.FC = (props) => (
  <ContentLoader 
    className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="292" rx="10" ry="10" width="280" height="35" /> 
    <rect x="0" y="338" rx="10" ry="10" width="280" height="70" /> 
    <rect x="0" y="422" rx="10" ry="10" width="130" height="35" /> 
    <rect x="150" y="423" rx="10" ry="10" width="130" height="35" /> 
    <circle cx="140" cy="141" r="120" />
  </ContentLoader>
)
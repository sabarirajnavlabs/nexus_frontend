'use client';

import { createContext, useContext } from 'react';

// Default values (Nexus configuration)
const defaultConfig = {
  deploymentType: 'nexus',
  orgName: 'Nexus AI Platform',
  logoPath: '/logos/nexus-logo.png',
  logoCirclePath: '/Navbar/logo-circle.png',
  backgroundImg: '/SignIn/background.png',
  primaryColor: '#3B82F6',
  secondaryColor: '#1E40AF',
  textColor: '#0E7490',
  favicon: '/favicons/nexus-favicon.ico',
  tagline: 'Advanced AI Platform',
  showResearcherTagline: false,
  backgroundColor: '#e1f5fe'
};

// Create the context with default values
const ConfigContext = createContext(defaultConfig);

export function ConfigProvider({ children }) {
  // Get values from environment variables, fallback to defaults
  const config = {
    deploymentType: process.env.NEXT_PUBLIC_DEPLOYMENT_TYPE || defaultConfig.deploymentType,
    orgName: process.env.NEXT_PUBLIC_ORG_NAME || defaultConfig.orgName,
    logoPath: process.env.NEXT_PUBLIC_LOGO_PATH || defaultConfig.logoPath,
    logoCirclePath: process.env.NEXT_PUBLIC_LOGO_CIRCLE_PATH || defaultConfig.logoCirclePath,
    backgroundImg: process.env.NEXT_PUBLIC_BACKGROUND_IMG || defaultConfig.backgroundImg,
    primaryColor: process.env.NEXT_PUBLIC_PRIMARY_COLOR || defaultConfig.primaryColor,
    secondaryColor: process.env.NEXT_PUBLIC_SECONDARY_COLOR || defaultConfig.secondaryColor,
    textColor: process.env.NEXT_PUBLIC_TEXT_COLOR || defaultConfig.textColor,
    favicon: process.env.NEXT_PUBLIC_FAVICON || defaultConfig.favicon,
    tagline: process.env.NEXT_PUBLIC_TAGLINE || defaultConfig.tagline,
    showResearcherTagline: process.env.NEXT_PUBLIC_SHOW_RESEARCHER_TAGLINE === 'true' ? true : defaultConfig.showResearcherTagline,
    backgroundColor: process.env.NEXT_PUBLIC_BACKGROUND_COLOR || defaultConfig.backgroundColor,
  };
  
  // Log current config for debugging
  console.log('Config loaded:', {
    textColor: config.textColor,
    backgroundColor: config.backgroundColor,
    primaryColor: config.primaryColor
  });
  
  return (
    <ConfigContext.Provider value={config}>
      {children}
    </ConfigContext.Provider>
  );
}

// Custom hook to use the config
export const useConfig = () => useContext(ConfigContext); 
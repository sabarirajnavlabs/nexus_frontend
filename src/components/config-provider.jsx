'use client';

import { createContext, useContext } from 'react';

// Default values (Nexus configuration)
const defaultConfig = {
  deploymentType: 'nexus',
  orgName: 'Nexus AI Platform',
  logoPath: '/logos/nexus-logo.png',
  logoCirclePath: '/NavigateLabs-CIR.png',
  backgroundImg: '/SignIn/background.png',
  primaryColor: '#3B82F6',
  secondaryColor: '#1E40AF',
  textColor: '#000000',
  backgroundColor: '#FFFFFF',
  inputBackgroundColor: '#FFFFFF',
  inputTextColor: '#000000',
  cardBackgroundColor: '#FFFFFF',
  cardTextColor: '#000000',
  favicon: '/favicons/nexus-favicon.ico',
  tagline: 'Advanced AI Platform',
  showResearcherTagline: false,
};

// Create the context with default values
const ConfigContext = createContext(defaultConfig);

export function ConfigProvider({ children }) {
  // Get values from environment variables, fallback to defaults
  const deploymentType = process.env.NEXT_PUBLIC_DEPLOYMENT_TYPE || defaultConfig.deploymentType;
  
  // Base configuration with defaults
  const config = {
    deploymentType,
    orgName: process.env.NEXT_PUBLIC_ORG_NAME || defaultConfig.orgName,
    logoPath: process.env.NEXT_PUBLIC_LOGO_PATH || defaultConfig.logoPath,
    logoCirclePath: process.env.NEXT_PUBLIC_LOGO_CIRCLE_PATH || defaultConfig.logoCirclePath,
    backgroundImg: process.env.NEXT_PUBLIC_BACKGROUND_IMG || defaultConfig.backgroundImg,
    primaryColor: process.env.NEXT_PUBLIC_PRIMARY_COLOR || defaultConfig.primaryColor,
    secondaryColor: process.env.NEXT_PUBLIC_SECONDARY_COLOR || defaultConfig.secondaryColor,
    textColor: process.env.NEXT_PUBLIC_TEXT_COLOR || defaultConfig.textColor,
    backgroundColor: process.env.NEXT_PUBLIC_BACKGROUND_COLOR || defaultConfig.backgroundColor,
    inputBackgroundColor: process.env.NEXT_PUBLIC_INPUT_BACKGROUND_COLOR || defaultConfig.inputBackgroundColor,
    inputTextColor: process.env.NEXT_PUBLIC_INPUT_TEXT_COLOR || defaultConfig.inputTextColor,
    cardBackgroundColor: process.env.NEXT_PUBLIC_CARD_BACKGROUND_COLOR || defaultConfig.cardBackgroundColor,
    cardTextColor: process.env.NEXT_PUBLIC_CARD_TEXT_COLOR || defaultConfig.cardTextColor,
    favicon: process.env.NEXT_PUBLIC_FAVICON || defaultConfig.favicon,
    tagline: process.env.NEXT_PUBLIC_TAGLINE || defaultConfig.tagline,
    showResearcherTagline: process.env.NEXT_PUBLIC_SHOW_RESEARCHER_TAGLINE === 'true' ? true : defaultConfig.showResearcherTagline,
  };
  
  // Deployment-specific overrides
  if (deploymentType === 'nexus') {
    // Ensure Nexus always has correct colors
    config.textColor = '#000000';
    config.backgroundColor = '#FFFFFF';
    config.inputBackgroundColor = '#FFFFFF';
    config.inputTextColor = '#000000';
    config.cardBackgroundColor = '#FFFFFF';
    config.cardTextColor = '#000000';
  }
  
  // Log current config for debugging
  console.log('Config loaded:', {
    deploymentType: config.deploymentType,
    textColor: config.textColor,
    backgroundColor: config.backgroundColor,
    primaryColor: config.primaryColor,
    inputBackgroundColor: config.inputBackgroundColor,
    inputTextColor: config.inputTextColor,
  });
  
  // Apply config to document
  if (typeof document !== 'undefined') {
    document.documentElement.style.setProperty('--text-color', config.textColor);
    document.documentElement.style.setProperty('--background-color', config.backgroundColor);
    document.documentElement.style.setProperty('--input-background-color', config.inputBackgroundColor);
    document.documentElement.style.setProperty('--input-text-color', config.inputTextColor);
    document.documentElement.style.setProperty('--card-background-color', config.cardBackgroundColor);
    document.documentElement.style.setProperty('--card-text-color', config.cardTextColor);
  }
  
  return (
    <ConfigContext.Provider value={config}>
      {children}
    </ConfigContext.Provider>
  );
}

// Custom hook to use the config
export const useConfig = () => useContext(ConfigContext); 
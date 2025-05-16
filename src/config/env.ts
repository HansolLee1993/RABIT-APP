interface Config {
  API_URL: string;
}

const DEV_CONFIG: Config = {
  API_URL: 'http://10.0.2.2:3000',
};

const PROD_CONFIG: Config = {
  API_URL:
    'http://ti-hackathon-rabit-inventory-env.eba-ywryj2iz.us-east-1.elasticbeanstalk.com', // Update this with your production URL
};

const ENV = __DEV__ ? DEV_CONFIG : PROD_CONFIG;

export const API_ENDPOINTS = {
  CLAUDE: `${ENV.API_URL}/api/claude`,
  SEARCH: `${ENV.API_URL}/api/search`,
};

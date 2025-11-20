/*
  # Create SEMrush Data Tables
  
  1. New Tables
    - `organic_keywords` - Stores organic search keyword data
      - `id` (uuid, primary key)
      - `keyword` (text) - The search keyword
      - `position` (integer) - Current ranking position
      - `previous_position` (integer) - Previous ranking position
      - `search_volume` (integer) - Monthly search volume
      - `keyword_difficulty` (numeric) - SEO difficulty score
      - `cpc` (numeric) - Cost per click
      - `url` (text) - Ranking URL
      - `traffic` (integer) - Estimated traffic
      - `traffic_percent` (numeric) - Percentage of total traffic
      - `traffic_cost` (numeric) - Estimated traffic value
      - `competition` (numeric) - Competition level
      - `number_of_results` (bigint) - Number of search results
      - `trends` (jsonb) - Historical trend data
      - `timestamp` (text) - Data timestamp
      - `serp_features` (text) - SERP features present
      - `keyword_intents` (text) - Search intent classification
      - `position_type` (text) - Position type
      - `created_at` (timestamptz)
    
    - `paid_keywords` - Stores paid search keyword data
      - `id` (uuid, primary key)
      - `title` (text) - Ad title
      - `description` (text) - Ad description
      - `keyword` (text) - The search keyword
      - `position` (integer) - Ad position
      - `previous_position` (integer) - Previous ad position
      - `search_volume` (integer) - Monthly search volume
      - `cpc` (numeric) - Cost per click
      - `visible_url` (text) - Visible ad URL
      - `url` (text) - Destination URL
      - `traffic` (integer) - Estimated traffic
      - `traffic_percent` (numeric) - Percentage of total traffic
      - `traffic_cost` (numeric) - Estimated traffic cost
      - `traffic_cost_percent` (numeric) - Percentage of total cost
      - `competition` (numeric) - Competition level
      - `number_of_results` (bigint) - Number of results
      - `trends` (jsonb) - Historical trend data
      - `last_seen` (text) - Last seen date
      - `keyword_difficulty` (numeric) - Keyword difficulty
      - `created_at` (timestamptz)
    
    - `traffic_trends` - Stores traffic trend data over time
      - `id` (uuid, primary key)
      - `date` (text) - Period date
      - `metric_type` (text) - Type of metric (visits, unique_visitors, etc.)
      - `value` (numeric) - Metric value
      - `created_at` (timestamptz)
    
    - `geo_distribution` - Stores geographic traffic distribution
      - `id` (uuid, primary key)
      - `country` (text) - Country name
      - `metric_type` (text) - Type of metric (visits, unique_visitors)
      - `traffic_share` (numeric) - Percentage of traffic
      - `all_devices` (integer) - Total traffic from all devices
      - `desktop_share` (numeric) - Desktop traffic percentage
      - `mobile_share` (numeric) - Mobile traffic percentage
      - `created_at` (timestamptz)
    
    - `top_pages` - Stores top performing pages
      - `id` (uuid, primary key)
      - `url` (text) - Page URL
      - `traffic_percent` (numeric) - Percentage of total traffic
      - `number_of_keywords` (integer) - Number of ranking keywords
      - `traffic` (integer) - Estimated traffic
      - `adwords_positions` (integer) - Number of paid positions
      - `commercial_positions` (integer) - Commercial intent keywords
      - `informational_positions` (integer) - Informational keywords
      - `navigational_positions` (integer) - Navigational keywords
      - `transactional_positions` (integer) - Transactional keywords
      - `unknown_positions` (integer) - Unknown intent keywords
      - `commercial_traffic` (integer) - Commercial traffic
      - `informational_traffic` (integer) - Informational traffic
      - `navigational_traffic` (integer) - Navigational traffic
      - `transactional_traffic` (integer) - Transactional traffic
      - `unknown_traffic` (integer) - Unknown intent traffic
      - `traffic_change` (numeric) - Traffic change percentage
      - `created_at` (timestamptz)
  
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to read data
    - Add policies for service role to write data
*/

-- Create organic_keywords table
CREATE TABLE IF NOT EXISTS organic_keywords (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  keyword text NOT NULL,
  position integer DEFAULT 0,
  previous_position integer DEFAULT 0,
  search_volume integer DEFAULT 0,
  keyword_difficulty numeric DEFAULT 0,
  cpc numeric DEFAULT 0,
  url text DEFAULT '',
  traffic integer DEFAULT 0,
  traffic_percent numeric DEFAULT 0,
  traffic_cost numeric DEFAULT 0,
  competition numeric DEFAULT 0,
  number_of_results bigint DEFAULT 0,
  trends jsonb DEFAULT '[]'::jsonb,
  timestamp text DEFAULT '',
  serp_features text DEFAULT '',
  keyword_intents text DEFAULT '',
  position_type text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Create paid_keywords table
CREATE TABLE IF NOT EXISTS paid_keywords (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text DEFAULT '',
  description text DEFAULT '',
  keyword text NOT NULL,
  position integer DEFAULT 0,
  previous_position integer DEFAULT 0,
  search_volume integer DEFAULT 0,
  cpc numeric DEFAULT 0,
  visible_url text DEFAULT '',
  url text DEFAULT '',
  traffic integer DEFAULT 0,
  traffic_percent numeric DEFAULT 0,
  traffic_cost numeric DEFAULT 0,
  traffic_cost_percent numeric DEFAULT 0,
  competition numeric DEFAULT 0,
  number_of_results bigint DEFAULT 0,
  trends jsonb DEFAULT '[]'::jsonb,
  last_seen text DEFAULT '',
  keyword_difficulty numeric DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create traffic_trends table
CREATE TABLE IF NOT EXISTS traffic_trends (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date text NOT NULL,
  metric_type text NOT NULL,
  value numeric DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create geo_distribution table
CREATE TABLE IF NOT EXISTS geo_distribution (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  country text NOT NULL,
  metric_type text NOT NULL,
  traffic_share numeric DEFAULT 0,
  all_devices integer DEFAULT 0,
  desktop_share numeric DEFAULT 0,
  mobile_share numeric DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create top_pages table
CREATE TABLE IF NOT EXISTS top_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  traffic_percent numeric DEFAULT 0,
  number_of_keywords integer DEFAULT 0,
  traffic integer DEFAULT 0,
  adwords_positions integer DEFAULT 0,
  commercial_positions integer DEFAULT 0,
  informational_positions integer DEFAULT 0,
  navigational_positions integer DEFAULT 0,
  transactional_positions integer DEFAULT 0,
  unknown_positions integer DEFAULT 0,
  commercial_traffic integer DEFAULT 0,
  informational_traffic integer DEFAULT 0,
  navigational_traffic integer DEFAULT 0,
  transactional_traffic integer DEFAULT 0,
  unknown_traffic integer DEFAULT 0,
  traffic_change numeric DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE organic_keywords ENABLE ROW LEVEL SECURITY;
ALTER TABLE paid_keywords ENABLE ROW LEVEL SECURITY;
ALTER TABLE traffic_trends ENABLE ROW LEVEL SECURITY;
ALTER TABLE geo_distribution ENABLE ROW LEVEL SECURITY;
ALTER TABLE top_pages ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (data is not sensitive)
CREATE POLICY "Anyone can read organic keywords"
  ON organic_keywords FOR SELECT
  USING (true);

CREATE POLICY "Anyone can read paid keywords"
  ON paid_keywords FOR SELECT
  USING (true);

CREATE POLICY "Anyone can read traffic trends"
  ON traffic_trends FOR SELECT
  USING (true);

CREATE POLICY "Anyone can read geo distribution"
  ON geo_distribution FOR SELECT
  USING (true);

CREATE POLICY "Anyone can read top pages"
  ON top_pages FOR SELECT
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_organic_keywords_position ON organic_keywords(position);
CREATE INDEX IF NOT EXISTS idx_organic_keywords_search_volume ON organic_keywords(search_volume);
CREATE INDEX IF NOT EXISTS idx_traffic_trends_date_metric ON traffic_trends(date, metric_type);
CREATE INDEX IF NOT EXISTS idx_geo_distribution_country ON geo_distribution(country, metric_type);

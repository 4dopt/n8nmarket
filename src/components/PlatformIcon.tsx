import React from 'react';
import { Box } from 'lucide-react';

// Static Imports to ensure Vite bundles them correctly
import aws from '../assets/icons/social/aws.svg';
import clearbit from '../assets/icons/social/clearbit.png';
import discord from '../assets/icons/social/discord.svg';
import espn from '../assets/icons/social/espn.png';
import eventbrite from '../assets/icons/social/eventbrite.svg';
import fitbit from '../assets/icons/social/fitbit.svg';
import freshdesk from '../assets/icons/social/freshdesk.jpeg';
import github from '../assets/icons/social/github.svg';
import google from '../assets/icons/social/google.svg';
import homeassistant from '../assets/icons/social/homeassistant.svg';
import hubspot from '../assets/icons/social/hubspot.svg';
import instagram from '../assets/icons/social/instagram.svg';
import jira from '../assets/icons/social/jira.svg';
import linkedin from '../assets/icons/social/linkedin.svg';
import medium from '../assets/icons/social/medium.svg';
import moodle from '../assets/icons/social/moodle.svg';
import notion from '../assets/icons/social/notion.svg';
import openai from '../assets/icons/social/openai.svg';
import pagerduty from '../assets/icons/social/pagerduty.svg';
import philipshue from '../assets/icons/social/philipshue.svg';
import postgresql from '../assets/icons/social/postgresql.svg';
import salesforce from '../assets/icons/social/salesforce.svg';
import schedule from '../assets/icons/social/schedule.svg';
import slack from '../assets/icons/social/slack.svg';
import stripe from '../assets/icons/social/stripe.svg';
import teams from '../assets/icons/social/teams.svg';
import telegram from '../assets/icons/social/telegram.svg';
import todoist from '../assets/icons/social/todoist.svg';
import trello from '../assets/icons/social/trello.svg';
import twilio from '../assets/icons/social/twilio.svg';
import twitter from '../assets/icons/social/twitter.svg';
import typeform from '../assets/icons/social/typeform.svg';
import webhook from '../assets/icons/social/webhook.svg';
import woocommerce from '../assets/icons/social/woocommerce.svg';
import wordpress from '../assets/icons/social/wordpress.svg';
import zendesk from '../assets/icons/social/zendesk.svg';
import zoom from '../assets/icons/social/zoom.svg';
import airtable from '../assets/icons/social/airtable.svg';
import asana from '../assets/icons/social/asana.svg';
import gmail from '../assets/icons/social/gmail.svg';
import googlecalendar from '../assets/icons/social/googlecalendar.svg';
import googledocs from '../assets/icons/social/googledocs.svg';
import googledrive from '../assets/icons/social/googledrive.svg';
import googlesheets from '../assets/icons/social/googlesheets.svg';
import googleslides from '../assets/icons/social/googleslides.svg';
import googletasks from '../assets/icons/social/googletasks.svg';
import googlemeet from '../assets/icons/social/googlemeet.svg';


// Map of normalized platform name to imported file URL
const ICON_MAP: Record<string, string> = {
    'amazon web services': aws,
    'aws': aws,
    'clearbit': clearbit,
    'espn': espn,
    'eventbrite': eventbrite,
    'fitbit': fitbit,
    'freshdesk': freshdesk,
    'github': github,
    'google': google,
    'gmail': gmail,
    'google calendar': googlecalendar,
    'google docs': googledocs,
    'google drive': googledrive,
    'google sheets': googlesheets,
    'google slides': googleslides,
    'google tasks': googletasks,
    'google meet': googlemeet,
    'home assistant': homeassistant,
    'hubspot': hubspot,
    'instagram': instagram,
    'jira': jira,
    'linkedin': linkedin,
    'medium': medium,
    'moodle': moodle,
    'notion': notion,
    'openai': openai,
    'chatgpt': openai,
    'pagerduty': pagerduty,
    'philips hue': philipshue,
    'postgres': postgresql,
    'postgresql': postgresql,
    'salesforce': salesforce,
    'schedule': schedule,
    'cron': schedule,
    'slack': slack,
    'stripe': stripe,
    'teams': teams,
    'microsoft teams': teams,
    'telegram': telegram,
    'todoist': todoist,
    'trello': trello,
    'twilio': twilio,
    'twitter': twitter,
    'x': twitter,
    'typeform': typeform,
    'webhook': webhook,
    'woocommerce': woocommerce,
    'wordpress': wordpress,
    'zendesk': zendesk,
    'zoom': zoom,
    'airtable': airtable,
    'asana': asana,
    'discord': discord,
};

// Helper to get normalized key
const getIconUrl = (platform: string): string | null => {
    if (!platform) return null;
    let normalized = platform.toLowerCase().trim();

    // 1. Check direct map first
    if (ICON_MAP[normalized]) return ICON_MAP[normalized];

    // 2. Specific partial matches (more robust than generic catch-all)
    if (normalized.includes('sheet')) return googlesheets;
    if (normalized.includes('drive')) return googledrive;
    if (normalized.includes('calendar')) return googlecalendar;
    if (normalized.includes('docs') || normalized.includes('document')) return googledocs;
    if (normalized.includes('slide')) return googleslides;
    if (normalized.includes('meet')) return googlemeet;
    if (normalized.includes('mail') || normalized.includes('gmail')) return gmail;

    if (normalized.includes('openai') || normalized.includes('open a i') || normalized.includes('gpt')) return openai;
    if (normalized.includes('slack')) return slack;
    if (normalized.includes('hubspot')) return hubspot;

    // 3. Generic fallbacks
    if (normalized.includes('google')) return google;

    return null;
};

interface PlatformIconProps {
    platform: string;
    className?: string;
    showTooltip?: boolean;
}

// Export helper to check if an icon exists for a platform
export const hasValidIcon = (platform: string): boolean => {
    return !!getIconUrl(platform);
};

const PlatformIcon: React.FC<PlatformIconProps> = ({ platform, className = "w-6 h-6", showTooltip = true }) => {
    const iconUrl = getIconUrl(platform);
    const [hasError, setHasError] = React.useState(false);

    if (!iconUrl || hasError) {
        // User requested no blank spaces/placeholders for unknown platforms.
        // Return null to render nothing.
        return null;
    }

    return (
        <div className={`relative group inline-flex items-center justify-center ${className}`} title={showTooltip ? platform : undefined}>
            <img
                src={iconUrl}
                alt={`${platform} icon`}
                className="w-full h-full object-contain"
                onError={() => setHasError(true)}
            />
        </div>
    );
};

export default PlatformIcon;

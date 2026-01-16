
import { RegistrationData, Event } from '../types';
import { managementEvents, culturalEvents } from '../constants';

const allEvents = [...managementEvents, ...culturalEvents];
const eventDetailsMap = allEvents.reduce((acc, event) => {
    acc[event.name] = event;
    return acc;
}, {} as Record<string, Event>);


export const calculateRegistrationFee = (registration: RegistrationData): number => {
    if (!registration || !registration.teams) return 0;

    return registration.teams.reduce((totalFee, team) => {
        const event = eventDetailsMap[team.eventName];
        if (!event || !event.feeAmount) {
            return totalFee;
        }

        if (event.feeType === 'per-team') {
            return totalFee + event.feeAmount;
        }

        if (event.feeType === 'per-person') {
            return totalFee + (event.feeAmount * team.participants.length);
        }

        return totalFee;
    }, 0);
};

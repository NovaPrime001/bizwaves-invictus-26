
import { RegistrationData } from '../types';

export const exportEventToCSV = (registrations: RegistrationData[], eventName: string) => {
    const eventTeams = registrations
        .map(reg => ({
            ...reg,
            teams: reg.teams.filter(team => team.eventName === eventName)
        }))
        .filter(reg => reg.teams.length > 0);

    if (eventTeams.length === 0) {
        alert(`No teams registered for ${eventName}.`);
        return;
    }

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "SPOC Name,SPOC Email,SPOC Phone,Institute,Team Event,Participant Name,Participant Contact\r\n";

    eventTeams.forEach(reg => {
        reg.teams.forEach(team => {
            team.participants.forEach(participant => {
                const row = [
                    reg.spocName,
                    reg.email,
                    reg.phone,
                    reg.institute,
                    team.eventName,
                    participant.name,
                    participant.contact
                ].join(",");
                csvContent += row + "\r\n";
            });
        });
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${eventName}_participants.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

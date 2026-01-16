
import { Event, RegistrationData } from './types';

export const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/#about' },
  { name: 'Events', href: '/#events' },
  { name: 'Register', href: '/#register' },
  { name: 'Contact', href: '/#contact' },
];

export const managementEvents: Event[] = [
  {
    name: 'WarRoom',
    subtitle: 'Best Management Team',
    logo: '/public/images/warroom.png',
    description: 'A high-pressure strategic collaboration where teams make swift, precise decisions while analyzing scenarios, aligning perspectives, and executing strategies across multidimensional business challenges.',
    teamSize: '3',
    contacts: [
      { name: 'Swathipriya', phone: '+91 72048 49354' },
      { name: 'Kajal', phone: '+91 91406 72082' },
    ],
    feeType: 'per-person',
    feeAmount: 250,
  },
  {
    name: 'Regent',
    subtitle: 'Best Manager',
    logo: '/public/images/regent.png',
    description: 'Regent recognizes leaders who command authority while demonstrating insight and adaptability, highlighting their ability to guide teams, make informed decisions, and lead through complex business realities.',
    teamSize: '1',
    contacts: [
      { name: 'Anshika', phone: '+91 63611 86053' },
      { name: 'Vivek', phone: '+91 73879 70767' },
    ],
    feeType: 'per-person',
    feeAmount: 250,
  },
  {
    name: 'Parallax',
    subtitle: 'Marketing',
    logo: '/public/images/parallax.png',
    description: 'Examines how a single brand is perceived differently across markets and touchpoints, focusing on strategy, positioning, and adaptation across segments, channels, and contexts.',
    teamSize: '2',
    contacts: [
      { name: 'Soushiya', phone: '+91 90082 53334' },
      { name: 'Rekha Bhat', phone: '+91 98459 33984' },
    ],
    feeType: 'per-person',
    feeAmount: 250,
  },
  {
    name: 'Equinox',
    subtitle: 'Finance',
    logo: '/public/images/equinox.png',
    description: 'Equinox represents the balance between risk and return in a shifting financial landscape, where participants navigate parallel outcomes and make strategic decisions testing judgment, foresight, and strength.',
    teamSize: '2',
    contacts: [
      { name: 'Preetika Baliga', phone: '+91 98441 43105' },
      { name: 'Khushi D', phone: '+91 63612 52080' },
    ],
    feeType: 'per-person',
    feeAmount: 250,
  },
  {
    name: 'Keystone',
    subtitle: 'Human Resources',
    logo: '/public/images/keystone.png',
    description: 'Keystone symbolizes the core holding an organization together across dimensions, focusing on leadership alignment, cultural strength, and people systems that sustain performance and continuity in evolving environments.',
    teamSize: '2',
    contacts: [
      { name: 'Shaada', phone: '+91 98452 71147' },
      { name: 'Shatha', phone: '+91 86185 09860' },
    ],
    feeType: 'per-person',
    feeAmount: 250,
  },
  {
    name: 'Credence',
    subtitle: 'Public Relations',
    logo: '/public/images/credence.png',
    description: 'Credence centers on building and sustaining trust within complex stakeholder ecosystems, challenging participants to manage reputation, shape perception, and communicate credibility across diverse, dynamic environments.',
    teamSize: '2',
    contacts: [
      { name: 'Bhumika', phone: '+91 90199 05519' },
      { name: 'Nikhita Ashok', phone: '+91 96065 23834' },
    ],
    feeType: 'per-person',
    feeAmount: 250,
  },
  {
    name: 'Crossfire',
    subtitle: 'Business Quiz',
    logo: '/public/images/crossfire.png',
    description: 'Crossfire is a fast-paced test of business knowledge and mental agility, evaluating how quickly participants respond accurately to dynamic situations requiring sharp situational awareness.',
    teamSize: '2',
    contacts: [
      { name: 'Varun', phone: '+91 63614 99523' },
      { name: 'Ramakrishna', phone: '+91 84310 67632' },
    ],
    feeType: 'per-person',
    feeAmount: 250,
  },
];

export const culturalEvents: Event[] = [
  {
    name: 'BeatVerse',
    subtitle: 'Group Dance',
    logo: '/public/images/beatverse.png',
    description: 'Group Dance celebrates unity and rhythm through Bollywood, as teams bring stories to life with synchronized choreography and dynamic formations, showcasing teamwork, cultural flair, and stage presence with artistic integrity.',
    teamSize: '6-8',
    contacts: [
      { name: 'Sowparnika', phone: '+91 80887 48013' },
      { name: 'Prathyusha', phone: '+91 78260 92988' },
    ],
    day: 'Day 1',
    feeType: 'per-team',
    feeAmount: 1200,
  },
  {
    name: 'The Consortium',
    subtitle: 'Corporate Walk',
    logo: '/public/images/the-consortium.png',
    description: 'A supreme intergalactic boardroom of visionary executives in their signature corporate look, blending Indian-fusion elegance with futuristic power.',
    teamSize: '6-8',
    contacts: [
      { name: 'Dhruv', phone: '+91 86301 51618' },
      { name: 'Nabil', phone: '+91 96111 18573' },
    ],
    day: 'Day 2',
    feeType: 'per-team',
    feeAmount: 1200,
  },
  {
    name: 'Aperture & Soul',
    subtitle: 'Photography',
    logo: '/public/images/aperture-and-soul.png',
    description: 'Beyond the shutter lies a story. The event challenges photographers to express a central theme through their creative vision, judged on technical quality, narrative strength, and thematic relevance.',
    teamSize: '1',
    contacts: [
      { name: 'Sneha Gupta', phone: '+91 93406 29539' },
      { name: 'Ambikesh Pandey', phone: '+91 63862 38269' },
    ],
    day: 'Day 2',
    feeType: 'per-person',
    feeAmount: 150,
  },
  {
    name: 'Frame Shift',
    subtitle: 'Reel Making',
    logo: '/public/images/frame-shift.png',
    description: 'Explore the multiverse through visual storytelling, blending imagination, transitions, and narrative depth into short-form videos.',
    teamSize: '2',
    contacts: [
      { name: 'Hrithvik Bhandary', phone: '+91 76761 22854' },
      { name: 'Priya Shetty', phone: '+91 77950 61137' },
    ],
    day: 'Day 1 - 2',
    feeType: 'per-person',
    feeAmount: 200,
  },
];

export const guidelines = [
  'Management Events are open to both UG and PG Management and Commerce Students.',
  'Cultural Events are open to all.',
  'Punctuality and discipline are our primary concerns.',
  'The decisions of the judges will be final and binding in all respects.',
  'Participants must be technically equipped as required for the event.',
  'A formal dress code is mandatory.',
  'The participation fee is ₹250 per person for Management Events.',
  'Use of unfair means, plagiarism, or external assistance will lead to immediate disqualification.',
  'Colleges must participate in all Management Events to be eligible for the Overall Championship Title.',
  'There is no limit on the number of teams a college may send for participation.',
  'Participants must hold a valid College ID during registration.',
  'Participants must report to the venue at least 30 minutes before the scheduled time.',
  'The organizing committee is not responsible for loss or damage of personal belongings.',
  'The organizing committee reserves the right to modify the schedule, rules, or event format if required.',
  'The last date for registration is February 8th, 12 PM. No spot registration will be available.',
];

export const mockRegistrations: RegistrationData[] = [
    {
        id: 'reg-001',
        spocName: 'Aarav Sharma', institute: 'IIM Bangalore', email: 'aarav.s@iimb.ac.in', phone: '+91 98765 43210', program: 'PG', course: 'MBA',
        teams: [
            { eventName: 'WarRoom', participants: [{ name: 'Aarav Sharma', contact: '9876543210' }, { name: 'Participant B', contact: '9876543211' }, { name: 'Participant C', contact: '9876543212' }] },
            { eventName: 'Equinox', participants: [{ name: 'Participant D', contact: '9876543213' }, { name: 'Participant E', contact: '9876543214' }] }
        ],
        totalParticipants: 5,
        paymentScreenshot: { name: 'iimb_payment.png', dataUrl: '' },
        paymentStatus: 'Pending'
    },
    {
        id: 'reg-002',
        spocName: 'Priya Patel', institute: 'Christ University', email: 'priya.p@christuniversity.in', phone: '+91 87654 32109', program: 'UG', course: 'BBA',
        teams: [
            { eventName: 'Parallax', participants: [{ name: 'Priya Patel', contact: '8765432109' }, { name: 'Participant F', contact: '8765432108' }] },
            { eventName: 'BeatVerse', participants: [{ name: 'Participant G', contact: '8765432107' }, { name: 'Participant H', contact: '8765432106' }, { name: 'Participant I', contact: '8765432105' }, { name: 'Participant J', contact: '8765432104' }, { name: 'Participant K', contact: '8765432103' }, { name: 'Participant L', contact: '8765432102'}] }
        ],
        totalParticipants: 7,
        paymentScreenshot: { name: 'christ_uni_receipt.png', dataUrl: '' },
        paymentStatus: 'Pending'
    },
    {
        id: 'reg-003',
        spocName: 'Rohan Mehta', institute: 'NMIMS Mumbai', email: 'rohan.m@nmims.edu', phone: '+91 76543 21098', program: 'PG', course: 'MBA',
        teams: [
            { eventName: 'Regent', participants: [{ name: 'Rohan Mehta', contact: '7654321098' }] }
        ],
        totalParticipants: 1,
        paymentScreenshot: { name: 'nmims_transaction.pdf', dataUrl: '' },
        paymentStatus: 'Verified'
    }
];
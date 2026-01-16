
export interface EventContact {
  name: string;
  phone: string;
}

export interface Event {
  name: string;
  subtitle?: string;
  theme?: string;
  description: string;
  teamSize: string;
  contacts: EventContact[];
  logo?: string;
  day?: string;
  feeType?: 'per-person' | 'per-team';
  feeAmount?: number;
}

export interface Participant {
  name: string;
  contact: string;
}

export interface Team {
  eventName: string;
  participants: Participant[];
}

export interface RegistrationData {
  id: string;
  spocName: string;
  institute: string;
  email: string;
  phone: string;
  program: 'UG' | 'PG' | '';
  course: string;
  teams: Team[];
  paymentScreenshot?: {
    name: string;
    dataUrl: string;
  };
  totalParticipants: number;
  paymentStatus: 'Pending' | 'Verified' | 'Rejected';
  isSandbox?: boolean;
}
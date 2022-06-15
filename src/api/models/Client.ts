export interface Client {
    firstName: string;
    lastName: string;
    racket: string;
}


export function GetStaticClients() {
    const clients: Client[] = [
        { firstName: 'George', lastName: 'Go', racket: 'Diadem Elevate 98' },
        { firstName: 'Shad', lastName: 'Conrad', racket: 'Babloat Aero Pro Drive 2013' }
    ]

    return clients;
}
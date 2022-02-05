export class Realestate {
    id: number;
    name: string;
    city: string;
    city_region: string;
    microlocation: string;
    street: string;
    size: number;
    rooms: number;
    construction_year: number;
    state: string;
    heating: string;
    floor: string;
    total_floors: number;
    parking: number;
    monthly_utilities: number;
    price: number;
    about: string;
    characteristics: string[];
    type: string;
    agent: string;  //username from users
    sold: number;   //0-no 1-yes
};
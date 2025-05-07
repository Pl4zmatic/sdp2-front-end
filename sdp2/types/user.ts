export interface User {
    ID: number;
    LASTNAME: string;
    FIRSTNAME: string;
    EMAIL: string;
    ROL: number;
    STREET: string;
    CITY: string;
    POSTAL_CODE: string;
    HOUSE_NUMBER: string;
    BIRTHDATE: string;
    GSMNUMMER: string;
}

export interface CreateUserBody {
    STREET: string;
    CITY: string;
    POSTAL_CODE: string;
    HOUSE_NUMBER: string;
    BIRTHDATE: string;
    EMAIL: string;
    FIRSTNAME: string;
    GSMNUMMER: string;
    LASTNAME: string;
    PASSWORD: string;
    ROL: number;
} 
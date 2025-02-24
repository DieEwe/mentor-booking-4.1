export interface UserData {
    id?: string;        // Supabase user ID
    vorname: string;
    name: string;
    pronouns: string;
    role: string;
    email: string;
    Zitat: string;
    disability: string;
    languages: string[];
    Beschreibung: string;
    avatar_url?: string; // For profile image
}
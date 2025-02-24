export interface Event {
    id: number;
    datum_uhrzeit: string;
    coach: string;
    pledger: string;
    saeule: string;
    mentor: string;
    status: 'Bestätigt' | 'Ausstehend' | 'Abgesagt';
    created_at?: string;
}
// Valnattskoden ligger pausad mellan valen och aktiveras automatiskt
// vid nästa val (andra söndagen i september 2030).
// När servern rapporterar slutligt resultat pausas live-uppdateringarna igen.
export const NEXT_ELECTION_DATE = '2030-09-08'

export const isValnatt = () => new Date() >= new Date(NEXT_ELECTION_DATE)

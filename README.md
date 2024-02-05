# Mandatkollen

Mandatkollen är ett verktyg för att underlätta för medborgare, journalister och analytiker att visualisera och dra slutsatser kring de parlamentariska effekterna av olika hypotetiska valresultat.
Du får gärna använda skärmdumpar från Mandatkollen i egna poster och artiklar så länge du anger källan.

Mandatkollen är utvecklad av Iteam och Lennox PR.
Vill du använda Mandatkollen som en inbäddad funktion på din hemsida eller nyhetstjänst? Kontakta robert.svensson@lennoxpr.se

[![Build & Deploy to Dev](https://github.com/Iteam1337/mandatkollen/actions/workflows/publish.yml/badge.svg)](https://github.com/Iteam1337/mandatkollen/actions/workflows/publish.yml)

## Så funkar det

I visualiseringen fördelas mandaten över Riksdagens 349 platser utifrån ett hypotetiskt valresultat som du bestämmer. Om du flyttar ett reglage för ett parti så anpassas alla de andra partiernas andelar proportionerligt.
Om ett parti hamnar under riksdagsspärren på 4 procent så tilldelas de inga mandat.
Fördelningen av mandat är justerade enligt 2018 års regler för mandatfördelning.
Har du förslag på hur vi kan förbättra den här tjänsten? Kontakta christian.landgren@iteam.se.

## Underlag

Röstresultatet som visas initialt är valresultatet efter 2022 års val. Källa: val.se

## Hjälp till

Om du har förbättringsförslag kan du antingen lägga till en [issue](../../issues/) eller göra en [pull request](../../pulls/) via Github.

## Utvecklingsmiljö

För att få igång utecklingsmiljön lokalt behöver du bara köra följande kommandon

    npm install
    npm run dev

Vi använder oss av Vite som bygger och slår ihop alla js och css filer till ett paket. I produktion körs applikationen i Docker i Kubernetes och den miljön konfigureras enklast genom att köra följande:

    skaffold run

Applikationen byggs med hjälp av Github Actions som sammanställer en deployment som automatiskt hämtas av det Kuberneteskluster som kör applikationen via FluxCD.

## Avsändare

Iteam
Lennox PR

## Licens

MIT Copyright (c) 2024 Iteam Solutions AB

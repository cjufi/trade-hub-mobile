# Trade Hub - mobilna aplikacija koja služi za razmenu stvari.

## Opis ##

Aplikacija je kreirana pomoću React Native tehnologije. Dok je backend API napisan u Spring Boot-u i ta aplikacija je na sledećem linku: [spring-trade-hub](https://github.com/cjufi/spring-trade-hub).

## Glavne funkcionalnosti ##

- **Autentifikacija**: Korisnici se mogu registrovati, prijaviti i odjaviti sa aplikacije.
- **Dodavanje oglasa**: Korisnici mogu dodavati nove oglase i definisati njihovu kategoriju, naslov, opis kao i dodati sliku oglasa.
- **Izmena oglasa**: Korisnici mogu ažurirati postojeće oglase.
- **Brisanje oglasa**: Korisnici mogu brisati oglase.
- **Pregled oglasa**: Korisnici mogu pregledati sve oglase koji nisu prodati i klikom na određen oglas dodatne detalje vezane za oglas.
- **Praćenje oglasa**: Korisnici mogu da zaprate odredjene oglase kako bi lakse pregledali oglase koje ih dodatno zanimaju.
- **Rejting oglasa**: Korisnici mogu da ocene oglas i ostave komentar iskustva sa prodavcem.
- **Izmena korisnika**: Korisnici mogu menjati informacije o svom profilu poput broja telefona.

## Preduslovi ##

- [Node.js](https://nodejs.org/)
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [Expo CLI](https://docs.expo.dev/more/expo-cli/)

## Instalacija ##

1. Klonirajte repozitorijum i pozicionirajte se u novi direktorijum:
   ```sh
   git clone https://github.com/cjufi/trade-hub-mobile.git
   cd trade-hub-mobile
   ```
2. Instalirajte zavisnosti (node_modules):
   ```sh
   npm install
   ```
3. Podesite baseUrl za backend api:
   - Dodajte konfiguraciju u config/apiConfig.js gde će adresa biti vaša ip adresa
     
4. Pokrenite aplikaciju:
   ```sh
   npx expo start
   ```

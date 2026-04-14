# Coding Challenge Engram – Backend

NestJS REST API mit PostgreSQL über Supabase.

## Tech-Stack
- **NestJS** – modulares Node.js Framework
- **TypeORM** – ORM mit Migrations
- **PostgreSQL** via Supabase – Datenbank
- **Supabase Storage** – Bildspeicherung mit CDN

## Architektur
Die API ist in drei fachliche Module aufgeteilt: `user`, `picture` und `tag`.
Authentifizierung läuft über Basic-Auth,mit zugehörigem Guard in src/auth/. Alle geschützten Routen verwenden diesen NestJS Auth-Guard.
Bilder werden in die Supabase Storage hochgeladen – die öffentliche Bucket-URL wird
im Frontend direkt genutzt, sodass Bilder über das Supabase CDN ausgeliefert werden,
ohne den Backend-Server zu belasten.

Da von Anfang an mit Supabase entwickelt wurde, gibt es kein lokales docker-compose Setup.
In Produktion wird der Supabase Session Pooler genutzt (statt direkter DB-Verbindung),
da Railway nur IPv4 unterstützt.

Unter `user` werden Nutzer angelegt, validiert, und gelöscht. 
Mit `picture` werden Bilder hochgeladen und gelöscht, sowie Metadaten angefordert.
In `tag` werden Tags erstellt und an Bilder vergeben, sowie von Bildern entfernt und gelöscht.
Hierbei wird ein Tag beim entfernen immer dann gelöscht, wenn er keinem Bild mehr zugeordnet ist. 
Das Löschen von Nutzern entfernt auch alle Bilder des Nutzers aus dem Bucket.

## API Dokumentation
Swagger erreichbar unter `/api` (lokal: http://localhost:3000/api), richtig sich nach SHOW_SWAGGER

## Lokales Setup

1. `.env` Datei im Root anlegen:

DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, SUPABASE_SECRET_KEY, SUPABASE_URL, SHOW_SWAGGER sollten vorhanden sein, genaue Belegungen für Team Engram befinden sich in der Mail.

2. Abhängigkeiten installieren und starten:
npm install
npm run start:dev

## Test-Zugangsdaten
Name: Jannis
Passwort: testtest

## Betrieb ohne Supabase
Sollte Supabase nicht verwendet werden, muss der SupabaseService entsprechend überarbeitet und die Datenbank-Umgebungsvariablen in der .env manuell auf die alternative Umgebung angepasst werden.
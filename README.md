# wybornie.org - frontend

To repozytorium zawiera kod, z którego generowana jest aplikacja uruchamiana po stronie użytkownika po wejściu na stronę http://wybornie.org/.

Aplikacja wyświetla dane pobrane z serwera - [backend](https://github.com/fraunos/wybornieorg-backend).


TODO:
- [x] głosowanie na projekty z wyświetlaniem wyników
- [ ] persistent storage - zapisywanie pobranych z serwera i od użytkownika danych w localStorage cache (dodanie do backendu daty aktualizacji, żeby sprawdzać kiedy należy pobrać ponownie dane na klienta)
- [ ] sortowanie projektów (po numerze, dacie głosowania, liczbie oddanych głosów)
- [x] sortowanie statystyk posłów (wg. zgodności)
- [ ] opisy projektów (nazwy zwyczajowe i artykuły w sieci)
- [ ] frekwencja posłów
- [ ] szybka ankieta - najbardziej popularne projekty
- [ ] widok układu parlamentu zamiast okręgów
